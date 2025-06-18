import { Session } from "next-auth";

import { ProjectWithDetails as BaseProjectWithDetails } from "../../types/types";

// Re-export for local use
export type ProjectWithDetails = BaseProjectWithDetails;

export interface AnimatedProjectItemProps {
  project: ProjectWithDetails;
  hasApplied: boolean;
  isCollaborator: boolean;
  userId?: string;
  index: number;
  animationKey: number;
  session: Session | null;
}

export interface FilteredProjectListProps {
  projects: ProjectWithDetails[];
  filterTags: string[];
  userApplications?: string[];
  userCollaborations?: string[];
  userId?: string;
  session: Session | null;
}

export interface ProjectListItemProps {
  project: ProjectWithDetails;
  hasApplied?: boolean;
  isCollaborator?: boolean;
  userId?: string;
  session: Session | null;
}
