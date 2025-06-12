import type { Endpoints } from "@octokit/types";

interface IssueCommentEventPayload {
  action: "created" | "edited" | "deleted";
  issue: {
    number: number;
    pull_request?: object;
  };
  comment: {
    html_url: string;
  };
}

export interface ProcessedActivity {
  id: string;
  type: "COMMIT" | "ISSUE" | "PULL_REQUEST" | "PUSH" | "COMMENT";
  actor: {
    name: string;
    avatarUrl: string;
  };
  summary: string;
  timestamp: string;
  primaryUrl?: string;
}

type GitHubData = {
  events: Endpoints["GET /repos/{owner}/{repo}/events"]["response"]["data"];
  commits: Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"];
  issues: Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];
  pullRequests: Endpoints["GET /repos/{owner}/{repo}/pulls"]["response"]["data"];
};

export function processGitHubData({
  events,
  commits,
  issues,
  pullRequests,
}: GitHubData): ProcessedActivity[] {
  const activities: ProcessedActivity[] = [];

  // Process individual commits
  commits.forEach((commit) => {
    activities.push({
      id: `commit-${commit.sha}`,
      type: "COMMIT",
      actor: {
        name: commit.commit.author?.name || commit.author?.login || "Unknown",
        avatarUrl: commit.author?.avatar_url || "",
      },
      summary: `committed: ${commit.commit.message.split("\n")[0]}`,
      timestamp: new Date(
        commit.commit.author?.date || Date.now(),
      ).toISOString(),
      primaryUrl: commit.html_url,
    });
  });

  // Process issues
  issues.forEach((issue) => {
    // We only care about open issues here, as closed issues are captured by the `events` feed
    if (issue.state === "open") {
      activities.push({
        id: `issue-${issue.id}`,
        type: "ISSUE",
        actor: {
          name: issue.user?.login || "Unknown",
          avatarUrl: issue.user?.avatar_url || "",
        },
        summary: `opened issue #${issue.number}: ${issue.title}`,
        timestamp: new Date(issue.created_at).toISOString(),
        primaryUrl: issue.html_url,
      });
    }
  });

  // Process pull requests
  pullRequests.forEach((pr) => {
    let summary = `opened pull request #${pr.number}: ${pr.title}`;
    if (pr.merged_at) {
      summary = `merged pull request #${pr.number}: ${pr.title}`;
    } else if (pr.state === "closed") {
      summary = `closed pull request #${pr.number}: ${pr.title}`;
    }

    activities.push({
      id: `pr-${pr.id}`,
      type: "PULL_REQUEST",
      actor: {
        name: pr.user?.login || "Unknown",
        avatarUrl: pr.user?.avatar_url || "",
      },
      summary,
      timestamp: new Date(pr.created_at).toISOString(),
      primaryUrl: pr.html_url,
    });
  });

  // Process general repository events for context (comments, etc.)
  events.forEach((event) => {
    const actor = {
      name: event.actor.login,
      avatarUrl: event.actor.avatar_url,
    };

    switch (event.type) {
      case "IssueCommentEvent": {
        const payload = event.payload as IssueCommentEventPayload;
        if (payload.action === "created") {
          const type = payload.issue.pull_request
            ? "pull request"
            : "issue";
          activities.push({
            id: event.id,
            type: "COMMENT",
            actor,
            summary: `commented on ${type} #${payload.issue.number}`,
            timestamp: new Date(event.created_at!).toISOString(),
            primaryUrl: payload.comment.html_url,
          });
        }
        break;
      }
      // Other event types like PushEvent, IssuesEvent, and PullRequestEvent
      // are often redundant with the direct commits, issues, and PR fetches,
      // so we only process comment events here to avoid duplicates.
    }
  });

  // Sort all combined activities by timestamp, most recent first
  return activities.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
} 