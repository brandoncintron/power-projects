"use client";

import { ApplicationTypeCard } from "@@/projects/[projectId]/components/ApplicationTypeCard";
import { CompletionDateCard } from "@@/projects/[projectId]/components/CompletionDateCard";
import { DatabasesCard } from "@@/projects/[projectId]/components/DatabasesCard";
import { DescriptionCard } from "@@/projects/[projectId]/components/DescriptionCard";
import { FrameworksCard } from "@@/projects/[projectId]/components/FrameworksCard";
import { RecentActivityCard } from "@@/projects/[projectId]/components/RecentActivityCard";
import { TeamMembersCard } from "@@/projects/[projectId]/components/TeamMembersCard";
import { ProjectOverviewProps } from "@@/projects/types/types";

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
}: ProjectOverviewProps) {
  // Convert string date to Date object if needed
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
          <RecentActivityCard />
        </div>

        {/* Right Column: Project Details + Team */}
        <div className="space-y-6">
          <div className="p-6 bg-card shadow-sm border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <div className="space-y-4">
              {/* Application Type */}
              <ApplicationTypeCard
                applicationType={applicationType as string}
              />

              {/* Frameworks & Technologies */}
              {frameworks && frameworks.length > 0 && (
                <FrameworksCard frameworks={frameworks} />
              )}

              {/* Databases */}
              {databases && databases.length > 0 && (
                <DatabasesCard databases={databases} />
              )}

              {/* Completion Date */}
              <CompletionDateCard completionDate={dateObject} />
            </div>
          </div>

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
