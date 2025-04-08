"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  user: {
    username?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

/* User Profile - Displays user's avatar and personal information */
export function UserProfile({ user }: UserProfileProps) {
  if (!user) return null;
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={user?.image || ""}
          alt={user?.username || "User"}
        />
        <AvatarFallback>
          {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-bold">
          {user?.username || "Username not set"}
        </h1>
        <p className="text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  );
} 