"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

type DeckValue = {
  deck: boolean;
  index: number;
  total: number;
  setIndex: (next: number) => void;
};

const DeckContext = createContext<DeckValue | null>(null);
const ProgressContext = createContext<MotionValue<number> | null>(null);

export function useDeck() {
  return useContext(DeckContext);
}

/** Page progress, 0 at the first section and 1 at the last. */
export function usePageProgress(): MotionValue<number> {
  const progress = useContext(ProgressContext);

  if (!progress) {
    throw new Error("usePageProgress must be used inside DeckProvider");
  }

  return progress;
}

const panels = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-deck-panel]"));

const panelCount = () => panels().length || 1;

/** True when the panel cannot scroll any further in the requested direction. */
function atEdge(panel: HTMLElement | undefined, direction: number) {
  if (!panel) return true;
  if (panel.scrollHeight <= panel.clientHeight + 1) return true;
  if (direction > 0) {
    return panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 2;
  }
  return panel.scrollTop <= 0;
}

/**
 * Turns the page into a section deck on large screens: one section fills the
 * viewport, and wheel, swipe, keyboard or nav links move between them. The sky
 * and clouds read the same progress value, so they rise with each section.
 *
 * Small screens and reduced-motion visitors keep a normal scrolling document.
 */
export function DeckProvider({ children }: { children: ReactNode }) {
  const reduceMotion = usePrefersReducedMotion();
  const [deck, setDeck] = useState(false);
  const [preferenceReady, setPreferenceReady] = useState(false);
  const [index, setIndexState] = useState(0);
  const [total, setTotal] = useState(1);
  const indexRef = useRef(0);
  const lockRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (!deck) progress.set(value);
  });

  useEffect(() => {
    setPreferenceReady(true);
  }, []);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const tall = window.matchMedia("(min-height: 700px)");

    // Wait for the reduced-motion read before enabling the deck. Otherwise a
    // reduced-motion visitor would briefly get deck mode, which scrolls the
    // page to the top and cancels an incoming #hash deep link.
    const update = () =>
      setDeck(preferenceReady && wide.matches && tall.matches && !reduceMotion);

    update();
    wide.addEventListener("change", update);
    tall.addEventListener("change", update);

    return () => {
      wide.removeEventListener("change", update);
      tall.removeEventListener("change", update);
    };
  }, [reduceMotion, preferenceReady]);

  const setIndex = useCallback(
    (next: number) => {
      const count = panelCount();
      const clamped = Math.max(0, Math.min(count - 1, next));

      if (clamped === indexRef.current) return;

      indexRef.current = clamped;
      setIndexState(clamped);
      progress.set(count > 1 ? clamped / (count - 1) : 0);
    },
    [progress],
  );

  useEffect(() => {
    const root = document.documentElement;
    const count = panelCount();
    setTotal(count);

    if (!deck) {
      delete root.dataset.deck;
      return;
    }

    root.dataset.deck = "true";
    window.scrollTo({ top: 0, behavior: "instant" });
    indexRef.current = 0;
    setIndexState(0);
    progress.set(0);

    const hash = window.location.hash.replace("#", "");
    const target = hash ? document.getElementById(hash) : null;
    const panel = target?.closest<HTMLElement>("[data-deck-panel]");
    if (panel) {
      const position = panels().indexOf(panel);
      if (position > 0) {
        indexRef.current = position;
        setIndexState(position);
        progress.set(position / Math.max(1, count - 1));
      }
    }

    return () => {
      delete root.dataset.deck;
    };
  }, [deck, progress]);

  useEffect(() => {
    if (!deck) return;

    const panel = panels()[index];
    const id = panel?.querySelector<HTMLElement>("[id]")?.id;
    if (!id) return;

    const next = `#${id}`;
    if (window.location.hash !== next) {
      history.replaceState(null, "", next);
    }
  }, [deck, index]);

  useEffect(() => {
    if (!deck) return;

    let wheelAcc = 0;
    let touchStart = 0;

    const go = (direction: number) => {
      const now = performance.now();
      if (now < lockRef.current) return;
      lockRef.current = now + 620;
      setIndex(indexRef.current + direction);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const panel = panels()[indexRef.current];
      if (!atEdge(panel, event.deltaY)) return;

      event.preventDefault();
      wheelAcc += event.deltaY;

      if (Math.abs(wheelAcc) < 28) return;

      const direction = wheelAcc > 0 ? 1 : -1;
      wheelAcc = 0;
      go(direction);
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event: TouchEvent) => {
      const end = event.changedTouches[0]?.clientY ?? 0;
      const delta = touchStart - end;
      if (Math.abs(delta) < 60) return;

      const panel = panels()[indexRef.current];
      if (!atEdge(panel, delta)) return;

      go(delta > 0 ? 1 : -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      const panel = panels()[indexRef.current];

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          if (!atEdge(panel, 1)) return;
          event.preventDefault();
          go(1);
          break;
        case "ArrowUp":
        case "PageUp":
          if (!atEdge(panel, -1)) return;
          event.preventDefault();
          go(-1);
          break;
        case " ":
        case "Spacebar":
          if (target?.closest("a, button, summary")) return;
          if (!atEdge(panel, event.shiftKey ? -1 : 1)) return;
          event.preventDefault();
          go(event.shiftKey ? -1 : 1);
          break;
        case "Home":
          event.preventDefault();
          setIndex(0);
          break;
        case "End":
          event.preventDefault();
          setIndex(panelCount() - 1);
          break;
        default:
          break;
      }
    };

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      const panel = target?.closest<HTMLElement>("[data-deck-panel]");
      if (!panel) return;

      event.preventDefault();
      setIndex(panels().indexOf(panel));
      history.replaceState(null, "", `#${id}`);
    };

    const onFocusIn = (event: FocusEvent) => {
      const panel = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-deck-panel]");
      if (!panel) return;

      const position = panels().indexOf(panel);
      if (position >= 0 && position !== indexRef.current) {
        indexRef.current = position;
        setIndexState(position);
        progress.set(position / Math.max(1, panelCount() - 1));
      }
    };

    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      const target = id ? document.getElementById(id) : null;
      const panel = target?.closest<HTMLElement>("[data-deck-panel]");
      if (!panel) return;

      setIndex(panels().indexOf(panel));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [deck, progress, setIndex]);

  const value = useMemo<DeckValue>(
    () => ({ deck, index, total, setIndex }),
    [deck, index, total, setIndex],
  );

  return (
    <ProgressContext.Provider value={progress}>
      <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
    </ProgressContext.Provider>
  );
}
