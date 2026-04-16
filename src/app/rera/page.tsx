import type { Metadata } from "next";
import Link from "next/link";

import { LegalProse } from "@/components/legal-prose";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "RERA & compliance",
  description: `Important notices about RERA and regulatory compliance for ${company.name} visitors in Karnataka.`,
};

export default function ReraPage() {
  return (
    <div className="container-shell py-16">
      <SectionHeading
        eyebrow="Compliance"
        title="RERA & regulatory awareness"
        description="Indian real estate is regulated at the state level. Use this page as a reminder to verify promoter and project registrations before you transact."
      />
      <LegalProse>
        <h2>About RERA</h2>
        <p>
          The Real Estate (Regulation and Development) Act, 2016 (RERA) and Karnataka State rules apply to eligible
          real estate projects and promoters. Buyers should confirm registration numbers, project disclosures, and
          filing status on the official Karnataka RERA portal before making booking decisions.
        </p>
        <h2>Role of {company.name}</h2>
        <p>
          {company.name} is a technology and marketing platform for property discovery. Unless explicitly stated on a
          specific listing or agreement, we are not the promoter of a project and do not replace legal or financial
          advice. Always engage qualified professionals for title diligence, agreements, and tax matters.
        </p>
        <h2>Listings</h2>
        <p>
          Where RERA numbers or promoter details are provided on a listing, they should be verified independently.
          Missing fields do not imply exemption from law—due diligence remains solely with the buyer or tenant.
        </p>
      </LegalProse>
      <div className="mt-10 flex flex-wrap gap-4">
        <a href="https://rera.karnataka.gov.in/" target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Karnataka RERA portal (external)</Button>
        </a>
        <Link href="/contact">
          <Button>Ask our team</Button>
        </Link>
      </div>
    </div>
  );
}
