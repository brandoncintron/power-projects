import { useState } from "react";

import { NotificationWithDetails } from "@@/notifications/types/types";

/**
 * Hook to handle notification search functionality
 * @param notifications The full list of notifications to filter
 * @returns Object containing search state and filtered notifications
 */
export function useNotificationSearch(
  notifications: NotificationWithDetails[],
) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter notifications by search query
  const filteredNotifications = searchQuery
    ? notifications.filter(
        (notification) =>
          notification.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.content
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          notification.project?.projectName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
    : notifications;

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    filteredNotifications,
    handleSearchChange,
  };
}
