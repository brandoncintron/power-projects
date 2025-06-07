import { Project } from "@prisma/client";

export interface Owner {
  id: string;
  username: string | null;
  image: string | null;
}

export interface Applicants {
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

export interface ApplicationTypeCardProps {
  applicationType: string;
}

export interface CompletionDateCardProps {
  completionDate: Date | null;
}

export interface DatabasesCardProps {
  databases: string[];
}

export interface FrameworksCardProps {
  frameworks: string[];
}

export interface DescriptionCardProps {
  description: string | null;
}

export interface ProjectApplicantsListProps {
  applicants: Applicants[];
  onAccept: (userId: string) => void;
  onDeny: (userId: string) => void;
  pendingActions?: { [key: string]: { accept?: boolean; deny?: boolean } };
}

export interface ProjectApplicationSectionProps {
  owner: Owner;
  applicants: Applicants[];
  collaborators?: Collaborator[];
  projectId: string;
}

export interface ProjectHeaderProps {
  projectName: string;
  memberCount: number;
  projectId: string;
  createdAt: Date;
  isOwner: boolean;
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

export interface AnimatedProjectItem {
  project: ProjectWithDetails;
}

export interface ActivityItem {
  id: string;
  type: "comment" | "commit" | "update" | "join";
  user: {
    name: string;
    image?: string | null;
  };
  timestamp: Date;
  content: string;
}

export interface RecentActivityCardProps {
  activities?: ActivityItem[];
}

export interface RemoveCollaboratorDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedCollaborator: Collaborator | null;
  projectId: string;
  onSuccess?: () => void;
  onPendingChange?: (isPending: boolean) => void;
}

export interface TeamMembersCardProps {
  owner: Owner;
  collaborators?: Collaborator[];
  isOwner?: boolean;
  projectId?: string;
}

export interface EditProjectFormFullProps extends ProjectOverviewProps {
  projectName: string;
  projectId: string;
  memberCount: number;
  createdAt: Date;
  isOwner: boolean;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  project: ProjectWithDetails;
  actionType: "close" | "delete";
  onSuccess?: () => void;
}

export interface ProjectGridProps {
  projects: ProjectWithDetails[];
  filterTags?: string[];
}

export interface ProjectStatsProps {
  projects: ProjectWithDetails[];
}
