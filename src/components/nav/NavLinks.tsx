import Link from "next/link";
import { useNavigation } from "../../hooks/useNavigation";

export default function NavLinks() {
  const { handleNavigation } = useNavigation(); // Use the new navigation hook

  return (
    <div className="hidden md:flex gap-8">
      <button
        className="no-underline cursor-pointer"
        onClick={() => handleNavigation("top")}
      >
        <span className="text-base">Home</span>
      </button>

      <button
        className="no-underline cursor-pointer"
        onClick={() => handleNavigation("features")}
      >
        <span className="text-base">Features</span>
      </button>

      <Link href="/projects/browse" className="no-underline cursor-pointer">
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
