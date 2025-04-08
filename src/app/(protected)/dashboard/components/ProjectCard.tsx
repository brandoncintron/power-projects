"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCode2, Users, Clock } from 'lucide-react';
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { Project } from '@prisma/client';

interface ProjectCardProps {
  project: Project & {
    _count?: {
      collaborators: number;
    };
  };
}

/* Project Card - Displays individual project summary with metadata */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card key={project.id} className="relative">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <Badge variant="secondary" className="whitespace-nowrap flex items-center gap-1">
            <FileCode2 size={12} /> {project.applicationType}
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap flex items-center gap-1">
            <Users size={12} /> {(project._count?.collaborators ?? 0) + 1} Members
          </Badge>
          <Badge variant="outline" className="whitespace-nowrap flex items-center gap-1">
            <Users size={12} /> {project.visibility.charAt(0).toUpperCase() + project.visibility.slice(1).toLowerCase()}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold mb-1">{project.projectName}</h3>
        <p className="text-sm line-clamp-2 mb-2">{project.description}</p>
        <div className="flex items-center text-xs gap-1 text-muted-foreground">
          <Clock size={12} />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>
        <Link href={`/projects/${project.id}`} className="absolute inset-0 rounded-lg" aria-label={`View details for ${project.projectName}`}></Link>
      </CardContent>
    </Card>
  );
} 