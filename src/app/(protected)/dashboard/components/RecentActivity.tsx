"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5" />
            <div>
              <p className="text-sm font-medium">No recent activity</p>
              <p className="text-xs text-muted-foreground">Check back later for updates</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 