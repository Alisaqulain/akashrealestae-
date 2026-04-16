import type { Metadata } from "next";

import { LegalProse } from "@/components/legal-prose";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions for using the ${company.name} website and services.`,
};

export default function TermsPage() {
  return (
    <div className="container-shell py-16">
      <SectionHeading
        eyebrow="Legal"
        title="Terms of service"
        description={`By using ${company.name}, you agree to these terms. This is a template—have qualified legal counsel adapt it for your business.`}
      />
      <LegalProse>
        <h2>Use of the platform</h2>
        <p>
          {company.name} provides an online discovery and inquiry channel for real estate in {company.city}. Listings
          are for information only and do not constitute an offer or contract until agreed in writing between the
          relevant parties.
        </p>
        <h2>No warranty</h2>
        <p>
          We strive for accuracy but do not warrant that listings, descriptions, or maps are complete or error-free.
          You are responsible for independent verification, including title, encumbrances, approvals, and physical
          inspection.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, {company.name} and its affiliates are not liable for indirect,
          incidental, or consequential damages arising from your use of the site or reliance on any content.
        </p>
        <h2>Accounts</h2>
        <p>
          Where accounts are available, you are responsible for safeguarding credentials and for all activity under your
          account. We may suspend access for misuse or security reasons.
        </p>
        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use after changes constitutes acceptance of the
          revised terms.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms: {company.email} · {company.phone}
        </p>
      </LegalProse>
    </div>
  );
}
