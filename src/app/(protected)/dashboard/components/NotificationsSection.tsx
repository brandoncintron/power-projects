"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationWithDetails } from "@/app/(protected)/notifications/NotificationTypes";
import { getNotificationIcon } from "@/app/(protected)/notifications/utils/getNotificationIcon";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useLoading } from "@/components/ui/loading-context";

interface NotificationsSectionProps {
  notifications: NotificationWithDetails[];
  totalCount: number;
}

export function NotificationsSection({
  notifications,
  totalCount,
}: NotificationsSectionProps) {
  const { showLoading } = useLoading();
  const recentNotifications = notifications.slice(0, 5);
  const hasMoreNotifications = totalCount > 5;

  return (
    <Card className="shadow-sm">
      <CardHeader className="px-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-1.5">
            <Bell className="h-4 w-4" />
            Recent Notifications
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="rounded-md p-6 pt-0">
        {recentNotifications.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
            No notifications yet.
          </div>
        ) : (
          <>
            <div className="divide-y">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="py-4">
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
                        {notification.projectId &&
                          notification.type !== "APPLICATION_REJECTED" && (
                            <Button
                              size="sm"
                              variant="default"
                              className="text-xs"
                              asChild
                            >
                              <Link
                                href={`/projects/${notification.projectId}`}
                                onClick={() =>
                                  showLoading("Loading project details...")
                                }
                              >
                                View Project
                              </Link>
                            </Button>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreNotifications && (
              <div className="mt-3 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs px-2 text-blue-600 hover:text-blue-800"
                  asChild
                >
                  <Link
                    href="/notifications"
                    onClick={() => showLoading("Loading all notifications...")}
                  >
                    View all notifications
                  </Link>
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
