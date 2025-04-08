"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickStats } from "./QuickStats";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";
import { ProjectList } from "./ProjectList";
import { Project } from '@prisma/client';

interface DashboardTabsProps {
  projects: (Project & {
    _count?: {
      collaborators: number;
    };
  })[];
}

/* Dashboard Tabs - Main tab interface for dashboard with Overview and Projects sections */
export function DashboardTabs({ projects }: DashboardTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full md:w-[400px] grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="projects">My Projects</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6 mt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <QuickStats projectCount={projects.length} />
          <RecentActivity />
          <QuickActions />
        </div>
      </TabsContent>

      <TabsContent value="projects" className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Projects</h2>
          <Link href="/create-project">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              Create New Project
            </button>
          </Link>
        </div>
        
        <ProjectList projects={projects} />
      </TabsContent>
    </Tabs>
  );
} 