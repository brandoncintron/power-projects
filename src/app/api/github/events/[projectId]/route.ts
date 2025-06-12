import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";

import { db } from "@/lib/db";
import { processGitHubData } from "@/lib/github/activity-processor";
import { getOctokitInstance, GithubServiceError } from "@/lib/github/services";
import { RequestError } from "@octokit/request-error";

const cache = new NodeCache({ stdTTL: 180 }); // Set cache time for 3 minutes

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const session = await auth();
    const { projectId } = await params;

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cacheKey = `activity:${session.user.id}:${projectId}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const octokit = await getOctokitInstance(session);

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

    // Pre-flight check to see if the repository is empty
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    const createdAt = new Date(repoData.created_at);
    const pushedAt = new Date(repoData.pushed_at);
    const secondsDifference = (pushedAt.getTime() - createdAt.getTime()) / 1000;

    // If the difference is under 20s,
    // don't try to call the whole endpoint
    if (secondsDifference < 20) {
      cache.set(cacheKey, []);
      return NextResponse.json([]);
    }

    // Get the events here
    const [events, commits, issues, pullRequests] = await Promise.all([
      octokit.rest.activity.listRepoEvents({
        owner,
        repo,
        per_page: 10,
      }),
      octokit.rest.repos.listCommits({
        owner,
        repo,
        per_page: 10,
      }),
      octokit.rest.issues.listForRepo({
        owner,
        repo,
        per_page: 10,
      }),
      octokit.rest.pulls.list({
        owner,
        repo,
        per_page: 10,
        state: "all",
      }),
    ]);

    const rawData = {
      events: events.data,
      commits: commits.data,
      issues: issues.data,
      pullRequests: pullRequests.data,
    };

    const processedActivity = processGitHubData(rawData);

    cache.set(cacheKey, processedActivity);

    return NextResponse.json(processedActivity);
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      return NextResponse.json(
        {
          error:
            "Repository not found. It may have been deleted or you may have lost access.",
        },
        { status: 404 },
      );
    }

    console.error("Error fetching GitHub events:", error);
    if (error instanceof GithubServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { error: "Failed to fetch GitHub events" },
      { status: 500 },
    );
  }
}
