"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { NavLinkType } from "@/types/navigation";
import { Session } from "next-auth";

interface MobileNavItemProps {
  link: NavLinkType;
  onNavigate: (sectionId: string) => void;
  closeMenu: () => void;
  session?: Session | null;
}

const MobileNavItem = ({ link, onNavigate, closeMenu, session }: MobileNavItemProps) => {
  const baseClass =
    "flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full text-left";

  switch (link.type) {
    case "scroll":
      return (
        <button
          className={baseClass}
          onClick={() => {
            onNavigate(link.id);
            closeMenu();
          }}
        >
          <span className="text-lg font-medium">{link.label}</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      );

    case "link":
      return (
        <Link
          href={link.href}
          onClick={closeMenu}
          className={baseClass}
        >
          <span className="text-lg font-medium">{link.label}</span>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
      );

    case "link-authOnly":
      return session?.user ? (
        <Link
          href="/submit-project"
          onClick={closeMenu}
          className={baseClass}
        >
          <span className="text-lg font-medium">{link.label}</span>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
      ) : null;

    case "toast":
      return (
        <button
          className={baseClass}
          onClick={() => {
            toast.warning(link.message, {
              duration: 3000,
              position: "bottom-right",
            });
            closeMenu();
          }}
        >
          <span className="text-lg font-medium">{link.label}</span>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      );

    default:
      return null;
  }
};

export default MobileNavItem;
