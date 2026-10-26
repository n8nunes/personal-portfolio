import Image from "next/image";
import { hero } from "@/lib/content";
import { hasPortrait } from "@/lib/media";

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-6 pb-14 pt-24 md:grid-cols-[minmax(0,1fr)_17rem] md:gap-10 md:pb-16 md:pt-28 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 lg:pb-20 lg:pt-32">
        <div>
          <h1
            id="hero-heading"
            className="rise text-balance font-display text-5xl font-semibold leading-[0.95] tracking-tight text-ink md:text-6xl xl:text-7xl"
          >
            {hero.headline}
          </h1>

          <div className="rise rise-2 glass mt-8 max-w-xl rounded-3xl p-7">
            <p className="text-[17px] leading-[1.6] text-ink md:text-[18px]">
              {hero.paragraphs[0]}
            </p>
            <p className="mt-4 text-[17px] leading-[1.6] text-ink/80 md:text-[18px]">
              {hero.paragraphs[1]}
            </p>
          </div>

          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-white"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noopener"
              className="glass inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-ink"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        {hasPortrait() ? (
          <div className="rise rise-2 mx-auto w-full max-w-[16rem] md:mx-0 md:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_30px_70px_-34px_rgba(19,32,58,0.55)]">
              <div className="aspect-[3/4]">
                <Image
                  src="/images/portrait.jpg"
                  alt="Nathan Nunes"
                  width={1536}
                  height={2048}
                  priority
                  sizes="(min-width: 1024px) 20rem, (min-width: 768px) 17rem, 16rem"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
