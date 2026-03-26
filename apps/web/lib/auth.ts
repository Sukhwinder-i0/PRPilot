import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";

// TODO: encrypt accessToken before storing in database
// TODO: add session refresh logic for expired GitHub tokens

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

            await prisma.user.upsert({
                where: { githubId: String(githubProfile.id) },
                update: {
                    username: githubProfile.login,
                    email: user.email ?? null,
                    avatarUrl: githubProfile.avatar_url ?? null,
                    accessToken: account.access_token ?? "",
                },
                create: {
                    githubId: String(githubProfile.id),
                    username: githubProfile.login,
                    email: user.email ?? null,
                    avatarUrl: githubProfile.avatar_url ?? null,
                    accessToken: account.access_token ?? "",
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
