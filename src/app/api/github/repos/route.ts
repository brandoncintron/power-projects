import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { getOctokitInstance, GithubServiceError } from "@/lib/github/services";

export async function GET() {
  try {
    const session = await auth();
    const octokit = await getOctokitInstance(session);

    // Fetch the user's repositories
    const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: "updated",
      per_page: 100, // Maximum allowed per page
    });

    // Return the repositories data
    return NextResponse.json({
      success: true,
      repositories: repos,
      count: repos.length,
    });
  } catch (error) {
    console.error("GitHub API Error:", error);

    if (error instanceof GithubServiceError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    // Handle specific GitHub API errors
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `GitHub API Error: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
