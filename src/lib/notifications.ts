import { NotificationType } from "@prisma/client";

import { db } from "@/lib/db";

type CreateNotificationParams = {
  userId: string;
  type: NotificationType;
  title: string;
  content?: string;
  projectId?: string;
  senderId?: string;
};

export async function createNotification({
  userId,
  type,
  title,
  content,
  projectId,
  senderId,
}: CreateNotificationParams) {
  return db.notification.create({
    data: {
      userId,
      type,
      title,
      content,
      projectId,
      senderId,
    },
  });
}
