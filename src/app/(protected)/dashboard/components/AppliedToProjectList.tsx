"use client";

import { Clock, Compass } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useLoading } from "@/components/ui/loading-context";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ApplicationCard } from "@@/dashboard/components/ApplicationCard";
import { AppliedToProjectListProps } from "@@/dashboard/types/types";

/* Project List - Renders list of pending applications in a scrollable area */
export function AppliedToProjectList({ projects }: AppliedToProjectListProps) {
  const { showLoading } = useLoading();

  // Filter for only pending applications
  const pendingApplications = projects.filter(
    (project) => project.applicationStatus?.toLowerCase() === "pending",
  );

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
              className="text-xs sm:text-xs w-fit"
              onClick={() => showLoading("Loading project browser...")}
            >
              <Compass className="h-4 w-4 mr-1" />
              Browse Projects
            </Button>
          </Link>
        )}
      </div>

      {!hasPendingApplications ? (
        <div className="flex flex-col items-center justify-center flex-grow py-6 mx-auto md:w-[80%] w-full rounded-4xl bg-yellow-100 dark:border dark:border-dashed dark:border-yellow-500 dark:bg-yellow-900">
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
              className="text-xs sm:text-xs w-fit"
            >
              <Compass className="h-4 w-4 mr-2" />
              Browse Projects
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
            <ScrollArea className="h-[180px] md:h-[210px] xl:h-[190px]">
              <div className="divide-y">
                {pendingApplications.map((project) => (
                  <ApplicationCard key={project.id} project={project} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}
    </section>
  );
}
