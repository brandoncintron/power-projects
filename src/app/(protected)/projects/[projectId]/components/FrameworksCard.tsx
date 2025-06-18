"use client";

import { FileCode2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { technologyIconMap } from "@/lib/technology-icons";

import { FrameworksCardProps } from "@@/projects/types/types";

/* Frameworks Card - Displays the project's frameworks and technologies */
export function FrameworksCard({ frameworks }: FrameworksCardProps) {
  if (!frameworks || frameworks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frameworks & Technologies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {frameworks.map((fw) => (
            <div
              key={fw}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs"
            >
              <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                {technologyIconMap[fw.toLowerCase()] || <FileCode2 size={16} />}
              </div>
              <span className="font-medium">{fw}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
