import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { company, stats } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${company.name}, a premium Bangalore real estate platform for buying, renting, and curated property discovery.`,
};

export default function AboutPage() {
  return (
    <div className="container-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="About AKASAK"
          title="Premium real estate, grounded in Bangalore"
          description="We combine disciplined listing quality, transparent discovery, and direct access to advisors so every client moves with clarity and confidence."
        />
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal delay={0.05}>
          <div className="space-y-5 text-base leading-8 text-slate-700">
            <p>
              {company.name} was built for a market that rewards preparation: clear photography, honest locality context,
              and responsive human support—not endless scrolling without answers.
            </p>
            <p>
              Our team focuses on high-intent micro-markets across {company.city}, from established corridors to
              emerging growth belts, so buyers and tenants can shortlist faster.
            </p>
            <p>
              Listings are stewarded through an admin workflow to protect brand trust and visitor experience. When you
              see a property on {company.name}, it has been prepared for public presentation with care.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--green-950)] p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">At a glance</p>
            <div className="mt-6 space-y-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl text-[var(--gold)]">{s.value}</p>
                  <p className="mt-1 text-sm text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-8 inline-block">
              <Button>Work with us</Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
