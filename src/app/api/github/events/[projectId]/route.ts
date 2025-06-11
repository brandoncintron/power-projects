import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    // Get the current session
    const session = await auth();

    const { projectId } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the user's GitHub account from the database
    const githubAccount = await db.account.findFirst({
      where: {
        userId: session.user.id,
        provider: "github",
      },
    });

    if (!githubAccount?.access_token) {
      return NextResponse.json(
        { error: "GitHub account not connected or access token not found" },
        { status: 400 },
      );
    }

    const octokit = new Octokit({
        auth: githubAccount.access_token,
    });

    const project = await db.project.findFirst({
      where: {
        id: projectId,
      },
    });

    const owner = project?.githubRepoOwner;
    const repo = project?.githubRepoName;

    if (!owner || !repo) {
      return NextResponse.json(
        { error: "Project not found or repository not configured." },
        { status: 404 },
      );
    }

    // Get the events here
    const [events, commits, issues, pullRequests] = await Promise.all([
      octokit.rest.activity.listRepoEvents({
        owner,
        repo,
        per_page: 100,
      }),
      octokit.rest.repos.listCommits({
        owner,
        repo,
        per_page: 100,
      }),
      octokit.rest.issues.listForRepo({
        owner,
        repo,
        per_page: 100,
      }),
      octokit.rest.pulls.list({
        owner,
        repo,
        per_page: 100,
        state: "all",
      }),
    ]);

    const response = {
      events: events.data,
      commits: commits.data,
      issues: issues.data,
      pullRequests: pullRequests.data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching GitHub events:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub events" },
      { status: 500 },
    );
  }
}
