"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectOverview } from "./ProjectOverview";
import { ScrumBoard } from "./ScrumBoard";
import { ProjectChatCard } from "./ProjectChatCard";
import { ProjectApplicationsSection } from "./ProjectApplicationsSection";
import { ProjectTabsProps } from "../../ProjectTypes";
import { ProjectTasksCard } from "./ProjectTasks";

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
  projectId
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
            projectId={projectId}
          />
        </div>
      </>
    );
  }

  // Owner or collaborator view with tabs for different project management features
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className={`grid w-full ${isOwner ? 'grid-cols-5 md:w-[600px]' : 'grid-cols-4 md:w-[500px]'}`}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Project Tasks</TabsTrigger>
        <TabsTrigger value="scrum">Scrum Board</TabsTrigger>
        <TabsTrigger value="chat">Team Chat</TabsTrigger>
        {isOwner && (
          <TabsTrigger value="applications">Applications</TabsTrigger>
        )}
      </TabsList>

      <TabsContent value="overview" className="mt-6">
        <ProjectOverview
          applicationType={applicationType}
          frameworks={frameworks}
          databases={databases}
          description={description}
          completionDate={completionDate}
          owner={owner}
          collaborators={collaborators}
          isOwner={isOwner}
          projectId={projectId}
        />
      </TabsContent>

      <TabsContent value="tasks" className="mt-6">
        <ProjectTasksCard />
      </TabsContent>
      
      <TabsContent value="scrum" className="mt-6">
        <ScrumBoard />
      </TabsContent>

      <TabsContent value="chat" className="mt-6">
        <ProjectChatCard />
      </TabsContent>

      {isOwner && (
        <TabsContent value="applications" className="mt-6">
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
