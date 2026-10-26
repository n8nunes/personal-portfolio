"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

export interface LiquidGlassCursorProps {
  children?: ReactNode;
  /** Lens diameter at rest, in px. */
  size?: number;
  /** How strongly the page is enlarged inside the lens. */
  magnification?: number;
  /** Lens size while over text. */
  textHoverSize?: number;
  /** Lens width while over a button or field. */
  maxButtonWidth?: number;
  /** Lens height while over a button or field. */
  maxButtonHeight?: number;
  /** Wrapper background. The lens sits over the live page, so this is rarely needed. */
  bgColor?: string;
  className?: string;
}

const TEXT_SELECTOR =
  '[data-cursor="text"], p, span, h1, h2, h3, h4, h5, h6, label';
const BUTTON_SELECTOR =
  '[data-cursor="button"], button, a, [role="button"], input, select, textarea';

const inertProps = { inert: "" } as unknown as Record<string, string>;

/** Heading tags that must not appear twice in the document outline. */
const HEADING_TAGS = "h1, h2, h3, h4, h5, h6";

/**
 * A liquid-glass lens that follows the pointer and magnifies the page beneath
 * it. It covers every section, not just the hero.
 *
 * The magnified surface is a client-side clone of the rendered page. Cloning
 * (rather than rendering the children twice) keeps the real page as the only
 * source of state, ids and focus stops: the copy has its ids, deck markers and
 * tab order stripped, its headings demoted, and the whole thing is `inert` and
 * `aria-hidden`. The copy's deck track, scrolled panels, card tilt and sticky
 * nav are kept in sync with the originals, so the lens follows the deck and
 * normal scrolling without duplicating `[data-deck-panel]`.
 *
 * The supplied component refracted the copy through an SVG displacement filter.
 * That filter caused Chromium to re-render the whole page through the filter
 * region (visible as ghosted text and a washed-out sky), so the integration
 * keeps the magnification, glass rim and shadow and drops only the displacement.
 * Reduced-motion visitors get a plain wrapper, the native cursor and no lens.
 */
