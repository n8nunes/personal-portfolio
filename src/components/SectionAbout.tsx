import React from "react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export default function SectionAbout() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-paper text-text-main relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 items-start">

        {/* Left Column: Portrait */}
        <div className="md:col-span-5 relative group">
          <div className="aspect-[3/4] w-full bg-surface border border-border-main rounded-content-md overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
            {/* Portrait Image */}
            <Image 
              src="/portrait.jpg" 
              alt="Nathan Nunes" 
              fill 
              className="object-cover" 
            />

            {/* Decorative scanline on portrait */}
            <div className="absolute top-0 left-0 w-full h-1 bg-accent/30 blur-sm animate-scan mix-blend-overlay pointer-events-none" />
          </div>
          <div className="mt-4 flex gap-4 font-mono text-xs uppercase tracking-wider text-text-muted">
            <a href="https://github.com/n8nunes" target="_blank" rel="noreferrer" className="hover:text-accent flex items-center gap-1 transition-colors">
              GitHub <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.linkedin.com/in/nathan-nunes05" target="_blank" rel="noreferrer" className="hover:text-accent flex items-center gap-1 transition-colors">
              LinkedIn <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://nunesfx.substack.com" target="_blank" rel="noreferrer" className="hover:text-accent flex items-center gap-1 transition-colors">
              Substack <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right Column: Bio */}
        <div className="md:col-span-7 flex flex-col gap-8 pt-4 md:pt-12">
          <div className="inline-block self-start font-mono text-sm tracking-wider uppercase text-accent border-b border-accent pb-1 mb-2">
            Who is Nathan Nunes
          </div>

          <h3 className="font-editorial text-3xl md:text-4xl text-text-main leading-snug">
            I'm a penultimate-year Bachelor of Software Engineering (Honours) student at Monash University, graduating in 2027.
          </h3>

          <div className="font-sans text-lg text-text-muted flex flex-col gap-6 leading-relaxed">
            <p>
              My background isn't typical for software engineering. I spent four years as a GMP Processor in a regulated manufacturing environment at Ensign Laboratories. Working under strict Standard Operating Procedures taught me that good systems are ones where evidence, process, and accountability are built in, not an afterthought.
            </p>
            <p>
              That experience drives my interest in GRC and Cloud Security Engineering. I'm focused on how major frameworks like NIST CSF, ISO 27001, Essential Eight, and APRA CPS 234, get operationalised in code rather than just existing as static documents.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
