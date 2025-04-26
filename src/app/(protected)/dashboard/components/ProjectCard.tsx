"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCode2, Users, Clock, GlobeLock } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { Button } from "@/components/ui/button";
import { DashboardProject } from "../DashboardTypes";
import { useLoading } from "@/components/ui/loading-context";

interface ProjectCardProps {
  project: DashboardProject;
}

/* Project Card - Displays individual project summary with metadata */
export function ProjectCard({ project }: ProjectCardProps) {
  const { showLoading } = useLoading();
  const isPrivate = project.visibility.toLowerCase() === 'private';

  return (
    <Card className="overflow-hidden h-full rounded-4xl">
      <CardContent className="px-3 sm:px-4 flex flex-col h-full">
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <Badge
            variant="secondary"
            className="whitespace-nowrap flex items-center gap-1 text-xs py-0.5 px-1.5"
          >
            <FileCode2 size={10} /> {project.applicationType}
          </Badge>
          <Badge
            variant="outline"
            className="whitespace-nowrap flex items-center gap-1 text-xs py-0.5 px-1.5"
          >
            {isPrivate ? <GlobeLock size={10} /> : <Users size={10} />}
            {project.visibility.charAt(0).toUpperCase() +
              project.visibility.slice(1).toLowerCase()}
          </Badge>
        </div>
        
        <h3 className="font-medium md:line-clamp-3 text-sm sm:text-base mb-1.5">{project.projectName}</h3>
        <p className="text-xs line-clamp-2 mb-1.5">{project.description}</p>
        
        <div className="flex items-center text-xs gap-1 text-muted-foreground mb-3">
          <Clock size={12} className="mr-1" />
          <span>{formatRelativeTime(project.createdAt)}</span>
        </div>

        <div className="mt-auto flex items-center justify-start">
          <Link href={`/projects/${project.id}`} className="w-full sm:w-auto">
            <Button 
              size="sm"
              variant="default"
              className="text-xs sm:text-xs w-fit"
              onClick={() => showLoading("Loading project details...")}
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
