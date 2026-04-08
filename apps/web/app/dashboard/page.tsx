import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import type { SessionWithUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReviewCard } from "@/components/ReviewCard";
import { RepoList } from "@/components/RepoList";
import { ApiKeyForm } from "@/components/ApiKeyForm";

export default async function DashboardPage() {
    const session = (await getServerSession(authOptions)) as SessionWithUserId | null;

    if (!session?.userId) {
        redirect("/");
    }

    const repos = await prisma.repo.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
    });

    const reviews = await prisma.review.findMany({
        where: { userId: session.userId },
        include: { repo: true },
        orderBy: { createdAt: "desc" },
        take: 20,
    });

    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="mt-2 text-gray-400">
                        Your repositories and recent AI reviews.
                    </p>
                </div>
                {process.env.NEXT_PUBLIC_GITHUB_APP_URL && (
                    <a
                        href={process.env.NEXT_PUBLIC_GITHUB_APP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        Configure GitHub App ↗
                    </a>
                )}
            </header>

            {/* API Key Settings */}
            <ApiKeyForm />

            {/* Repos */}
            <section className="mb-12">
                <h2 className="mb-4 text-xl font-semibold">Connected Repos</h2>
                {repos.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No repos connected yet. Install the GitHub App to get started.
                    </p>
                ) : (
                    <RepoList repos={repos} />
                )}
            </section>

            {/* Reviews */}
            <section>
                <h2 className="mb-4 text-xl font-semibold">Recent Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No reviews yet. Open a PR on a connected repo to trigger a review.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                prTitle={review.prTitle}
                                prNumber={review.prNumber}
                                prUrl={review.prUrl}
                                summary={review.summary}
                                status={review.status}
                                repoName={`${review.repo.owner}/${review.repo.name}`}
                                createdAt={review.createdAt}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
