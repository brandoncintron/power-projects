"use client";

import { Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


{/* 
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case 'invite':
      return <UserPlus className="h-4 w-4 text-purple-500" />;
    case 'application':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const formatTimestamp = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInMinutes < 1440) { // less than a day
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};*/}

export function NotificationsSection() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="px-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-1.5">
            <Bell className="h-4 w-4" />
            Recent Notifications
          </CardTitle>
          
          {/* <Button variant="outline" size="sm" className="h-7 text-xs px-3">
            Mark all as read
          </Button> */}
        
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center justify-center py-6 text-sm text-muted-foreground">
          No notifications yet.
        </div>

        <div className="mt-3 flex justify-end">
          
          {/* <Link href="/notifications">
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-blue-600 hover:text-blue-800">
              View all notifications
            </Button>
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
} 