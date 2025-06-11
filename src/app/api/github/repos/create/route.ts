import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";

import { auth } from "@/auth";
import { db } from "@/lib/db";

interface CreateRepoOptions {
  projectName: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
  session: Session;
}

export async function createGithubRepository({
  projectName,
  description,
  visibility,
  session,
}: CreateRepoOptions) {
  const githubAccount = await db.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "github",
    },
  });

  if (!githubAccount?.access_token) {
    throw new Error("GitHub account not connected or access token is missing.");
  }

  const octokit = new Octokit({ auth: githubAccount.access_token });

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

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { projectName, description, visibility } = body;

    if (!projectName) {
      return NextResponse.json(
        { error: "Project name is required." },
        { status: 400 },
      );
    }

    const repoData = await createGithubRepository({
      projectName,
      description,
      visibility,
      session,
    });

    return NextResponse.json(repoData);
  } catch (error) {
    console.error("Failed to create GitHub repository:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: `Failed to create GitHub repository: ${errorMessage}` },
      { status: 500 },
    );
  }
} 