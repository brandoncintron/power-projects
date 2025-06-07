"use client";

import React from "react";

import { CheckCircle, Clock, FileCode2, Loader, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/ui/loading-context";
import { getDatabaseIcon, getTechnologyIcon } from "@/lib/language-icons";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

import { useProjectApplication } from "@@/projects/browse/hooks/useProjectApplication";
import { ProjectListItemProps } from "../types/types";

export default function ProjectListItem({
  project,
  hasApplied = false,
  isCollaborator = false,
  userId,
  session,
}: ProjectListItemProps) {
  // Project status management
  const isProjectOpen = project.status === "OPEN";
  const statusLabel = isProjectOpen ? "Open" : "Closed";

  // Calculate member statistics for display
  const memberCount = (project._count?.collaborators ?? 0) + 1;

  const {
    hasApplied: applicationSubmitted,
    isLoading: isSubmittingApplication,
    submitApplication,
  } = useProjectApplication(hasApplied);
  const { showLoading } = useLoading();

  // Check if user is the owner of the project
  const isOwner = userId && project.ownerId === userId;

  // Use either the local state or prop to determine the UI
  const showAppliedState = applicationSubmitted || hasApplied;

  return (
    <div
      className={`relative rounded-3xl p-4 hover:shadow-md transition-all duration-300 flex flex-col gap-2.5 hover:translate-y-[-1px] bg-card w-full
      ${isCollaborator ? "border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-200 dark:ring-emerald-900" : "border"}
    `}
    >
      {/* Collaboration Badge */}
      {isCollaborator && (
        <div className="absolute -top-2 -right-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full px-2 py-0.5 text-xs font-medium border border-emerald-200 dark:border-emerald-800 flex items-center gap-0.5">
          <CheckCircle size={12} />
          You&apos;re on this project
        </div>
      )}

      {/* Badges Section */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs cursor-default">
        <Badge
          variant={isProjectOpen ? "default" : "destructive"}
          className={`whitespace-nowrap text-xs px-2 py-0.5 ${
            isProjectOpen
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800/40 hover:bg-red-100/80 dark:hover:bg-red-900/60"
          }`}
        >
          {statusLabel} Applications
        </Badge>
        <Badge
          variant="outline"
          className="whitespace-nowrap flex items-center gap-1 text-xs px-2 py-0.5"
        >
          <FileCode2 className="size-3" />
          <span>{project.applicationType}</span>
        </Badge>
        {project.frameworks?.map((fw) => (
          <Badge
            key={fw}
            variant="secondary"
            className="whitespace-nowrap flex items-center gap-1 text-xs px-2 py-0.5"
          >
            <div className="flex size-4 shrink-0 items-center justify-center">
              {getTechnologyIcon(fw.toLowerCase())}
            </div>
            <span>
              {fw.charAt(0).toUpperCase() + fw.slice(1).toLowerCase()}
            </span>
          </Badge>
        ))}
        {project.databases?.map((db) => (
          <Badge
            key={db}
            variant="secondary"
            className="whitespace-nowrap flex items-center gap-1 text-xs px-2 py-0.5"
          >
            <div className="flex size-4 shrink-0 items-center justify-center">
              {getDatabaseIcon(db)}
            </div>
            <span>{db}</span>
          </Badge>
        ))}
      </div>

      {/* Project details section */}
      <div className="mt-1">
        <h2 className="text-lg font-bold mb-0.5">{project.projectName}</h2>
        <p className="text-sm mb-1.5 text-muted-foreground">
          by {project.owner?.username || "Unknown User"}
        </p>
        <p className="text-sm line-clamp-2">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Member status and creation date */}
      <div className="flex items-center justify-between text-xs mt-auto pt-1">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {Array.from({ length: Math.min(memberCount, 3) }).map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-1 flex items-center justify-center bg-muted/30"
              >
                <Users size={14} />
              </div>
            ))}
            {memberCount > 3 && (
              <div className="w-6 h-6 rounded-full border-1 flex items-center justify-center text-xs font-medium bg-muted/30">
                +{memberCount - 3}
              </div>
            )}
          </div>

          <span className="text-xs font-medium">
            {memberCount} {memberCount === 1 ? "member" : "members"}
          </span>
        </div>

        <div className="flex items-center gap-0.5 text-muted-foreground">
          <Clock size={12} />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          {isProjectOpen && !isOwner && !isCollaborator && session && (
            <>
              {showAppliedState ? (
                <Button
                  size="sm"
                  variant="outline"
                  disabled
                  className="text-teal-600 dark:text-teal-400 border-slate-300 dark:border-slate-600 h-7 text-xs px-2.5"
                >
                  Already Applied
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isSubmittingApplication}
                  onClick={() => submitApplication(project.id)}
                  className="h-7 text-xs px-2.5"
                >
                  {isSubmittingApplication && (
                    <Loader className="mr-1.5 size-3 animate-spin" />
                  )}
                  Apply Now
                </Button>
              )}
            </>
          )}
          {!isProjectOpen && !isCollaborator && (
            <Button
              size="sm"
              variant="outline"
              disabled
              className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700/50 opacity-80 h-7 text-xs px-2.5"
            >
              Applications Closed
            </Button>
          )}

          <Link href={`/projects/${project.id}`} passHref legacyBehavior>
            <Button
              asChild
              size="sm"
              variant="default"
              className="h-7 text-xs px-2.5"
            >
              <a
                onClick={() => {
                  showLoading("Loading project details...");
                }}
              >
                View Project
              </a>
            </Button>
          </Link>
        </div>
        <span className="text-xs font-medium mt-1 sm:mt-0 text-muted-foreground">
          {project._count.applicants} Applicants
        </span>
      </div>
    </div>
  );
}
