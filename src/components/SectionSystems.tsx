"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const projects = [
  {
    id: "01",
    title: "GRC Report Automation Agent",
    tech: ["Python", "Ollama", "NIST CSF", "ISO 27001", "Essential Eight"],
    desc: "Automates control mapping and reporting across major security and compliance frameworks. Generates client-ready risk registers natively mapped to standard frameworks with zero ongoing API costs using local LLMs.",
    link: "https://github.com/n8nunes/security-analysis-automation",
    image: "abstract-grc",
  },
  {
    id: "02",
    title: "Secure AWS Serverless Messaging Framework",
    tech: ["Terraform", "IAM", "KMS", "Lambda", "DynamoDB"],
    desc: "A secure, infrastructure-as-code messaging framework built with least-privilege IAM and encryption at rest/in transit as first-class concerns. Compliant with NIST SP 800-53 and CIS AWS Foundations.",
    link: "https://github.com/n8nunes/secure-widget-backend",
    image: "abstract-aws",
  },
  {
    id: "03",
    title: "nfx // Personal Trading Journal",
    tech: ["React", "TypeScript", "Firebase", "Vercel"],
    desc: "A journal for tracking and reviewing discretionary trades and strategy adherence. Features strict multi-user data isolation and secure authentication via an automated CI/CD pipeline.",
    link: "https://github.com/n8nunes/trading-journal",
    image: "abstract-trading",
  },
  {
    id: "04",
    title: "Roam.io",
    tech: ["Flutter", "Dart", "Firebase"],
    desc: "A fog-of-war style location exploration app built with a student team. Co-led as project manager and contributed roughly half of the development work.",
    link: "https://github.com/Monash-FIT3170/2026W2-Roam.io",
    image: "abstract-roam",
  }
];

export default function SectionSystems() {
  return (
    <section id="systems" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-ink text-text-dark relative border-b border-border-dark">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-block font-mono text-sm tracking-wider uppercase text-accent border-b border-accent pb-1 mb-4">
              Systems
            </div>
            <h2 className="font-editorial text-4xl md:text-6xl text-text-dark leading-tight max-w-2xl">
              Projects and tools.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={clsx(
                "group flex flex-col gap-6",
                idx % 2 !== 0 ? "lg:mt-32" : "" // Asymmetrical layout
              )}
            >
              {/* Image/Mockup Placeholder */}
              <div className="aspect-[4/3] w-full bg-inner border border-border-dark rounded-content-md overflow-hidden relative flex items-center justify-center transform transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src={`/projects/${project.image}.png`}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-editorial text-2xl md:text-3xl text-text-dark group-hover:text-accent transition-colors">
                    <span className="font-mono text-sm text-text-dark/40 mr-3 inline-block transform -translate-y-1">{project.id}</span>
                    {project.title}
                  </h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-text-dark/60 hover:text-accent transition-colors p-1" aria-label={`View ${project.title} on GitHub`}>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <p className="font-sans text-text-dark/60 leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="font-mono text-[11px] uppercase tracking-wider px-2 py-1 bg-inner text-text-dark/60 border border-border-dark rounded-system-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
