import type { Metadata } from "next";
import { SessionProvider } from "@/components/SessionProvider";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "PRPilot — AI Code Reviews on Every PR",
    description:
        "PRPilot reviews your pull requests using AI — catches bugs, suggests improvements, posts as a comment.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-950 text-gray-100 antialiased">
                <SessionProvider>
                    <Navbar />
                    <div className="pt-14">{children}</div>
                </SessionProvider>
            </body>
        </html>
    );
}
