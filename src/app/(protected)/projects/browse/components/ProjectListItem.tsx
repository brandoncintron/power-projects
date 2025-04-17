"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/ui/loading-context";
import { FileCode2, Users, Clock, Loader } from "lucide-react";
import { Project } from "@prisma/client";
import { getTechnologyIcon, getDatabaseIcon } from "@/lib/language-icons";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { handleProjectApplication } from "../actions";
import { toast } from "sonner";

// Extends base Project type with additional fields needed for the list item display
export interface ProjectWithDetails extends Project {
  owner: {
    username: string | null;
  } | null;
  _count: {
    collaborators: number;
    applicants: number;
  };
  frameworks: string[];
  databases: string[];
  status: "OPEN" | "CLOSED";
}

export default function ProjectListItem({
  project,
  hasApplied = false,
  userId,
}: {
  project: ProjectWithDetails;
  hasApplied?: boolean;
  userId?: string;
}) {
  // Project status management
  const isOpen = project.status === "OPEN";
  const statusLabel = isOpen ? "Open" : "Closed";

  // Calculate member statistics for display
  const memberCount = (project._count?.collaborators ?? 0) + 1;
  const maxMembers = 5; // Placeholder for max team size
  const remainingSlots = Math.max(0, maxMembers - memberCount);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showLoading } = useLoading();
  // Check if user is the owner of the project
  const isOwner = userId && project.ownerId === userId;

  const onSubmit = async (projectId: string) => {
    startTransition(() => {
      // debug - console.log(`project id sent to handleProjectApplication: ${projectId}`)
      handleProjectApplication(projectId).then((data) => {
        if (data?.error) {
          toast.error(data.error);
        } else {
          toast.success("Application submitted successfully.");
          router.refresh();
        }
      });
    });
  };

  return (
    <div className="relative border rounded-lg p-6 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 shadow-md hover:translate-y-[-2px] bg-card">
      {/* Badges Section */}
      <div className="flex flex-wrap items-center gap-2 text-sm cursor-default">
          <Badge
            variant={isOpen ? "default" : "destructive"}
            className={`whitespace-nowrap ${
              isOpen
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-900/60"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800/40 hover:bg-red-100/80 dark:hover:bg-red-900/60"
            }`}
          >
            {statusLabel} Applications
          </Badge>
          <Badge
            variant="outline"
            className="whitespace-nowrap flex items-center gap-1.5"
          >
            <FileCode2 className="size-3.5" />
            <span>{project.applicationType}</span>
          </Badge>
          {project.frameworks?.map((fw) => (
            <Badge
              key={fw}
              variant="secondary"
              className="whitespace-nowrap flex items-center gap-1.5"
            >
              <div className="flex size-5 shrink-0 items-center justify-center">
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
              className="whitespace-nowrap flex items-center gap-1.5"
            >
              <div className="flex size-5 shrink-0 items-center justify-center">
                {getDatabaseIcon(db)}
              </div>
              <span>{db}</span>
            </Badge>
          ))}
        </div>

      {/* Project details section */}
      <div>
        <h2 className="text-xl font-bold mb-1">{project.projectName}</h2>
        <p className="text-base mb-3">
          by {project.owner?.username || "Unknown User"}
        </p>
        <p className="text-base line-clamp-3">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Member status and creation date */}
      <div className="flex items-center justify-between text-sm mt-auto pt-2">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(memberCount, 3) }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-1 flex items-center justify-center"
              >
                <Users size={16} />
              </div>
            ))}
            {memberCount > 3 && (
              <div className="w-8 h-8 rounded-full border-1 flex items-center justify-center text-xs font-medium">
                +{memberCount - 3}
              </div>
            )}
          </div>

          {isOpen ? (
            remainingSlots > 0 ? (
              <span className="text-sm font-medium">
                {remainingSlots} {remainingSlots === 1 ? "spot" : "spots"}{" "}
                available
              </span>
            ) : (
              <span className="text-sm font-medium">Team is full</span>
            )
          ) : (
            <span className="text-sm font-medium">No spots available</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 pt-3 border-t">
        <div className="flex items-center gap-3">
          {isOpen && !isOwner && (
            <>
              {hasApplied ? (
                <Button size="sm" variant="outline" disabled className="text-teal-600 dark:text-teal-400 border-slate-300 dark:border-slate-600">
                  Already Applied
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => onSubmit(project.id)}
                  
                >
                  {isPending && <Loader className="mr-2 size-4 animate-spin" />}
                  Apply Now
                </Button>
              )}
            </>
          )}
          {!isOpen && (
            <Button size="sm" variant="outline" disabled className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700/50 opacity-80">
              Applications Closed
            </Button>
          )}

          <Link href={`/projects/${project.id}`} passHref legacyBehavior>
            <Button asChild size="sm" variant="default">
              <a
                onClick={() => {
                  showLoading("Loading project details...");
                }}
              >
                View Details
              </a>
            </Button>
          </Link>
        </div>
        <span className="text-sm font-medium mt-2 sm:mt-0">
          {project._count.applicants} Applicants
        </span>
      </div>
    </div>
  );
}
