"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMenu } from "@/context/MenuContext";
import clsx from "clsx";

const menuItems = [
  { id: "01", label: "Home", desc: "Access granted", href: "#home" },
  { id: "02", label: "About", desc: "Who's behind the badge", href: "#about" },
  { id: "03", label: "Systems", desc: "Projects, tools, and things that run", href: "#systems" },
  { id: "04", label: "Experience", desc: "Roles, certifications, and record", href: "#experience" },
  { id: "05", label: "Writing", desc: "Notes on cybersecurity and markets", href: "#writing" },
  { id: "06", label: "What's Next", desc: "Where this is heading", href: "#whats-next" },
  { id: "07", label: "Contact", desc: "Get in touch", href: "#contact" },
];

export default function FullScreenMenu() {
  const { isOpen, closeMenu } = useMenu();
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    closeMenu();
    // Use a slight delay to let the menu close before jumping
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-30 bg-ink text-text-dark flex flex-col md:flex-row pt-24"
        >
          {/* Left Column: Navigation Links */}
          <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-24 flex flex-col justify-center overflow-y-auto no-scrollbar">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-6 group cursor-pointer"
                  onMouseEnter={() => setActiveItem(item)}
                  onClick={() => handleLinkClick(item.href)}
                >
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className={clsx(
                      "font-mono text-sm transition-colors",
                      activeItem.id === item.id ? "text-accent" : "text-text-dark/40"
                    )}
                  >
                    {item.id}
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="relative overflow-hidden"
                  >
                    <span 
                      className={clsx(
                        "font-editorial text-4xl md:text-5xl lg:text-7xl transition-colors block",
                        activeItem.id === item.id ? "text-text-dark" : "text-text-dark/60 group-hover:text-text-dark"
                      )}
                    >
                      {item.label}
                    </span>
                    {/* Redaction wipe hover effect */}
                    <span className="absolute inset-0 bg-accent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[0.16,1,0.3,1] z-10 pointer-events-none mix-blend-difference"></span>
                  </motion.div>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Column: Dynamic Preview */}
          <div className="hidden md:flex w-1/2 bg-surface p-12 lg:p-24 flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="font-mono text-accent text-sm tracking-wider uppercase border border-border-dark inline-block self-start px-3 py-1 rounded-system-sm bg-ink/50 backdrop-blur-sm">
                  Preview // {activeItem.id}
                </div>
                <h3 className="font-editorial text-4xl text-text-dark">{activeItem.label}</h3>
                <p className="font-mono text-text-dark/60 text-sm">{activeItem.desc}</p>
                
                {/* Abstract visualization placeholder for preview */}
                <div className="mt-8 relative w-full h-64 border border-border-main rounded-content-md overflow-hidden bg-ink/50 flex items-center justify-center group">
                   {/* Scanline effect */}
                   <div className="absolute top-0 left-0 w-full h-1 bg-accent/20 blur-sm animate-[scan_3s_ease-in-out_infinite]" />
                   <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-text-subtle)_1px,_transparent_1px)] bg-[size:24px_24px]" />
                   
                   <span className="font-mono text-text-dark/40 text-xs tracking-widest relative z-10 group-hover:text-accent transition-colors">
                     [ DATA_STREAM_ACTIVE ]
                   </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
