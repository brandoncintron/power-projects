"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div className="relative border rounded-lg p-5 hover:shadow-lg transition-shadow duration-200 flex flex-col gap-3 bg-card">
      {/* Project metadata badges */}
      <div className="flex flex-wrap items-center gap-2 text-sm cursor-default">
        <Badge
          variant={isOpen ? "default" : "destructive"}
          className={`whitespace-nowrap ${
            isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {statusLabel} Applications
        </Badge>
        <Badge
          variant="outline"
          className="whitespace-nowrap flex items-center gap-1.5 dark:bg-gray-700/50"
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center">
            <FileCode2 size={14} />
          </div>
          <span>{project.applicationType}</span>
        </Badge>
        {project.frameworks?.map((fw) => (
          <Badge
            key={fw}
            variant="outline"
            className="whitespace-nowrap flex items-center gap-1.5 dark:bg-gray-700/50"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
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
            variant="outline"
            className="whitespace-nowrap flex items-center gap-1.5 dark:bg-gray-700/50"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              {getDatabaseIcon(db)}
            </div>
            <span>{db}</span>
          </Badge>
        ))}
      </div>

      {/* Project details section */}
      <div>
        <h2 className="text-xl font-semibold mb-1">{project.projectName}</h2>
        <p className="text-base text-muted-foreground mb-2">
          by {project.owner?.username || "Unknown User"}
        </p>
        <p className="text-base line-clamp-3">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Member status and creation date */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-2">
        <div className="flex items-center gap-2">
          <div>
            {Array.from({ length: Math.min(memberCount, 3) }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
              >
                <Users size={16} className="text-gray-600" />
              </div>
            ))}
            {memberCount > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                +{memberCount - 3}
              </div>
            )}
          </div>

          {isOpen ? (
            remainingSlots > 0 ? (
              <span className="text-sm text-gray-500">
                {remainingSlots} {remainingSlots === 1 ? "spot" : "spots"}{" "}
                available
              </span>
            ) : (
              <span className="text-sm text-gray-500">Team is full</span>
            )
          ) : (
            <span className="text-sm text-gray-500">No spots available</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 border-t pt-3">
        <div className="flex items-center gap-3">
          {isOpen && !isOwner && (
            <>
              {hasApplied ? (
                <Button size="sm" variant="outline" disabled>
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
            <Button size="sm" variant="outline" disabled>
              Applications Closed
            </Button>
          )}

          <Link href={`/projects/${project.id}`} passHref legacyBehavior>
            <Button asChild size="sm" variant="default">
              <a>View Details</a>
            </Button>
          </Link>
        </div>
        <span className="text-sm text-gray-500 mt-2 sm:mt-0">
          {project._count.applicants} Applicants
        </span>
      </div>
    </div>
  );
}
