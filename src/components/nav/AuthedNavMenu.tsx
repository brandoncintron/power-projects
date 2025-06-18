"use client";

import {
  Bell,
  Folder,
  Grid,
  Home,
  LogOut,
  Moon,
  Plus,
  Sun,
  User,
  UserCircle,
} from "lucide-react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLoading } from "@/components/ui/loading-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AuthedNavMenu({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { showLoading } = useLoading();
  const { setOpenMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  if (!session) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Only show loading if navigating to a new path
  const handleNavWithLoading = (path: string, loadingMessage: string) => {
    setOpenMobile(false);
    if (pathname !== path) {
      showLoading(loadingMessage);
    }
  };

  return (
    <Sidebar className="md:w-[250px] p-0">
      <SidebarHeader className="flex items-center justify-between px-4 pt-4 pb-0">
        <Link
          href="/"
          className="no-underline"
          onClick={() => handleNavWithLoading("/", "Loading home...")}
        >
          <div className="h-[50px] w-[175px] flex items-center justify-center overflow-hidden">
            <span className="text-2xl font-bold">Power Projects</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/dashboard"}
                tooltip="Dashboard"
                className="px-2 py-1.5"
              >
                <Link
                  href="/dashboard"
                  onClick={() =>
                    handleNavWithLoading("/dashboard", "Loading dashboard...")
                  }
                >
                  <Home className="h-4 w-4 mr-2" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
            Projects
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname.startsWith("/projects") &&
                  !pathname.includes("create-project") &&
                  !pathname.includes("my-projects") &&
                  !pathname.includes("inbox") &&
                  !pathname.includes("notifications")
                }
                tooltip="Projects"
                className="px-2 py-1.5"
              >
                <Link
                  href="/projects/browse"
                  onClick={() =>
                    handleNavWithLoading(
                      "/projects/browse",
                      "Loading project browser...",
                    )
                  }
                >
                  <Grid className="h-4 w-4 mr-2" />
                  <span>Browse Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.includes("my-projects")}
                tooltip="My Projects"
                className="px-2 py-1.5"
              >
                <Link
                  href="/projects/my-projects"
                  onClick={() =>
                    handleNavWithLoading(
                      "/projects/my-projects",
                      "Loading your projects...",
                    )
                  }
                >
                  <Folder className="h-4 w-4 mr-2" />
                  <span>My Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.includes("create")}
                tooltip="Create Project"
                className="px-2 py-1.5"
              >
                <Link
                  href="/create"
                  onClick={() =>
                    handleNavWithLoading(
                      "/create",
                      "Loading project creation...",
                    )
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Create Project</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
            Notifications
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/notifications"}
                tooltip="Inbox"
                className="px-2 py-1.5"
              >
                <Link
                  href="/notifications"
                  onClick={() =>
                    handleNavWithLoading(
                      "/notifications",
                      "Loading notifications...",
                    )
                  }
                >
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-3 mt-auto">
        {/* User Profile Display */}
        <div className="flex items-center gap-3 mb-3 px-2 py-1.5">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/32x32/e2e8f0/64748b?text=${
                  session.user?.username?.charAt(0) || "U"
                }`;
                target.srcset = "";
              }}
            />
          ) : (
            <User className="h-8 w-8 p-1.5 bg-muted text-muted-foreground rounded-full" />
          )}
          <span className="text-sm font-medium truncate">
            {session.user?.username || "User"}
          </span>
        </div>

        {/* Footer Menu Items */}
        <SidebarMenu>
          {/* Theme Toggle Button */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/profile")}
              tooltip="Profile"
              className="px-2 py-1.5"
            >
              <Link
                href="/profile/edit"
                onClick={() =>
                  handleNavWithLoading("/profile/edit", "Loading profile...")
                }
              >
                <UserCircle className="h-4 w-4 mr-2" />
                <span>Edit Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              tooltip={
                theme === "dark"
                  ? "Switch to Light Mode"
                  : "Switch to Dark Mode"
              }
              className="px-2 py-1.5 w-full justify-start"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 mr-2" />
              ) : (
                <Moon className="h-4 w-4 mr-2" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Sign Out Button */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                handleNavWithLoading("/", "Signing out...");
                signOut({ redirectTo: "/" });
              }}
              tooltip="Sign Out"
              className="px-2 py-1.5 w-full justify-start text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
