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

export async function generatePRReview(
    diff: string,
    prTitle: string
): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new PRReviewError("GEMINI_API_KEY is not set");

    let truncationNote = "";
    let processedDiff = diff;

    if (diff.length > MAX_DIFF_CHARS) {
        processedDiff = diff.slice(0, MAX_DIFF_CHARS);
        truncationNote =
            "\n\n> **Note:** This diff was truncated to 12,000 characters. Some files may not be reviewed.";
    }

    const userPrompt = `Review this PR titled: ${prTitle}

Diff:
${processedDiff}

Respond in this exact Markdown format:
## Summary
(2 sentences max)

## Issues
(bullet list, bugs or logic errors only, skip if none)

## Suggestions
(bullet list, max 3, actionable only)

## What's good
(one line)`;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: MODEL,
            systemInstruction:
                "You are a senior code reviewer. Be direct and useful. Never be sycophantic.",
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

        const result = await model.generateContent(userPrompt);
        const text = result.response.text();

        if (!text) throw new PRReviewError("Gemini returned an empty response");

        return text + truncationNote;
    } catch (err) {
        if (err instanceof PRReviewError) throw err;
        throw new PRReviewError("Gemini API call failed", err);
    }
}
