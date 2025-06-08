import { useState } from "react";

import { useRouter } from "next/navigation";

import { setToast } from "@/components/ShowToast";

import type { GitHubRepository } from "../types/types";

interface UseGitHubConnectionProps {
  projectId: string;
  onSuccess?: () => void;
}

export function useGitHubConnection({
  projectId,
  onSuccess,
}: UseGitHubConnectionProps) {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const connectRepository = async (repository: GitHubRepository) => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/github/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          repository,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to connect repository");
      }

      setToast(
        `Successfully connected to ${repository.name}!`,
        "success",
        "githubConnectStatus",
      );

      onSuccess?.();
      router.refresh();

      return { success: true, data };
    } catch (error) {
      console.error("Failed to connect repository:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to connect repository";

      setToast(errorMessage, "error", "githubConnectStatus");

      return { success: false, error: errorMessage };
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectRepository = async () => {
    setIsDisconnecting(true);
    try {
      const response = await fetch("/api/github/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to disconnect repository");
      }

      setToast(
        "Repository disconnected successfully!",
        "success",
        "githubDisconnectStatus",
      );

      // Refresh the page to show updated header
      router.refresh();

      return { success: true, data };
    } catch (error) {
      console.error("Failed to disconnect repository:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to disconnect repository";

      setToast(errorMessage, "error", "githubDisconnectStatus");

      return { success: false, error: errorMessage };
    } finally {
      setIsDisconnecting(false);
    }
  };

  return {
    connectRepository,
    disconnectRepository,
    isConnecting,
    isDisconnecting,
  };
}
