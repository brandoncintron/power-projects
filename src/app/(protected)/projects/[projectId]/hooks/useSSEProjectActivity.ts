"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  GitHubActivity,
  SSEMessage,
  UseSSEProjectActivityReturn,
} from "../types/types";

export const useSSEProjectActivity = (
  projectId: string,
  isEnabled: boolean,
): UseSSEProjectActivityReturn => {
  const [data, setData] = useState<GitHubActivity[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_INTERVAL = 3000; // 3 seconds

  const cleanup = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const connect = useCallback(() => {
    if (!isEnabled || !projectId) {
      return;
    }

    cleanup();
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const eventSource = new EventSource(
        `/api/projects/${projectId}/activity/stream`,
      );
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log(`SSE connected for project ${projectId}`);
        setIsConnected(true);
        setIsError(false);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      eventSource.onmessage = (event) => {
        try {
          const message: SSEMessage = JSON.parse(event.data);
          console.log("SSE message received:", message.type);

          switch (message.type) {
            case "connection":
              setIsLoading(true);
              break;

            case "initial_data":
              if (message.activities) {
                setData(message.activities);
              }
              setIsLoading(false);
              break;

            case "new_activity":
              if (message.activity) {
                setData((currentData) => {
                  if (!currentData) return [message.activity!];

                  // Check if activity already exists to prevent duplicates
                  const exists = currentData.some(
                    (activity) =>
                      activity.githubEventId ===
                      message.activity!.githubEventId,
                  );

                  if (exists) return currentData;

                  // Add new activity to the beginning and limit to 50 items
                  const newData = [message.activity!, ...currentData];
                  return newData.slice(0, 50);
                });
              }
              break;

            default:
              console.log("Unknown SSE message type:", message.type);
          }
        } catch (parseError) {
          console.error("Failed to parse SSE message:", parseError);
        }
      };

      eventSource.onerror = (event) => {
        console.error("SSE connection error:", event);
        setIsConnected(false);
        setIsError(true);
        setError(new Error("SSE connection error"));

        // Attempt to reconnect with exponential backoff
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          const delay =
            RECONNECT_INTERVAL * Math.pow(2, reconnectAttemptsRef.current);
          reconnectAttemptsRef.current++;

          console.log(
            `Attempting to reconnect in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`,
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          console.error("Max reconnection attempts reached");
          setError(
            new Error(
              "Failed to maintain SSE connection after multiple attempts",
            ),
          );
          setIsLoading(false);
        }
      };
    } catch (connectionError) {
      console.error("Failed to establish SSE connection:", connectionError);
      setIsError(true);
      setError(connectionError as Error);
      setIsLoading(false);
      setIsConnected(false);
    }
  }, [projectId, isEnabled, cleanup]);

  // Connect when enabled and project ID is available
  useEffect(() => {
    if (isEnabled && projectId) {
      connect();
    } else {
      cleanup();
      setData(undefined);
      setIsLoading(false);
    }

    return cleanup;
  }, [projectId, isEnabled, connect, cleanup]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  useEffect(() => {
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        // If we're not connected (or the underlying socket has died) start fresh
        if (!isConnected) {
          reconnectAttemptsRef.current = 0; // reset back-off
          connect();
        }
      } else {
        // Tab just became hidden – shut down the stream to save resources
        cleanup();
      }
    };

    // Page Visibility API + window focus events
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);
    window.addEventListener("focus", handleVisibilityOrFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
      window.removeEventListener("focus", handleVisibilityOrFocus);
    };
  }, [isConnected, connect, cleanup]);

  return {
    data,
    isLoading,
    isError,
    error,
    isConnected,
    activityCount: data?.length ?? 0,
    refetch: connect,
  };
};
