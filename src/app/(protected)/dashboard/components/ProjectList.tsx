"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCode2 } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { DashboardProject } from "../DashboardTypes";
import { useLoading } from "@/components/ui/loading-context";

interface ProjectListProps {
  projects: DashboardProject[];
}

/* Project List - Renders grid of project cards or empty state placeholder */
export function ProjectList({ projects }: ProjectListProps) {
  const { showLoading } = useLoading();
  
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-1.5">
          <FileCode2 className="h-4 w-4" />
          My Projects
        </h2>
        <Link href="/create-project">
          <Button 
            variant="default" 
            size="sm" 
            className="h-7 text-xs px-3"
            onClick={() => showLoading("Loading project creation form...")}
          >
            Create New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center flex flex-col items-center">
            <p className="text-muted-foreground mb-2 text-sm">
              You haven&apos;t created any projects yet.
            </p>
            <Link href="/create-project">
              <Button 
                variant="default" 
                size="sm" 
                className="h-7 text-xs px-3"
                onClick={() => showLoading("Loading project creation form...")}
              >
                Create Your First Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isApplication={false}
            />
          ))}
        </div>
      )}
    </section>
  );
} 