import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NotificationWithDetails } from "./NotificationTypes";
import { NotificationsClient } from "./components/NotificationsClient";

export default async function NotificationsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let notifications: NotificationWithDetails[] = [];
  let error: string | null = null;

  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Fetch notifications for the user (limited to 25 most recent)
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
      take: 25, // Limit to 25 notifications
    });
  } catch (e) {
    console.error("Error fetching notifications:", e);
    error = "Could not load notifications. Please try again later.";
  }

  return (
    <NotificationsClient 
      initialNotifications={notifications} 
      initialError={error} 
    />
  );
}
