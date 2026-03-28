import { Octokit } from "@octokit/rest";
import crypto from "crypto";

// TODO: add rate limiting for GitHub API calls
// TODO: add retry logic with exponential backoff for transient failures

/**
 * Fetch the diff for a pull request as a string.
 */
export async function getPRDiff(
    owner: string,
    repo: string,
    prNumber: number,
    token: string
): Promise<string> {
    const octokit = new Octokit({ auth: token });

    const { data } = await octokit.pulls.get({
        owner,
        repo,
        pull_number: prNumber,
        mediaType: {
            format: "diff",
        },
    });

    // The response is a string when requesting diff format
    return data as unknown as string;
}

/**
 * Post or update a review comment on a pull request.
 * Returns the comment ID (useful for future updates).
 */
export async function postReviewComment(
    owner: string,
    repo: string,
    prNumber: number,
    body: string,
    token: string,
    existingCommentId?: number
): Promise<number> {
    const octokit = new Octokit({ auth: token });

    if (existingCommentId) {
        const { data } = await octokit.issues.updateComment({
            owner,
            repo,
            comment_id: existingCommentId,
            body,
        });
        return data.id;
    }

    const { data } = await octokit.issues.createComment({
        owner,
        repo,
        issue_number: prNumber,
        body,
    });
    return data.id;
}

export interface InlineComment {
    path: string;
    line: number;
    body: string;
}

/**
 * Parses a unified diff to extract valid right-side line numbers that were added or kept as context.
 */
export function getValidDiffLines(diff: string): Map<string, Set<number>> {
    const validLines = new Map<string, Set<number>>();
    let currentFile = "";
    let currentLine = 0;

    const lines = diff.split('\n');
    for (const line of lines) {
        if (line.startsWith('diff --git')) {
            const parts = line.split(' ');
            if (parts.length >= 3) {
                currentFile = parts[parts.length - 1].replace(/^b\//, '');
                if (!validLines.has(currentFile)) {
                    validLines.set(currentFile, new Set());
                }
            }
        } else if (line.startsWith('+++ b/')) {
            currentFile = line.substring(6);
            if (!validLines.has(currentFile)) {
                validLines.set(currentFile, new Set());
            }
        } else if (line.startsWith('@@ ')) {
            const match = line.match(/\+([0-9]+)/);
            if (match) {
                currentLine = parseInt(match[1], 10);
            }
        } else if (line.startsWith('+') || line.startsWith(' ')) {
            if (currentFile && currentLine > 0) {
                validLines.get(currentFile)?.add(currentLine);
                currentLine++;
            }
        } else if (line.startsWith('-')) {
            // deleted line, doesn't increment right-side counter
        }
    }
    return validLines;
}

/**
 * Post a bulk review containing inline comments.
 * Falls back to a standard PR comment if inline comments fail (e.g. invalid line number).
 */
export async function postInlineReviewComments(
    owner: string,
    repo: string,
    prNumber: number,
    commitId: string,
    body: string,
    comments: InlineComment[],
    token: string,
    diff: string
): Promise<number> {
    const octokit = new Octokit({ auth: token });

    const validLinesMap = getValidDiffLines(diff);
    const validComments: InlineComment[] = [];
    const invalidComments: InlineComment[] = [];

    for (const comment of comments) {
        const fileLines = validLinesMap.get(comment.path);
        if (fileLines && fileLines.has(comment.line)) {
            validComments.push(comment);
        } else {
            invalidComments.push(comment);
        }
    }

    let finalBody = body;
    if (invalidComments.length > 0) {
        console.log(`⚠️ Filtered out ${invalidComments.length} invalid inline comments.`);
        finalBody += "\n\n### Additional Comments\n" +
            invalidComments.map(c => `- **${c.path}:${c.line}**: ${c.body}`).join("\n");
    }

    try {
        const { data } = await octokit.pulls.createReview({
            owner,
            repo,
            pull_number: prNumber,
            commit_id: commitId,
            body: finalBody,
            event: "COMMENT",
            comments: validComments,
        });
        return data.id;
    } catch (error) {
        console.error("❌ Failed to create bulk review with inline comments:", error);

        // Fallback: Just post a regular issue comment with the summary if inline fails
        console.log("Falling back to standard PR comment");
        const fallbackBody = finalBody + "\n\n### Additional Comments (Inline Failed)\n" +
            validComments.map(c => `- **${c.path}:${c.line}**: ${c.body}`).join("\n");

        const { data } = await octokit.issues.createComment({
            owner,
            repo,
            issue_number: prNumber,
            body: fallbackBody,
        });
        return data.id;
    }
}

/**
 * Verify the GitHub webhook signature using HMAC-SHA256.
 * Uses crypto.timingSafeEqual to prevent timing attacks.
 */
export function verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
): boolean {
    if (!signature || !secret) {
        console.error("❌ Signature or Secret is missing");
        return false;
    }

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(payload, "utf-8");
    const digest = `sha256=${hmac.digest("hex")}`;

    const signatureBuffer = Buffer.from(signature, "utf-8");
    const digestBuffer = Buffer.from(digest, "utf-8");

    if (signatureBuffer.length !== digestBuffer.length) {
        console.error(`❌ Signature length mismatch: expected ${digestBuffer.length}, got ${signatureBuffer.length}`);
        return false;
    }

    try {
        const isValid = crypto.timingSafeEqual(signatureBuffer, digestBuffer);
        if (!isValid) {
            console.error("❌ Signature digest mismatch");
        }
        return isValid;
    } catch (error) {
        console.error("❌ crypto.timingSafeEqual error:", error);
        return false;
    }
}
