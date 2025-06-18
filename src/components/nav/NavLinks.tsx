import Link from "next/link";

import { useNavigation } from "@/components/nav/hooks/useNavigation";
import { useLoading } from "@/components/ui/loading-context";

export default function NavLinks() {
  const { handleNavigation } = useNavigation(); // Use the navigation hook
  const { showLoading } = useLoading();

  return (
    <div className="hidden md:flex gap-8">
      <button
        className="no-underline cursor-pointer"
        onClick={() => {
          handleNavigation("top");
        }}
      >
        <span className="text-base">Home</span>
      </button>

      <button
        className="no-underline cursor-pointer"
        onClick={() => {
          handleNavigation("features");
        }}
      >
        <span className="text-base">Features</span>
      </button>

      <Link
        href="/projects/browse"
        className="no-underline cursor-pointer"
        onClick={() => {
          showLoading("Loading projects...");
        }}
      >
        <span className="text-base">Browse Projects</span>
      </Link>

      <button
        className="no-underline cursor-pointer"
        onClick={() => handleNavigation("about")}
      >
        <span className="text-base">About</span>
      </button>
    </div>
  );
}
