export interface Owner {
  id: string;
  username: string | null;
  image: string | null;
}

export interface Applicants { // Also export if needed elsewhere
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