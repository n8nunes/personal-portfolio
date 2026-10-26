"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

export interface ProjectCardProps {
  /** Project name. */
  title: string;
  /** One or two sentences on what the project does. */
  body: string;
  /** Stack and frameworks, shown as a quieter line. */
  tools: string;
  /** Repository or live URL. The card has no action when omitted. */
  href?: string;
  /** Label for the outbound link. */
  actionText?: string;
  className?: string;
}

/**
 * A transparent project card with a pointer-driven 3D tilt. The surface is
 * deliberately see-through: the sky behind the section supplies the colour, and
 * a light glass veil plus a hairline border keep the ink text crisp.
 */
export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      title,
      body,
      tools,
      href,
      actionText = "View on GitHub",
      className,
    },
    ref,
  ) => {
    const reduceMotion = usePrefersReducedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const spring = { damping: 18, stiffness: 180 };
    const springX = useSpring(mouseX, spring);
    const springY = useSpring(mouseY, spring);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
      if (reduceMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <div style={{ perspective: 1200 }} className="h-full">
        <motion.article
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            reduceMotion
              ? undefined
              : { rotateX, rotateY, transformStyle: "preserve-3d" }
          }
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-[1.75rem]",
            "border border-white/70 bg-white/10 p-7 backdrop-blur-[2px]",
            "shadow-[0_30px_60px_-34px_rgba(19,32,58,0.45),inset_0_1px_0_rgba(255,255,255,0.65)]",
            "transition-colors duration-300 hover:bg-white/20",
            className,
          )}
        >
          <div
            style={reduceMotion ? undefined : { transform: "translateZ(36px)" }}
            className="flex h-full flex-col"
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-[1.7rem]">
              {title}
            </h3>

            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{body}</p>
            <p className="mt-4 text-sm leading-[1.5] text-ink/80">{tools}</p>

            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener"
                className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-4 text-sm font-medium underline underline-offset-4"
              >
                {actionText}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            ) : (
              <div className="mt-auto pt-4" />
            )}
          </div>
        </motion.article>
      </div>
    );
  },
);

ProjectCard.displayName = "ProjectCard";
