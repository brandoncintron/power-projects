"use client";

import { ProjectApplicantsList } from "@@/projects/[projectId]/components/ProjectApplicantsList";
import { TeamMembersCard } from "@@/projects/[projectId]/components/TeamMembersCard";
import { useApplicationActions } from "@@/projects/[projectId]/hooks/useApplicationActions";
import { ApplicationsTabProps } from "../types/types";

/* Project Applications Section - Organizes team members and project applicants */
export function ApplicationsTab({
  owner,
  applicants,
  collaborators = [],
  projectId,
}: ApplicationsTabProps) {
  const { pendingActions, onAccept, onDeny, filterPendingApplicants } =
    useApplicationActions(projectId);

  // Filter out applicants that have been accepted or rejected
  const filteredApplicants = filterPendingApplicants(applicants);

  return (
    <div>
      {/* Team members section */}
      <div className="grid gap-6 md:grid-cols-2">
        <TeamMembersCard
          owner={owner}
          collaborators={collaborators}
          isOwner={true}
          projectId={projectId}
        />
        <ProjectApplicantsList
          applicants={filteredApplicants}
          onAccept={onAccept}
          onDeny={onDeny}
          pendingActions={pendingActions}
        />
      </div>
    </div>
  );
}
