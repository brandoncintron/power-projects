"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface QuickStatsProps {
  projectCount: number;
  projectApplications?: number;
}

/* Quick Stats - Displays summary statistics for the user's dashboard */
export function QuickStats({
  projectCount,
  projectApplications = 0,
}: QuickStatsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>Your project overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Active Projects</span>
            <span className="text-xl font-semibold">{projectCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Project Applications</span>
            <span className="text-xl font-semibold">{projectApplications}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 