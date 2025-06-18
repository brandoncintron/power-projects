import { useCallback, useState } from "react";

import type {
  GitHubReposError,
  GitHubRepository,
  GitHubReposResponse,
  UseGitHubReposState,
} from "../types/types";

export function useGitHubRepos() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRepositories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/github/repos");
      const data: GitHubReposResponse | GitHubReposError =
        await response.json();

      if (!response.ok) {
        throw new Error(
          (data as GitHubReposError).error || "Failed to fetch repositories",
        );
      }

      const successData = data as GitHubReposResponse;
      setRepositories(successData.repositories);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter repositories based on search term
  const filteredRepositories = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.language?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return {
    repositories: filteredRepositories,
    allRepositories: repositories,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: fetchRepositories,
  } satisfies UseGitHubReposState & {
    allRepositories: GitHubRepository[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  };
}
