/**
 * @file This component displays project activity, with real-time updates from GitHub.
 *
 * It features:
 * - SSE-powered real-time updates for new GitHub activities.
 * - A clean, paginated view of the 50 most recent events.
 * - The ability to connect a GitHub repository if one is not already linked.
 * - A manual refresh option and connection status indicators for the real-time feed.
 */
"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  ExternalLink,
  GitBranch,
  Github,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import OAuthButton from "@/components/auth/OAuthButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGitHubDialog } from "../hooks/useGitHubDialog";
import { useSSEProjectActivity } from "../hooks/useSSEProjectActivity";
import { RecentActivityCardProps } from "../types/types";

/* Recent Activity Card - Displays the most recent project activities with real-time SSE updates */
export function RecentActivityCard({
  projectId,
  githubConnection,
  session,
  isCollaborator = false,
  isOwner = false,
}: RecentActivityCardProps) {
  const { open: openGitHubDialog } = useGitHubDialog();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    isConnected,
    refetch,
  } = useSSEProjectActivity(projectId!, shouldFetchActivity);

  const paginatedActivities = useMemo(() => {
    if (!activities) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    return activities.slice(startIndex, startIndex + itemsPerPage);
  }, [activities, currentPage]);

  const totalPages = activities ? Math.ceil(activities.length / itemsPerPage) : 0;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
            {shouldFetchActivity && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1">
                      {isConnected ? (
                        <Wifi size={12} className="text-green-500" />
                      ) : (
                        <WifiOff size={12} className="text-red-500" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isConnected
                        ? "Connected to real-time updates"
                        : "Disconnected from real-time updates"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center gap-2">
            {shouldFetchActivity && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => refetch()}
                      disabled={isLoading}
                    >
                      <RefreshCw
                        size={14}
                        className={isLoading ? "animate-spin" : ""}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh Activity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {isRepositoryConnected &&
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
          </div>
        </CardTitle>
      </CardHeader>

      {session ? (
        <CardContent>
          {!isRepositoryConnected ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">
                <button
                  onClick={() => openGitHubDialog()}
                  className="text-primary hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
                >
                  Connect a GitHub repository
                </button>{" "}
                to view activity.
              </div>
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
                  ) : error?.message.includes("SSE connection") ? (
                    <>
                      <p>Real-time connection lost.</p>
                      <p className="text-xs text-muted-foreground">
                        Trying to reconnect automatically...
                      </p>
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
              {paginatedActivities && paginatedActivities.length > 0 && !isLoading && (
                <ul className="space-y-4">
                  {paginatedActivities.map((activity) => (
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
                  {isConnected && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Connected to real-time updates - new activity will appear
                      automatically.
                    </p>
                  )}
                </div>
              )}
              {totalPages > 1 && (
                <div className="pt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                          }}
                          aria-disabled={currentPage === 1}
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : undefined
                          }
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(i + 1);
                            }}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                          }}
                          aria-disabled={currentPage === totalPages}
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : undefined
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
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
