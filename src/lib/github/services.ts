/**
 * @file Handles interactions with the GitHub API.
 * Contains reusable functions for authenticating with GitHub, creating repositories, and
 * fetching data like repository events.
 * Uses the octokit library to handle authenticated API requests.
 */
import { Session } from "next-auth";
import { Octokit } from "octokit";

import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/utils";

import {
  ApiPushPayload,
  CreateRepoOptions,
  GitHubEvent,
  IssueCommentEventPayload,
  IssuesEventPayload,
  OctokitInstance,
  PullRequestEventPayload,
} from "./types";

export class GithubServiceError extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super(message);
    this.name = "GithubServiceError";
  }
}

export async function getOctokitInstance(session: Session | null) {
  if (!session?.user?.id) {
    throw new GithubServiceError("Unauthorized", 401);
  }

  const githubAccount = await db.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "github",
    },
  });

  if (!githubAccount?.access_token) {
    throw new GithubServiceError(
      "GitHub account not connected or access token is missing.",
      400,
    );
  }

  const octokit = new Octokit({ auth: githubAccount.access_token });

  try {
    await octokit.rest.users.getAuthenticated();
  } catch (authError) {
    console.error("Token validation failed:", authError);
    throw new GithubServiceError(
      "Invalid GitHub token. Please reconnect your GitHub account.",
      401,
    );
  }

  return octokit;
}

export async function createGithubRepository(
  session: Session,
  options: CreateRepoOptions,
) {
  const { projectName, description, visibility } = options;
  const octokit = await getOctokitInstance(session);

  const { data: repo } = await octokit.rest.repos.createForAuthenticatedUser({
    name: projectName,
    description: description || "",
    private: visibility === "PRIVATE",
  });

  return {
    githubRepoName: repo.name,
    githubRepoOwner: repo.owner.login,
    githubRepoUrl: repo.html_url,
  };
}

/**
 * Creates a webhook for the specified repository to send events to our application.
 * @param octokit An authenticated Octokit instance.
 * @param owner The repository owner's login.
 * @param repo The repository name.
 */
export async function createWebhook(
  octokit: OctokitInstance,
  owner: string,
  repo: string,
) {
  const webhookUrl = absoluteUrl("/api/github/webhook");

  try {
    await octokit.rest.repos.createWebhook({
      owner,
      repo,
      events: ["push", "issues", "pull_request", "issue_comment"],
      config: {
        url: webhookUrl,
        content_type: "json",
        secret: process.env.GITHUB_WEBHOOK_SECRET,
      },
      active: true,
    });
    console.log(`Webhook created successfully for ${owner}/${repo}.`);
  } catch (error) {
    // It's possible the webhook already exists, which throws an error.
    // log this, but it's not a critical failure.
    console.log(`Error: ${error}`);
    console.warn(
      `Could not create webhook for ${owner}/${repo}. It may already exist.`,
    );
  }
}

export async function fetchAndStoreRecentActivity(
  project: {
    id: string;
    githubRepoOwner: string | null;
    githubRepoName: string | null;
  },
  octokit: OctokitInstance,
) {
  if (!project.githubRepoOwner || !project.githubRepoName) {
    console.error(
      `Project ${project.id} is missing repository details. Skipping activity fetch.`,
    );
    return;
  }

  const owner = project.githubRepoOwner;
  const repo = project.githubRepoName;

  console.log(`Starting to backfill activity for ${owner}/${repo}...`);

  try {
    const { data: events } = (await octokit.rest.activity.listRepoEvents({
      owner,
      repo,
      per_page: 50, // Fetch the last 50 events
    })) as { data: GitHubEvent[] };

    console.log(`Total events fetched from API: ${events.length}`);

    const activitiesToCreate = [];

    for (const event of events) {
      console.log(`Processing event type: ${event.type}, ID: ${event.id}`);

      switch (event.type) {
        case "PushEvent": {
          const pushPayload = event.payload as ApiPushPayload;
          if (pushPayload.commits) {
            for (const commit of pushPayload.commits) {
              const branch = pushPayload.ref.split("/").pop();
              activitiesToCreate.push({
                githubEventId: commit.sha,
                projectId: project.id,
                eventType: "push",
                action: "pushed",
                branch: branch,
                actorUsername: event.actor.login,
                actorAvatarUrl: event.actor.avatar_url,
                summary: `pushed commit: ${commit.message.split("\n")[0]}`,
                targetUrl: commit.url,
                timestamp: new Date(event.created_at!),
              });
              console.log(`Prepared PushEvent commit. SHA: ${commit.sha}`);
            }
          }
          break;
        }

        case "IssuesEvent": {
          const issuePayload = event.payload as IssuesEventPayload;
          activitiesToCreate.push({
            githubEventId: event.id,
            projectId: project.id,
            eventType: event.type,
            action: issuePayload.action,
            branch: null,
            actorUsername: event.actor.login,
            actorAvatarUrl: event.actor.avatar_url,
            summary: `issue #${issuePayload.issue.number}: ${issuePayload.issue.title}`,
            targetUrl: issuePayload.issue.html_url,
            timestamp: new Date(event.created_at!),
          });
          console.log(
            `Matched IssuesEvent. Summary: ${issuePayload.issue.title}`,
          );
          break;
        }

        case "PullRequestEvent": {
          const prPayload = event.payload as PullRequestEventPayload;
          activitiesToCreate.push({
            githubEventId: event.id,
            projectId: project.id,
            eventType: event.type,
            action: prPayload.action,
            branch: null,
            actorUsername: event.actor.login,
            actorAvatarUrl: event.actor.avatar_url,
            summary: `pull request #${prPayload.pull_request.number}: ${prPayload.pull_request.title}`,
            targetUrl: prPayload.pull_request.html_url,
            timestamp: new Date(event.created_at!),
          });
          console.log(
            `Matched PullRequestEvent. Summary: ${prPayload.pull_request.title}`,
          );
          break;
        }

        case "IssueCommentEvent": {
          const commentPayload = event.payload as IssueCommentEventPayload;
          const type = commentPayload.issue.pull_request
            ? "pull request"
            : "issue";
          activitiesToCreate.push({
            githubEventId: event.id,
            projectId: project.id,
            eventType: event.type,
            action: "commented",
            branch: null,
            actorUsername: event.actor.login,
            actorAvatarUrl: event.actor.avatar_url,
            summary: `commented on ${type} #${commentPayload.issue.number}`,
            targetUrl: commentPayload.comment.html_url,
            timestamp: new Date(event.created_at!),
          });
          console.log(`Matched IssueCommentEvent.`);
          break;
        }

        default:
          console.log(`Skipping event type: ${event.type}`);
          continue; // Skip events we don't want to track
      }
    }

    if (activitiesToCreate.length > 0) {
      // De-duplicate one last time before insertion, just in case
      const uniqueActivities = Array.from(
        new Map(activitiesToCreate.map((a) => [a.githubEventId, a])).values(),
      );
      console.log(
        `Storing ${uniqueActivities.length} unique processed activities.`,
      );

      const result = await db.gitHubActivity.createMany({
        data: uniqueActivities,
        skipDuplicates: true,
      });
      console.log(
        `Backfill complete for ${owner}/${repo}. Stored ${result.count} new activities.`,
      );
    } else {
      console.log(
        `Backfill complete for ${owner}/${repo}. No new activities to store.`,
      );
    }
  } catch (error) {
    console.error(
      `Failed to fetch or store recent activity for ${owner}/${repo}:`,
      error,
    );
  }
}
