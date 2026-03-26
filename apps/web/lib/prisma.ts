import { PrismaClient } from "@prisma/client";

// TODO: add query logging in development
// TODO: add connection pooling for production (e.g. Prisma Accelerate or PgBouncer)

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
