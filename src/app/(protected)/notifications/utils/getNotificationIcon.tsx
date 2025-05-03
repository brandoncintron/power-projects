import { NotificationType } from "@prisma/client";
import {
  Bell,
  CheckCircle,
  Clock,
  MessageSquare,
  UserPlus,
  X,
} from "lucide-react";

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case "APPLICATION_ACCEPTED":
      return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    case "APPLICATION_REJECTED":
      return <X className="h-4 w-4 text-red-500" />;
    case "APPLICATION_SENT":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "COLLABORATION_INVITE":
      return <UserPlus className="h-4 w-4 text-indigo-500" />;
    case "MESSAGE":
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case "PROJECT_UPDATE":
    case "MENTION":
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};
