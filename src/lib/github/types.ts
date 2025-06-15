import { Octokit } from "octokit";

export type OctokitInstance = InstanceType<typeof Octokit>;

export interface WebhookPushCommit {
  id: string; // This is the commit SHA
  message: string;
  timestamp: string;
  url: string;
}

export interface WebhookPushPayload {
  ref: string;
  commits: WebhookPushCommit[];
  sender: {
    login: string;
    avatar_url: string;
  };
}

export interface ApiPushEventCommit {
  sha: string; // This is the commit SHA
  message: string;
  url: string;
}

export interface ApiPushPayload {
  ref: string;
  commits: ApiPushEventCommit[];
}

export interface Issue {
  number: number;
  title: string;
  html_url: string;
  updated_at: string; // ISO 8601
  pull_request?: object; // Present if the issue is a PR
}

export interface IssuesEventPayload {
  action: string;
  issue: Issue;
  sender: {
    login: string;
    avatar_url: string;
  };
}

export interface PullRequest {
  number: number;
  title: string;
  html_url: string;
  updated_at: string; // ISO 8601
}

export interface PullRequestEventPayload {
  action: string;
  pull_request: PullRequest;
  sender: {
    login: string;
    avatar_url: string;
  };
}

export interface Comment {
  html_url: string;
  updated_at: string; // ISO 8601
}

export interface IssueCommentEventPayload {
  action: string;
  issue: Issue;
  comment: Comment;
  sender: {
    login: string;
    avatar_url: string;
  };
}

// A generic GitHub event object from the listRepoEvents endpoint
export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  payload:
    | ApiPushPayload
    | IssuesEventPayload
    | PullRequestEventPayload
    | IssueCommentEventPayload
    | object; // Fallback for other event types
  created_at: string | null;
}

export interface CreateRepoOptions {
  projectName: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
}
