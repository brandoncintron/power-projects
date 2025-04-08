"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Owner {
  id: string;
  username: string | null;
  image: string | null;
}

interface TeamMembersCardProps {
  owner: Owner;
  // TODO: Add collaborators when implemented
}

/* Team Members Card - Displays project team members starting with the owner */
export function TeamMembersCard({ owner }: TeamMembersCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              {owner?.username?.[0] || "U"}
            </div>
            <div>
              <p className="font-medium">{owner?.username}</p>
              <p className="text-sm text-muted-foreground">Owner</p>
            </div>
          </div>
          {/* TODO: Add collaborators list */}
        </div>
      </CardContent>
    </Card>
  );
}