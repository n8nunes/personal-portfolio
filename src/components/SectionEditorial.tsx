import React from "react";

export default function SectionEditorial() {
  return (
    <section className="py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 bg-ink text-text-dark relative border-b border-border-dark">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-editorial text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight mb-12 max-w-4xl">
          Most compliance work is invisible until something breaks.
        </h2>
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <p className="font-sans text-lg md:text-xl text-text-dark/60 leading-relaxed max-w-xl">
            I'm interested in the systems behind the systems. The frameworks, controls and processes that let cloud infrastructure be trusted. This site is a record of what I've built, what I've learned, and where that's heading.
          </p>
          <div className="flex flex-col gap-6 font-mono text-sm uppercase tracking-wider text-text-dark">
            <div className="flex items-center gap-4">
              <span className="text-accent font-bold text-2xl">2</span>
              <span className="text-text-dark/60">Websites deployed to cloud</span>
            </div>
            <div className="h-px w-16 bg-border-dark" />
            <div className="flex items-center gap-4">
              <span className="text-pending font-bold text-2xl">2</span>
              <span className="text-text-dark/60">Certifications in progress</span>
            </div>
            <div className="h-px w-16 bg-border-dark" />
            <div className="flex items-center gap-4">
              <span className="text-verified font-bold text-2xl">2</span>
              <span className="text-text-dark/60">Certifications completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
