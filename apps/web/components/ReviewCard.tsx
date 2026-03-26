interface ReviewCardProps {
    prTitle: string;
    prNumber: number;
    prUrl: string;
    summary: string;
    status: "PENDING" | "POSTED" | "FAILED";
    repoName: string;
    createdAt: Date;
}

const statusStyles: Record<ReviewCardProps["status"], string> = {
    PENDING: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
    POSTED: "bg-green-900/50 text-green-300 border-green-700",
    FAILED: "bg-red-900/50 text-red-300 border-red-700",
};

export function ReviewCard({
    prTitle,
    prNumber,
    prUrl,
    summary,
    status,
    repoName,
    createdAt,
}: ReviewCardProps) {
    const displaySummary =
        summary.length > 150 ? summary.slice(0, 150) + "…" : summary;

    return (
        <a
            href={prUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-gray-700 hover:bg-gray-800/80"
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">{repoName}</p>
                    <h3 className="mt-1 truncate text-sm font-medium text-gray-100">
                        #{prNumber} {prTitle}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400">{displaySummary}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span
                        className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
                    >
                        {status}
                    </span>
                    <time className="text-xs text-gray-600" dateTime={createdAt.toISOString()}>
                        {createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </time>
                </div>
            </div>
        </a>
    );
}
