"use client";

import React from "react";
import { Shield, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink text-text-dark py-12 md:py-24 px-6 md:px-12 lg:px-24 border-t border-border-dark relative overflow-hidden">
      
      {/* Decorative scanline clearing at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-accent/20 blur-sm animate-[scan_6s_ease-in-out_infinite] mix-blend-overlay pointer-events-none" />

      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Brand / Logo */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="w-12 h-12 bg-surface border border-border-dark rounded-content-md flex items-center justify-center">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-text-dark/60 text-center md:text-left">
            <p>Nathan Nunes</p>
            <p>Cloud Security & GRC</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 font-mono text-xs uppercase tracking-wider text-text-dark/60">
          <a href="#about" className="hover:text-accent transition-colors">About</a>
          <a href="#systems" className="hover:text-accent transition-colors">Systems</a>
          <a href="#experience" className="hover:text-accent transition-colors">Record</a>
          <a href="#writing" className="hover:text-accent transition-colors">Writing</a>
          <a href="https://github.com/n8nunes" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Repository</a>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-border-dark flex items-center justify-center hover:border-accent hover:text-accent transition-colors bg-surface text-text-dark/60"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div className="font-sans text-sm text-text-dark/40">
            &copy; {new Date().getFullYear()} Nathan Nunes. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
