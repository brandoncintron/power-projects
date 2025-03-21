"use client"

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from "next-themes"
import { Menu, AlertTriangle, ChevronRight, Moon, Sun } from 'lucide-react';
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For shadcn mobile hamburger menu
  const { scrolled } = useScrollDetection(); // Check if user scrolled
  const { scrollToSection } = useScrollTo(); // Scroll to a part on the page
  const { setTheme } = useTheme(); // Dark Mode

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
            <button className="no-underline" onClick={() => scrollToSection('top')}>
              <span className="text-base">Home</span>
            </button>
            <button className="no-underline" onClick={() => scrollToSection('features')}>
              <span className="text-base">Features</span>
            </button>
            <Link href="" className="no-underline">
              <span className="text-base">Project Board</span>
            </Link>
            <button className="no-underline" onClick={() => scrollToSection('about')}>
              <span className="text-base">About</span>
            </button>
            <Link href="" className="no-underline">
              <span className="text-base">Contact</span>
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-6">

            <Link href="/signin" className="no-underline">
              <span className="text-base">Sign In</span>
            </Link>

            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3">
              Get Started
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
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
                        onClick={() => scrollToSection('top')}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Home</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        onClick={() => scrollToSection('features')}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Features</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Project Board</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        onClick={() => scrollToSection('features')}
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">About</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Contact</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>

                      <button
                        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="text-lg font-medium">Support</span>
                        <ChevronRight size={20} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-4 border-t">
                    <Link href="/signin" className="block">
                      <Button
                        variant="outline"
                        className="w-full py-6 text-base border-gray-300 dark:border-gray-700 font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Button
                      className="w-full py-6 text-base bg-blue-600 hover:bg-blue-700 text-white font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Button>
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