import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL = "gemini-2.5-flash";
const MAX_DIFF_CHARS = 12000;

export class PRReviewError extends Error {
    constructor(message: string, public readonly cause?: unknown) {
        super(message);
        this.name = "PRReviewError";
    }
}

export interface InlineComment {
    path: string;
    line: number;
    body: string;
}

export interface AIReviewResult {
    summary: string;
    comments: InlineComment[];
}

// ── NEW: parse the raw diff into per-file chunks ──────────────────────────────
interface FileDiff {
    path: string;
    addedLines: Array<{ lineNumber: number; content: string }>;
    rawChunk: string;
}

function parseDiff(rawDiff: string): FileDiff[] {
    const files: FileDiff[] = [];
    const fileBlocks = rawDiff.split(/^diff --git /m).filter(Boolean);

    for (const block of fileBlocks) {
        // extract file path from "a/path/to/file b/path/to/file"
        const pathMatch = block.match(/^a\/.+? b\/(.+)/);
        if (!pathMatch) continue;
        const path = pathMatch[1].trim();

        const addedLines: Array<{ lineNumber: number; content: string }> = [];
        let currentLine = 0;

        for (const line of block.split("\n")) {
            // @@ -old,count +new,start @@ context
            const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
            if (hunkMatch) {
                currentLine = parseInt(hunkMatch[1], 10);
                continue;
            }
            if (line.startsWith("+") && !line.startsWith("+++")) {
                addedLines.push({ lineNumber: currentLine, content: line.slice(1) });
                currentLine++;
            } else if (!line.startsWith("-")) {
                currentLine++;
            }
        }

        files.push({ path, addedLines, rawChunk: block });
    }

    return files;
}

// ── NEW: build a clean, readable prompt per file ──────────────────────────────
function buildFilePrompt(file: FileDiff, prTitle: string): string {
    const addedCode = file.addedLines
        .map((l) => `Line ${l.lineNumber}: ${l.content}`)
        .join("\n");

    return `You are reviewing a pull request titled: "${prTitle}"

File: ${file.path}

Added/changed lines (with exact line numbers):
${addedCode || "(no additions — deletions only)"}

Instructions:
- Only comment on real bugs, null/undefined risks, logic errors, or security issues.
- Skip style, formatting, and minor naming preferences.
- If the code looks correct, return an empty comments array.
- If you find an issue, suggest a fix.
- Best practice suggestions are welcome.
- Keep each comment under 2 lines: what is wrong and how to fix it.
- The "line" field MUST be one of the exact line numbers shown above.
- Return ONLY a JSON array of comments, no other text:
  [{ "line": <number>, "body": "<comment>" }]
- If no issues: []`;
}

// ── UPDATED: main function ────────────────────────────────────────────────────
export async function generatePRReview(
    diff: string,
    prTitle: string
): Promise<AIReviewResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new PRReviewError("GEMINI_API_KEY is not set");

    const truncated = diff.length > MAX_DIFF_CHARS;
    const processedDiff = truncated ? diff.slice(0, MAX_DIFF_CHARS) : diff;

    const files = parseDiff(processedDiff);

    if (files.length === 0) {
        return {
            summary: "- No reviewable changes found in this diff.",
            comments: [],
        };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: MODEL,
        systemInstruction:
            "You are a senior developer doing code review. Be concise, simple, direct, and very easy language. Never use emojis. Only flag real issues.",
        generationConfig: { responseMimeType: "application/json" },
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ],
    });

    // ── review each file separately ──────────────────────────────────────────
    const allComments: InlineComment[] = [];

    for (const file of files) {
        // skip lock files, generated files, config noise
        if (
            file.path.includes("lock") ||
            file.path.includes(".min.") ||
            file.path.endsWith(".json") ||
            file.addedLines.length === 0
        ) continue;

        try {
            const prompt = buildFilePrompt(file, prTitle);
            const result = await model.generateContent(prompt);
            const text = result.response.text().trim();

            const parsed = JSON.parse(text) as Array<{
                line: number;
                body: string;
            }>;

            for (const c of parsed) {
                // validate line number actually exists in this file's added lines
                const validLine = file.addedLines.some(
                    (l) => l.lineNumber === c.line
                );
                if (validLine) {
                    allComments.push({ path: file.path, line: c.line, body: c.body });
                }
            }
        } catch {
            // one file failing shouldn't kill the whole review
            console.error(`Failed to review ${file.path}`);
        }
    }

    // ── generate overall summary separately ──────────────────────────────────
    const summaryPrompt = `Summarize this pull request titled "${prTitle}" in 3-5 bullet points.
Focus on: what changed, why it matters, and any patterns across files.
Be factual. No praise. No emojis.
Return ONLY a JSON object: { "summary": "bullet1\\nbullet2\\nbullet3" }

Files changed: ${files.map((f) => f.path).join(", ")}`;

    let summary = "- Changes reviewed.";
    try {
        const summaryResult = await model.generateContent(summaryPrompt);
        const summaryText = summaryResult.response.text().trim();
        const parsed = JSON.parse(summaryText) as { summary: string };
        summary = parsed.summary;
    } catch {
        console.error("Summary generation failed");
    }

    if (truncated) {
        summary += "\n\n> **Note:** Diff was truncated at 12,000 characters.";
    }

    return { summary, comments: allComments };
}