"use client";

import Link from "next/link";
import { NavLinkType } from "@/components/navbar/components/types/navigation";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { useScrollTo } from "@/hooks/useScrollTo";
import { Session } from "next-auth";

interface NavLinkItemProps {
  link: NavLinkType;
  session?: Session | null;
}

const NavLinkItem = ({ link, session }: NavLinkItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { scrollToSection } = useScrollTo();

  const handleNavigation = (sectionId: string) => {
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      router.push(`/?section=${sectionId}&foreignPage=true`);
    }
  };

  switch (link.type) {
    case "scroll":
      return (
        <button
          className="no-underline cursor-pointer"
          onClick={() => handleNavigation(link.id)}
        >
          <span className="text-base">{link.label}</span>
        </button>
      );

    case "link":
      return (
        <Link href={link.href} className="no-underline cursor-pointer">
          <span className="text-base">{link.label}</span>
        </Link>
      );

    case "link-authOnly":
      return session?.user ? (
        <Link href="/submit-project" className="no-underline cursor-pointer">
          <span className="text-base">{link.label}</span>
        </Link>
      ) : null;

    case "toast":
      return (
        <button
          className="no-underline cursor-pointer"
          onClick={() =>
            toast.warning(link.message, {
              duration: 3000,
              position: "bottom-right",
            })
          }
        >
          <span className="text-base">{link.label}</span>
        </button>
      );

    default:
      return null;
  }
};

export default NavLinkItem;
