"use client";

import React, { useRef } from "react";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";

const timeline = [
  {
    role: "GMP Processor",
    org: "Ensign Laboratories",
    date: "2022 — 2026",
    status: "completed",
    desc: "Managed risk-minimisation and quality control under strict regulatory compliance frameworks and Standard Operating Procedures (SOPs).",
  },
  {
    role: "Coursera CompTIA A+",
    org: "Coursera",
    date: "Completed",
    status: "completed",
  },
  {
    role: "Google Cybersecurity Professional",
    org: "Google",
    date: "Completed",
    status: "completed",
  },
  {
    role: "CompTIA Security+",
    org: "CompTIA",
    date: "In Progress",
    status: "in-progress",
  },
  {
    role: "AWS Solutions Architect Associate (SAA-C03)",
    org: "Amazon Web Services",
    date: "In Progress",
    status: "in-progress",
  },
  {
    role: "Bachelor of Software Engineering (Honours)",
    org: "Monash University",
    date: "Expected 2027",
    status: "in-progress",
  },
];

export default function SectionExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} id="experience" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-paper text-text-main relative border-b border-border-main overflow-hidden">
      <div className="max-w-[800px] mx-auto relative z-10">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 md:mb-24 text-center"
        >
          <div className="inline-block font-mono text-sm tracking-wider uppercase text-accent border-b border-accent pb-1 mb-4">
            Record
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-text-main leading-tight">
            Roles, certifications, and timeline.
          </h2>
        </motion.div>

        <div className="relative ml-4 md:ml-8 flex flex-col gap-12">
          {/* Static background line */}
          <div className="absolute left-0 top-2 bottom-0 w-px bg-border-main" />
          
          {/* Animated active line */}
          <motion.div 
            className="absolute left-0 top-2 bottom-0 w-px bg-text-main origin-top z-0"
            style={{ scaleY }}
          />
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
              className="relative pl-8 md:pl-12 group z-10"
            >
              {/* Timeline dot */}
              <div
                className={clsx(
                  "absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-500",
                  item.status === "completed"
                    ? "bg-verified shadow-[0_0_8px_rgba(110,122,94,0.6)] group-hover:scale-150 group-hover:bg-verified"
                    : "bg-pending group-hover:scale-150 group-hover:bg-pending"
                )}
              />

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-editorial text-2xl md:text-3xl text-text-main group-hover:text-accent transition-colors duration-300">
                    {item.role}
                  </h3>
                  <div className="font-mono text-xs uppercase tracking-wider text-text-muted">
                    {item.date}
                  </div>
                </div>
                <div className="font-sans font-medium text-text-main/80 flex items-center gap-3">
                  {item.org}
                  <span
                    className={clsx(
                      "font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-system-sm border transition-colors duration-300",
                      item.status === "completed"
                        ? "text-verified border-verified/30 bg-verified/5 group-hover:bg-verified/10"
                        : "text-pending border-pending/30 bg-pending/5 group-hover:bg-pending/10"
                    )}
                  >
                    {item.status === "completed" ? "Verified" : "Pending"}
                  </span>
                </div>
                {item.desc && (
                  <p className="mt-2 font-sans text-text-muted max-w-xl leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
