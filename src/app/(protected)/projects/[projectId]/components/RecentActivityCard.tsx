"use client";

import { Activity, CircleUser, GitCommit, MessageSquare } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ActivityItem, RecentActivityCardProps } from "@@/projects/types/types";

/* Recent Activity Card - Displays the most recent project activities */
export function RecentActivityCard({
  activities = [],
}: RecentActivityCardProps) {
  // Placeholder activities for now
  const placeholderActivities: ActivityItem[] =
    activities.length > 0
      ? activities
      : [
          {
            id: "1",
            type: "join",
            user: { name: "Alex Chen" },
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            content: "joined the project",
          },
          {
            id: "2",
            type: "commit",
            user: { name: "Maria Lopez" },
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            content: "pushed 3 commits to main",
          },
          {
            id: "3",
            type: "comment",
            user: { name: "Jordan Taylor" },
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            content: 'commented on task "Implement user authentication"',
          },
        ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare size={16} className="text-blue-500" />;
      case "commit":
        return <GitCommit size={16} className="text-green-500" />;
      case "join":
        return <CircleUser size={16} className="text-purple-500" />;
      default:
        return <Activity size={16} className="text-orange-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000; // seconds in a year
    if (interval > 1) return Math.floor(interval) + "y ago";

    interval = seconds / 2592000; // seconds in a month
    if (interval > 1) return Math.floor(interval) + "mo ago";

    interval = seconds / 86400; // seconds in a day
    if (interval > 1) return Math.floor(interval) + "d ago";

    interval = seconds / 3600; // seconds in an hour
    if (interval > 1) return Math.floor(interval) + "h ago";

    interval = seconds / 60; // seconds in a minute
    if (interval > 1) return Math.floor(interval) + "m ago";

    return Math.floor(seconds) + "s ago";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity size={18} />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {placeholderActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
            >
              <div className="mt-1">{getActivityIcon(activity.type)}</div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
