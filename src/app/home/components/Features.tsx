"use client"

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FeatureSection = ({ children, index }: { children: React.ReactNode, index: number }) => {
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
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">Features</h2>

        {/* First Feature */}
        <FeatureSection index={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <h3 className="text-3xl font-bold text-blue-400">
                  Discover or Create New Projects.
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                Find the perfect project to join, or get inspired to learn new technologies. All while collaborating with others.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="rounded-lg shadow-xl overflow-hidden border border-gray-700 h-[400px]">
                Image placeholder1
              </div>
            </div>
          </div>
        </FeatureSection>

        {/* Second Feature */}
        <FeatureSection index={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
            <div>
              <div className="rounded-lg shadow-xl overflow-hidden border border-gray-700 h-[400px]">
                Image placeholder2
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <h3 className="text-3xl font-bold text-blue-400">
                  Project Collaboration, Made Easy.
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                Create and manage your projects with directly through the interface. Upload a project idea,
                manage your project, and collaborate with team members, all in one place.
              </p>
            </div>
          </div>
        </FeatureSection>

        {/* Third Feature */}
        <FeatureSection index={2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center mb-6">
                <h3 className="text-3xl font-bold text-blue-400">
                  Built-in Collaboration Tools.
                </h3>
              </div>
              <p className="text-lg leading-relaxed">
                Stay connected to your team with built-in chat features, making
                collaboration smooth and efficient.
              </p>
            </div>

            <div className="order-1 md:order-2">
              <div className="rounded-lg shadow-xl overflow-hidden border border-gray-700 h-[400px]">
                Image placeholder3
              </div>
            </div>
          </div>
        </FeatureSection>
      </div>
    </section>
  );
} 