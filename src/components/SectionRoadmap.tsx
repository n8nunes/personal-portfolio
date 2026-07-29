import React from "react";
import clsx from "clsx";

const roadmapItems = [
  {
    title: "Certifications",
    items: ["Completing CompTIA Security+", "Completing AWS Solutions Architect Associate (SAA-C03)"],
  },
  {
    title: "Engineering",
    items: ["Building more agents to automate tasks", "Expanding my IaC and Cloud Architecture knowledge"],
  },
  {
    title: "Career",
    items: [
      "Seeking graduate and internship opportunities in cloud security and GRC",
      "Exploring opportunities across the broader cloud landscape"
    ],
  },
];

export default function SectionRoadmap() {
  return (
    <section id="whats-next" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-ink text-text-dark relative border-b border-border-dark">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <div className="inline-block font-mono text-sm tracking-wider uppercase text-pending border-b border-pending pb-1 mb-4">
            In Progress
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-text-dark leading-tight">
            What's next.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {roadmapItems.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h3 className="font-mono text-sm tracking-widest uppercase text-text-dark/40">
                [ {category.title} ]
              </h3>
              <ul className="flex flex-col gap-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-pending shrink-0" />
                    <span className="font-sans text-text-dark/60 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
