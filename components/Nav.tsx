"use client";

import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/content";
import { site } from "@/lib/content";

type NavProps = {
  links: NavLink[];
};

export default function Nav({ links }: NavProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-20 h-0 px-4">
      <div className="pt-4">
        <div className="glass mx-auto max-w-5xl rounded-2xl px-5 py-3">
          <div className="flex items-center justify-between gap-6">
            <span className="font-display text-lg font-semibold tracking-tight">
              {site.name}
            </span>

            <nav aria-label="Primary" className="hidden sm:block">
              <ul className="flex items-center gap-5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm underline-offset-4 hover:underline focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((current) => !current)}
              className="-mr-2 min-h-11 rounded-full px-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:underline sm:hidden"
            >
              {site.menuLabel}
            </button>
          </div>

        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="glass mx-auto mt-2 max-w-5xl rounded-2xl bg-white/60 p-2 sm:hidden"
        >
          <nav aria-label="Mobile">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
