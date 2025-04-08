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
  collaboratingCount?: number;
  pendingInvites?: number;
}

export function QuickStats({
  projectCount,
  collaboratingCount = 0,
  pendingInvites = 0,
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
            <span className="text-muted-foreground">Collaborating On</span>
            <span className="text-xl font-semibold">{collaboratingCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Pending Invites</span>
            <span className="text-xl font-semibold">{pendingInvites}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 