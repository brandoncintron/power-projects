import Link from "next/link";
import { useNavigation } from "@/hooks/useNavigation";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";

export default function MobileNavLinks({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
    const { handleNavigation } = useNavigation();
    const { data: session } = useSession();

    return (
        <div>
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

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 px-6 w-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-medium">Browse Projects</span>
                  <ChevronRight size={20} className="text-gray-400" />
                </button>

                {session && (
                <Link
                  href="/submit-project"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-lg font-medium">Submit Project</span>
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
    )
}