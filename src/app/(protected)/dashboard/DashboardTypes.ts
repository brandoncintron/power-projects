import { Project } from '@prisma/client';

export interface ProjectWithApplicationStatus extends Project {
  applicationStatus?: string;
}

export interface AppliedToProjectListProps {
  projects: ProjectWithApplicationStatus[];
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

export interface ProjectCardProps {
  project: DashboardProject;
  applicationStatus?: string;
  isApplication?: boolean;
} 