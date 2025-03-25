"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Github } from 'lucide-react';
import { useScrollTo } from '../../hooks/useScrollTo';
import { useScrollDetection } from '../../hooks/useScrollDetection';
import { NavLinkType } from '@/types/navigation';
import { Session } from 'next-auth';


import MobileHamburger from './components/MobileHamburger';
import ThemeSelector from './components/ThemeSelector';
import DevelopmentBanner from './components/DevelopmentBanner';
import AccessButtons from './components/AccessButtons';
import NavLinkItem from './components/NavLink';
import UserOptionsMenu from './components/UserOptionsMenu';

/**
 * Navigation link configuration for navbar
 * 
 * Defines the main navigation items with their types and behaviors:
 * - scroll: Links that scroll to a section on the page
 * - toast: Links that show a toast message (typically for not-yet-implemented features)
 * - link-authOnly: Links that require authentication
 */
const navLinks: NavLinkType[] = [
  { type: "scroll", id: "top", label: "Home" },
  { type: "scroll", id: "features", label: "Features" },
  { type: "toast", label: "Project Board", message: "This feature is not yet implemented. Check back soon!" },
  { type: "link-authOnly", label: "Submit Project", message: "Please sign in to submit a project" },
  { type: "scroll", id: "about", label: "About" },
];

/**
 * Navbar Component - Main navigation bar for the application
 * 
 * Provides navigation links, auth controls, and utility features like theme selection. 
 * It adapts between desktop and mobile views and responds to scroll events by changing its appearance.
 * 
 * @param {Session | null} session - The user's authentication session
 */

const Navbar = ({ session }: { session: Session | null }) => {
  const { scrolled } = useScrollDetection(); // Check if user scrolled
  const { scrollToSection } = useScrollTo(); // Scroll to a part on the page
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Router for navigation

  /**
   * Handles navigation for section links
   * 
   * Either scrolls to the section if on the homepage, or
   * navigates to the homepage with a section query parameter
   * 
   * @param {string} sectionId - ID of the section to scroll to
   */
  
  const handleNavigation = (sectionId: string) => {
    // If on home page, scroll to section, otherwise navigate to home with query params
    if (pathname === '/') {
      scrollToSection(sectionId);
    } else {
      router.push(`/?section=${sectionId}&foreignPage=true`);
    }
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      {/* Development environment banner */}
      <DevelopmentBanner />
      
      {/* Main navigation bar */}
      <nav className={`w-full bg-background transition-all duration-200 py-4 ${scrolled ? 'border-b shadow-sm' : ''}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="no-underline">
              <span className="text-2xl font-bold">Power Projects</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <NavLinkItem key={link.label} link={link} session={session} />
            ))}
          </div>

          {/* Desktop Access & Utility Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Display either login buttons or user menu depending on auth state */}
            {!session ? (
              <AccessButtons />
            ) : (
              <UserOptionsMenu session={session} />
            )}

            {/* GitHub repository link */}
            <Link
              href="https://github.com/brandoncintron/power-projects"
              target="_blank"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github size={20} />
            </Link>

            {/* Theme selector (light/dark mode) */}
            <ThemeSelector />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <MobileHamburger
              handleNavigation={handleNavigation}
              navLinks={navLinks}
              session={session}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 