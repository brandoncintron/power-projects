import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { ProjectVisibility } from "@prisma/client";
import { Button } from "@/components/ui/button";
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
      <main className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">Browse Projects</h1>
          {/* Create project button */}
          {session && (
            <Button
              asChild
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/create-project">Create a project</Link>
            </Button>
          )}
        </div>

        {fetchError && (
          <div className="text-center py-10 text-red-600 bg-red-50 rounded-md">
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
