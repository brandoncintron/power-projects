import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { useNavigation } from "@/components/nav/hooks/useNavigation";
import { MobileNavLinksProps } from "@/components/nav/types/types";
import { useLoading } from "@/components/ui/loading-context";

export default function MobileNavLinks({ setIsOpen }: MobileNavLinksProps) {
  const { handleNavigation } = useNavigation();
  const { showLoading } = useLoading();

  return (
    <div>
      <button
        onClick={() => {
          handleNavigation("top");
          setIsOpen(false);
        }}
        className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-accent transition-colors"
      >
        <span className="text-lg font-medium">Home</span>
        <ChevronRight size={20} className="text-gray-400" />
      </button>

      <button
        onClick={() => {
          handleNavigation("features");
          setIsOpen(false);
        }}
        className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-accent transition-colors"
      >
        <span className="text-lg font-medium">Features</span>
        <ChevronRight size={20} className="text-gray-400" />
      </button>

      <Link
        href="/projects/browse"
        className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-accent transition-colors"
        onClick={() => {
          showLoading("Loading projects...");
          setIsOpen(false);
        }}
      >
        <span className="text-lg font-medium">Browse Projects</span>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      <button
        onClick={() => {
          handleNavigation("about");
          setIsOpen(false);
        }}
        className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-accent transition-colors"
      >
        <span className="text-lg font-medium">About</span>
        <ChevronRight size={20} className="text-gray-400" />
      </button>

      <Link
        href="/projects/my-projects"
        className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-accent transition-colors"
        onClick={() => setIsOpen(false)}
      >
        <span className="text-lg font-medium">My Projects</span>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      <Link
        href="/notifications"
        className="flex items-center justify-between py-4 px-6 hover:bg-accent transition-colors"
        onClick={() => setIsOpen(false)}
      >
        <span className="text-lg font-medium">Notifications</span>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      <Link
        href="/profile/edit"
        className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-accent transition-colors"
        onClick={() => setIsOpen(false)}
      >
        <span className="text-lg font-medium">Edit Profile</span>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>
    </div>
  );
}
