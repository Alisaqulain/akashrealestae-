import type { Metadata } from "next";

import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/data";
import { getWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AKASAK for buying, renting, or listing premium Bangalore properties.",
};

export default function ContactPage() {
  return (
    <div className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionHeading
            eyebrow="Contact AKASAK"
            title="Tell us what kind of property you need"
            description="Reach the team for buying, renting, selling, or investment assistance anywhere in Bangalore."
          />
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--green-950)] p-8 text-white shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">Direct contact</p>
            <div className="mt-5 space-y-4 text-sm text-white/75">
              <p>Phone: {company.phone}</p>
              <p>Email: {company.email}</p>
              <p>City: {company.city}</p>
            </div>
            <a
              href={getWhatsAppLink("Hello AKASAK, I would like to discuss a property requirement.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-semibold text-[var(--green-950)]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
