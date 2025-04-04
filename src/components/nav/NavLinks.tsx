import Link from "next/link";
import { useNavigation } from "../../hooks/useNavigation";
import { Session } from "next-auth";
interface NavLinksProps {
  session: Session | null;
}

export default function NavLinks({ session }: NavLinksProps) {
    const { handleNavigation } = useNavigation(); // Use the new navigation hook

    return (
        <div className="hidden md:flex gap-8">
            <button
              className="no-underline cursor-pointer"
              onClick={() => handleNavigation("top")}
            >
              <span className="text-base">Home</span>
            </button>
            {!session && (
            <button
              className="no-underline cursor-pointer"
              onClick={() => handleNavigation("features")}
            >
              <span className="text-base">Features</span>
            </button>
            )}

            {/* Temporary toast for project board */}
            <Link
              href="/projects/browse"
              className="no-underline cursor-pointer"
            >
              <span className="text-base">Browse Projects</span>
            </Link>
            {session && (
              <Link
                href="/create-project"
                className="no-underline cursor-pointer"
            >
              <span className="text-base">Create a Project</span>
            </Link>
            )}

            {!session && (
              <button
                className="no-underline cursor-pointer"
                onClick={() => handleNavigation("about")}
            >
              <span className="text-base">About</span>
            </button>
            )}
          </div>
    )
}