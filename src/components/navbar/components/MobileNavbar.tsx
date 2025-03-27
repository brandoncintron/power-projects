"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Github, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from "../../ui/button";
import { NavLinkType } from '@/types/navigation';
import Image from 'next/image';
import { useTheme } from "next-themes";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetDescription
} from "../../ui/sheet";
import MobileNavItem from "./MobileNavItem";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';
/**
 * Props for the MobileHamburger component
 * 
 * @property {function} handleNavigation - Function to handle navigation to sections
 * @property {NavLinkType[]} navLinks - Array of navigation link objects
 */

type MobileHamburgerProps = {
    handleNavigation: (sectionId: string) => void;
    navLinks: NavLinkType[];
    session: Session | null;
};

/**
 * MobileHamburger - Mobile navigation menu
 * 
 * This component provides a responsive hamburger menu for mobile devices.
 * It displays all the content from the navbar in a slide-out sheet when the hamburger icon is clicked.
 */
const MobileHamburger = ({ handleNavigation, navLinks, session }: MobileHamburgerProps) => {

    
    // State to control sheet open/close
    const [isOpen, setIsOpen] = useState(false);
    // Hook to control the authentication dialog (sign-in/sign-up)
    const { open } = useAuthDialog();
    // Hook to control and access the current theme
    const { theme, setTheme } = useTheme();

    /**
     * Toggles between light and dark theme
     */
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* Hamburger menu button */}
            <SheetTrigger asChild>
                <Button variant="ghost">
                    <Menu size={24} />
                </Button>
            </SheetTrigger>
            
            {/* Slide-out menu panel */}
            <SheetContent side="right" className="w-full p-0 max-w-sm overflow-auto">
                <div className="flex flex-col h-full">
                    {/* Header with site name */}
                    <div className="flex items-center justify-between p-4 border-b">
                        <SheetTitle>
                            <SheetDescription className="text-sm text-black dark:text-white">
                                <Link href="/" className="no-underline font-bold text-xl" onClick={() => setIsOpen(false)}>
                                    Power Projects
                                </Link>
                            </SheetDescription>
                        </SheetTitle>
                    </div>

                    {/* Navigation links section */}
                    <div className="flex-grow">
                        <div className="flex flex-col divide-y">
                            {/* Main navigation links */}
                            {navLinks.map((link) => (
                                <MobileNavItem
                                    key={link.label}
                                    link={link}
                                    onNavigate={handleNavigation}
                                    closeMenu={() => setIsOpen(false)}
                                    session={session}
                                />
                            ))}

                            {/* GitHub repository link */}
                            <Link
                                href="https://github.com/brandoncintron/power-projects"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <span className="text-lg font-medium">GitHub Repository</span>
                                <Github size={20} className="text-gray-400" />
                            </Link>

                            {/* Theme toggle button */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center justify-between py-4 px-6 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <span className="text-lg font-medium">
                                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                                </span>
                                {theme === 'dark' ? (
                                    <Sun size={20} className="text-gray-400" />
                                ) : (
                                    <Moon size={20} className="text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* User authentication section */}
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
                                        {session.user?.name || 'User'}
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
    );
};

export default MobileHamburger;
