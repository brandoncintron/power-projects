"use client"

import { Button } from "@/components/ui/button";
import { useScrollTo } from '@/hooks/useScrollTo';
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const { scrollToSection } = useScrollTo();

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
          Power Projects provides a collaborative, efficient environment for building projects with others.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/submit-project">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Create a Project <ChevronRight />
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-gray-600 hover:text-white hover:bg-gray-800"
            onClick={() => scrollToSection('about')}
          >
            Learn More <ChevronRight />
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left px-4 pt-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Real-Time Collaboration</h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">GitHub Integration</h3>
            <p className="text-gray-400">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Built-in communication</h3>
            <p className="text-gray-400">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-400">Agile Development</h3>
            <p className="text-gray-400">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 