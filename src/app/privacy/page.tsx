import type { Metadata } from "next";

import { LegalProse } from "@/components/legal-prose";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${company.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <div className="container-shell py-16">
      <SectionHeading
        eyebrow="Legal"
        title="Privacy policy"
        description={`Last updated for ${company.name} clients and visitors. This is a starter policy—have your counsel review before production use.`}
      />
      <LegalProse>
        <h2>Information we collect</h2>
        <p>
          When you use our contact forms, create an account, or submit inquiries, we may collect your name, email,
          phone number, and message content. Technical data such as browser type and approximate location may be
          collected automatically for security and analytics.
        </p>
        <h2>How we use information</h2>
        <p>
          We use your details to respond to inquiries, operate the platform, improve our services, and comply with
          legal obligations. We do not sell your personal information to third parties for their marketing.
        </p>
        <h2>Cookies</h2>
        <p>
          We may use cookies and similar technologies for authentication, preferences, and analytics. You can control
          cookies through your browser settings.
        </p>
        <h2>Data retention</h2>
        <p>
          We retain information only as long as needed for the purposes above or as required by law. You may request
          deletion of your account data where applicable, subject to legal retention requirements.
        </p>
        <h2>Contact</h2>
        <p>
          For privacy-related requests, email {company.email} or call {company.phone}.
        </p>
      </LegalProse>
    </div>
  );
}
