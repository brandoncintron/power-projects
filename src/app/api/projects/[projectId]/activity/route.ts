/**
 * @file This API route is responsible for fetching and serving the stored GitHub activity
 * data for a specific project to the frontend.
 *
 * It retrieves the 50 most recent activity records from the `GitHubActivity` table
 * for a given `projectId` and returns them as a JSON response. This is the data source
 * for the "Recent Activity" component in the UI.
 */
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { projectId } = await params;

    const activities = await db.gitHubActivity.findMany({
      where: {
        projectId: projectId,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 50, // Limit to the 50 most recent activities
    });

    return NextResponse.json(activities);
    
  } catch (error) {
    console.error("[PROJECT_ACTIVITY_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 