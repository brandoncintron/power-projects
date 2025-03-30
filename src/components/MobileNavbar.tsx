import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Github, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Button } from "./ui/button";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface MobileNavbarProps {
  handleNavigation: (sectionId: string) => void;
}

const MobileNavbar = ({ handleNavigation }: MobileNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { open } = useAuthDialog();

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

            <div className="flex-grow">
              <div className="flex flex-col divide-y">
                <button
                  onClick={() => {
                    handleNavigation("top");
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-medium">Home</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    handleNavigation("features");
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
                    handleNavigation("about");
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
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
