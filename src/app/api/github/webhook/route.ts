/**
 * @file This API route acts as the real-time listener for webhooks sent from GitHub.
 *
 * It:
 * 1.  Verifies the authenticity of incoming webhook requests using a shared secret.
 * 2.  Parses the event payload from GitHub (e.g., for pushes, new issues, comments).
 * 3.  Finds the corresponding project in the database.
 * 4.  Stores the new activity in the `GitHubActivity` table.
 *
 * This endpoint ensures that the linked project's activity feed stays up-to-date with
 * events that happen in the linked repository *after* the initial connection.
 */
import crypto from "crypto";

import { GitHubActivity } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import {
  IssueCommentEventPayload,
  IssuesEventPayload,
  PullRequestEventPayload,
  WebhookPushPayload,
} from "@/lib/github/types";

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

if (!GITHUB_WEBHOOK_SECRET) {
  throw new Error("GITHUB_WEBHOOK_SECRET is not set");
}

async function verifySignature(
  req: NextRequest,
  body: Buffer,
): Promise<boolean> {
  const signature = req.headers.get("x-hub-signature-256");
  if (!signature) {
    console.error("Webhook signature header not found.");
    return false;
  }

  if (!GITHUB_WEBHOOK_SECRET) {
    console.error("GITHUB_WEBHOOK_SECRET is not configured on the server.");
    return false;
  }

  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_SECRET);
  hmac.update(body);
  const digest = `sha256=${hmac.digest("hex")}`;

  console.log(`Received signature: ${signature}`);
  console.log(`Computed digest:  ${digest}`);

  if (signature.length !== digest.length) {
    console.error("Signature and digest lengths do not match.");
    return false;
  }

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
    console.error(
      "Webhook payload missing repository or delivery information.",
    );
    return NextResponse.json(
      { error: "Missing repository or delivery information" },
      { status: 400 },
    );
  }

  try {
    const project = await db.project.findFirst({
      where: {
        githubRepoName: repoName,
        githubRepoOwner: repoOwner,
      },
    });

    if (!project) {
      console.warn(
        `Webhook for ${repoOwner}/${repoName} received, but no matching project found. Ignoring.`,
      );
      return NextResponse.json({
        message: "Project not found, webhook ignored.",
      });
    }

    console.log(
      `Found matching project: ${project.id} for repo ${repoOwner}/${repoName}`,
    );

    const activitiesToCreate: Omit<GitHubActivity, "id" | "timestamp">[] = [];

    switch (event) {
      case "push": {
        const pushPayload = payload as WebhookPushPayload;
        if (pushPayload.commits && pushPayload.commits.length > 0) {
          const branch = pushPayload.ref.split("/").pop() || null;
          for (const commit of pushPayload.commits) {
            // Use commit.id (which is the SHA from the webhook) as the unique ID
            activitiesToCreate.push({
              githubEventId: commit.id,
              projectId: project.id,
              eventType: "push",
              action: "pushed",
              branch: branch,
              actorUsername: pushPayload.sender.login,
              actorAvatarUrl: pushPayload.sender.avatar_url,
              summary: `pushed commit: ${commit.message.split("\n")[0]}`,
              targetUrl: commit.url,
            });
          }
        }
        break;
      }

      case "issues": {
        const issuePayload = payload as IssuesEventPayload;
        activitiesToCreate.push({
          githubEventId: deliveryId, // Keep deliveryId for non-commit events
          projectId: project.id,
          eventType: "issues",
          action: issuePayload.action,
          branch: null,
          actorUsername: issuePayload.sender.login,
          actorAvatarUrl: issuePayload.sender.avatar_url,
          summary: `issue #${issuePayload.issue.number}: ${issuePayload.issue.title}`,
          targetUrl: issuePayload.issue.html_url,
        });
        break;
      }

      case "pull_request": {
        const prPayload = payload as PullRequestEventPayload;
        activitiesToCreate.push({
          githubEventId: deliveryId, // Keep deliveryId for non-commit events
          projectId: project.id,
          eventType: "pull_request",
          action: prPayload.action,
          branch: null,
          actorUsername: prPayload.sender.login,
          actorAvatarUrl: prPayload.sender.avatar_url,
          summary: `pull request #${prPayload.pull_request.number}: ${prPayload.pull_request.title}`,
          targetUrl: prPayload.pull_request.html_url,
        });
        break;
      }

      case "issue_comment": {
        const commentPayload = payload as IssueCommentEventPayload;
        const type = commentPayload.issue.pull_request
          ? "pull request"
          : "issue";
        activitiesToCreate.push({
          githubEventId: deliveryId, // Keep deliveryId for non-commit events
          projectId: project.id,
          eventType: "issue_comment",
          action: "commented",
          branch: null,
          actorUsername: commentPayload.sender.login,
          actorAvatarUrl: commentPayload.sender.avatar_url,
          summary: `commented on ${type} #${commentPayload.issue.number}`,
          targetUrl: commentPayload.comment.html_url,
        });
        break;
      }

      default:
        console.log(`Event type ${event} not handled, ignoring.`);
        return NextResponse.json({
          message: `Event type ${event} not handled.`,
        });
    }

    if (activitiesToCreate.length > 0) {
      // De-duplicate before insertion to prevent constraint violations
      const existingEventIds = await db.gitHubActivity.findMany({
        where: {
          githubEventId: { in: activitiesToCreate.map((a) => a.githubEventId) },
        },
        select: { githubEventId: true },
      });
      const existingIdsSet = new Set(
        existingEventIds.map((e) => e.githubEventId),
      );

      const uniqueActivities = activitiesToCreate.filter(
        (a) => !existingIdsSet.has(a.githubEventId),
      );

      if (uniqueActivities.length > 0) {
        const result = await db.gitHubActivity.createMany({
          data: uniqueActivities,
        });
        console.log(
          `Successfully stored ${result.count} new activities for project ${project.id}.`,
        );
      } else {
        console.log(
          "All activities from this webhook were duplicates. Nothing new to store.",
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Webhook processing failed: ${errorMessage}` },
      { status: 500 },
    );
  }
}
