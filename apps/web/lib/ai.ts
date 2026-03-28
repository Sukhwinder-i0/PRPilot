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

export interface AIReviewResult {
    summary: string;
    comments: Array<{
        path: string;
        line: number;
        body: string;
    }>;
}

export async function generatePRReview(
    diff: string,
    prTitle: string
): Promise<AIReviewResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new PRReviewError("GEMINI_API_KEY is not set");

    let truncationNote = "";
    let processedDiff = diff;

    if (diff.length > MAX_DIFF_CHARS) {
        processedDiff = diff.slice(0, MAX_DIFF_CHARS);
        truncationNote =
            "\n\n> **Note:** This diff was truncated to 12,000 characters. Some files may not be reviewed.";
    }

    console.log("=== DIFF SENT TO GEMINI ===");
    console.log(processedDiff);
    console.log("===========================");

    const userPrompt = `Review this PR titled: "${prTitle}"

Diff:
${processedDiff}

Rules:
- Write in simple, easy-to-understand language. The person reading this might be a beginner or a "vibe coder" — avoid heavy jargon.
- Keep the summary short (3-5 lines max).
- If everything looks good, be genuinely positive and encouraging! Say something like "Great work! This looks clean and solid 🚀" — make the contributor feel good about their work.
- If something could break or cause a bug, be very clear and direct about it. Say exactly WHICH file and WHAT could go wrong, like: "⚠️ This file might break because..." or "🐛 This line could cause a crash if..."
- Only flag real problems. Don't nitpick small style issues.
- For inline comments, explain the issue like you're helping a friend — not lecturing them.
- You MUST return a valid JSON object matching this schema:
  {
    "summary": "A friendly overall summary of the PR.",
    "comments": [
      {
        "path": "path/to/file.ts",
        "line": 10,
        "body": "Hey! This line might cause an issue because... Here's what you can do to fix it: ..."
      }
    ]
  }
- If there are no issues, return an empty comments array: "comments": []
- Ensure that the \`path\` matches a file in the diff exactly.
- Ensure that the \`line\` is an exact line number present in the added/modified parts of the diff for that file.
`;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        const model = genAI.getGenerativeModel({
            model: MODEL,
            systemInstruction:
                "You are a friendly senior developer reviewing code for beginners. Be supportive and encouraging when things look good. Be clear and helpful when something is wrong — explain it simply, like you're helping a friend. Always return a raw JSON object.",
            generationConfig: {
                responseMimeType: "application/json",
            },
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

        const parsed = JSON.parse(text) as AIReviewResult;
        if (truncationNote) {
            parsed.summary += truncationNote;
        }
        return parsed;
    } catch (err) {
        if (err instanceof PRReviewError) throw err;
        throw new PRReviewError("Gemini API call failed", err);
    }
}
