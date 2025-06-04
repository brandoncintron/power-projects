"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* Project Tasks Card - Placeholder for the future project tasks functionality */
export function ProjectTasksCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">Track tasks and progress here</p>
        </div>
      </CardContent>
    </Card>
  );
}
