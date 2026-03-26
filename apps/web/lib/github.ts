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
