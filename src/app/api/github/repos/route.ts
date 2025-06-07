import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Octokit } from "octokit";

import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get the current session
    const session = await auth();

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

    /**  Debug: Log token info
    console.log("GitHub Account Info:", {
      provider: githubAccount.provider,
      hasToken: !!githubAccount.access_token,
      tokenLength: githubAccount.access_token?.length,
      scope: githubAccount.scope,
      expiresAt: githubAccount.expires_at,
      tokenType: githubAccount.token_type,
    });
    */

    // Initialize Octokit with the user's access token
    const octokit = new Octokit({
      auth: githubAccount.access_token,
    });

    try {
      await octokit.rest.users.getAuthenticated();
    } catch (authError) {
      console.error("Token validation failed:", authError);
      return NextResponse.json(
        {
          error: "Invalid GitHub token. Please reconnect your GitHub account.",
        },
        { status: 401 },
      );
    }

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
