"use client";

import { formatDistanceToNow } from "date-fns";
import { Activity, ExternalLink, GitBranch, Github } from "lucide-react";
import Link from "next/link";

import OAuthButton from "@/components/auth/OAuthButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useGitHubDialog } from "../hooks/useGitHubDialog";
import { useProjectActivity } from "../hooks/useProjectActivity";
import { RecentActivityCardProps } from "../types/types";

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

  const shouldFetchActivity = !!(
    projectId &&
    isRepositoryConnected &&
    hasAccess &&
    session
  );

  const {
    data: activities,
    isLoading,
    isError,
    error,
  } = useProjectActivity(projectId!, shouldFetchActivity);

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
          {isRepositoryConnected &&
            githubConnection?.githubRepoUrl &&
            session && (
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
                You need to be a collaborator to view this project&apos;s
                activity.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {isLoading && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-3 w-[200px]" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-3 w-[200px]" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-3 w-[200px]" />
                    </div>
                  </div>
                </div>
              )}
              {isError && (
                <div className="text-center text-sm text-destructive py-8">
                  {error?.message.includes("Repository not found") ? (
                    <>
                      <p>Repository not found on GitHub.</p>
                      <p className="text-xs text-muted-foreground">
                        It might have been deleted or permissions have changed.
                      </p>
                      {isOwner && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => openGitHubDialog()}
                          className="mt-2"
                        >
                          Connect a different repository
                        </Button>
                      )}
                    </>
                  ) : (
                    <>
                      <p>Could not load project activity.</p>
                      <p className="text-xs text-muted-foreground">
                        {error?.message}
                      </p>
                    </>
                  )}
                </div>
              )}
              {activities && activities.length > 0 && !isLoading && (
                <ul className="space-y-4">
                  {activities.map((activity) => (
                    <li key={activity.id} className="flex items-start gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage
                          src={activity.actorAvatarUrl || ""}
                          alt={activity.actorUsername}
                        />
                        <AvatarFallback>
                          {activity.actorUsername.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-sm pt-1">
                        <p className="leading-tight">
                          <span className="font-semibold">
                            {activity.actorUsername}
                          </span>{" "}
                          <Link
                            href={activity.targetUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {activity.summary}
                          </Link>
                        </p>
                        {activity.branch && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
                            <GitBranch size={12} />
                            <span>{activity.branch}</span>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground pt-1">
                          {formatDistanceToNow(new Date(activity.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {activities?.length === 0 && !isLoading && !isError && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No recent repository activity to display.
                  </p>
                </div>
              )}
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
