"use client";

import { TeamMembersCard } from "./TeamMembersCard";
import { Owner } from "../types/ProjectTypes";
import { Applicants } from "../types/ProjectTypes";
import { ProjectApplicantsList } from "./ProjectApplicantsList";

interface ProjectApplicationSectionProps {
  owner: Owner;
  applicants: Applicants[];
}

/* Project Overview - Organizes all project information cards in a structured layout */
export function ProjectApplicationsSection({ owner, applicants }: ProjectApplicationSectionProps) {
  return (
    <div className="">
      {/* Team members section */}
      <div className="grid gap-6 md:grid-cols-2">
        <TeamMembersCard owner={owner} />
        <ProjectApplicantsList
        applicants={applicants}
      />
      </div>
    </div>
  );
}
