"use client";

import { useGitHubDialog } from "@/app/(protected)/projects/[projectId]/hooks/useGitHubDialog";
import {
  Clock,
  ExternalLink,
  GitBranch,
  Pencil,
  Unlink,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { useLoading } from "@/components/ui/loading-context";

import { useGitHubConnection } from "../hooks/useGitHubConnection";
import { ProjectHeaderProps } from "../types/types";

/* Project Header - Displays project title, metadata and owner actions */
export function ProjectHeader({
  projectName,
  memberCount,
  projectId,
  createdAt,
  isOwner,
  githubConnection,
  githubRepoCreatedViaApp,
}: ProjectHeaderProps) {
  const { showLoading } = useLoading();
  const { open: openGitHubDialog } = useGitHubDialog();
  const { disconnectRepository, isDisconnecting } = useGitHubConnection({
    projectId,
  });

  const isGitHubConnected =
    githubConnection?.githubRepoUrl && githubConnection?.githubRepoName;

  const handleDisconnectRepository = async () => {
    if (!isGitHubConnected) return;
    await disconnectRepository();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{projectName}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users size={16} />
            {memberCount} members
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            Created {createdAt.toLocaleDateString()}
          </span>
        </div>

        {/* GitHub Connection Status */}
        {isGitHubConnected && (
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <GitBranch size={12} />
              Connected to GitHub
            </Badge>
            <Link
              href={githubConnection.githubRepoUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <span>
                {/* All repoUrls will have https://github.com/ prefix, removing for shorter link */}
                {githubConnection.githubRepoUrl!.replace(
                  "https://github.com/",
                  "",
                )}
              </span>
              <ExternalLink size={12} />
            </Link>
          </div>
        )}
      </div>

      {isOwner && (
        <div className="flex gap-2">
          {!isGitHubConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => openGitHubDialog()}
            >
              <GitBranch className="mr-2 h-4 w-4" />
              Connect GitHub
            </Button>
          ) : (
            !githubRepoCreatedViaApp && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnectRepository}
                disabled={isDisconnecting}
                className="min-w-[140px]"
              >
                {isDisconnecting ? (
                  <LoadingSpinner className="h-4 w-4" text="Disconnecting..." />
                ) : (
                  <>
                    <Unlink className="mr-2 h-4 w-4" />
                    Disconnect Repository
                  </>
                )}
              </Button>
            )
          )}
          <Link
            href={`/projects/${projectId}/edit`}
            onClick={() => showLoading("Loading project editor...")}
          >
            <Button variant="outline" size="sm" className="gap-1">
              <Pencil className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
