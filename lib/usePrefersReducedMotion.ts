"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Live reduced-motion preference.
 *
 * Read through matchMedia rather than only the first client render so the
 * value is correct when the OS setting changes mid-session, and so scroll-linked
 * transforms can be dropped entirely rather than merely damped.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);

    setReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
