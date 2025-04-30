"use client";

import type { Session } from "next-auth";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthDialog } from "@/components/auth/hooks/useAuthDialog";

const AboutSection = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: 0.2 * index }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function About({ session }: { session: Session | null }) {
  const { open } = useAuthDialog();

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <AboutSection index={0}>
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">About Power Projects</h2>
            <p className="text-xl max-w-3xl mx-auto opacity-80">
              Power Projects aims to build a community where developers can
              collaborate and create amazing projects together, regardless of
              experience level.
            </p>
          </div>
        </AboutSection>

        <div className="max-w-3xl mx-auto flex items-center mb-20">
          <AboutSection index={1}>
            <div>
              <h3 className="text-3xl font-bold mb-6 text-blue-400">
                The Mission
              </h3>
              <p className="text-lg mb-6">
                Power Projects&apos;s mission is to make it easier for
                developers of all skill levels to find projects to collaborate
                on, learn new technologies, or create their own portfolio-worthy
                projects with a team they build.
              </p>
              <p className="text-lg mb-6">
                Whether you&apos;re a a beginner seeking to gain experience, or
                an experienced developer looking to mentor others, Power
                Projects provides the tools and community to help you succeed.
              </p>
            </div>
          </AboutSection>
        </div>

        {!session && (
          <AboutSection index={3}>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Join The Community
              </h3>
              <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
                Ready to start building? Sign up and submit your idea to start
                creating and collaborating on Power Projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  onClick={() =>
                    open("signup")
                  }
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
          </AboutSection>
        )}
      </div>
    </section>
  );
}
