"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { ArrowDown } from "lucide-react";
import clsx from "clsx";

export default function RedactionHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Initial centering of mask
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      mouseX.set(width / 2);
      mouseY.set(height / 2);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if ((isHovered || hasInteracted) && !isFullyRevealed) {
      timeoutId = setTimeout(() => {
        setIsFullyRevealed(true);
      }, 1200); // 1.2 seconds to clear the fog
    }
    return () => clearTimeout(timeoutId);
  }, [isHovered, hasInteracted, isFullyRevealed]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
      if (!hasInteracted) setHasInteracted(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (containerRef.current && e.touches.length > 0) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mouseX.set(e.touches[0].clientX - left);
      mouseY.set(e.touches[0].clientY - top);
      if (!hasInteracted) setHasInteracted(true);
    }
  };
  const maskSize = isHovered || hasInteracted ? '350px' : '0px';
  const maskImage = useMotionTemplate`radial-gradient(circle ${maskSize} at ${smoothX}px ${smoothY}px, transparent 0%, black 100%)`;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-cream cursor-default touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Layer: Revealed Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 z-10 select-none">
        {/* Abstract Geometry Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="70%" cy="30%" r="200" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="70%" cy="30%" r="300" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <line x1="70%" y1="30%" x2="100%" y2="0" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl pt-20">
          <p className="font-mono text-sm uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
            Software Engineering Student - Interested in Cloud Security Engineering and GRC
          </p>
          <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-text-main leading-[1.1] tracking-tight mb-8">
            Making risk <br className="hidden md:block" />legible.
          </h1>
          <p className="font-sans text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-12">
            I build tools that map controls across frameworks like NIST CSF, ISO 27001 and Essential Eight, and I write about what I learn along the way. Currently completing a software engineering degree at Monash, with a professional background in regulated manufacturing.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#systems" className="group relative px-6 py-3 bg-accent text-white rounded-pill font-sans font-medium overflow-hidden transition-transform hover:scale-105 inline-flex items-center gap-2 z-50">
              <span className="relative z-10">View the Projects</span>
              <span className="absolute inset-0 bg-accent-dim transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
            </a>
            <a href="/resume.pdf" target="_blank" className="font-sans font-medium text-text-main hover:text-accent transition-colors flex items-center gap-2 z-50">
              Download Resume
            </a>
            <a href="#writing" className="font-mono text-xs tracking-wider uppercase text-text-muted hover:text-text-main transition-colors ml-auto hidden sm:block z-50">
              Read the Writing
            </a>
          </div>
        </div>
      </div>

      {/* Redaction Layer: Covers everything, masked to reveal the base layer */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none bg-ink flex flex-col"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
        animate={{
          opacity: isFullyRevealed ? 0 : 1
        }}
        transition={{ opacity: { duration: 2, ease: "easeInOut" }, type: "spring", bounce: 0, duration: 0.8 }}
      >
        {/* Redaction Bar Texture on top of the dark layer */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#B5643A_2px,#B5643A_4px)]" />

        {/* Interaction Prompt (Hidden once interacted) */}
        <div className={clsx(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-1000",
          hasInteracted ? "opacity-0" : "opacity-100"
        )}>
          <div className="flex flex-col items-center gap-4">
            <span className="w-12 h-12 border border-accent/30 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-accent rounded-full" />
            </span>
            <span className="font-mono text-sm tracking-widest uppercase text-text-dark/50">
              Move to declassify
            </span>
          </div>
        </div>

        {/* Static content that is visible on the redaction layer before revealing */}
        <div className="absolute top-1/2 left-6 md:left-12 lg:left-24 transform -translate-y-1/2 opacity-5">
          <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none tracking-tight blur-sm">
            [ REDACTED ]
          </h1>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-24 z-30 pointer-events-none mix-blend-difference text-white">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
