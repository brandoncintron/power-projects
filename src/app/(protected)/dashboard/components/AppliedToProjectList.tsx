"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";
import { useLoading } from "@/components/ui/loading-context";
import { AppliedToProjectListProps } from "../DashboardTypes";

/* Project List - Renders grid of project cards or empty state placeholder */
export function AppliedToProjectList({ projects }: AppliedToProjectListProps) {
  const { showLoading } = useLoading();
  
  // Filter for only pending applications
  const pendingApplications = projects.filter(
    project => project.applicationStatus?.toLowerCase() === 'pending'
  );
  
  // Show empty state if no projects or no pending applications
  if (pendingApplications.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            {projects.length === 0 
              ? "You haven't applied to any projects yet." 
              : "You don't have any pending applications."}
          </p>
          <Link 
            href="/projects/browse" 
            onClick={() => {showLoading("Loading project browser...");}} 
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Browse and apply for projects
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pendingApplications.map((project) => (
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