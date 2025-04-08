"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DescriptionCardProps {
  description: string;
}

/* Description Card - Displays the project description */
export function DescriptionCard({ description }: DescriptionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
} 