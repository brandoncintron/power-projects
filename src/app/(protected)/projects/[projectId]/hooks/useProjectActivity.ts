"use client";

import { useQuery } from "@tanstack/react-query";

export interface GitHubActivity {
  id: string;
  projectId: string;
  githubEventId: string;
  eventType: string;
  action: string | null;
  actorUsername: string;
  actorAvatarUrl: string | null;
  summary: string;
  targetUrl: string;
  branch: string | null;
  timestamp: string; // ISO 8601 date string
}

async function fetchProjectActivity(
  projectId: string,
): Promise<GitHubActivity[]> {
  const response = await fetch(`/api/projects/${projectId}/activity`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || "Failed to fetch project activity.");
  }

  return response.json();
}

export const useProjectActivity = (projectId: string, isEnabled: boolean) => {
  return useQuery<GitHubActivity[], Error>({
    queryKey: ["projectActivity", projectId],
    queryFn: () => fetchProjectActivity(projectId),
    enabled: isEnabled,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
};
