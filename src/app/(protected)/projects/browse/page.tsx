import React from "react";

import { auth } from "@/auth";
import { ProjectVisibility } from "@prisma/client";
import Link from "next/link";

import { HideLoading } from "@/components/HideLoading";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

import FilteredProjectList from "./components/FilteredProjectList";
import { ProjectWithDetails } from "./types/types";

export default async function BrowseProjectsListPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let projects: ProjectWithDetails[] = [];
  let fetchError = null;
  let dynamicFilterTags: string[] = ["All"];
  let userApplications: string[] = [];
  let userCollaborations: string[] = [];

  try {
    // Fetch public projects sorted by creation date
    projects = (await db.project.findMany({
      where: {
        visibility: ProjectVisibility.PUBLIC,
      },
      include: {
        owner: { select: { username: true } },
        _count: {
          select: {
            collaborators: true,
            applicants: {
              where: {
                status: "pending",
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })) as ProjectWithDetails[];

    // If user is logged in, fetch their applications to other projects
    if (userId) {
      const applications = await db.projectApplication.findMany({
        where: { userId },
        select: { projectId: true },
      });
      userApplications = applications.map((app) => app.projectId);

      // Fetch projects where the user is a collaborator
      const collaborations = await db.projectCollaborator.findMany({
        where: { userId },
        select: { projectId: true },
      });
      userCollaborations = collaborations.map((collab) => collab.projectId);
    }

    // Extract unique application types for filter tags
    if (projects.length > 0) {
      const uniqueApplicationTypes = Array.from(
        new Set(projects.map((p) => p.applicationType)),
      ).sort();
      dynamicFilterTags = ["All", ...uniqueApplicationTypes];
    }
  } catch (error) {
    console.error("Failed to fetch public projects:", error);
    fetchError =
      "Could not load projects at this time. Please try again later.";
  }

  return (
    <div className="min-h-screen">
      <HideLoading />
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">Browse Projects</h1>
          {/* Create project button */}
          {session && (
            <Button
              asChild
              className="w-full md:w-auto shadow-md transition-all hover:shadow-lg"
            >
              <Link href="/create-project">Create a project</Link>
            </Button>
          )}
        </div>

        {fetchError && (
          <div className="text-center py-10 text-destructive bg-destructive/5 dark:bg-destructive/10 rounded-lg shadow-sm border border-destructive/20">
            <p>{fetchError}</p>
          </div>
        )}

        {/* Display the list of projects as a FilteredProjectList */}
        {!fetchError && (
          <FilteredProjectList
            projects={projects}
            filterTags={dynamicFilterTags}
            userApplications={userApplications}
            userCollaborations={userCollaborations}
            userId={userId}
            session={session}
          />
        )}
      </main>
    </div>
  );
}
