"use client";

import { Button } from "@/components/ui/button";
import { GitBranch, Settings, Users, Clock } from "lucide-react";

interface ProjectHeaderProps {
  projectName: string;
  memberCount: number;
  createdAt: Date;
  isOwner: boolean;
}

/* Project Header - Displays project title, metadata and owner actions */
export function ProjectHeader({
  projectName,
  memberCount,
  createdAt,
  isOwner,
}: ProjectHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
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
      </div>
      {isOwner && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <GitBranch className="mr-2 h-4 w-4" />
            Connect GitHub
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      )}
    </div>
  );
} 