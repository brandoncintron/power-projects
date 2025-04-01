import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, LogOut, Menu, Moon, Settings, Sun, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import MobileNavLinks from "@/components/nav/MobileNavLinks";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Session } from "next-auth";

interface MobileNavbarProps {
  session: Session | null;
}

const MobileNavbar = ({ session }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useAuthDialog();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu size={24} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full p-0 max-w-sm overflow-auto"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <SheetTitle>
                <VisuallyHidden>
                  <SheetDescription />
                </VisuallyHidden>
                <Link
                  href="/"
                  className="no-underline font-bold text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  Power Projects
                </Link>
              </SheetTitle>
            </div>

            {/* Mobile navigation links */}
            <div className="flex-grow">
              <div className="flex flex-col divide-y">
                <MobileNavLinks setIsOpen={setIsOpen} />
              </div>
            </div>

            {/* Theme toggle and GitHub link */}
            <div className="p-2 space-y-4 border-t">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg font-medium">GitHub</span>
                <Github size={20} className="text-gray-400" />
              </Link>

              <button
                onClick={toggleTheme}
                className="flex items-center justify-between py-4 px-6 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg font-medium">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
                {theme === "dark" ? (
                  <Sun size={20} className="text-gray-400" />
                ) : (
                  <Moon size={20} className="text-gray-400" />
                )}
              </button>
            </div>

            <div className="p-4 space-y-4 border-t">
              {/* Login/register buttons for unauthenticated users */}
              {!session ? (
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full py-6 text-base border-gray-300 dark:border-gray-700 font-medium"
                    onClick={() => {
                      setIsOpen(false);
                      open("signin");
                    }}
                  >
                    Sign In
                  </Button>

                  <Button
                    className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium"
                    onClick={() => {
                      setIsOpen(false);
                      open("signup");
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {/* User profile display */}
                  <div className="flex items-center gap-3 p-2">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-10 w-10 p-2 bg-gray-100 dark:bg-gray-800 rounded-full" />
                    )}
                    <span className="text-lg font-medium">
                      {session.user?.name || "User"}
                    </span>
                  </div>

                  {/* Dashboard link */}
                  <Link href="/dashboard" className="block">
                    <Button
                      variant="outline"
                      className="w-full py-6 text-base border-gray-300 dark:border-gray-700 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>

                  {/* Profile settings link */}
                  <Link href="/profile" className="block">
                    <Button
                      variant="outline"
                      className="w-full py-6 text-base border-gray-300 dark:border-gray-700 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>

                  {/* Sign out button */}
                  <Button
                    variant="destructive"
                    className="w-full py-6 text-base font-medium"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ redirectTo: "/" });
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
