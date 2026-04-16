import type { Metadata } from "next";
import Link from "next/link";

import { FaqAccordion } from "@/components/faq-accordion";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { company, extraFaq, homeFaq } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions about ${company.name} and property search in ${company.city}.`,
};

const allFaq = [...homeFaq, ...extraFaq];

export default function FaqPage() {
  return (
    <div className="container-shell py-16">
      <SectionHeading
        eyebrow="Help centre"
        title="Frequently asked questions"
        description="Quick answers about listings, Bangalore focus, viewings, and how AKASAK works. For anything else, reach us on the contact page."
        align="center"
      />
      <div className="mt-12">
        <FaqAccordion items={allFaq} />
      </div>
      <div className="mx-auto mt-14 max-w-3xl rounded-[28px] border border-[var(--line)] bg-[var(--green-950)] px-8 py-10 text-center text-white">
        <p className="font-serif text-2xl">Still have questions?</p>
        <p className="mt-2 text-sm text-white/75">Call {company.phone} or send us a message.</p>
        <Link href="/contact" className="mt-6 inline-block">
          <Button>Contact {company.name}</Button>
        </Link>
      </div>
    </div>
  );
}
