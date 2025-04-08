"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDatabaseIcon } from "@/lib/language-icons";

interface DatabasesCardProps {
  databases: string[];
}

/* Databases Card - Displays the project's database technologies */
export function DatabasesCard({ databases }: DatabasesCardProps) {
  if (!databases || databases.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Databases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {databases.map((db) => (
            <div
              key={db}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                {getDatabaseIcon(db)}
              </div>
              <span className="font-medium">{db}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 