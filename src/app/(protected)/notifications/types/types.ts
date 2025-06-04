import { Notification as PrismaNotification } from "@prisma/client";

export type NotificationWithDetails = PrismaNotification & {
  sender?: {
    id: string;
    username: string | null;
    name: string | null;
    image: string | null;
  } | null;
  project?: {
    id: string;
    projectName: string;
  } | null;
};

export interface NotificationsClientProps {
  initialNotifications: NotificationWithDetails[];
  initialError: string | null;
}
