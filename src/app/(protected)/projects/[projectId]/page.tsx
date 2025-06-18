import React from "react";

import { auth } from "@/auth";
import { notFound } from "next/navigation";

import { HideLoading } from "@/components/HideLoading";
import { ShowToast } from "@/components/ShowToast";
import { db } from "@/lib/db";

import { GitHubConnectDialog } from "./components/GitHubConnectDialog";
import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectTabs } from "./components/ProjectTabs";

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
        collaborators: {
          select: {
            userId: true,
            assignedAt: true,
            user: {
              select: {
                id: true,
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

  // Determine if current user is a collaborator
  const isCollaborator = currentUserId
    ? project.collaborators.some((collab) => collab.userId === currentUserId)
    : false;

  // Prepare GitHub connection data
  const githubConnection = {
    githubRepoUrl: project.githubRepoUrl,
    githubRepoName: project.githubRepoName,
    githubRepoOwner: project.githubRepoOwner,
    githubConnectedAt: project.githubConnectedAt,
  };

  return (
    <div className="container mx-auto p-4 md:p-8 min-h-screen">
      <ShowToast storageKey="projectToast" />
      <ShowToast storageKey="githubConnectStatus" />
      <HideLoading />
      {/* Header Section */}
      <ProjectHeader
        projectName={project.projectName}
        memberCount={project._count.collaborators + 1}
        projectId={project.id}
        createdAt={project.createdAt}
        isOwner={isOwner}
        githubConnection={githubConnection}
        githubRepoCreatedViaApp={project.githubRepoCreatedViaApp}
      />

      {/* Main Content */}
      <ProjectTabs
        isOwner={isOwner}
        isCollaborator={isCollaborator}
        applicationType={project.applicationType}
        frameworks={project.frameworks}
        databases={project.databases}
        description={project.description}
        completionDate={project.completionDate}
        owner={project.owner}
        applicants={project.applicants}
        collaborators={project.collaborators}
        projectId={project.id}
        githubConnection={githubConnection}
        session={session}
      />

      {/* GitHub Connect Dialog */}
      <GitHubConnectDialog projectId={project.id} />
    </div>
  );
}

export default ProjectDetailPage;
