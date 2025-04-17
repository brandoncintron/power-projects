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

export interface ProjectOverviewProps {
  applicationType: string;
  frameworks: string[] | null;
  databases: string[] | null;
  description: string | null;
  completionDate: Date | null;
  owner: Owner;
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
