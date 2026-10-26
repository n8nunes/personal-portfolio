"use client";

import { Children, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { useDeck } from "@/components/DeckProvider";

/**
 * Vertical stack of full-viewport panels. In deck mode the stack is translated
 * one panel at a time; otherwise it is a normal, scrolling document.
 */
export default function SectionDeck({ children }: { children: ReactNode }) {
  const deck = useDeck();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const measure = () => setHeight(window.innerHeight);

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, []);

  const active = deck?.deck ?? false;
  const index = deck?.index ?? 0;
  // The panel height and the translation must be the same number. Using a
  // pixel variable here keeps them in step even where 100svh differs from
  // window.innerHeight (for example Safari with a dynamic toolbar).
  const sizing = active && height
    ? ({ "--deck-height": `${height}px` } as CSSProperties)
    : undefined;

  return (
    <div className="deck-viewport" style={sizing}>
      <motion.div
        className="deck-track"
        animate={{ y: active ? -index * height : 0 }}
        transition={{ type: "spring", stiffness: 118, damping: 24, mass: 0.9 }}
        style={active ? { willChange: "transform" } : undefined}
      >
        {Children.toArray(children).map((child, position) => (
          <div key={position} data-deck-panel="" className="deck-panel">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
