"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ProjectOverview } from "./ProjectOverview";
import { ScrumBoardCard } from "./ScrumBoardCard";
import { ProjectChatCard } from "./ProjectChatCard";

interface Owner {
  id: string;
  username: string | null;
  image: string | null;
}

interface ProjectTabsProps {
  isOwner: boolean;
  applicationType: string;
  frameworks: string[] | null;
  databases: string[] | null;
  description: string | null;
  completionDate: Date | null;
  owner: Owner;
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
}: ProjectTabsProps) {
  // Non-owner view shows only the overview without tabs
  if (!isOwner) {
    return (
      <>
        <h2 className="text-2xl font-semibold mb-2">Project Overview</h2>
        <Separator />
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
      <TabsList className={"grid w-full grid-cols-3 md:w-[400px]"}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="chat">Chat</TabsTrigger>
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
        <ScrumBoardCard />
      </TabsContent>

      <TabsContent value="chat" className="mt-6">
        <ProjectChatCard />
      </TabsContent>
    </Tabs>
  );
} 