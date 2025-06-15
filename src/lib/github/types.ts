import { Octokit } from "octokit";

export type OctokitInstance = InstanceType<typeof Octokit>;

// Simplified type for a commit within a PushEvent
export interface PushEventCommit {
  sha: string;
  message: string;
  timestamp: string; // ISO 8601
  url: string;
}

// Simplified type for the payload of a PushEvent
export interface PushEventPayload {
  ref: string;
  commits: PushEventCommit[];
  sender: {
    login: string;
    avatar_url: string;
  };
}

// Simplified type for an Issue
export interface Issue {
  number: number;
  title: string;
  html_url: string;
  updated_at: string; // ISO 8601
  pull_request?: object; // Present if the issue is a PR
}

// Simplified type for the payload of an IssuesEvent
export interface IssuesEventPayload {
  action: string;
  issue: Issue;
  sender: {
    login: string;
    avatar_url: string;
  };
}

// Simplified type for a Pull Request
export interface PullRequest {
  number: number;
  title: string;
  html_url: string;
  updated_at: string; // ISO 8601
}

// Simplified type for the payload of a PullRequestEvent
export interface PullRequestEventPayload {
  action: string;
  pull_request: PullRequest;
  sender: {
    login: string;
    avatar_url: string;
  };
}

// Simplified type for a Comment
export interface Comment {
  html_url: string;
  updated_at: string; // ISO 8601
}

// Simplified type for the payload of an IssueCommentEvent
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
    | PushEventPayload
    | IssuesEventPayload
    | PullRequestEventPayload
    | IssueCommentEventPayload
    | object; // Fallback for other event types
  created_at: string | null;
} 