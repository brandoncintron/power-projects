"use client";

import { ChevronRight, Compass, Sparkles, Users } from "lucide-react";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";

import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";
import { useNavigation } from "@/components/nav/hooks/useNavigation";
import { Button } from "@/components/ui/button";

interface HeroProps {
  session: Session | null;
}

export default function Hero({ session }: HeroProps) {
  const { handleNavigation } = useNavigation();
  const { open } = useAuthDialog();
  const router = useRouter();

  return (
    <section className="pt-26 pb-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Code, Collaborate, Learn.
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          All in One Place.
        </h2>
        <p className="text-xl md:text-xl max-w-2xl mx-auto mb-10 opacity-80">
          Power Projects provides a collaborative, efficient environment for
          building projects with others.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white sm:mx-0 mx-auto"
            onClick={() => {
              if (session) {
                router.push("/create-project");
              } else {
                open();
              }
            }}
          >
            {session ? "Create a Project" : "Get Started"} <ChevronRight />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-gray-600 hover:text-white hover:bg-[#161722] sm:mx-0 mx-auto dark:bg-[#161722]"
            onClick={() => handleNavigation("about")}
          >
            Learn More <ChevronRight />
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left px-4 pt-6 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-blue-400">
                Discover Projects
              </h3>
            </div>
            <p className="text-gray-400">
              Find projects that match your skill level or explore new
              technologies. Connect with students from your university or
              collaborate on open-source projects.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-blue-400">
                Create or Contribute
              </h3>
            </div>
            <p className="text-gray-400">
              <span className="font-bold">
                Build your portfolio while making connections.{" "}
              </span>
              Launch your own project and recruit collaborators, or join
              existing teams to build great things together.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-blue-400">
                For All Skill Levels
              </h3>
            </div>
            <p className="text-gray-400">
              Whether you&apos;re creating your first project or building a
              complex one, there&apos;s a place for you here. Learn from
              experienced developers or mentor newcomers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
