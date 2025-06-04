"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ProfilePictureProps } from "@@/profile/edit/types/types";

export function ProfilePicture({ image, name }: ProfilePictureProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <Avatar className="h-16 w-16">
        <AvatarImage src={image || ""} alt="User Profile Picture" />
        <AvatarFallback>{name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
      </Avatar>
    </div>
  );
}
