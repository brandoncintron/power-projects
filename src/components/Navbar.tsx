"use client"

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from "next-themes"
import { Menu, AlertTriangle, ChevronRight, Moon, Sun, Github } from 'lucide-react';
import { Button } from "./ui/button";
import { useScrollTo } from '../hooks/useScrollTo';
import { useScrollDetection } from '../hooks/useScrollDetection';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "./ui/sheet";
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For shadcn mobile hamburger menu
  const { scrolled } = useScrollDetection(); // Check if user scrolled
  const { scrollToSection } = useScrollTo(); // Scroll to a part on the page
  const { setTheme } = useTheme(); // Dark Mode
  const pathname = usePathname(); // Get current path
  const router = useRouter(); // Router for navigation
  const isHomePage = pathname === '/' || pathname === '/home';

  // Handle navigation for section links
  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      // If on home page, just scroll
      scrollToSection(sectionId);
    } else {
      // If on another page, navigate to home with hash and fromNavigation flag
      router.push(`/home?fromNavigation=true&section=${sectionId}`);
    }
  };

  return (
    <div className="flex flex-col w-full sticky top-0 z-50">
      <div className="bg-yellow-100 text-yellow-800 py-2 px-4 w-full z-[60]">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} />
            <p className="text-sm font-medium">This project is currently in development. Some features may not be available.</p>
          </div>
        </div>
      </div>
      <nav className={`w-full bg-background transition-all duration-200 py-4 ${scrolled ? 'border-b shadow-sm' : ''}`}>
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8">
          <div className="flex items-center">
            <Link href="/" className="no-underline">
              <span className="text-2xl font-bold">Power Projects</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <button className="no-underline cursor-pointer" onClick={() => handleNavigation('top')}>
              <span className="text-base">Home</span>
            </button>
            <button className="no-underline cursor-pointer" onClick={() => handleNavigation('features')}>
              <span className="text-base">Features</span>
            </button>
            {/* Temporary toast for project board */}
            <Link href="#" onClick={() => toast.warning("This feature is not yet implemented. Check back soon!", {
              duration: 3000,
              position: "bottom-right",
            })} className="no-underline cursor-pointer">
              <span className="text-base">Project Board</span>
            </Link>
            <Link href="/submit-project" className="no-underline cursor-pointer">
              <span className="text-base">Submit Project</span>
            </Link>
            <button className="no-underline cursor-pointer" onClick={() => handleNavigation('about')}>
              <span className="text-base">About</span>
            </button>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/accounts/signin" className="no-underline">
              <span className="text-base">Sign In</span>
            </Link>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 cursor-pointer">
              <Link href="/accounts/signup">Get Started</Link>
            </Button>

            <Link
              href="https://github.com/brandoncintron/power-projects"
              target="_blank"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github size={20} />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="cursor-pointer">
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
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full p-0 max-w-sm overflow-auto">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <SheetTitle>
                      <Link href="/" className="no-underline font-bold text-xl" onClick={() => setIsOpen(false)}>
                        Power Projects
                      </Link>
                    </SheetTitle>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col divide-y">
                      <button
                        onClick={() => {
                          handleNavigation('top');
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Home</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        onClick={() => {
                          handleNavigation('features');
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Features</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Project Board</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <Link
                        href="/submit-project"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Submit Project</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </Link>

                      <button
                        onClick={() => {
                          handleNavigation('about');
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">About</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

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
                    </div>
                  </div>

                  <div className="p-4 space-y-4 border-t">
                    <Link href="/accounts/signin" className="block">
                      <Button
                        variant="outline"
                        className="w-full py-6 text-base border-gray-300 dark:border-gray-700 font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/accounts/signup" className="block">
                      <Button
                        className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar; 