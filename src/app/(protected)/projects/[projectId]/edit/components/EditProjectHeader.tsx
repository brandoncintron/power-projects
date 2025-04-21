"use client";

import { Button } from "@/components/ui/button";
import { GitBranch, Users, Clock, X } from "lucide-react";
import Link from "next/link";
import { EditProjectNameField } from "./EditProjectNameField";

interface EditProjectHeaderProps {
  projectName: string;
  memberCount: number;
  projectId: string;
  createdAt: Date;
  isOwner: boolean;
}

export function EditProjectHeader({
  memberCount,
  projectId,
  createdAt,
  isOwner,
}: Omit<EditProjectHeaderProps, 'projectName'>) {
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
          <Link href={`/projects/${projectId}`}>
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