import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionDeck from "@/components/SectionDeck";
import { Certifications, Timeline } from "@/components/Timeline";
import { ProjectCard } from "@/components/ui/3d-card";
import { contact, record, selectedWork, site } from "@/lib/content";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="relative z-10">
      <SectionDeck>
        <Hero />

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="section-shell"
        >
          <div className="section-inner">
            <Reveal>
              <h2
                id="projects-heading"
                className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
              >
                {selectedWork.heading}
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {selectedWork.projects.map((project, index) => (
                <Reveal key={project.title} delay={(index % 2) * 0.06} className="h-full">
                  <ProjectCard
                    title={project.title}
                    body={project.body}
                    tools={project.tools}
                    href={project.href}
                    actionText={project.actionText}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="record"
          aria-labelledby="record-heading"
          className="section-shell"
        >
          <div className="section-inner">
            <Reveal>
              <h2
                id="record-heading"
                className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
              >
                {record.heading}
              </h2>
            </Reveal>

            <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <Reveal delay={0.05}>
                <Timeline entries={record.entries} />
              </Reveal>

              <Reveal delay={0.1}>
                <Certifications
                  heading={record.certificationsHeading}
                  items={record.certifications}
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="section-shell"
        >
          <div className="section-inner">
            <Reveal>
              <div
                className="cloud-card p-7 md:p-10"
                style={{
                  "--card-texture": "url(/images/cards/card-3.webp)",
                } as React.CSSProperties}
              >
                <h2
                  id="contact-heading"
                  className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl"
                >
                  {contact.heading}
                </h2>

                <p className="mt-4 max-w-xl text-ink/80">{contact.paragraph}</p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={contact.email.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white"
                  >
                    {contact.email.label}
                  </a>

                  {contact.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="inline-flex min-h-11 items-center px-5 py-3 text-sm font-medium underline underline-offset-4"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <p className="mt-8 text-sm text-ink/80">{site.footer}</p>
          </div>
        </section>
      </SectionDeck>
    </main>
  );
}
