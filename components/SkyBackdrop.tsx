"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { usePageProgress } from "@/components/DeckProvider";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

/**
 * Page-wide sunset. Fixed behind every section: it starts cool at the top of the
 * page and warms towards the horizon as you move down. In deck mode the same
 * progress value comes from the active section, so the sky changes as the
 * sections do. Three stacked gradients cross-fade.
 *
 * With reduced motion the day gradient is held still instead of cross-fading.
 */
export default function SkyBackdrop() {
  const progress = usePageProgress();
  const smooth = useSpring(progress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.001,
  });
  const reduceMotion = usePrefersReducedMotion();
  const value = reduceMotion ? progress : smooth;

  const dayOpacity = useTransform(value, [0, 0.34], [1, 0]);
  const goldOpacity = useTransform(value, [0.08, 0.48, 0.88], [0, 1, 0.15]);
  const duskOpacity = useTransform(value, [0.52, 1], [0, 1]);

  const sunY = useTransform(value, [0, 1], [0, 170]);
  const sunScale = useTransform(value, [0, 1], [1, 1.22]);
  const sunOpacity = useTransform(value, [0, 0.45, 1], [0.55, 0.8, 0.95]);
  const hazeY = useTransform(value, [0, 1], [0, -120]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#8fc3ef_0%,#cfe6f8_38%,#ffe0c2_74%,#ffc9a4_100%)]" />

      <motion.div
        style={reduceMotion ? { opacity: 1 } : { opacity: dayOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#8fc3ef_0%,#cfe6f8_38%,#ffe0c2_74%,#ffc9a4_100%)]"
      />

      <motion.div
        style={reduceMotion ? { opacity: 0 } : { opacity: goldOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#a8cbec_0%,#e9d9d2_40%,#ffd2ab_70%,#ffb894_100%)]"
      />

      <motion.div
        style={reduceMotion ? { opacity: 0 } : { opacity: duskOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#a4b7cf_0%,#dfb9ba_36%,#f2a58c_70%,#f5b394_100%)]"
      />

      <motion.div
        style={
          reduceMotion
            ? { opacity: 0.6 }
            : { y: sunY, scale: sunScale, opacity: sunOpacity }
        }
        className="absolute left-1/2 top-[52%] h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,246,226,0.95)_0%,rgba(255,224,186,0.55)_38%,rgba(255,206,160,0)_70%)] blur-2xl"
      />

      <motion.div
        style={reduceMotion ? undefined : { y: hazeY }}
        className="absolute inset-x-0 bottom-0 h-[55%] bg-[radial-gradient(ellipse_at_bottom,rgba(255,224,194,0.9)_0%,rgba(255,224,194,0)_72%)]"
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(143,195,239,0.55),rgba(143,195,239,0))]" />
    </div>
  );
}
