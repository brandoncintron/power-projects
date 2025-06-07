"use client";

import { Activity, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import OAuthButton from "@/components/auth/OAuthButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";

import {
  GitHubEventsRealtimeUpdater,
  useGitHubEvents,
} from "../hooks/useGitHubEvents";
import { RecentActivityCardProps } from "../types/types";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { getActivityIcon } from "../utils/getActivityIcon";

/* Recent Activity Card - Displays the most recent project activities */
export function RecentActivityCard({
  projectId,
  githubConnection,
  session,
}: RecentActivityCardProps) {
  const isGitHubConnected =
    githubConnection?.githubRepoUrl && githubConnection?.githubRepoName;

  const {
    data: githubData,
    isPending,
    error,
    isFetching,
  } = useGitHubEvents({
    projectId,
    enabled: !!isGitHubConnected && !!projectId && !!session,
  });

  const githubActivities = githubData?.activities || [];

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity size={18} />
              Recent Activity
              {isGitHubConnected && (
                <Github size={14} className="text-muted-foreground" />
              )}
              {isFetching && !isPending && (
                <div className="text-xs text-muted-foreground ml-2">
                  Updating...
                </div>
              )}
            </div>
            {isGitHubConnected &&
              githubConnection?.githubRepoUrl &&
              session && (
                <Link
                  href={githubConnection.githubRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                  >
                    View on GitHub <ExternalLink size={12} className="ml-1" />
                  </Button>
                </Link>
              )}
          </CardTitle>
        </CardHeader>

        {session ? (
          <CardContent>
            <GitHubEventsRealtimeUpdater projectId={projectId} />
            {!isGitHubConnected ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Connect a GitHub repository to view activity.
                </p>
              </div>
            ) : isPending ? (
              <div className="flex items-center justify-center py-8">
                <LoadingSpinner text="Loading GitHub activity" />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                <p>{error.message}</p>
              </div>
            ) : githubActivities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No recent activity found.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {githubActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-3 border-b last:border-0"
                  >
                    {activity.user.avatar ? (
                      <Image
                        height={24}
                        width={24}
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="w-6 h-6 rounded-full mt-1"
                      />
                    ) : (
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-medium">
                          {activity.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-muted-foreground mt-1 flex-1">
                          {activity.content}
                        </p>
                        {activity.url && (
                          <Link
                            href={activity.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 mt-1"
                          >
                            <ExternalLink
                              size={12}
                              className="text-muted-foreground hover:text-primary"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                  <OAuthButton callbackUrl={`/projects/${projectId}`}/>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
  );
}
