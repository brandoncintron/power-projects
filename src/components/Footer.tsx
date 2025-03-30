"use client"

import Link from 'next/link';

import { Separator } from './ui/separator';
import { useScrollTo } from '../hooks/useScrollTo';

export default function Footer() {
  const { scrollToSection } = useScrollTo();
  
  return (
    <footer className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><button className="opacity-70 hover:opacity-100" onClick={() => scrollToSection('top')}>Home</button></li>
              <li><Link href="https://github.com/brandoncintron/power-projects" className="opacity-70 hover:opacity-100">GitHub Repository</Link></li>
              <li><Link href="/submit-project" className="opacity-70 hover:opacity-100">Submit a Project</Link></li>
              <li><Link href="#" className="opacity-70 hover:opacity-100">Browse Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <ul className="space-y-2">
              <li><button className="opacity-70 hover:opacity-100" onClick={() => scrollToSection('about')}>About</button></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="opacity-70 hover:opacity-100">Getting Started</Link></li>
              <li><Link href="#" className="opacity-70 hover:opacity-100">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect with the Developer</h3>
            <ul className="space-y-2">
              <li><Link href="https://github.com/brandoncintron" className="opacity-70 hover:opacity-100">GitHub</Link></li>
              <li><Link href="https://www.linkedin.com/in/brandon-cintron/" className="opacity-70 hover:opacity-100">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center md:flex md:justify-between md:text-left">

          <div className="opacity-70">
            &copy; {new Date().getFullYear()} Power Projects. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 