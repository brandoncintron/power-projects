import React from "react";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectTabs } from "./components/ProjectTabs";
import { HideLoading } from "@/components/HideLoading";
/**
 * Project Detail Page - Displays comprehensive information about a specific project
 * Handles data fetching, ownership verification, and rendering of the appropriate components
 */
async function ProjectDetailPage(props: {
  params: Promise<{ projectId: string }>;
}) {
  const params = await props.params;
  const projectId = params.projectId;
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!projectId) {
    console.error("Project ID not found in params.");
    notFound();
  }

  // Fetch project details with owner info and collaborator count
  let project;
  try {
    project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        owner: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
        applicants: {
          select: {
            userId: true,
            status: true,
            appliedAt: true,
            user: {
              select: {
                username: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            collaborators: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch project:", error);
  }

  if (!project) {
    notFound();
  }

  // Determine if current user is the project owner
  const isOwner = currentUserId === project.owner.id;

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <HideLoading />
      {/* Header Section */}
      <ProjectHeader
        projectName={project.projectName}
        memberCount={project._count.collaborators + 1}
        projectId={project.id}
        createdAt={project.createdAt}
        isOwner={isOwner}
      />

      {/* Main Content */}
      <ProjectTabs
        isOwner={isOwner}
        applicationType={project.applicationType}
        frameworks={project.frameworks}
        databases={project.databases}
        description={project.description}
        completionDate={project.completionDate}
        owner={project.owner}
        applicants={project.applicants}
      />
    </div>
  );
}

export default ProjectDetailPage;
