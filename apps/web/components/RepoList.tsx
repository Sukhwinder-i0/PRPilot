interface Repo {
    id: string;
    owner: string;
    name: string;
    active: boolean;
    createdAt: Date;
}

interface RepoListProps {
    repos: Repo[];
}

export function RepoList({ repos }: RepoListProps) {
    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
                <div
                    key={repo.id}
                    className="rounded-lg border border-gray-800 bg-gray-900 p-4"
                >
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-100">
                                {repo.owner}/{repo.name}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Added{" "}
                                {repo.createdAt.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                        <span
                            className={`ml-3 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${repo.active
                                    ? "bg-green-900/50 text-green-300"
                                    : "bg-gray-800 text-gray-500"
                                }`}
                        >
                            {repo.active ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
