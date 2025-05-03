"use client";

import React, { useRef } from "react";

import { motion, useInView } from "framer-motion";
import { GitBranch, LayoutGrid, MessageSquare } from "lucide-react";
import Image from "next/image";

const FeatureSection = ({
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
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.6, delay: 0.2 * index }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center">Features</h2>

        {/* First Feature */}
        <FeatureSection index={2}>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <LayoutGrid className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold text-blue-400">
                  Agile Development
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                Organize your projects with intuitive kanban boards, sprint
                planning tools, and task tracking capabilities. Experience the
                workflow used by professional developers and prepare yourself
                for future tech roles.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="overflow-hidden flex items-center justify-center">
                <Image
                  src="/agileimage.png"
                  alt="Agile Development"
                  width={350}
                  height={350}
                  className="p-8"
                />
              </div>
            </div>
          </div>
        </FeatureSection>

        {/* Second Feature */}
        <FeatureSection index={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-32 items-center">
            <div>
              <div className="overflow-hidden flex items-center justify-center">
                <Image
                  src="/github.svg"
                  alt="GitHub Integration"
                  width={350}
                  height={350}
                  className="p-8"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <GitBranch className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold text-blue-400">
                  GitHub Integration
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                Seamlessly connect with your GitHub repositories to track
                contributions, manage pull requests, and sync issues. Keep your
                codebase organized without switching between platforms, making
                collaboration smoother for everyone.
              </p>
            </div>
          </div>
        </FeatureSection>

        {/* Third Feature */}
        <FeatureSection index={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-32 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-6 w-6 text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold text-blue-400">
                  Built-in communication
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                Stay connected with your team through real-time chat and direct
                messaging. No need to switch between apps while collaborating on
                code.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="overflow-hidden flex items-center justify-center">
                <Image
                  src="/chatimage.png"
                  alt="Team Communication"
                  width={350}
                  height={350}
                  className="p-8"
                />
              </div>
            </div>
          </div>
        </FeatureSection>
      </div>
    </section>
  );
}
