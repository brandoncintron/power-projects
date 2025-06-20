/**
 * @file SSE API route for real-time project activity updates.
 *
 * This endpoint:
 * 1. Establishes Server-Sent Events connections for authenticated users
 * 2. Verifies user has access to the project (owner or collaborator)
 * 3. Manages connection lifecycle and cleanup
 * 4. Sends initial historical data followed by real-time updates
 */

import { auth } from "@/auth";
import { NextRequest } from "next/server";

import { db } from "@/lib/db";
import { sseConnectionManager } from "@/lib/sse/connection-manager";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { projectId } = await params;
    const userId = session.user.id; // Extract to ensure type safety

    // Verify the project exists and user has access
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        OR: [
          { ownerId: userId },
          {
            collaborators: {
              some: {
                userId: userId,
              },
            },
          },
        ],
      },
    });

    if (!project) {
      return new Response("Project not found or access denied", {
        status: 404,
      });
    }

    // Check if GitHub repository is connected
    if (!project.githubRepoUrl || !project.githubRepoName) {
      return new Response("No GitHub repository connected to this project", {
        status: 400,
      });
    }

    // Create the SSE stream
    const stream = new ReadableStream({
      start(controller) {
        // Add connection to manager
        sseConnectionManager.addConnection(projectId, userId, controller);

        // Send initial connection message
        const welcomeMessage = `data: ${JSON.stringify({
          type: "connection",
          message: "Connected to activity stream",
          projectId: projectId,
          timestamp: new Date().toISOString(),
        })}\n\n`;

        controller.enqueue(new TextEncoder().encode(welcomeMessage));

        // Send recent activities as initial data
        db.gitHubActivity
          .findMany({
            where: { projectId },
            orderBy: { timestamp: "desc" },
            take: 50, // Send last 50 activities as initial load
          })
          .then((activities) => {
            const initialDataMessage = `data: ${JSON.stringify({
              type: "initial_data",
              activities: activities,
              timestamp: new Date().toISOString(),
            })}\n\n`;

            try {
              controller.enqueue(new TextEncoder().encode(initialDataMessage));
            } catch (error) {
              console.error("Failed to send initial data:", error);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch initial activities:", error);
          });
      },

      cancel() {
        // Remove connection when client disconnects
        console.log("SSE stream closed.");
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Cache-Control",
      },
    });
  } catch (error) {
    console.error("[SSE_STREAM_ERROR]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
