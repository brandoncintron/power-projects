import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ projectId: string }> },
) {

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await props.params;
    const { projectId } = params;

  const project = await db.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: session.user.id },
        { collaborators: { some: { userId: session.user.id } } }
      ]
    },
  });

  if (!project || !project.githubRepoOwner || !project.githubRepoName) {
    return NextResponse.json({ error: "Project or GitHub repo not configured" }, { status: 404 });
  }

  const githubAccount = await db.account.findFirst({
    where: { userId: session.user.id, provider: "github" },
  });

  if (!githubAccount?.access_token) {
    return NextResponse.json({ error: "GitHub account not connected" }, { status: 400 });
  }

  const octokit = new Octokit({ auth: githubAccount.access_token });
  const owner = project.githubRepoOwner;
  const repo = project.githubRepoName;

  // Create and return the SSE Stream
  const stream = new ReadableStream({
    async start(controller) {
      let lastCheckTimestamp = new Date();

      // Function to encode and send a message to the client
      const sendEvent = (data: object) => {
        const message = `event: github_event_update\ndata: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(new TextEncoder().encode(message));
      };

      // Check for new GitHub events
      const checkForUpdates = async () => {
        try {
          // Fetch the most recent item from these
          const [
            { data: latestIssues },
            { data: latestPullRequests },
            { data: latestCommits },
          ] = await Promise.all([
            octokit.rest.issues.listForRepo({ owner, repo, state: "all", sort: "updated", per_page: 1 }),
            octokit.rest.pulls.list({ owner, repo, state: "all", sort: "updated", per_page: 1 }),
            octokit.rest.repos.listCommits({ owner, repo, per_page: 1 }),
          ]);

          // Collect all potential new events into one array with their timestamps
          const allRecentEvents = [];
          if (latestIssues[0]) {
            allRecentEvents.push({ type: 'issue', timestamp: new Date(latestIssues[0].updated_at) });
          }
          if (latestPullRequests[0]) {
            allRecentEvents.push({ type: 'pull_request', timestamp: new Date(latestPullRequests[0].updated_at) });
          }
          if (latestCommits[0]) {
            allRecentEvents.push({ type: 'commit', timestamp: new Date(latestCommits[0].commit.author!.date!) });
          }
          
          // If there are no events, do nothing.
          if (allRecentEvents.length === 0) return;

          // Find the most recent event among all types
          allRecentEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
          const mostRecentEvent = allRecentEvents[0];

          // If a new event has appeared since our last check, send an update.
          if (mostRecentEvent.timestamp > lastCheckTimestamp) {
            console.log(`New event found: ${mostRecentEvent.type} at ${mostRecentEvent.timestamp.toISOString()}`);
            lastCheckTimestamp = mostRecentEvent.timestamp;
            sendEvent({ message: `New event of type ${mostRecentEvent.type} detected.` });
          }

        } catch (error) {
          console.error("SSE: Error fetching GitHub events:", error);

          controller.close();
        }
      };

      // Poll for updates every 30 seconds.
      // TODO: replace polling with a pub/sub mechanism (e.g., Redis)
      const intervalId = setInterval(checkForUpdates, 30000);

      // Clean up when the client disconnects
      request.signal.addEventListener('abort', () => {
        // DEBUG - console.log("SSE: Client disconnected, closing stream.");
        clearInterval(intervalId);
        controller.close();
      });

      // Run an initial check immediately on connection
      checkForUpdates();
    },
  });

  // Return the stream with appropriate headers for SSE
  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}