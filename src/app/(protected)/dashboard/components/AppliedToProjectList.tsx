"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from '@prisma/client';
import { ProjectCard } from "./ProjectCard";
import { useLoading } from "@/components/ui/loading-context";

interface ProjectWithApplicationStatus extends Project {
  applicationStatus?: string;
}

interface AppliedToProjectListProps {
  projects: ProjectWithApplicationStatus[];
}

/* Project List - Renders grid of project cards or empty state placeholder */
export function AppliedToProjectList({ projects }: AppliedToProjectListProps) {
  const { showLoading } = useLoading();
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">You haven&apos;t applied to any projects yet.</p>
          <Link href="/projects/browse" onClick={() => {showLoading("Loading project browser...");}} className="text-blue-600 hover:underline mt-2 inline-block">
            Browse and apply for projects
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          applicationStatus={project.applicationStatus} 
          isApplication={true}
        />
      ))}
    </div>
  );
} 