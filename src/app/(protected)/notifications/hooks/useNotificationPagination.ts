import { useState } from "react";

import { NotificationWithDetails } from "@@/notifications/types/types";

/**
 * Hook to handle notification pagination
 * @param notifications The list of notifications to paginate
 * @param pageSize Number of items per page
 * @returns Object containing pagination state and functions
 */
export function useNotificationPagination(
  notifications: NotificationWithDetails[],
  pageSize: number = 5,
) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(notifications.length / pageSize);

  // Get notifications for current page
  const paginatedNotifications = (() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return notifications.slice(startIndex, endIndex);
  })();

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of notification list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1
  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    paginatedNotifications,
    totalPages,
    handlePageChange,
    resetPage,
  };
}
