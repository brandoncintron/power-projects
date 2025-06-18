"use client";

import { useEffect, useState } from "react";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LuGithub, LuRefreshCw } from "react-icons/lu";

import { DialogError } from "@/components/auth/DialogError";
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

import { useGitHubConnection } from "../hooks/useGitHubConnection";
import { useGitHubDialog } from "../hooks/useGitHubDialog";
import { useGitHubRepos } from "../hooks/useGitHubRepos";
import type {
  GitHubConnectDialogProps,
  GitHubRepository,
} from "../types/types";
import { RepositoryListItem } from "./RepositoryListItem";
import { RepositorySearch } from "./RepositorySearch";

export function GitHubConnectDialog({ projectId }: GitHubConnectDialogProps) {
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

  const { connectRepository, isConnecting } = useGitHubConnection({
    projectId,
    onSuccess: close,
  });

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const handleRepositorySelect = (repository: GitHubRepository) => {
    setSelectedRepository(
      selectedRepository?.id === repository.id ? null : repository,
    );
  };

  const handleConnectRepository = async () => {
    if (!selectedRepository) return;
    await connectRepository(selectedRepository);
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

            {/* Repository List - Always maintain ScrollArea */}
            <ScrollArea className="h-[300px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[300px]">
                  <LoadingSpinner text="Loading repositories" />
                </div>
              ) : repositories.length === 0 ? (
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
              <LoadingSpinner className="h-4 w-4" text="Connecting..." />
            ) : (
              "Connect Repository"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
