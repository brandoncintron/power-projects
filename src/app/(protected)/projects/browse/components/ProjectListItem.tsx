import React from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { FileCode2, Users, Clock } from 'lucide-react';
import { Project } from '@prisma/client';

// Define the structure of the project data we expect after including owner and collaborator count
export interface ProjectWithDetails extends Project {
  owner: {
    username: string | null;
  } | null;
  _count: { // Include count of collaborators
    collaborators: number;
  };
}

// Utility function for formatting relative time
export function formatRelativeTime(date: Date | null | undefined): string {
  if (!date) return '';
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 30) {
    return `>30d ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays}d ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours}h ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}m ago`;
  } else {
    return `Just now`;
  }
}

export default function ProjectListItem({ project }: { project: ProjectWithDetails }) {
  const isOpen = true; // Placeholder
  const statusLabel = isOpen ? "Open" : "Closed";
  const statusVariant: "default" | "destructive" = isOpen ? "default" : "destructive";
  const memberCount = (project._count?.collaborators ?? 0) + 1;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-150">
      {/* Top Row: Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <Badge variant={statusVariant} className="whitespace-nowrap">
          {statusLabel} Applications
        </Badge>
        <Badge variant="secondary" className="whitespace-nowrap flex items-center gap-1">
           <FileCode2 size={12} /> {project.applicationType}
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap flex items-center gap-1">
           <Users size={12} /> {memberCount} Members
        </Badge>
      </div>
      {/* Middle Row: Title & Creator */}
      <h2 className="text-lg font-semibol mb-1">{project.projectName}</h2>
      <p className="text-sm mb-2">
        by {project.owner?.username || 'Unknown User'}
      </p>
      {/* Description */}
      <p className="text-sm line-clamp-2 mb-3">{project.description}</p>
      {/* Bottom Row: Relative Date */}
      <div className="flex items-center text-xs gap-1">
        <Clock size={12} />
        <span>{formatRelativeTime(project.createdAt)}</span>
      </div>
       {/* Link overlay */}
       <Link href={`/projects/${project.id}`} className="absolute inset-0 rounded-lg" aria-label={`View details for ${project.projectName}`}></Link>
    </div>
  );
} 