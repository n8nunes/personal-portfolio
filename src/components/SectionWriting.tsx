import React from "react";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "An Eye For an Eye - When the hackers get hacked.",
    date: "Jun 29, 2026",
    excerpt: "What mistakes did the hackers make, and how can defenders avoid them",
    link: "https://nunesfx.substack.com/p/an-eye-for-an-eye-when-the-hackers",
  },
  {
    title: "Hackers Took Over Obamas Instagram By Asking Nicely",
    date: "Jun 24, 2026",
    excerpt: "No phishing, no figuring out the password - Just asking AI in plain English.",
    link: "https://nunesfx.substack.com/p/hackers-took-over-obamas-instagram",
  }
];

export default function SectionWriting() {
  return (
    <section id="writing" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-cream text-text-main relative">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

        {/* Left Column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <div className="inline-block font-mono text-sm tracking-wider uppercase text-accent border-b border-accent pb-1 mb-4">
            Writing
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-text-main leading-tight mb-6">
            Notes on cybersecurity and markets.
          </h2>
          <p className="font-sans text-lg text-text-muted leading-relaxed mb-8">
            I write regularly about cloud security patterns, engineering for compliance, and how systems can be designed to make risk legible.
          </p>
          <a
            href="https://nunesfx.substack.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 font-sans font-medium text-text-main hover:text-accent transition-colors"
          >
            Read the full archive
            <span className="w-8 h-8 rounded-full border border-border-dark flex items-center justify-center group-hover:border-accent transition-colors">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Right Column: Cards */}
        <div className="lg:col-span-7 flex flex-col gap-6 pt-4 lg:pt-0">
          <div className="font-mono text-xs uppercase tracking-widest text-text-subtle mb-2">
            [ My latest Substack posts ]
          </div>
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="group block bg-paper border border-border-main p-8 md:p-10 rounded-content-md hover:border-accent/50 hover:shadow-shadow-main transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.02] transition-colors duration-300" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {post.date}
                </div>
                <h3 className="font-editorial text-2xl md:text-3xl text-text-main group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="font-sans text-text-muted leading-relaxed max-w-xl">
                  {post.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
