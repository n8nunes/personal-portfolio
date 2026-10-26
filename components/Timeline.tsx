import type { Certification, TimelineEntry } from "@/lib/content";

type TimelineProps = {
  entries: readonly TimelineEntry[];
};

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="mt-8 space-y-8 border-l border-ink/15 pl-8">
      {entries.map((entry) => (
        <li key={entry.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-white ring-2 ring-ink/25"
          />
          <h3 className="text-lg font-medium text-ink">{entry.title}</h3>
          <p className="mt-1 text-sm leading-[1.5] text-ink/80">{entry.dates}</p>
          <p className="mt-2 leading-relaxed text-ink/80">{entry.body}</p>
        </li>
      ))}
    </ol>
  );
}

type CertificationsProps = {
  heading: string;
  items: readonly Certification[];
};

export function Certifications({ heading, items }: CertificationsProps) {
  return (
    <>
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
        {heading}
      </h3>

      <ul className="mt-5 divide-y divide-ink/10">
        {items.map((certification) => (
          <li key={certification.name} className="flex justify-between gap-4 py-3.5">
            <span>{certification.name}</span>
            <span className="whitespace-nowrap text-sm leading-[1.5] text-ink/80">
              {certification.status}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
