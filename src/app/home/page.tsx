import Navbar from '@/components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <main>
      <div id="top">
        <Suspense fallback={<div className="py-4 px-8 w-full">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold">Power Projects</div>
          </div>
        </div>}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <Hero />
        </Suspense>
        <div id="features">
          <Features />
        </div>
        <div id="about">
          <About />
        </div>
        <Suspense fallback={<div className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">Loading...</div>
          </div>
        </div>}>
          <Footer />
        </Suspense>
      </div>
    </main>
  );
} 