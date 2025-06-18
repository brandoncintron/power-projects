import React from "react";

import { auth } from "@/auth";
import { Plus } from "lucide-react";
import Link from "next/link";

import { HideLoading } from "@/components/HideLoading";
import { ShowToast } from "@/components/ShowToast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";

import ProjectGrid from "@@/projects/my-projects/components/ProjectGrid";
import ProjectStats from "@@/projects/my-projects/components/ProjectStats";
import { ProjectWithDetails } from "@@/projects/types/types";

export default async function MyProjectsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold mb-4">Sign in Required</h2>
          <p className="mb-6 text-muted-foreground">
            Please sign in to view and manage your projects.
          </p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </Card>
      </div>
    );
  }

  let projects: ProjectWithDetails[] = [];
  let fetchError = null;
  let dynamicFilterTags: string[] = ["All"];

  try {
    // Fetch only projects owned by the current user
    projects = (await db.project.findMany({
      where: {
        ownerId: userId,
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
        applicants: {
          where: {
            status: "pending",
          },
          select: {
            status: true,
          },
        },
      },

      orderBy: { createdAt: "desc" },
    })) as ProjectWithDetails[];

    // Post-process the projects to add missing fields
    projects = projects.map((project) => ({
      ...project,
      frameworks: project.frameworks || [],
      databases: project.databases || [],
    }));

    // Extract unique application types for filter tags
    if (projects.length > 0) {
      const uniqueApplicationTypes = Array.from(
        new Set(projects.map((p) => p.applicationType)),
      ).sort();
      dynamicFilterTags = ["All", ...uniqueApplicationTypes];
    }
  } catch (error) {
    console.error("Failed to fetch user projects:", error);
    fetchError =
      "Could not load your projects at this time. Please try again later.";
  }

  return (
    <div className="min-h-screen">
      <HideLoading />
      <ShowToast storageKey="myProjectsToast" />
      <main className="container mx-auto py-6 px-4 md:px-6">
        {/* Header with action button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">My Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track all your created projects
            </p>
          </div>
          <Button asChild>
            <Link href="/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Link>
          </Button>
        </div>

        {/* Display error if any */}
        {fetchError && (
          <div className="text-center py-10 text-destructive bg-destructive/5 rounded-md mb-6">
            <p>{fetchError}</p>
          </div>
        )}

        {/* Empty state */}
        {projects.length === 0 && !fetchError && (
          <Card className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No projects yet</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              You haven&apos;t created any projects yet. Create your first
              project to start collaborating with others.
            </p>
            <Button asChild>
              <Link href="/create">Create Your First Project</Link>
            </Button>
          </Card>
        )}

        {/* Project dashboard */}
        {projects.length > 0 && !fetchError && (
          <>
            {/* Project statistics */}
            <ProjectStats projects={projects} />

            {/* Project Grid */}
            <ProjectGrid projects={projects} filterTags={dynamicFilterTags} />
          </>
        )}
      </main>
    </div>
  );
}
