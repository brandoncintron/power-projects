import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

// Get the webhook secret from environment variables
const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

if (!GITHUB_WEBHOOK_SECRET) {
  throw new Error("GITHUB_WEBHOOK_SECRET is not set");
}

async function verifySignature(req: NextRequest, body: Buffer): Promise<boolean> {
  const signature = req.headers.get("x-hub-signature-256");
  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_SECRET!);
  hmac.update(body);
  const digest = `sha256=${hmac.digest("hex")}`;

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  console.log("Received a request to /api/github/webhook");

  const body = Buffer.from(await req.arrayBuffer());

  const isVerified = await verifySignature(req, body);
  console.log(`Signature verification result: ${isVerified}`);

  if (!isVerified) {
    console.error("Signature verification failed.");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = req.headers.get("x-github-event");
  const deliveryId = req.headers.get("x-github-delivery");
  console.log(`Processing event: ${event}, Delivery ID: ${deliveryId}`);

  const payload = JSON.parse(body.toString());

  const repoName = payload.repository?.name;
  const repoOwner = payload.repository?.owner?.login;

  if (!repoName || !repoOwner || !deliveryId) {
    console.error("Webhook payload missing repository or delivery information.");
    return NextResponse.json({ error: "Missing repository or delivery information" }, { status: 400 });
  }

  try {
    const project = await db.project.findFirst({
      where: {
        githubRepoName: repoName,
        githubRepoOwner: repoOwner,
      },
    });

    if (!project) {
      console.warn(`Webhook for ${repoOwner}/${repoName} received, but no matching project found. Ignoring.`);
      // If we receive a webhook for a repo not in our system, just ignore it.
      return NextResponse.json({ message: "Project not found, webhook ignored." });
    }

    console.log(`Found matching project: ${project.id} for repo ${repoOwner}/${repoName}`);

    // Prevent processing duplicate events
    const existingEvent = await db.gitHubActivity.findUnique({
      where: { githubEventId: deliveryId },
    });
    if (existingEvent) {
      console.log(`Duplicate event ${deliveryId}, ignored.`);
      return NextResponse.json({ message: "Duplicate event, ignored." });
    }

    let activityData;

    switch (event) {
      case "push":
        activityData = {
          summary: `pushed ${payload.commits.length} commit(s) to ${payload.ref.split('/').pop()}`,
          targetUrl: payload.compare,
        };
        break;
      case "issues":
        activityData = {
          summary: `issue #${payload.issue.number}: ${payload.issue.title}`,
          targetUrl: payload.issue.html_url,
        };
        break;
      case "pull_request":
        activityData = {
          summary: `pull request #${payload.pull_request.number}: ${payload.pull_request.title}`,
          targetUrl: payload.pull_request.html_url,
        };
        break;
      default:
        return NextResponse.json({ message: `Event type ${event} not handled.` });
    }

    await db.gitHubActivity.create({
      data: {
        projectId: project.id,
        githubEventId: deliveryId,
        eventType: event,
        action: payload.action,
        actorUsername: payload.sender.login,
        actorAvatarUrl: payload.sender.avatar_url,
        summary: activityData.summary,
        targetUrl: activityData.targetUrl,
        timestamp: new Date(payload.repository.updated_at), // Or another relevant timestamp from payload
      },
    });

    console.log(`Successfully processed and stored event ${deliveryId} for project ${project.id}.`);

    // TODO: Trigger real-time update to subscribed clients via Supabase/Ably

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error processing webhook:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Webhook processing failed: ${errorMessage}` }, { status: 500 });
  }
} 