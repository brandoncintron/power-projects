import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import {
  createGithubRepository,
  GithubServiceError,
} from "@/lib/github/services";

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

    const repoData = await createGithubRepository(session, {
      projectName,
      description,
      visibility,
    });

    return NextResponse.json(repoData);
  } catch (error) {
    console.error("Failed to create GitHub repository:", error);

    if (error instanceof GithubServiceError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json(
      { error: `Failed to create GitHub repository: ${errorMessage}` },
      { status: 500 },
    );
  }
}
