"use client";

import { Activity, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import OAuthButton from "@/components/auth/OAuthButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";

import { useGitHubDialog } from "../hooks/useGitHubDialog";
import { RecentActivityCardProps } from "../types/types";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { getActivityIcon } from "../utils/getActivityIcon";

/* Recent Activity Card - Displays the most recent project activities */
export function RecentActivityCard({
  projectId,
  githubConnection,
  session,
  isCollaborator = false,
  isOwner = false,
}: RecentActivityCardProps) {
  const { open: openGitHubDialog } = useGitHubDialog();

  const isRepositoryConnected =
    githubConnection?.githubRepoUrl && githubConnection?.githubRepoName;

  // User has access if they are the owner or a collaborator
  const hasAccess = isOwner || isCollaborator;


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={18} />
            Recent Activity
            {isRepositoryConnected && (
              <Github size={14} className="text-muted-foreground" />
            )}
          </div>
          {isRepositoryConnected && githubConnection?.githubRepoUrl && session && (
            <Link
              href={githubConnection.githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                View on GitHub <ExternalLink size={12} className="ml-1" />
              </Button>
            </Link>
          )}
        </CardTitle>
      </CardHeader>

      {session ? (
        <CardContent>
          {!isRepositoryConnected ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                <button
                  onClick={() => openGitHubDialog()}
                  className="text-primary hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
                >
                  Connect a GitHub repository
                </button>{" "}
                to view activity.
              </p>
            </div>
          ) : !hasAccess ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                You need to be a project owner or collaborator to view activity.
              </p>
            </div>
          ) : 
          (
            <div className="space-y-4">
              Display the repository activities here
            </div>
          )}
        </CardContent>
      ) : (
        <CardContent>
          <div className=" text-center py-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-muted-foreground mb-4">
                Sign in with GitHub to view recent activity for this project.
              </p>
              <div className="w-fit">
                <OAuthButton callbackUrl={`/projects/${projectId}`} />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
