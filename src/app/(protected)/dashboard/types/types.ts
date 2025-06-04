import { NotificationWithDetails } from "@/app/(protected)/notifications/types/types";
import { Project } from "@prisma/client";

export interface ProjectWithApplicationStatus extends Project {
  applicationStatus?: string;
}

export interface AppliedToProjectListProps {
  projects: ProjectWithApplicationStatus[];
}

export interface UserProfileProps {
  user: {
    username?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export interface ApplicationCardProps {
  project: ProjectWithApplicationStatus;
}

export interface DashboardProject extends Project {
  _count?: {
    collaborators: number;
    applicants: number;
  };
  owner?: {
    username: string | null;
    image: string | null;
  };
}

export interface ProjectListProps {
  projects: DashboardProject[];
}

export interface ProjectCardProps {
  project: DashboardProject;
  applicationStatus?: string;
  isApplication?: boolean;
}

export interface CollaborationsSectionProps {
  collaborations: DashboardProject[];
}

export interface DashboardData {
  ownedProjects: DashboardProject[];
  collaborations: DashboardProject[];
  applications: ProjectWithApplicationStatus[];
}

export interface NotificationsSectionProps {
  notifications: NotificationWithDetails[];
  totalCount: number;
}

export interface CollaborationsSectionProps {
  collaborations: DashboardProject[];
}

export interface AppliedToProjectListProps {
  projects: ProjectWithApplicationStatus[];
}

export interface ProjectCardProps {
  project: DashboardProject;
}

export interface ApplicationCardProps {
  project: ProjectWithApplicationStatus;
}
