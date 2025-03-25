import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <div>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Hero />
        </Suspense>
        <div id="features">
          <Features />
        </div>
        <div id="about">
          <About />
        </div>
      </div>
    </main>
  );
} 