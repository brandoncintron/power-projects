"use client";

import { Github } from "lucide-react";
import Link from "next/link";

import AlertBanner from "@/components/AlertBanner";
import AccessButtons from "@/components/auth/AccessButtons";
import { useScrollDetection } from "@/components/nav/hooks/useScrollDetection";
import MobileNavbar from "@/components/nav/MobileNavbar";
import NavLinks from "@/components/nav/NavLinks";
import ThemeSelector from "@/components/nav/ThemeSelector";

const Navbar = () => {
  const { scrolled } = useScrollDetection(); // Check if user scrolled

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <AlertBanner />
      <nav
        className={`w-full bg-white transition-all duration-200 py-4 dark:bg-[#161722] ${
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
          <NavLinks />

          {/* Desktop Navbar Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            <AccessButtons />

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
          <MobileNavbar />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