export default function LiquidGlassCursor({
  children,
  size = 150,
  magnification = 1.15,
  textHoverSize = 130,
  maxButtonWidth = 260,
  maxButtonHeight = 110,
  bgColor = "transparent",
  className = "",
}: LiquidGlassCursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ inside: false, x: 0, y: 0 });
  const [dims, setDims] = useState({ width: 0, height: 0 });
  const reduceMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const presence = useMotionValue(0);
  const targetW = useMotionValue(size);
  const targetH = useMotionValue(size);

  const springConfig = { stiffness: 300, damping: 26 };
  const shapeSpringConfig = { stiffness: 340, damping: 28 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);
  const scale = useSpring(presence, { stiffness: 260, damping: 20 });
  const sw = useSpring(targetW, shapeSpringConfig);
  const sh = useSpring(targetH, shapeSpringConfig);

  const setShapeForTarget = (target: EventTarget | null) => {
    const el = target instanceof Element ? target : null;
    if (el?.closest(BUTTON_SELECTOR)) {
      targetW.set(maxButtonWidth);
      targetH.set(maxButtonHeight);
    } else if (el?.closest(TEXT_SELECTOR)) {
      targetW.set(textHoverSize);
      targetH.set(textHoverSize);
    } else {
      targetW.set(size);
      targetH.set(size);
    }
  };

  // Keep the lens anchored to the pointer while the document scrolls under it.
  useEffect(() => {
    if (reduceMotion) return;

    const place = () => {
      const el = ref.current;
      if (!el || !pointer.current.inside) return;

      const rect = el.getBoundingClientRect();
      x.set(pointer.current.x - rect.left);
      y.set(pointer.current.y - rect.top);
    };

    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);

    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [reduceMotion, x, y]);

  // Build the magnified copy and keep it aligned with the live page.
  useEffect(() => {
    if (reduceMotion) return;
    // There is no pointer to follow on a touch-only device, so skip the copy
    // entirely rather than cloning the whole page for nothing.
    if (!window.matchMedia("(any-pointer: fine)").matches) return;

    const el = ref.current;
    const content = contentRef.current;
    const host = copyRef.current;
    if (!el || !content || !host) return;

    let clone: HTMLElement | null = null;
    let observer: MutationObserver | null = null;
    let measuredWidth = 0;

    const sync = () => {
      if (!clone) return;

      const realTrack = content.querySelector<HTMLElement>(".deck-track");
      const cloneTrack = clone.querySelector<HTMLElement>(".deck-track");
      if (realTrack && cloneTrack) {
        cloneTrack.style.transform = realTrack.style.transform;
      }

      const realViewport = content.querySelector<HTMLElement>(".deck-viewport");
      const cloneViewport = clone.querySelector<HTMLElement>(".deck-viewport");
      if (realViewport && cloneViewport) {
        const height = realViewport.style.getPropertyValue("--deck-height");
        if (height) cloneViewport.style.setProperty("--deck-height", height);
        else cloneViewport.style.removeProperty("--deck-height");
      }

      const realPanels = content.querySelectorAll<HTMLElement>(".deck-panel");
      const clonePanels = clone.querySelectorAll<HTMLElement>(".deck-panel");
      realPanels.forEach((panel, index) => {
        const copy = clonePanels[index];
        if (!copy) return;
        copy.scrollTop = panel.scrollTop;
        // Mirror the tunnel state so the magnified view scales and fades with
        // the page instead of showing a flat snapshot.
        if (panel.dataset.deckState) {
          copy.dataset.deckState = panel.dataset.deckState;
        } else {
          delete copy.dataset.deckState;
        }
      });

      const realCards = content.querySelectorAll<HTMLElement>("article");
      const cloneCards = clone.querySelectorAll<HTMLElement>("article");
      realCards.forEach((card, index) => {
        const copy = cloneCards[index];
        if (copy) copy.style.transform = card.style.transform;
      });

      // The nav is sticky in the page but the copy does not scroll, so pin it
      // to the same viewport position. Without this the lens would show the
      // nav at the top of the document after the page had scrolled.
      const realHeader = content.querySelector<HTMLElement>("header");
      const cloneHeader = clone.querySelector<HTMLElement>("header");
      if (realHeader && cloneHeader) {
        const headerRect = realHeader.getBoundingClientRect();
        const wrapperRect = el.getBoundingClientRect();
        cloneHeader.style.position = "absolute";
        cloneHeader.style.top = `${headerRect.top - wrapperRect.top}px`;
        cloneHeader.style.left = "0";
        cloneHeader.style.width = "100%";
        cloneHeader.style.zIndex = "20";
      }
    };

    const build = () => {
      const width = el.clientWidth;
      if (!width) return;
      measuredWidth = width;

      const next = content.cloneNode(true) as HTMLElement;

      next.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
      next
        .querySelectorAll("[data-deck-panel]")
        .forEach((node) => node.removeAttribute("data-deck-panel"));
      next
        .querySelectorAll("[tabindex]")
        .forEach((node) => node.removeAttribute("tabindex"));
      next
        .querySelectorAll(
          "[aria-controls], [aria-labelledby], [aria-describedby], [aria-expanded]",
        )
        .forEach((node) => {
          node.removeAttribute("aria-controls");
          node.removeAttribute("aria-labelledby");
          node.removeAttribute("aria-describedby");
          node.removeAttribute("aria-expanded");
        });

      // The copy is visual only. Demote headings so the document still has a
      // single outline, and keep the typography classes on the replacement.
      next.querySelectorAll(HEADING_TAGS).forEach((node) => {
        const replacement = document.createElement("p");
        replacement.className = node.className;
        replacement.innerHTML = node.innerHTML;
        node.replaceWith(replacement);
      });

      next.classList.add("lens-copy");
      next.style.cssText += [
        "position:absolute",
        "left:0",
        "top:0",
        `width:${width}px`,
        "margin:0",
        "pointer-events:none",
      ].join(";");
      next.setAttribute("aria-hidden", "true");
      next.inert = true;

      host.replaceChildren(next);
      clone = next;

      observer?.disconnect();
      const realTrack = content.querySelector<HTMLElement>(".deck-track");
      const realViewport = content.querySelector<HTMLElement>(".deck-viewport");
      if (realTrack && realViewport) {
        observer = new MutationObserver(sync);
        observer.observe(realTrack, {
          attributes: true,
          attributeFilter: ["style"],
        });
        observer.observe(realViewport, {
          attributes: true,
          attributeFilter: ["style"],
        });
        content
          .querySelectorAll<HTMLElement>(".deck-panel")
          .forEach((panel) => {
            observer?.observe(panel, {
              attributes: true,
              attributeFilter: ["data-deck-state"],
            });
          });
      }

      content.querySelectorAll<HTMLElement>("article").forEach((card) => {
        observer?.observe(card, { attributes: true, attributeFilter: ["style"] });
      });

      sync();
      setDims({ width, height: el.clientHeight });
    };

    build();

    const measure = () => {
      if (el.clientWidth !== measuredWidth) build();
      else setDims({ width: el.clientWidth, height: el.clientHeight });
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(el);

    const onScroll = () => sync();
    content.addEventListener("scroll", onScroll, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      resizeObserver.disconnect();
      observer?.disconnect();
      content.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      host.replaceChildren();
    };
  }, [reduceMotion]);

  const lensX = useTransform([sx, sw], ([v, w]) => (v as number) - (w as number) / 2);
  const lensY = useTransform([sy, sh], ([v, h]) => (v as number) - (h as number) / 2);
  // Light comes from the top-left, so the glass casts its shadow down-right.
  const shadowX = useTransform(
    [sx, sw],
    ([v, w]) => (v as number) - (w as number) / 2 + 8,
  );
  const shadowY = useTransform(
    [sy, sh],
    ([v, h]) => (v as number) - (h as number) / 2 + 12,
  );
  // Place the magnified copy so the point under the cursor stays centred.
  const copyX = useTransform(
    [sx, sw],
    ([v, w]) => (w as number) / 2 - magnification * (v as number),
  );
  const copyY = useTransform(
    [sy, sh],
    ([v, h]) => (h as number) / 2 - magnification * (v as number),
  );

  if (reduceMotion) {
    return (
      <div ref={ref} className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={(event) => {
        pointer.current = {
          inside: true,
          x: event.clientX,
          y: event.clientY,
        };
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
        presence.set(1);
      }}
      onMouseOver={(event) => setShapeForTarget(event.target)}
      onMouseLeave={() => {
        pointer.current.inside = false;
        presence.set(0);
        targetW.set(size);
        targetH.set(size);
      }}
      style={{ backgroundColor: bgColor }}
      className={`relative [cursor:none] ${className}`}
    >
      <div ref={contentRef}>{children}</div>

      <motion.div
        aria-hidden="true"
        style={{ x: shadowX, y: shadowY, scale, width: sw, height: sh }}
        className="pointer-events-none absolute left-0 top-0 z-10 rounded-full bg-black/25 blur-2xl"
      />

      <motion.div
        aria-hidden="true"
        {...inertProps}
        style={{ x: lensX, y: lensY, scale, width: sw, height: sh }}
        className="pointer-events-none absolute left-0 top-0 z-20 overflow-hidden rounded-full"
      >
        {/* The tint sits on the magnified layer itself, so it paints behind the
            cloned content in the same stacking context; a sibling tint layer
            could composite above the copy and wash the text out. It is kept
            close to opaque because the lens magnifies the copy: light let
            through would show the unmagnified page as a doubled image. */}
        <motion.div
          ref={copyRef}
          style={{
            x: copyX,
            y: copyY,
            scale: magnification,
            width: dims.width,
            height: dims.height,
            transformOrigin: "0 0",
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            zIndex: 1,
          }}
          className="absolute left-0 top-0"
        />

        <div
          className="absolute inset-0 z-[2] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse 45% 30% at 32% 24%, rgba(255,255,255,0.28), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 z-[2] rounded-full"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(19,32,58,0.12), inset 2px 4px 10px rgba(255,255,255,0.22), inset -3px -5px 14px rgba(19,32,58,0.12)",
          }}
        />
      </motion.div>
    </div>
  );
}
