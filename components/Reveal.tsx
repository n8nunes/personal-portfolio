"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds of delay, matching the previous framer-motion API. */
  delay?: number;
  amount?: number;
};

/**
 * Entrance for blocks below the fold.
 *
 * Content is visible by default and no-ops when scripts are unavailable or
 * motion is reduced, so a failed observer can never leave the page blank. The
 * element is only hidden after mount, and only when it starts off screen.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  amount = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Anything already on screen keeps its first paint; only arm off-screen
    // blocks, which is the case that would otherwise animate unseen.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      return;
    }

    element.style.setProperty("--reveal-delay", `${Math.round(delay * 1000)}ms`);
    element.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) {
          return;
        }

        element.classList.add("reveal--in");
        observer.disconnect();

        element.addEventListener(
          "transitionend",
          () => element.classList.add("reveal--done"),
          { once: true },
        );
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [amount, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
