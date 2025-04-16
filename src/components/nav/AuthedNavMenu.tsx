"use client";

import { Home, Grid, Plus, Users, LogOut, User, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLoading } from "@/components/ui/loading-context";
import type { Session } from "next-auth";
import Image from "next/image";
import { useTheme } from "next-themes";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export function AuthedNavMenu({ session }: { session: Session | null }) {
  if (!session) return null;
  const pathname = usePathname();
  const { showLoading } = useLoading();
  const { setOpenMobile } = useSidebar();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Handle the menu item click to close sidebar on mobile
  const handleNavClick = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar className="md:w-[250px]">
      <SidebarHeader className="flex items-center justify-between px-4 py-3">
        <Link href="/" className="no-underline" onClick={handleNavClick}>
          <span className="text-xl font-bold">Power Projects</span>
        </Link>
        <SidebarTrigger className="ml-auto md:hidden" />
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
                  onClick={() => {
                    handleNavClick();
                    showLoading("Loading dashboard...");
                  }}
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
                  !pathname.includes("create-project")
                }
                tooltip="Projects"
                className="px-2 py-1.5"
              >
                <Link
                  href="/projects/browse"
                  onClick={() => {
                    handleNavClick();
                    showLoading("Loading project browser...");
                  }}
                >
                  <Grid className="h-4 w-4 mr-2" />
                  <span>Browse Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname.includes("create-project")}
                tooltip="Create Project"
                className="px-2 py-1.5"
              >
                <Link
                  href="/create-project"
                  onClick={() => {
                    handleNavClick();
                    showLoading("Loading project creation...");
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Create Project</span>
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
              width={32} // Slightly smaller avatar for footer
              height={32}
              className="rounded-full"
              // Basic fallback in case image fails to load
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Prevent infinite loop
                target.src = `https://placehold.co/32x32/e2e8f0/64748b?text=${
                  session.user?.username?.charAt(0) || "U"
                }`; // Placeholder with initial
                target.srcset = ""; // Clear srcset as well
              }}
            />
          ) : (
            // Default user icon if no image
            <User className="h-8 w-8 p-1.5 bg-muted text-muted-foreground rounded-full" />
          )}
          {/* User Name - truncate if too long */}
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
                  onClick={() => {
                    handleNavClick();
                    showLoading("Loading profile...");
                  }}
                >
                  <Users className="h-4 w-4 mr-2" />
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
              className="px-2 py-1.5 w-full justify-start" // Ensure text aligns left
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
                handleNavClick(); // Close mobile sidebar if open
                showLoading("Signing out...");
                signOut(); // Call the sign out function
              }}
              tooltip="Sign Out"
              className="px-2 py-1.5 w-full justify-start text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-400" // Destructive action styling
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
