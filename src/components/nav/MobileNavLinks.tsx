
import { useNavigation } from "@/hooks/useNavigation";
import { ChevronRight } from "lucide-react";
import type { Session } from "next-auth";
import Link from "next/link";

interface MobileNavLinksProps {
  setIsOpen: (isOpen: boolean) => void;
  session: Session | null;
}

export default function MobileNavLinks({
  setIsOpen,
  session,
}: MobileNavLinksProps) {
  const { handleNavigation } = useNavigation();

  return (
    <div>
      {session ? (
        <Link
        href="/dashboard"
        onClick={() => setIsOpen(false)}
        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="text-lg font-medium">Dashboard</span>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>
      ) : (
        <button
          onClick={() => {
            handleNavigation("top");
            setIsOpen(false);
          }}
          className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="text-lg font-medium">Home</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      )}

      {!session && (
        <button
          onClick={() => {
            handleNavigation("features");
            setIsOpen(false);
          }}
          className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="text-lg font-medium">Features</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      )}

      <Link
        href="/projects/browse"
        onClick={() => setIsOpen(false)}
        className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="text-lg font-medium">Browse Projects</span>
        <ChevronRight size={20} className="text-gray-400" />
      </Link>

      {session && (
        <Link
          href="/create-project"
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="text-lg font-medium">Create a Project</span>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
      )}

      {!session && (
        <button
          onClick={() => {
            handleNavigation("about");
            setIsOpen(false);
          }}
          className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="text-lg font-medium">About</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      )}
    </div>
  );
}
