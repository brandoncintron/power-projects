"use client";

import { FileCode2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { technologyIconMap } from "@/lib/technology-icons";

import { DatabasesCardProps } from "@@/projects/types/types";

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
                {technologyIconMap[db.toLowerCase()] || <FileCode2 size={16} />}
              </div>
              <span className="font-medium">{db}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
