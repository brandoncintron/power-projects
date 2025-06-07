"use client";

import { ProjectOverviewProps } from "../types/types";
import { DescriptionCard } from "./DescriptionCard";
import { ProjectDetailsCard } from "./ProjectDetailsCard";
import { RecentActivityCard } from "./RecentActivityCard";
import { TeamMembersCard } from "./TeamMembersCard";

export function ProjectOverview({
  applicationType,
  frameworks,
  databases,
  description,
  completionDate,
  owner,
  collaborators = [],
  isOwner = false,
  projectId = "",
  githubConnection,
  session,
}: ProjectOverviewProps) {
  const dateObject = completionDate
    ? typeof completionDate === "string"
      ? new Date(completionDate)
      : completionDate
    : null;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <h1 className="text-3xl font-bold">Project Overview</h1>

      {/* Main Content: Two-column layout */}
      <div className="grid gap-8 md:grid-cols-3 mt-8">
        {/* Left Column: Description and Recent Activity */}
        <div className="md:col-span-2 space-y-6">
          {/* Description Card */}
          <DescriptionCard description={description || ""} />

          {/* Recent Activity Card */}
          <RecentActivityCard
            projectId={projectId}
            githubConnection={githubConnection}
            session={session}
          />
        </div>

        {/* Right Column: Project Details + Team */}
        <div className="space-y-6">
          {/* Project Details Card */}
          <ProjectDetailsCard
            applicationType={applicationType as string}
            frameworks={frameworks}
            databases={databases}
            completionDate={dateObject}
          />

          {/* Team Members Card */}
          <TeamMembersCard
            owner={owner}
            collaborators={collaborators}
            isOwner={isOwner}
            projectId={projectId}
          />
        </div>
      </div>
    </div>
  );
}
