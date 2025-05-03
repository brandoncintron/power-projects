"use client";

import { ArrowRight, FileCode2, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/ui/loading-context";

import { ProjectCard } from "@@/dashboard/components/ProjectCard";
import { useDisplayCount } from "@@/dashboard/hooks/useDisplayCount";
import { ProjectListProps } from "@@/dashboard/types/types";

/* Project List - Renders grid of project cards or empty state placeholder */
export function ProjectList({ projects }: ProjectListProps) {
  const { showLoading } = useLoading();
  const displayCount = useDisplayCount();

  // Limit displayed projects based on screen size
  const displayedProjects = projects.slice(0, displayCount);
  const hasMoreProjects = projects.length > displayCount;
  const hasProjects = projects.length > 0;

  return (
    <section className="space-y-3 h-full flex flex-col">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 ">
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-1.5">
          <FileCode2 className="h-4 w-4" />
          Your Projects
        </h2>
        {hasProjects && (
          <Link href="/create-project" className="inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-xs w-fit"
              onClick={() => showLoading("Loading project creation form...")}
            >
              <Plus className="h-4 w-4" />
              Create New Project
            </Button>
          </Link>
        )}
      </div>

      {!hasProjects ? (
        <div className="flex flex-col items-center justify-center flex-grow py-6 mx-auto md:w-[80%] w-full rounded-4xl bg-green-200 dark:border dark:border-dashed dark:border-green-500 dark:bg-green-900">
          <p className="text-muted-foreground mb-4 text-sm text-center px-4">
            You haven&apos;t created any projects yet.
          </p>
          <Link href="/create-project" className="w-fit">
            <Button
              variant="default"
              size="sm"
              className="text-xs sm:text-xs w-fit"
              onClick={() => showLoading("Loading project creation form...")}
            >
              <Plus className="h-4 w-4" />
              Create a Project
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3 ">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {hasMoreProjects && (
            <div className="flex justify-center mt-2 ">
              <Link href="/projects/my-projects">
                <Button
                  variant="outline"
                  size="md"
                  className="h-8 text-xs px-3 flex items-center gap-1"
                  onClick={() => showLoading("Loading all projects...")}
                >
                  View all projects
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
