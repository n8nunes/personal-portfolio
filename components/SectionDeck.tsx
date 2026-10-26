"use client";

import { Children, useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { useDeck } from "@/components/DeckProvider";

/**
 * Full-viewport section stack. In deck mode the panels overlap and hand over
 * with the tunnel transition; otherwise they stack in normal document flow.
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
  // The panel height and the viewport height must be the same number. Using a
  // pixel variable here keeps them in step even where 100svh differs from
  // window.innerHeight (for example Safari with a dynamic toolbar).
  const sizing = active && height
    ? ({ "--deck-height": `${height}px` } as CSSProperties)
    : undefined;

  return (
    <div className="deck-viewport" style={sizing}>
      <div className="deck-track">
        {Children.toArray(children).map((child, position) => (
          <div
            key={position}
            data-deck-panel=""
            data-deck-state={
              active
                ? position === index
                  ? "active"
                  : position < index
                    ? "before"
                    : "after"
                : undefined
            }
            className="deck-panel"
          >
            <div className="tunnel-panel">{child}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
