"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "./ProjectCard";
import { useLoading } from "@/components/ui/loading-context";
import { AppliedToProjectListProps } from "../DashboardTypes";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

/* Project List - Renders grid of pending applications */
export function AppliedToProjectList({ projects }: AppliedToProjectListProps) {
  const { showLoading } = useLoading();
  
  // Filter for only pending applications
  const pendingApplications = projects.filter(
    project => project.applicationStatus?.toLowerCase() === 'pending'
  );
  
  // Limit displayed applications to 3
  const displayedApplications = pendingApplications.slice(0, 3);
  const hasMoreApplications = pendingApplications.length > 3;
  
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          Pending Applications
        </h2>
        <Link href="/projects/browse">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs px-3"
            onClick={() => showLoading("Loading project browser...")}
          >
            Browse Projects
          </Button>
        </Link>
      </div>

      {pendingApplications.length === 0 ? (
        <Card>
          <CardContent className="p-4 text-center flex flex-col items-center">
            <p className="text-muted-foreground mb-2 text-sm">
              {projects.length === 0 
                ? "You haven't applied to any projects yet." 
                : "You don't have any pending applications."}
            </p>
            <Link 
              href="/projects/browse" 
              onClick={() => showLoading("Loading project browser...")} 
            >
              <Button 
                variant="default" 
                size="sm" 
                className="h-7 text-xs px-3"
              >
                Browse and Apply for Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayedApplications.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                applicationStatus={project.applicationStatus} 
                isApplication={true}
              />
            ))}
          </div>
          
          {hasMoreApplications && (
            <div className="flex justify-center mt-4">
              <Link href="/projects/browse?tab=applications">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-3 flex items-center gap-1"
                  onClick={() => showLoading("Loading all applications...")}
                >
                  View all applications
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
} 