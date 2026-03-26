import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature, getPRDiff, postReviewComment } from "@/lib/github";
import { generatePRReview } from "@/lib/ai";

// TODO: add rate limiting to prevent webhook abuse
// TODO: add queue-based processing for high-volume repos

interface PullRequestPayload {
    action: string;
    number: number;
    pull_request: {
        title: string;
        html_url: string;
    };
    repository: {
        owner: {
            login: string;
        };
        name: string;
    };
    installation?: {
        id: number;
    };
}

export async function POST(request: Request) {
    let repoRecord: { id: string; userId: string } | null = null;
    let prNumber: number | undefined;
    let prTitle: string | undefined;
    let prUrl: string | undefined;

    try {
        // 1. Read raw body as string (important for signature verification)
        const rawBody = await request.text();

        // 2. Verify HMAC-SHA256 signature
        const signature = request.headers.get("x-hub-signature-256") ?? "";
        const secret = process.env.GITHUB_WEBHOOK_SECRET ?? "";

        if (!verifyWebhookSignature(rawBody, signature, secret)) {
            return NextResponse.json(
                { error: "Invalid signature" },
                { status: 401 }
            );
        }

        // 3. Parse JSON body
        const payload = JSON.parse(rawBody) as PullRequestPayload;

        // 4. Only handle pull_request opened or synchronize
        const event = request.headers.get("x-github-event") ?? "";
        if (event !== "pull_request") {
            return NextResponse.json({ ok: true, skipped: "not a pull_request event" });
        }

        if (payload.action !== "opened" && payload.action !== "synchronize") {
            return NextResponse.json({ ok: true, skipped: `action: ${payload.action}` });
        }

        // 5. Extract PR details
        const owner = payload.repository.owner.login;
        const repoName = payload.repository.name;
        prNumber = payload.number;
        prTitle = payload.pull_request.title;
        prUrl = payload.pull_request.html_url;

        // 6. Look up the Repo in DB
        repoRecord = await prisma.repo.findFirst({
            where: {
                owner,
                name: repoName,
                active: true,
            },
            select: {
                id: true,
                userId: true,
            },
        });

        if (!repoRecord) {
            return NextResponse.json({ ok: true, skipped: "repo not found or inactive" });
        }

        // Get user's access token for API calls
        const user = await prisma.user.findUnique({
            where: { id: repoRecord.userId },
            select: { accessToken: true },
        });

        if (!user) {
            return NextResponse.json({ ok: true, skipped: "user not found" });
        }

        // 7. Fetch PR diff and generate AI review
        const diff = await getPRDiff(owner, repoName, prNumber, user.accessToken);
        const review = await generatePRReview(diff, prTitle);

        // 8. Post review comment on the PR
        const commentId = await postReviewComment(
            owner,
            repoName,
            prNumber,
            `## 🤖 PRPilot Review\n\n${review}`,
            user.accessToken
        );

        // 9. Save Review record to DB with status POSTED
        // Use first 150 chars of the review as summary
        const summary = review.length > 150 ? review.slice(0, 150) + "…" : review;

        await prisma.review.create({
            data: {
                prNumber,
                prTitle,
                prUrl,
                summary,
                fullReview: review,
                commentId,
                status: "POSTED",
                repoId: repoRecord.id,
                userId: repoRecord.userId,
            },
        });

        // 10. Return success
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Webhook handler error:", error);

        // Save failed review to DB if we have enough context
        if (repoRecord && prNumber && prTitle && prUrl) {
            try {
                await prisma.review.create({
                    data: {
                        prNumber,
                        prTitle,
                        prUrl,
                        summary: "Review failed — see logs for details.",
                        fullReview: error instanceof Error ? error.message : "Unknown error",
                        status: "FAILED",
                        repoId: repoRecord.id,
                        userId: repoRecord.userId,
                    },
                });
            } catch (dbError) {
                console.error("Failed to save FAILED review record:", dbError);
            }
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
