import { Settings, User } from "lucide-react";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

const UserOptionsMenu = ({ session }: { session: Session | null }) => {
  // If no session, return null
  if (!session) return null;
  console.log(session)

  // If there is a session, show the user options menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <User className="h-5 w-5" />
        )}
        <span className="text-sm">
          {session.user?.username || "Username not set"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a
            href="/profile/edit"
            className="cursor-pointer flex w-full items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => signOut({ redirectTo: "/" })}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptionsMenu;
