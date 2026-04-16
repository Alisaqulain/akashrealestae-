"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface NavLinkItem {
  href: string;
  label: string;
}

interface MobileMenuProps {
  links: NavLinkItem[];
}

export function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="flex min-h-11 min-w-11 touch-manipulation flex-col items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/5 p-2 text-white md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`block h-0.5 w-6 origin-center rounded-full bg-[var(--gold)] transition ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 rounded-full bg-[var(--gold)] transition ${open ? "scale-0 opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 origin-center rounded-full bg-[var(--gold)] transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--gold)]"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            className="absolute inset-y-0 right-0 flex h-full max-h-[100dvh] w-full flex-col border-l border-white/10 bg-[var(--green-950)] shadow-2xl sm:w-[min(22rem,calc(100vw-2rem))]"
            aria-label="Mobile navigation"
          >
            <div className="flex min-h-[3.25rem] items-center justify-between gap-3 border-b border-white/10 px-[clamp(1rem,4vw,1.5rem)] pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Menu</span>
              <button
                type="button"
                className="touch-manipulation flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-white/90 hover:bg-white/10"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block min-h-12 border-b border-white/5 px-[clamp(1rem,4vw,1.5rem)] py-3.5 pr-[max(1rem,env(safe-area-inset-right))] text-base font-medium text-white/90 transition active:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
