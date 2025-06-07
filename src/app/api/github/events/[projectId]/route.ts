import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

import { db } from "@/lib/db";

// Type for GitHub activity items
interface GitHubActivity {
  id: string;
  type: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  content: string;
  url: string;
}

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ projectId: string }> },
) {
  try {
    // Get the current session
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await props.params;
    const { projectId } = params;

    // Get project with GitHub connection info
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { ownerId: session.user.id },
          { collaborators: { some: { userId: session.user.id } } },
        ],
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found or access denied" },
        { status: 404 },
      );
    }

    if (!project.githubRepoOwner || !project.githubRepoName) {
      return NextResponse.json(
        { error: "No GitHub repository connected to this project" },
        { status: 400 },
      );
    }

    // Get user's GitHub access token
    const githubAccount = await db.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "github",
      },
    });

    if (!githubAccount?.access_token) {
      return NextResponse.json(
        { error: "GitHub account not connected" },
        { status: 400 },
      );
    }

    // Initialize Octokit
    const octokit = new Octokit({
      auth: githubAccount.access_token,
    });

    const owner = project.githubRepoOwner;
    const repo = project.githubRepoName;

    // Fetch various GitHub events in parallel
    const [{ data: issues }, { data: pullRequests }, { data: commits }] =
      await Promise.all([
        // Get recent issues
        octokit.rest.issues.listForRepo({
          owner,
          repo,
          state: "all",
          sort: "updated",
          per_page: 5,
        }),
        // Get recent pull requests
        octokit.rest.pulls.list({
          owner,
          repo,
          state: "all",
          sort: "updated",
          per_page: 5,
        }),
        // Get recent commits
        octokit.rest.repos.listCommits({
          owner,
          repo,
          per_page: 5,
        }),
      ]);

    // Format activities for the frontend
    const activities: GitHubActivity[] = [];

    // Add issues
    issues.forEach((issue) => {
      if (!issue.pull_request) {
        // Exclude PRs from issues
        activities.push({
          id: `issue-${issue.id}`,
          type: issue.state === "open" ? "issue" : "issue",
          user: {
            name: issue.user?.login || "Unknown",
            avatar: issue.user?.avatar_url,
          },
          timestamp: new Date(issue.updated_at),
          content: `${issue.state === "open" ? "opened" : "closed"} issue: ${issue.title}`,
          url: issue.html_url,
        });
      }
    });

    // Add pull requests
    pullRequests.forEach((pr) => {
      activities.push({
        id: `pr-${pr.id}`,
        type: "pr",
        user: {
          name: pr.user?.login || "Unknown",
          avatar: pr.user?.avatar_url,
        },
        timestamp: new Date(pr.updated_at),
        content: `${pr.state === "open" ? "opened" : pr.merged_at ? "merged" : "closed"} pull request: ${pr.title}`,
        url: pr.html_url,
      });
    });

    // Add commits
    commits.forEach((commit) => {
      activities.push({
        id: `commit-${commit.sha}`,
        type: "commit",
        user: {
          name: commit.commit.author?.name || commit.author?.login || "Unknown",
          avatar: commit.author?.avatar_url,
        },
        timestamp: new Date(commit.commit.author?.date || new Date()),
        content: `committed: ${commit.commit.message.split("\n")[0]}`, // First line only
        url: commit.html_url,
      });
    });

    // Sort by timestamp (most recent first)
    activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return NextResponse.json({
      success: true,
      activities: activities.slice(0, 10), // Return top 10 most recent
      repository: {
        owner,
        name: repo,
        url: project.githubRepoUrl,
      },
    });
  } catch (error) {
    console.error("GitHub events error:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch GitHub events: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch GitHub events" },
      { status: 500 },
    );
  }
}
