"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* Scrum Board Card - Placeholder for the future scrum board functionality */
export function ScrumBoardCard() {
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