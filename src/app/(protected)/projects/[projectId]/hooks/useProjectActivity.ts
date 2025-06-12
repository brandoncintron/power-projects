"use client";

import { useQuery } from "@tanstack/react-query";

export interface ProcessedActivity {
  id: string;
  type: "COMMIT" | "ISSUE" | "PULL_REQUEST" | "PUSH" | "COMMENT";
  actor: {
    name: string;
    avatarUrl: string;
  };
  summary: string;
  timestamp: string;
  primaryUrl?: string;
}

async function fetchProjectActivity(
  projectId: string,
): Promise<ProcessedActivity[]> {
  const response = await fetch(`/api/github/events/${projectId}`);

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({})); // Catch if body is not json
    throw new Error(errorBody.error || "Failed to fetch project activity.");
  }

  return response.json();
}

export const useProjectActivity = (projectId: string, isEnabled: boolean) => {
  return useQuery<ProcessedActivity[], Error>({
    queryKey: ["projectActivity", projectId],
    queryFn: () => fetchProjectActivity(projectId),
    enabled: isEnabled, // Only fetch if the github repo is connected and user has access
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}; 