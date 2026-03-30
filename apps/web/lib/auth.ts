import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

// TODO: encrypt accessToken before storing in database

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    scope: "read:user user:email repo",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (!account || !profile) return false;

            const githubProfile = profile as {
                id?: number;
                login?: string;
                avatar_url?: string;
            };

            if (!githubProfile.id || !githubProfile.login) return false;

            const expiresAt = account.expires_at
                ? new Date(account.expires_at * 1000)
                : null;

            await prisma.user.upsert({
                where: { githubId: String(githubProfile.id) },
                update: {
                    username: githubProfile.login,
                    email: user.email ?? null,
                    avatarUrl: githubProfile.avatar_url ?? null,
                    accessToken: account.access_token ?? "",
                    refreshToken: account.refresh_token ?? null,
                    expiresAt,
                },
                create: {
                    githubId: String(githubProfile.id),
                    username: githubProfile.login,
                    email: user.email ?? null,
                    avatarUrl: githubProfile.avatar_url ?? null,
                    accessToken: account.access_token ?? "",
                    refreshToken: account.refresh_token ?? null,
                    expiresAt,
                },
            });

            return true;
        },
        async session({ session, token }) {
            if (token.sub) {
                const dbUser = await prisma.user.findUnique({
                    where: { githubId: token.sub },
                });
                if (dbUser) {
                    (session as SessionWithUserId).userId = dbUser.id;
                    (session as SessionWithUserId).username = dbUser.username;
                    (session as SessionWithUserId).avatarUrl = dbUser.avatarUrl;
                }
            }
            return session;
        },
        async jwt({ token, profile }) {
            if (profile) {
                const githubProfile = profile as { id?: number };
                if (githubProfile.id) {
                    token.sub = String(githubProfile.id);
                }
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Refresh a GitHub OAuth access token using the stored refresh token.
 */
export async function refreshAccessToken(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { refreshToken: true },
    });

    if (!user?.refreshToken) {
        throw new Error("No refresh token available");
    }

    const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: user.refreshToken,
        }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
        throw new Error(`Failed to refresh GitHub token: ${data.error_description || data.error || "Unknown error"}`);
    }

    const expiresAt = data.expires_in
        ? new Date(Date.now() + data.expires_in * 1000)
        : null;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            accessToken: data.access_token,
            refreshToken: data.refresh_token ?? user.refreshToken,
            expiresAt,
        },
    });

    return updatedUser.accessToken;
}

export interface SessionWithUserId {
    userId: string;
    username?: string;
    avatarUrl?: string | null;
    user?: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    expires: string;
}
