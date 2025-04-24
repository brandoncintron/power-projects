import { auth } from "@/auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HideLoading } from "@/components/HideLoading";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter, Search } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { getNotificationIcon } from "./utils/getNotificationIcon";
import { NotificationWithDetails } from "./NotificationTypes";

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  // Await searchParams to access its properties
  const { page: pageStr } = await searchParams;

  // Parse the values after awaiting
  const page = pageStr ? parseInt(pageStr, 10) : 1;

  // Parse pagination parameters
  const pageSize = 5;
  const skip = (page - 1) * pageSize;

  // Fetch total count for pagination
  const totalCount = await db.notification.count({
    where: { userId },
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  // Fetch notifications with pagination and sorting
  let notifications: NotificationWithDetails[] = [];
  let error = null;

  try {
    notifications = await db.notification.findMany({
      where: { userId },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            image: true,
          },
        },
        project: {
          select: {
            id: true,
            projectName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: pageSize,
    });
  } catch (e) {
    console.error("Error fetching notifications:", e);
    error = "Could not load notifications. Please try again later.";
  }

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
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <Separator className="mb-4" />

            {error && (
              <div className="py-8 text-center">
                <p className="text-red-500">{error}</p>
              </div>
            )}

            {!error && notifications.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  No notifications to display
                </p>
              </div>
            )}

            {!error && notifications.length > 0 && (
              <div className="divide-y">
                {notifications.map((notification) => (
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
                          <div className="flex items-center gap-2">
                            {notification.sender?.username && (
                              <span className="text-xs text-muted-foreground">
                                @{notification.sender.username}
                              </span>
                            )}
                          </div>
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
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={`/notifications?page=${page - 1}`}
                        />
                      </PaginationItem>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href={`/notifications?page=${pageNum}`}
                            isActive={pageNum === page}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href={`/notifications?page=${page + 1}`}
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
