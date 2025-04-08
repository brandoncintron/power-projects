"use client";

import type { Session } from "next-auth";

import Link from "next/link";
import { Github } from "lucide-react";

import { useScrollDetection } from "@/hooks/useScrollDetection";

import AccessButtons from "@/components/auth/AccessButtons";
import MobileNavbar from "@/components/nav/MobileNavbar";
import UserOptionsMenu from "@/components/auth/UserOptionsMenu";
import NavLinks from "@/components/nav/NavLinks";
import ThemeSelector from "@/components/nav/ThemeSelector";
import AlertBanner from "@/components/AlertBanner";

const Navbar = ({ session }: { session: Session | null }) => {
  const { scrolled } = useScrollDetection(); // Check if user scrolled

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <AlertBanner />
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

          {/* Desktop Navbar Links */}
          <NavLinks session={session} />

          {/* Desktop Navbar Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            {!session ? <AccessButtons /> : <UserOptionsMenu session={session} />}

            <Link
              href="https://github.com/brandoncintron/power-projects"
              target="_blank"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github size={20} />
            </Link>

            <ThemeSelector />
          </div>

          {/* Mobile Hamburger Menu */}
          <MobileNavbar session={session} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
