"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { AlertTriangle, Moon, Sun, Github } from "lucide-react";
import { Button } from "./ui/button";
import { useScrollTo } from "../hooks/useScrollTo";
import { useScrollDetection } from "../hooks/useScrollDetection";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import AccessButtons from "@/components/auth/AccessButtons";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const { scrolled } = useScrollDetection(); // Check if user scrolled
  const { scrollToSection } = useScrollTo(); // Scroll to a part on the page
  const { setTheme } = useTheme(); // Dark Mode
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Router for navigation

  // Handle navigation for section links
  const handleNavigation = (sectionId: string) => {
    if (pathname === "/") {
      // If on home page, just scroll
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to home with hash and fromNavigation flag
      router.push(`/?fromNavigation=true&section=${sectionId}`);
    }
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="bg-yellow-100 text-yellow-800 py-2 px-4 w-full z-[60]">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <p className="text-sm font-medium">
              This project is currently in development. Some features may not be
              available.
            </p>
          </div>
        </div>
      </div>
      <nav
        className={`w-full bg-background transition-all duration-200 py-4 ${
          scrolled ? "border-b shadow-sm" : ""
        }`}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8">
          <div className="flex items-center">
            <Link href="/" className="no-underline">
              <span className="text-2xl font-bold">Power Projects</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button
              className="no-underline cursor-pointer"
              onClick={() => handleNavigation("top")}
            >
              <span className="text-base">Home</span>
            </button>
            <button
              className="no-underline cursor-pointer"
              onClick={() => handleNavigation("features")}
            >
              <span className="text-base">Features</span>
            </button>
            {/* Temporary toast for project board */}
            <Link
              href="#"
              onClick={() =>
                toast.warning(
                  "This feature is not yet implemented. Check back soon!",
                  {
                    duration: 3000,
                    position: "bottom-right",
                  }
                )
              }
              className="no-underline cursor-pointer"
            >
              <span className="text-base">Project Board</span>
            </Link>
            <Link
              href="/submit-project"
              className="no-underline cursor-pointer"
            >
              <span className="text-base">Submit Project</span>
            </Link>
            <button
              className="no-underline cursor-pointer"
              onClick={() => handleNavigation("about")}
            >
              <span className="text-base">About</span>
            </button>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            <AccessButtons />

            <Link
              href="https://github.com/brandoncintron/power-projects"
              target="_blank"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github size={20} />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Hamburger Menu */}
          <MobileNavbar handleNavigation={handleNavigation} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
