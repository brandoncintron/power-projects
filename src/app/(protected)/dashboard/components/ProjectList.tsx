"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from '@prisma/client';
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  projects: (Project & {
    _count?: {
      collaborators: number;
    };
  })[];
}

/* Project List - Renders grid of project cards or empty state placeholder */
export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">You haven&apos;t created any projects yet.</p>
          <Link href="/create-project" className="text-blue-600 hover:underline mt-2 inline-block">
            Create your first project
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
} 