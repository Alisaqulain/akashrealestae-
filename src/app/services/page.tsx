import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { company, homeServices } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: `Buying, renting, and listing support in ${company.city} with ${company.name}.`,
};

const detailBlocks = [
  {
    title: "Residential buying",
    points: [
      "Shortlists aligned to budget, commute, and lifestyle",
      "Side-by-side comparison of flats, villas, and plots",
      "Direct call and WhatsApp routing to advisors",
    ],
  },
  {
    title: "Rentals & leasing",
    points: [
      "Curated rental inventory in high-demand localities",
      "Clear amenity and map context for each home",
      "Inquiry capture so the team can respond quickly",
    ],
  },
  {
    title: "Listing & marketing",
    points: [
      "Administrator-managed publishing for consistent quality",
      "Multi-image galleries powered by Cloudinary",
      "SEO-friendly listing pages for discovery",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-[var(--green-950)] py-16 text-white">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Everything you need across the property lifecycle"
              description="Whether you are acquiring, leasing, or showcasing an asset, AKASAK keeps the journey structured and premium."
              variant="onDark"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeServices.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">{s.title}</p>
                  <p className="mt-4 text-sm leading-7 text-white/80">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          {detailBlocks.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.08}>
              <div className="h-full rounded-[28px] border border-[var(--line)] bg-white p-8 shadow-sm">
                <h2 className="font-serif text-2xl text-[var(--green-950)]">{block.title}</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  {block.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="text-[var(--gold)]">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-[28px] border border-[var(--line)] bg-[var(--green-50)] px-8 py-10">
            <div>
              <p className="font-serif text-2xl text-[var(--green-950)]">Ready to move forward?</p>
              <p className="mt-2 text-sm text-slate-600">Tell us your brief—we will align next steps.</p>
            </div>
            <Link href="/contact">
              <Button>Start a conversation</Button>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
