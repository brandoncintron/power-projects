"use client";

import { ApplicationTypeCard } from "./ApplicationTypeCard";
import { FrameworksCard } from "./FrameworksCard";
import { DatabasesCard } from "./DatabasesCard";
import { DescriptionCard } from "./DescriptionCard";
import { CompletionDateCard } from "./CompletionDateCard";
import { TeamMembersCard } from "./TeamMembersCard";

interface Owner {
  id: string;
  username: string | null;
  image: string | null;
}

interface ProjectOverviewProps {
  applicationType: string;
  frameworks: string[] | null;
  databases: string[] | null;
  description: string | null;
  completionDate: Date | null;
  owner: Owner;
}

/* Project Overview - Organizes all project information cards in a structured layout */
export function ProjectOverview({
  applicationType,
  frameworks,
  databases,
  description,
  completionDate,
  owner,
}: ProjectOverviewProps) {
  return (
    <div className="grid gap-6">
      {/* Tech stack section */}
      <div className="grid gap-6 md:grid-cols-3">
        <ApplicationTypeCard applicationType={applicationType} />
        <FrameworksCard frameworks={frameworks || []} />
        <DatabasesCard databases={databases || []} />
      </div>

      {/* Description section */}
      <DescriptionCard description={description || ""} />

      {/* Project metadata section */}
      <div className="grid gap-6 md:grid-cols-2">
        <CompletionDateCard completionDate={completionDate} />
        <TeamMembersCard owner={owner} />
      </div>
    </div>
  );
} 