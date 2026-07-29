"use client";

import React, { useState, useEffect } from "react";
import { useMenu } from "@/context/MenuContext";
import { Shield } from "lucide-react";
import clsx from "clsx";

export default function Header() {
  const { toggleMenu, isOpen } = useMenu();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-40 transition-colors duration-500",
        scrolled && !isOpen ? "bg-cream/90 backdrop-blur-md border-b border-border-main" : "bg-transparent",
        isOpen ? "text-text-dark" : scrolled ? "text-text-main" : "text-text-dark"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className={clsx("w-6 h-6", isOpen ? "text-accent" : scrolled ? "text-accent" : "text-text-dark")} />
          <span className="font-mono text-sm tracking-wider uppercase hidden sm:block">Nathan Nunes</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a
            href="mailto:nfx@nunesfx.com"
            className={clsx(
              "font-mono text-sm tracking-wider uppercase transition-colors hidden sm:block hover:text-accent",
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            Get in touch
          </a>
          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 group focus:outline-none"
            aria-expanded={isOpen}
            aria-label="Toggle Menu"
          >
            <span className="font-mono text-sm tracking-wider uppercase group-hover:text-accent transition-colors">
              {isOpen ? "Close" : "Access"}
            </span>
            <div className="relative w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={clsx(
                  "block w-full h-0.5 transition-all duration-300 absolute",
                  isOpen ? "rotate-45 bg-accent" : scrolled ? "bg-text-main -translate-y-1" : "bg-text-dark -translate-y-1"
                )}
              />
              <span
                className={clsx(
                  "block w-full h-0.5 transition-all duration-300 absolute",
                  isOpen ? "-rotate-45 bg-accent" : scrolled ? "bg-text-main translate-y-1" : "bg-text-dark translate-y-1"
                )}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
