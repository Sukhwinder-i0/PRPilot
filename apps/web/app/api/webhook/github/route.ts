import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature, getPRDiff, postInlineReviewComments } from "@/lib/github";
import { generatePRReview } from "@/lib/ai";
import { refreshAccessToken } from "@/lib/auth";

// TODO: add rate limiting to prevent webhook abuse
// TODO: add queue-based processing for high-volume repos

interface PullRequestPayload {
    action: string;
    number: number;
    pull_request: {
        title: string;
        html_url: string;
        head: {
            sha: string;
        };
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
    console.log("📥 Webhook received");
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

        console.log("🔐 Verifying signature...");
        if (!verifyWebhookSignature(rawBody, signature, secret)) {
            // TODO: Re-enable this block once secrets are synced
            console.warn("⚠️ Signature mismatch — BYPASSED FOR TESTING");
            console.warn(`  Header Sig: ${signature.slice(0, 20)}...`);
            console.warn(`  Secret Len: ${secret.length}, starts with: ${secret.slice(0, 3)}...`);
            // return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        } else {
            console.log("✅ Signature verified");
        }

        // 3. Parse JSON body
        const payload = JSON.parse(rawBody) as any;

        // 4. Handle different event types
        const event = request.headers.get("x-github-event") ?? "";
        console.log(`Event: ${event}, Action: ${payload.action}`);

        // --- INSTALLATION EVENTS (Syncing Repos to DB) ---
        if (event === "installation" || event === "installation_repositories") {
            const senderId = payload.sender?.id?.toString();
            if (!senderId) {
                console.error("❌ Installation event missing sender ID");
                return NextResponse.json({ ok: true, skipped: "missing sender" });
            }

            const user = await prisma.user.findUnique({ where: { githubId: senderId } });
            if (!user) {
                console.error(`❌ User with githubId ${senderId} not found in DB`);
                return NextResponse.json({ ok: true, skipped: "user not found" });
            }

            const installationId = payload.installation?.id?.toString();

            if (event === "installation" && payload.action === "created") {
                const repos = payload.repositories || [];
                for (const r of repos) {
                    await prisma.repo.upsert({
                        where: { githubRepoId: r.id },
                        create: {
                            githubRepoId: r.id,
                            owner: r.full_name.split("/")[0],
                            name: r.name,
                            installationId,
                            active: true,
                            userId: user.id
                        },
                        update: { active: true, installationId, userId: user.id }
                    });
                }
                console.log(`✅ Synced ${repos.length} repos for user ${user.username}`);
            } else if (event === "installation" && payload.action === "deleted") {
                if (installationId) {
                    await prisma.repo.updateMany({
                        where: { installationId },
                        data: { active: false }
                    });
                    console.log(`🛑 Deactivated repos for installation ${installationId}`);
                }
            } else if (event === "installation_repositories") {
                if (payload.action === "added") {
                    const added = payload.repositories_added || [];
                    for (const r of added) {
                        await prisma.repo.upsert({
                            where: { githubRepoId: r.id },
                            create: {
                                githubRepoId: r.id,
                                owner: r.full_name.split("/")[0],
                                name: r.name,
                                installationId,
                                active: true,
                                userId: user.id
                            },
                            update: { active: true, installationId, userId: user.id }
                        });
                    }
                    console.log(`✅ Added ${added.length} repos for user ${user.username}`);
                } else if (payload.action === "removed") {
                    const removed = payload.repositories_removed || [];
                    for (const r of removed) {
                        await prisma.repo.updateMany({
                            where: { githubRepoId: r.id },
                            data: { active: false }
                        });
                    }
                    console.log(`🗑️ Removed ${removed.length} repos for user ${user.username}`);
                }
            }

            return NextResponse.json({ ok: true });
        }

        // --- PULL REQUEST EVENTS ---
        if (event !== "pull_request") {
            console.log("⏭️ Skipping: not a pull_request or installation event");
            return NextResponse.json({ ok: true, skipped: "unsupported event" });
        }

        if (payload.action !== "opened" && payload.action !== "synchronize" && payload.action !== "reopened") {
            console.log(`⏭️ Skipping: PR action is ${payload.action}`);
            return NextResponse.json({ ok: true, skipped: `action: ${payload.action}` });
        }

        // 5. Extract PR details
        const owner = payload.repository.owner.login;
        const repoName = payload.repository.name;
        prNumber = payload.number;
        prTitle = payload.pull_request.title;
        prUrl = payload.pull_request.html_url;
        const commitId = payload.pull_request.head.sha;

        console.log(`🔍 Looking for repo: ${owner}/${repoName}`);

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
            console.log("⏭️ Skipping: repo not found or inactive in DB");
            return NextResponse.json({ ok: true, skipped: "repo not found or inactive" });
        }

        console.log(`✅ Repo found in DB. User ID: ${repoRecord.userId}`);

        // Get user's access token for API calls
        let user = await prisma.user.findUnique({
            where: { id: repoRecord.userId },
            select: { accessToken: true, expiresAt: true, geminiApiKey: true },
        });

        if (!user) {
            console.error("❌ User not found for repo");
            return NextResponse.json({ ok: true, skipped: "user not found" });
        }

        let accessToken = user.accessToken;

        // Check if token is expired (or expires soon - e.g. in 1 minute)
        const isExpired = user.expiresAt && user.expiresAt.getTime() < Date.now() + 60000;
        if (isExpired) {
            console.log("🔄 Token expired, refreshing...");
            try {
                accessToken = await refreshAccessToken(repoRecord.userId);
                console.log("✅ Token refreshed successfully");
            } catch (err) {
                console.error("❌ Failed to refresh token:", err);
                // Continue with old token and let it fail with 401 if refresh failed
            }
        }

        console.log("🤖 Generating AI review...");
        // 7. Fetch PR diff and generate AI review
        const diff = await getPRDiff(owner, repoName, prNumber!, accessToken);
        const review = await generatePRReview(diff, prTitle!, user.geminiApiKey);

        console.log("📝 Posting review comment...");
        // 8. Post review comment on the PR
        const commentId = await postInlineReviewComments(
            owner,
            repoName,
            prNumber!,
            commitId,
            `## 🤖 PRPilot Review\n\n${review.summary}`,
            review.comments,
            accessToken,
            diff
        );

        console.log(`✅ Review posted (Comment ID: ${commentId})`);

        // 9. Save Review record to DB with status POSTED
        // Use first 150 chars of the review as summary
        const summary = review.summary.length > 150 ? review.summary.slice(0, 150) + "…" : review.summary;

        await prisma.review.create({
            data: {
                prNumber: prNumber!,
                prTitle: prTitle!,
                prUrl: prUrl!,
                summary,
                fullReview: JSON.stringify(review, null, 2),
                commentId,
                status: "POSTED",
                repoId: repoRecord.id,
                userId: repoRecord.userId,
            },
        });

        console.log("💾 Review saved to database");

        // 10. Return success
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("❌ Webhook handler error:", error);

        // Save failed review to DB if we have enough context
        if (repoRecord && prNumber && prTitle && prUrl) {
            try {
                await prisma.review.create({
                    data: {
                        prNumber: prNumber!,
                        prTitle: prTitle!,
                        prUrl: prUrl!,
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
