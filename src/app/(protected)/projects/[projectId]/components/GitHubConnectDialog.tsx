"use client";

import { useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRouter } from "next/navigation";
import { LuGithub, LuRefreshCw } from "react-icons/lu";

import { DialogError } from "@/components/auth/DialogError";
import { setToast } from "@/components/ShowToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useGitHubDialog } from "../hooks/useGitHubDialog";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import type { GitHubRepository } from "../types/types";
import { RepositoryListItem } from "./RepositoryListItem";
import { RepositorySearch } from "./RepositorySearch";

interface GitHubConnectDialogProps {
  projectId: string;
}

export function GitHubConnectDialog({ projectId }: GitHubConnectDialogProps) {
  const router = useRouter();
  const { isOpen, close, error } = useGitHubDialog();
  const {
    repositories,
    allRepositories,
    isLoading,
    error: reposError,
    searchTerm,
    setSearchTerm,
    refetch,
  } = useGitHubRepos();

  const [selectedRepository, setSelectedRepository] =
    useState<GitHubRepository | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleRepositorySelect = (repository: GitHubRepository) => {
    setSelectedRepository(
      selectedRepository?.id === repository.id ? null : repository,
    );
  };

  const handleConnectRepository = async () => {
    if (!selectedRepository) return;

    setIsConnecting(true);
    try {
      const response = await fetch("/api/github/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          repository: selectedRepository,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect repository");
      }

      // Set success toast
      setToast(
        `Successfully connected to ${selectedRepository.name}!`,
        "success",
        "githubConnectStatus",
      );

      // Close dialog and refresh the page to show updated header
      close();
      router.refresh();
    } catch (error) {
      console.error("Failed to connect repository:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to connect repository";

      // Set error toast
      setToast(errorMessage, "error", "githubConnectStatus");
    } finally {
      setIsConnecting(false);
    }
  };

  const displayError = error || reposError;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[700px] max-h-[600px] rounded-2xl p-0 shadow-xl border bg-card">
        <VisuallyHidden>
          <DialogDescription />
        </VisuallyHidden>

        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
            <LuGithub className="h-6 w-6" />
            Connect GitHub Repository
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select a repository from your GitHub account to link to this project
          </p>
        </DialogHeader>

        <div className="px-6">
          {displayError && <DialogError message={displayError} />}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <LoadingSpinner text="Loading repositories" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search and Refresh */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <RepositorySearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Search your repositories..."
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={refetch}
                  disabled={isLoading}
                >
                  <LuRefreshCw className="h-4 w-4" />
                </Button>
              </div>

              {/* Repository Count */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {repositories.length === allRepositories.length
                    ? `${allRepositories.length} repositories`
                    : `${repositories.length} of ${allRepositories.length} repositories`}
                </span>
              </div>

              {/* Repository List */}
              <ScrollArea className="h-[300px]">
                {repositories.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <LuGithub className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? "No repositories match your search"
                        : "No repositories found"}
                    </p>
                    {searchTerm && (
                      <Button
                        variant="link"
                        onClick={() => setSearchTerm("")}
                        className="mt-2"
                      >
                        Clear search
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 pr-4">
                    {repositories.map((repository) => (
                      <RepositoryListItem
                        key={repository.id}
                        repository={repository}
                        isSelected={selectedRepository?.id === repository.id}
                        onSelect={handleRepositorySelect}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 pt-4 border-t">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            onClick={handleConnectRepository}
            disabled={!selectedRepository || isConnecting}
            className="min-w-[120px]"
          >
            {isConnecting ? (
              <LoadingSpinner className="h-4 w-4" />
            ) : (
              "Connect Repository"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
