import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProjectVisibility } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { HideLoading } from "@/components/HideLoading";
import FilteredProjectList from "./components/FilteredProjectList";
import { ProjectWithDetails } from "./components/ProjectListItem";
import { auth } from "@/auth";

export default async function BrowseProjectsListPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let projects: ProjectWithDetails[] = [];
  let fetchError = null;
  let dynamicFilterTags: string[] = ["All"];
  let userApplications: string[] = [];

  try {
    // Fetch public projects sorted by creation date
    projects = (await db.project.findMany({
      where: {
        visibility: ProjectVisibility.PUBLIC,
      },
      include: {
        owner: { select: { username: true } },
        _count: { select: { collaborators: true, applicants: true } },
      },
      orderBy: { createdAt: "desc" },
    })) as ProjectWithDetails[];

    // If user is logged in, fetch their applications to other projects
    if (userId) {
      const applications = await db.projectApplication.findMany({
        where: { userId },
        select: { projectId: true }
      });
      userApplications = applications.map(app => app.projectId);
    }

    // Extract unique application types for filter tags
    if (projects.length > 0) {
      const uniqueApplicationTypes = Array.from(
        new Set(projects.map((p) => p.applicationType))
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
          <div className="text-center py-10 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-sm border border-red-200 dark:border-red-800/30">
            <p>{fetchError}</p>
          </div>
        )}

        {/* Display the list of projects as a FilteredProjectList */}
        {!fetchError && (
          <FilteredProjectList
            projects={projects}
            filterTags={dynamicFilterTags}
            userApplications={userApplications}
            userId={userId}
          />
        )}
      </main>
    </div>
  );
}
