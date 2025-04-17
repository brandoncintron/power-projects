"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProjectOverview } from "./ProjectOverview";
import { ScrumBoardCard } from "./ScrumBoardCard";
import { ProjectChatCard } from "./ProjectChatCard";
import { ProjectApplicationsSection } from "./ProjectApplicationsSection";
import { Owner } from "../../ProjectTypes";
import { Applicants } from "../../ProjectTypes";
import { ProjectTasksCard } from "./ProjectTasks";

interface ProjectTabsProps {
  isOwner: boolean;
  applicationType: string;
  frameworks: string[] | null;
  databases: string[] | null;
  description: string | null;
  completionDate: Date | null;
  owner: Owner;
  applicants: Applicants[];
}

/* Project Tabs - Manages tabbed interface for project content with conditional rendering based on ownership */
export function ProjectTabs({
  isOwner,
  applicationType,
  frameworks,
  databases,
  description,
  completionDate,
  owner,
  applicants
}: ProjectTabsProps) {
  // Non-owner view shows only the overview without tabs
  if (!isOwner) {
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
          />
        </div>
      </>
    );
  }

  // Owner view with tabs for different project management features
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className={`grid w-full ${!isOwner ? 'grid-cols-4 md:w-[450px]' : 'grid-cols-5 md:w-[600px]'}`}>
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
        />
      </TabsContent>

      <TabsContent value="tasks" className="mt-6">
        <ProjectTasksCard />
      </TabsContent>
      
      <TabsContent value="scrum" className="mt-6">
        <ScrumBoardCard />
      </TabsContent>

      <TabsContent value="chat" className="mt-6">
        <ProjectChatCard />
      </TabsContent>

      <TabsContent value="applications" className="mt-6">
        <ProjectApplicationsSection
          owner={owner}
          applicants={applicants}
        />
      </TabsContent>
    </Tabs>
  );
}
