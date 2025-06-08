"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProjectTabsProps } from "../types/types";
import { ProjectApplicationsSection } from "./ProjectApplicationsSection";
import { ProjectChatCard } from "./ProjectChatCard";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTasksCard } from "./ProjectTasks";
import { ScrumBoard } from "./ScrumBoard";

/* Project Tabs - Manages tabbed interface for project content with conditional rendering based on ownership and collaboration status */
export function ProjectTabs({
  isOwner,
  isCollaborator = false,
  applicationType,
  frameworks,
  databases,
  description,
  completionDate,
  owner,
  applicants,
  collaborators = [],
  projectId,
  githubConnection,
  session,
}: ProjectTabsProps) {
  // Non-owner and non-collaborator view shows only the overview without tabs
  if (!isOwner && !isCollaborator) {
    return (
      <>
        <div className="mt-6">
          <ProjectOverview
            applicationType={applicationType}
            frameworks={frameworks}
            databases={databases}
            description={description}
            completionDate={completionDate}
            owner={owner}
            collaborators={collaborators}
            isOwner={isOwner}
            isCollaborator={isCollaborator}
            projectId={projectId}
            githubConnection={githubConnection}
            session={session}
          />
        </div>
      </>
    );
  }

  // Owner or collaborator view with tabs for different project management features
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList
        className={`grid w-full ${isOwner ? "grid-cols-2 md:grid-cols-5 md:w-[600px]" : "grid-cols-2 md:grid-cols-4 md:w-[500px]"}`}
      >
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Project Tasks</TabsTrigger>
        <TabsTrigger value="scrum">Scrum Board</TabsTrigger>
        <TabsTrigger value="chat">Team Chat</TabsTrigger>
        {isOwner && (
          <TabsTrigger value="applications">Applications</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="overview" className="mt-18 md:mt-6">
        <ProjectOverview
          applicationType={applicationType}
          frameworks={frameworks}
          databases={databases}
          description={description}
          completionDate={completionDate}
          owner={owner}
          collaborators={collaborators}
          isOwner={isOwner}
          isCollaborator={isCollaborator}
          projectId={projectId}
          githubConnection={githubConnection}
          session={session}
        />
      </TabsContent>

      <TabsContent value="tasks" className="mt-18 md:mt-6">
        <ProjectTasksCard />
      </TabsContent>

      <TabsContent value="scrum" className="mt-18 md:mt-6">
        <ScrumBoard />
      </TabsContent>

      <TabsContent value="chat" className="mt-18 md:mt-6">
        <ProjectChatCard />
      </TabsContent>

      {isOwner && (
        <TabsContent value="applications" className="mt-18 md:mt-6">
          <ProjectApplicationsSection
            owner={owner}
            applicants={applicants}
            collaborators={collaborators}
            projectId={projectId}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}
