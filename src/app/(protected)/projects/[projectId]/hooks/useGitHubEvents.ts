import { useEffect } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ActivityItem } from "../types/types";

interface GitHubEventsResponse {
  success: boolean;
  activities: ActivityItem[];
  repository: {
    owner: string;
    name: string;
    url: string;
  };
}

interface UseGitHubEventsProps {
  projectId: string | undefined;
  enabled: boolean;
}

/* GitHub Events Realtime Updater - Updates the GitHub events in realtime */
export function GitHubEventsRealtimeUpdater({
  projectId,
}: {
  projectId: string | undefined;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!projectId) return;

    const eventSource = new EventSource(
      `/api/github/events-stream/${projectId}`,
    );

    eventSource.addEventListener("github_event_update", () => {
      // DEBUG - console.log("Received server notification for new GitHub event!");
      queryClient.invalidateQueries({ queryKey: ["github-events", projectId] });
    });

    eventSource.onerror = () => {
      // DEBUG - console.log("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [projectId, queryClient]);

  return null; // This component does not render anything.
}

/* GitHub Events Query - Fetches the GitHub events for a project */
export function useGitHubEvents({ projectId, enabled }: UseGitHubEventsProps) {
  return useQuery({
    queryKey: ["github-events", projectId],
    queryFn: async (): Promise<GitHubEventsResponse> => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }

      const response = await fetch(`/api/github/events/${projectId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch GitHub activities");
      }

      return await response.json();
    },
    enabled: !!projectId && enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
