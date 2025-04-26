"use client";

import { Users, ArrowRight, Merge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./ProjectCard";
import { DashboardProject } from "../DashboardTypes";
import Link from "next/link";
import { useLoading } from "@/components/ui/loading-context";

interface CollaborationsSectionProps {
  collaborations: DashboardProject[];
}

export function CollaborationsSection({ collaborations }: CollaborationsSectionProps) {
  const { showLoading } = useLoading();
  
  // Limit displayed collaborations to 3
  const displayedCollaborations = collaborations.slice(0, 3);
  const hasMoreCollaborations = collaborations.length > 3;
  const hasCollaborations = collaborations.length > 0;
  
  return (
    <section className="space-y-3 h-full flex flex-col">
      <div className="flex flex-row items-center justify-between gap-2">
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          Joined Projects
        </h2>
        {hasCollaborations && (
          <Link href="/projects/my-projects" className="inline-flex">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs px-3 w-fit"
              onClick={() => showLoading("Loading project browser...")}
            >
              <Users className="h-4 w-4" />
              View All
            </Button>
          </Link>
        )}
      </div>

      {!hasCollaborations ? (
        <div className="flex flex-col items-center justify-center flex-grow py-6 mx-auto md:w-[80%] w-full rounded-4xl bg-blue-200 dark:border dark:border-dashed dark:border-blue-500 dark:bg-blue-900">
          <p className="text-muted-foreground mb-4 text-sm text-center px-4">
            You&apos;re not collaborating on any projects yet.
          </p>
          <Link href="/projects/browse" className="w-fit">
            <Button 
              variant="default" 
              size="sm"
              onClick={() => showLoading("Loading project browser...")}
            >
              <Merge className="h-2 w-2" />
              Start Collaborating
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-1">
            {displayedCollaborations.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </div>
          
          {hasMoreCollaborations && (
            <div className="flex justify-center mt-2">
              <Link href="/projects/my-projects">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-3 flex items-center gap-1"
                  onClick={() => showLoading("Loading all collaborations...")}
                >
                  View all collaborations
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