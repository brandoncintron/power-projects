"use client";

import Link from "next/link";
import { useLoading } from "@/components/ui/loading-context";
import { AppliedToProjectListProps } from "../DashboardTypes";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, Compass } from "lucide-react";
import { ApplicationCard } from "./ApplicationCard";

/* Project List - Renders grid of pending applications */
export function AppliedToProjectList({ projects }: AppliedToProjectListProps) {
  const { showLoading } = useLoading();
  
  // Filter for only pending applications
  const pendingApplications = projects.filter(
    project => project.applicationStatus?.toLowerCase() === 'pending'
  );
  
  // Limit displayed applications to 2
  const displayedApplications = pendingApplications.slice(0, 2);
  const hasMoreApplications = pendingApplications.length > 2;
  const hasPendingApplications = pendingApplications.length > 0;
  
  return (
    <section className="space-y-3 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          Pending Applications
        </h2>
        {hasPendingApplications && (
          <Link href="/projects/browse" className="inline-flex">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs px-3 w-full lg:w-auto"
              onClick={() => showLoading("Loading project browser...")}
            >
              <Compass className="h-4 w-4" />
              Browse More Projects
            </Button>
          </Link>
        )}
      </div>

      {!hasPendingApplications ? (
        <div className="flex flex-col items-center justify-center flex-grow py-6 mx-auto md:w-[80%] w-full rounded-lg bg-orange-100">
          <p className="text-muted-foreground mb-4 text-sm text-center px-4">
            {projects.length === 0 
              ? "You haven't applied to any projects yet." 
              : "You don't have any pending applications."}
          </p>
          <Link 
            href="/projects/browse" 
            onClick={() => showLoading("Loading project browser...")}
            className="w-fit" 
          >
            <Button 
              variant="default" 
              size="sm"
              className="break-all"
            >
              <Compass className="h-4 w-4" />
              Browse Projects
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            {displayedApplications.map((project) => (
              <ApplicationCard key={project.id} project={project} />
            ))}
          </div>
          
          {hasMoreApplications && (
            <div className="flex justify-center mt-2">
              <Link href="/my-applications">
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