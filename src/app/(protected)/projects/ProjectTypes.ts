import { Project } from "@prisma/client";

export interface Owner {
  id: string;
  username: string | null;
  image: string | null;
}

export interface Applicants {
  // Also export if needed elsewhere
  userId: string;
  status: string | null;
  appliedAt: Date;
  user: {
    username: string | null;
    image: string | null;
  };
}

export interface Collaborator {
  userId: string;
  assignedAt: Date;
  user: {
    id: string;
    username: string | null;
    image: string | null;
  };
}

export interface ProjectOverviewProps {
  applicationType: string;
  frameworks: string[] | null;
  databases: string[] | null;
  description: string | null;
  completionDate: Date | null;
  owner: Owner;
  collaborators?: Collaborator[];
  isOwner?: boolean;
  projectId?: string;
}

export interface ProjectWithDetails extends Project {
  owner: {
    username: string | null;
  } | null;
  _count: {
    collaborators: number;
    applicants: number;
  };
  frameworks: string[];
  databases: string[];
  status: "OPEN" | "CLOSED";
  visibility: "PUBLIC" | "PRIVATE" | "UNIVERSITY";
}

export interface ProjectTabsProps {
  isOwner: boolean;
  isCollaborator?: boolean;
  applicationType: string;
  frameworks: string[] | null;
  databases: string[] | null;
  description: string | null;
  completionDate: Date | null;
  owner: Owner;
  applicants: Applicants[];
  collaborators?: Collaborator[];
  projectId: string;
}

export interface ProjectListItemProps {
  project: ProjectWithDetails;
  hasApplied?: boolean;
  isCollaborator?: boolean;
  userId?: string;
}

export interface FilteredProjectListProps {
  projects: ProjectWithDetails[];
  filterTags: string[];
  userApplications?: string[];
  userCollaborations?: string[];
  userId?: string;
}
