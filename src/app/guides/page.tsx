import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Guides",
  description: `Practical guides for buyers and renters in ${company.city} from ${company.name}.`,
};

export default function GuidesPage() {
  return (
    <div className="container-shell py-16">
      <SectionHeading
        eyebrow="Guides"
        title="Smarter moves in the Bangalore property market"
        description="Short, practical notes to help you prepare before you shortlist or schedule a visit."
        align="center"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <article className="rounded-[28px] border border-[var(--line)] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">For buyers</p>
            <h2 className="mt-3 font-serif text-2xl text-[var(--green-950)]">Checklist before you shortlist</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <li>Confirm loan pre-approval or liquidity range so filters stay realistic.</li>
              <li>Map commute peaks—school runs and tech park hours change daily rhythm.</li>
              <li>Compare total cost of ownership: maintenance, parking, and club charges.</li>
              <li>Ask for latest status on approvals, occupancy, and handover timelines.</li>
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="rounded-[28px] border border-[var(--line)] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">For renters</p>
            <h2 className="mt-3 font-serif text-2xl text-[var(--green-950)]">What to clarify early</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
              <li>Lease term, escalation, and notice period in writing.</li>
              <li>Deposit structure and move-in/out inspection process.</li>
              <li>What is included: power backup, parking slot, appliances.</li>
              <li>Society rules on pets, visitors, and quiet hours if applicable.</li>
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-12 text-center">
          <Link href="/listings">
            <Button>Browse listings</Button>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
