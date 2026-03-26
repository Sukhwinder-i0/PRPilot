"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navbar() {
    const { data: session, status } = useSession();

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                <Link href="/" className="text-lg font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        PRPilot
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {status === "loading" && (
                        <div className="h-8 w-20 animate-pulse rounded-md bg-gray-800" />
                    )}

                    {status === "authenticated" && session && (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-sm text-gray-400 transition-colors hover:text-gray-100"
                            >
                                Dashboard
                            </Link>
                            <span className="text-sm text-gray-500">
                                {(session as { username?: string }).username ?? session.user?.name}
                            </span>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="rounded-md border border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:border-gray-600 hover:text-white"
                            >
                                Sign out
                            </button>
                        </>
                    )}

                    {status === "unauthenticated" && (
                        <button
                            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                            className="rounded-md bg-indigo-500 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
                        >
                            Sign in with GitHub
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
