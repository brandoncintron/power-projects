// app/projects/browse-list/page.tsx (Example path)

import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { ProjectVisibility } from '@prisma/client'; // Import types
import { Button } from "@/components/ui/button";
import FilteredProjectList from './components/FilteredProjectList'; // Import the component
import { ProjectWithDetails } from './components/ProjectListItem'; // Import the type

// --- Main Page Component (Remains Server Component for data fetching) ---
export default async function BrowseProjectsListPage() {

  let projects: ProjectWithDetails[] = [];
  let fetchError = null;
  let dynamicFilterTags: string[] = ["All"]; // Initialize with "All"

  try {
    // Fetch all public projects initially
    projects = await db.project.findMany({ // Use prisma
      where: {
        visibility: ProjectVisibility.PUBLIC,
      },
      include: {
        owner: { select: { name: true } },
        _count: { select: { collaborators: true } }
      },
      orderBy: { createdAt: 'desc' },
    });

    // Generate dynamic filter tags from fetched projects
    if (projects.length > 0) {
      const uniqueApplicationTypes = Array.from(
        new Set(projects.map(p => p.applicationType))
      ).sort();
      dynamicFilterTags = ["All", ...uniqueApplicationTypes];
    }

  } catch (error) {
    console.error("Failed to fetch public projects:", error);
    fetchError = "Could not load projects at this time. Please try again later.";
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto py-6 px-4 md:px-6">

        {/* Top Bar: Search and Create Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Browse Projects</h1>
          <Button asChild className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/create-project">Create a project</Link>
          </Button>
        </div>

        {/* Render Error Message if fetch failed */}
        {fetchError && (
          <div className="text-center py-10 text-red-600 bg-red-50 rounded-md">
            <p>{fetchError}</p>
          </div>
        )}

        {/* Render the Client Component for filters and list if no error */}
        {!fetchError && (
          <FilteredProjectList projects={projects} filterTags={dynamicFilterTags} />
        )}

      </main>
    </div>
  );
}