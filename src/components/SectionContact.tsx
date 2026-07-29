import React from "react";
import { ArrowRight, FileText } from "lucide-react";

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.3 6-1.5 6-6.76a5.2 5.2 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.1-3.7s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.3 5.3 0 0 0-.1 3.7 5.2 5.2 0 0 0-1.5 3.8c0 5.2 3 6.4 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
    </svg>
  );
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function SectionContact() {
  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-paper text-text-main relative flex flex-col items-center justify-center min-h-[70vh]">
      
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-[800px] w-full mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="inline-block font-mono text-sm tracking-wider uppercase text-accent border-b border-accent pb-1 mb-8">
          Status: Open
        </div>
        
        <h2 className="font-editorial text-6xl md:text-8xl lg:text-9xl text-text-main leading-none tracking-tight mb-8">
          Let's talk.
        </h2>
        
        <p className="font-sans text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl mx-auto mb-16">
          Open to graduate roles, internships, and conversations about cloud security, GRC, or the tools in between.
        </p>

        <a 
          href="mailto:nfx@nunesfx.com"
          className="group relative px-8 py-4 bg-accent text-white rounded-pill font-sans text-lg font-medium overflow-hidden transition-transform hover:scale-105 inline-flex items-center gap-3 z-50 shadow-lg mb-20"
        >
          <span className="relative z-10">nfx@nunesfx.com</span>
          <ArrowRight className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          <span className="absolute inset-0 bg-accent-dim transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
        </a>

        {/* Links Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 w-full max-w-lg border-t border-border-main pt-12">
          <a href="https://www.linkedin.com/in/nathan-nunes05" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 text-text-muted hover:text-accent transition-colors">
            <span className="w-12 h-12 rounded-full border border-border-main flex items-center justify-center group-hover:border-accent transition-colors bg-cream">
              <Linkedin className="w-5 h-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">LinkedIn</span>
          </a>
          
          <a href="https://github.com/n8nunes" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 text-text-muted hover:text-accent transition-colors">
            <span className="w-12 h-12 rounded-full border border-border-main flex items-center justify-center group-hover:border-accent transition-colors bg-cream">
              <Github className="w-5 h-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">GitHub</span>
          </a>

          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="group flex flex-col items-center gap-3 text-text-muted hover:text-accent transition-colors">
            <span className="w-12 h-12 rounded-full border border-border-main flex items-center justify-center group-hover:border-accent transition-colors bg-cream">
              <FileText className="w-5 h-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}
