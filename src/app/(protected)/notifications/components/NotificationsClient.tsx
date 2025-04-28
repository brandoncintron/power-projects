"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { getNotificationIcon } from "../utils/getNotificationIcon";
import { NotificationWithDetails } from "../NotificationTypes";
import { HideLoading } from "@/components/HideLoading";
import { useLoading } from "@/components/ui/loading-context";

interface NotificationsClientProps {
  initialNotifications: NotificationWithDetails[];
  initialError: string | null;
}

export function NotificationsClient({ 
  initialNotifications, 
  initialError 
}: NotificationsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { showLoading } = useLoading();
  
  const pageSize = 5;

  // Get notifications for current page
  const getCurrentPageNotifications = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    // Filter by search query if provided
    const filteredNotifications = searchQuery 
      ? initialNotifications.filter(notification => 
          notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notification.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notification.project?.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : initialNotifications;
    
    return filteredNotifications.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of notification list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const currentNotifications = getCurrentPageNotifications();
  const filteredNotifications = searchQuery 
    ? initialNotifications.filter(notification => 
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.project?.projectName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : initialNotifications;
  
  const filteredTotalPages = Math.ceil(filteredNotifications.length / pageSize);

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
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <Separator className="mb-4" />

            {initialError && (
              <div className="py-8 text-center">
                <p className="text-red-500">{initialError}</p>
              </div>
            )}

            {!initialError && currentNotifications.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  {searchQuery ? "No notifications match your search" : "No notifications to display"}
                </p>
              </div>
            )}

            {!initialError && currentNotifications.length > 0 && (
              <div className="divide-y">
                {currentNotifications.map((notification) => (
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
                                onClick={() => showLoading("Loading project details...")}
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

            {filteredTotalPages > 1 && (
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

                    {Array.from({ length: filteredTotalPages }, (_, i) => i + 1).map(
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
                      )
                    )}

                    {currentPage < filteredTotalPages && (
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