import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions, type SessionWithUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions) as SessionWithUserId | null;
        if (!session?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { geminiApiKey: true },
        });

        if (!user?.geminiApiKey) {
            return NextResponse.json({ hasKey: false, maskedKey: null });
        }

        // Mask the key: AIzaSy***abcd
        const key = user.geminiApiKey;
        const maskedKey = key.length > 10
            ? `${key.slice(0, 6)}••••••••••••${key.slice(-4)}`
            : "••••••••";

        return NextResponse.json({ hasKey: true, maskedKey });
    } catch (error) {
        console.error("Failed to fetch custom Gemini key:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions) as SessionWithUserId | null;
        if (!session?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { key } = body;

        if (typeof key !== "string" || key.trim() === "") {
            return NextResponse.json({ error: "Invalid API key provided" }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: session.userId },
            data: { geminiApiKey: key.trim() },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to save custom Gemini key:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const session = await getServerSession(authOptions) as SessionWithUserId | null;
        if (!session?.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.user.update({
            where: { id: session.userId },
            data: { geminiApiKey: null },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete custom Gemini key:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
