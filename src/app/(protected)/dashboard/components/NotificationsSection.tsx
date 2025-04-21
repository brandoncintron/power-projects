"use client";

import { Bell, MessageSquare, UserPlus, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Notification {
  id: string;
  type: 'message' | 'invite' | 'application';
  content: string;
  timestamp: Date;
  read: boolean;
}

// Mock notifications for visual display
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'message',
    content: 'New message from Alex in React Dashboard project',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    read: false
  },
  {
    id: '2',
    type: 'invite',
    content: 'Sophia invited you to collaborate on AI Chat App',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false
  },
  {
    id: '3',
    type: 'application',
    content: 'Your application for E-commerce Platform was accepted',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true
  },
  {
    id: '4',
    type: 'message',
    content: 'Justin commented on your task in Mobile App project',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true
  }
];

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
};

export function NotificationsSection() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base flex items-center gap-1.5">
            <Bell className="h-4 w-4" />
            Recent Notifications
          </CardTitle>
          <Button variant="outline" size="sm" className="h-7 text-xs px-3">
            Mark all as read
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-3">
        {mockNotifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-2 text-sm">No notifications yet</p>
        ) : (
          <ul className="space-y-2">
            {mockNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`flex items-start gap-2 p-2 rounded-md transition-colors ${
                  notification.read ? 'bg-transparent' : 'bg-muted/40'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs ${notification.read ? 'text-muted-foreground' : 'font-medium'}`}>
                    {notification.content}
                  </p>
                  <span className="text-[10px] text-muted-foreground">
                    {formatTimestamp(notification.timestamp)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex justify-end">
          <Link href="/notifications">
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-blue-600 hover:text-blue-800">
              View all notifications
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 