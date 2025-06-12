import { Session } from "next-auth";
import { Octokit } from "octokit";

import { db } from "@/lib/db";

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

export interface CreateRepoOptions {
  projectName: string;
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
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
