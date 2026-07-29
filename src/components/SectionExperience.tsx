import React from "react";
import clsx from "clsx";

const timeline = [
  {
    role: "Bachelor of Software Engineering (Honours)",
    org: "Monash University",
    date: "Expected 2027",
    status: "in-progress",
  },
  {
    role: "AWS Solutions Architect Associate (SAA-C03)",
    org: "Amazon Web Services",
    date: "In Progress",
    status: "in-progress",
  },
  {
    role: "CompTIA Security+",
    org: "CompTIA",
    date: "In Progress",
    status: "in-progress",
  },
  {
    role: "Google Cybersecurity Professional",
    org: "Google",
    date: "Completed",
    status: "completed",
  },
  {
    role: "Coursera CompTIA A+",
    org: "Coursera",
    date: "Completed",
    status: "completed",
  },
  {
    role: "GMP Processor",
    org: "Ensign Laboratories",
    date: "2022 — 2026",
    status: "completed",
    desc: "Managed risk-minimisation and quality control under strict regulatory compliance frameworks and Standard Operating Procedures (SOPs).",
  },
];

export default function SectionExperience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-paper text-text-main relative border-b border-border-main">
      <div className="max-w-[800px] mx-auto">

        <div className="mb-16 md:mb-24 text-center">
          <div className="inline-block font-mono text-sm tracking-wider uppercase text-accent border-b border-accent pb-1 mb-4">
            Record
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-text-main leading-tight">
            Roles, certifications, and timeline.
          </h2>
        </div>

        <div className="relative border-l border-border-main ml-4 md:ml-8 flex flex-col gap-12">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative pl-8 md:pl-12 group">
              {/* Timeline dot */}
              <div
                className={clsx(
                  "absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300",
                  item.status === "completed"
                    ? "bg-verified shadow-[0_0_8px_rgba(110,122,94,0.4)] group-hover:scale-125"
                    : "bg-pending group-hover:scale-125"
                )}
              />

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="font-editorial text-2xl md:text-3xl text-text-main">
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
                      "font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-system-sm border",
                      item.status === "completed"
                        ? "text-verified border-verified/30 bg-verified/5"
                        : "text-pending border-pending/30 bg-pending/5"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
