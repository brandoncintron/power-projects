import type { Session } from "next-auth";

// GitHub Repository Types
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

// GitHub Connection Types
export interface GitHubConnectionData {
  githubRepoUrl: string | null;
  githubRepoName: string | null;
  githubRepoOwner: string | null;
  githubConnectedAt: Date | null;
}

// API Response Types
export interface GitHubReposResponse {
  success: boolean;
  repositories: GitHubRepository[];
  count: number;
}

export interface GitHubReposError {
  error: string;
}

export interface GitHubConnectResponse {
  success: boolean;
  message: string;
  project: {
    id: string;
    githubRepoUrl: string;
    githubRepoName: string;
    githubRepoOwner: string;
    githubConnectedAt: Date;
  };
}

// Hook State Types
export interface UseGitHubReposState {
  repositories: GitHubRepository[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Component Props Types
export interface RepositoryListItemProps {
  repository: GitHubRepository;
  isSelected: boolean;
  onSelect: (repository: GitHubRepository) => void;
}

export interface RepositorySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Project Header Props (extended to include GitHub data)
export interface ProjectHeaderProps {
  projectName: string;
  memberCount: number;
  projectId: string;
  createdAt: Date;
  isOwner: boolean;
  githubConnection?: GitHubConnectionData;
}

// Activity and Recent Activity Types
export interface ActivityItem {
  id: string;
  type: "join" | "commit" | "comment" | "issue" | "pr" | "push";
  user: { name: string; avatar?: string };
  timestamp: Date;
  content: string;
  url?: string;
}

export interface RecentActivityCardProps {
  projectId?: string;
  githubConnection?: GitHubConnectionData;
  session: Session | null;
}

// Project Overview Props
export interface ProjectOverviewProps {
  applicationType: string;
  frameworks: string[];
  databases: string[];
  description: string;
  completionDate: Date | null;
  owner: {
    id: string;
    username: string | null;
    image: string | null;
  };
  collaborators: Array<{
    userId: string;
    assignedAt: Date;
    user: {
      id: string;
      username: string | null;
      image: string | null;
    };
  }>;
  isOwner: boolean;
  projectId: string;
  githubConnection?: GitHubConnectionData;
  session: Session | null;
}

// Project Tabs Props
export interface ProjectTabsProps {
  isOwner: boolean;
  isCollaborator?: boolean;
  applicationType: string;
  frameworks: string[];
  databases: string[];
  description: string;
  completionDate: Date | null;
  owner: {
    id: string;
    username: string | null;
    image: string | null;
  };
  applicants: Array<{
    userId: string;
    status: string;
    appliedAt: Date;
    user: {
      username: string | null;
      image: string | null;
    };
  }>;
  collaborators: Array<{
    userId: string;
    assignedAt: Date;
    user: {
      id: string;
      username: string | null;
      image: string | null;
    };
  }>;
  projectId: string;
  githubConnection?: GitHubConnectionData;
  session: Session | null;
} 