import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function LandingPage() {
    const session = await getServerSession(authOptions);
    const isLoggedIn = !!session;

    return (
        <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-6">
            <div className="max-w-2xl text-center">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                    AI code reviews on every PR,{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        automatically
                    </span>
                </h1>

                <p className="mt-6 text-lg leading-8 text-gray-400">
                    PRPilot reviews your pull requests using AI — catches bugs, suggests
                    improvements, posts as a comment.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {isLoggedIn ? (
                        <Link
                            href="/dashboard"
                            className="rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-colors"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <a
                                href="/api/auth/signin"
                                className="rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-colors"
                            >
                                Sign in with GitHub
                            </a>
                            {process.env.NEXT_PUBLIC_GITHUB_APP_URL && (
                                <a
                                    href={process.env.NEXT_PUBLIC_GITHUB_APP_URL}
                                    className="rounded-md border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
                                >
                                    Install GitHub App
                                </a>
                            )}
                        </>
                    )}
                </div>

                <p className="mt-16 text-xs text-gray-600">
                    Free during beta · No credit card required
                </p>
            </div>
        </main>
    );
}
