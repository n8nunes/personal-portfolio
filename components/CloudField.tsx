"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { usePageProgress } from "@/components/DeckProvider";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

type CloudLayer = {
  image: string;
  className: string;
  /** Vertical travel across the whole page. One section step is a quarter of it. */
  lift: number;
  drift: number;
  opacity: number;
  /** Seconds for one ambient drift loop. */
  float: number;
  blur: number;
  flip?: boolean;
};

/**
 * Six clouds spread down the viewport. Layers sit above the content so they pass
 * in front of the cards, with deeper layers moving further and going softly out
 * of focus. A slow ambient loop keeps the sky alive while the page is idle; page
 * progress adds a much larger lift and lateral sweep, which is what carries the
 * eye from one section to the next.
 */
const LAYERS: CloudLayer[] = [
  {
    image: "cloud-1.webp",
    className: "top-[-10%] left-[38%] w-[54rem] max-md:left-[16%] max-md:top-[2%] max-md:w-[26rem]",
    lift: 780,
    drift: 170,
    opacity: 0.62,
    float: 26,
    blur: 0.4,
  },
  {
    image: "cloud-2.webp",
    className: "top-[2%] left-[-14%] w-[32rem] max-md:top-[16%] max-md:left-[-24%] max-md:w-[22rem]",
    lift: 540,
    drift: -110,
    opacity: 0.55,
    float: 32,
    blur: 1,
  },
  {
    image: "cloud-3.webp",
    className: "top-[24%] left-[58%] w-[40rem] max-md:top-[38%] max-md:left-[34%] max-md:w-[24rem]",
    lift: 900,
    drift: 200,
    opacity: 0.58,
    float: 30,
    blur: 0.6,
  },
  {
    image: "cloud-4.webp",
    className: "top-[44%] left-[-10%] w-[36rem] max-md:top-[58%] max-md:left-[-18%] max-md:w-[24rem]",
    lift: 650,
    drift: -150,
    opacity: 0.5,
    float: 34,
    blur: 1.6,
  },
  {
    image: "cloud-5.webp",
    className: "top-[68%] left-[42%] w-[50rem] max-md:top-[76%] max-md:left-[12%] max-md:w-[28rem]",
    lift: 860,
    drift: 220,
    opacity: 0.6,
    float: 24,
    blur: 0.8,
  },
  {
    image: "cloud-2.webp",
    className: "top-[88%] left-[-16%] w-[42rem] max-md:top-[92%] max-md:left-[-30%] max-md:w-[26rem]",
    lift: 720,
    drift: 130,
    opacity: 0.45,
    float: 36,
    blur: 2,
    flip: true,
  },
];

export default function CloudField({ present }: { present: boolean }) {
  const progress = usePageProgress();
  const smooth = useSpring(progress, {
    stiffness: 70,
    damping: 22,
    mass: 0.4,
    restDelta: 0.001,
  });
  const reduceMotion = usePrefersReducedMotion();
  const value = reduceMotion ? progress : smooth;

  if (!present) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {LAYERS.map((layer, index) => (
        <Cloud
          key={`${layer.image}-${index}`}
          layer={layer}
          progress={value}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

function Cloud({
  layer,
  progress,
  reduceMotion,
}: {
  layer: CloudLayer;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const y = useTransform(progress, [0, 1], [0, -layer.lift]);
  const x = useTransform(progress, [0, 1], [0, layer.drift]);

  return (
    <motion.div
      style={reduceMotion ? undefined : { y, x }}
      className={`absolute ${layer.className}`}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -22, 14, 0],
                x: [0, 20, -14, 0],
              }
        }
        transition={{
          duration: layer.float,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/clouds/${layer.image}`}
          alt=""
          draggable={false}
          className="h-auto w-full select-none"
          style={{
            opacity: layer.opacity,
            filter: `blur(${layer.blur}px) drop-shadow(0 24px 44px rgba(19, 32, 58, 0.16))`,
            transform: layer.flip ? "scaleX(-1)" : undefined,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
