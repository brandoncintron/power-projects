"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { HideLoading } from "@/components/HideLoading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/components/ui/loading-context";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

import { useNotificationPagination } from "@@/notifications/hooks/useNotificationPagination";
import { useNotificationSearch } from "@@/notifications/hooks/useNotificationSearch";
import { NotificationsClientProps } from "@@/notifications/types/types";
import { getNotificationIcon } from "@@/notifications/utils/getNotificationIcon";

export function NotificationsClient({
  initialNotifications,
  initialError,
}: NotificationsClientProps) {
  const { showLoading } = useLoading();

  // First, get the filtered notifications from search
  const { searchQuery, filteredNotifications, handleSearchChange } =
    useNotificationSearch(initialNotifications);

  // Then, use those filtered notifications for pagination
  const {
    currentPage,
    paginatedNotifications,
    totalPages,
    handlePageChange,
    resetPage,
  } = useNotificationPagination(filteredNotifications);

  // Update search hook to use resetPage function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e);
    resetPage();
  };

  return (
    <main className="py-6 px-4 md:px-6 min-h-screen">
      <HideLoading />
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        <Card className="rounded-4xl p-4 sm:p-6 border-0">
          <CardHeader className="px-2 sm:px-4 pb-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-2xl font-semibold">
                Notifications
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search notifications"
                    className="pl-9 h-10 w-full sm:w-[250px]"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <Separator className="mb-4" />

            {initialError && (
              <div className="text-center py-8">
                <p className="text-destructive">{initialError}</p>
              </div>
            )}

            {!initialError && paginatedNotifications.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No notifications match your search"
                    : "No notifications to display"}
                </p>
              </div>
            )}

            {!initialError && paginatedNotifications.length > 0 && (
              <div className="divide-y">
                {paginatedNotifications.map((notification) => (
                  <div key={notification.id} className="first:pt-0 py-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={notification.sender?.image || ""} />
                        <AvatarFallback className="bg-gray-100 text-gray-800">
                          {notification.sender?.name?.charAt(0) ||
                            notification.sender?.username?.charAt(0) ||
                            "?"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(notification.createdAt)}
                          </span>
                        </div>

                        <div className="flex items-start gap-1">
                          {getNotificationIcon(notification.type)}
                          <p className="text-sm">
                            {notification.title}
                            {notification.project && (
                              <>
                                {" "}
                                -{" "}
                                <span className="font-medium">
                                  {notification.project.projectName}
                                </span>
                              </>
                            )}
                          </p>
                        </div>

                        {notification.content && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.content}
                          </p>
                        )}

                        <div className="flex gap-2 mt-2">
                          {notification.projectId && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-8 px-3 text-xs"
                              asChild
                            >
                              <Link
                                href={`/projects/${notification.projectId}`}
                                onClick={() =>
                                  showLoading("Loading project details...")
                                }
                              >
                                View project
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="py-6">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => handlePageChange(pageNum)}
                            isActive={pageNum === currentPage}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
