"use client";

import { UserProfileProps } from "@@/dashboard/types/types";

/* User Profile - Displays user's avatar and personal information */
export function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || "Username not set"}
        </h1>
      </div>
    </div>
  );
}
