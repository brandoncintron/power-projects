"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Access your tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/create-project">
            <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
              <p className="text-sm font-medium">Create Project</p>
              <p className="text-xs text-muted-foreground">Start a new project</p>
            </div>
          </Link>
          <Link href="/projects/browse">
            <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
              <p className="text-sm font-medium">Browse Projects</p>
              <p className="text-xs text-muted-foreground">Find projects to join</p>
            </div>
          </Link>
          <button>
            <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
              <p className="text-sm font-medium">Inbox</p>
              <p className="text-xs text-muted-foreground">Check messages</p>
            </div>
          </button>
          <button>
            <div className="p-3 rounded-lg border hover:bg-muted transition-colors cursor-pointer">
              <p className="text-sm font-medium">Scrum Board</p>
              <p className="text-xs text-muted-foreground">Manage tasks</p>
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
} 