"use client";

import { Clock, GitBranch, Users, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/ui/loading-context";

import { EditProjectNameField } from "@@/projects/[projectId]/edit/components/EditProjectNameField";
import { ProjectHeaderProps } from "@@/projects/types/types";

export function EditProjectHeader({
  memberCount,
  projectId,
  createdAt,
  isOwner,
}: Omit<ProjectHeaderProps, "projectName">) {
  const { showLoading } = useLoading();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <div className="mb-2">
          <EditProjectNameField />
        </div>
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
      </div>
      {isOwner && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <GitBranch className="mr-2 h-4 w-4" />
            Connect GitHub
          </Button>
          <Link
            href={`/projects/${projectId}`}
            onClick={() => showLoading("Discarding changes...")}
          >
            <Button variant="outline" size="sm" className="gap-1">
              <X className="mr-2 h-4 w-4" />
              Discard Changes
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
