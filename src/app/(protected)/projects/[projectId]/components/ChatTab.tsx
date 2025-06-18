"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* Project Chat Card - Placeholder for the future chat functionality */
export function ChatTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Chat functionality coming soon
          </p>
          <p className="text-sm text-muted-foreground">
            Communicate with your team here
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
