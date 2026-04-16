import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { PropertyForm } from "@/components/property-form";
import { SectionHeading } from "@/components/section-heading";
import { getCurrentUser } from "@/lib/auth";
import { isDatabaseEnabled } from "@/lib/db";

export const metadata: Metadata = {
  title: "Add Property",
  description: "Submit a new property to the AKASAK platform.",
};

export default async function AddPropertyPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/listings");
  }

  return (
    <div className="container-shell py-16">
      {!isDatabaseEnabled() && (
        <p className="mb-8 rounded-[28px] border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-amber-950">
          MongoDB is optional for now: you can browse the site. Saving properties, sign up, login, and contact
          submissions need a valid <code className="font-semibold">MONGODB_URI</code> in{" "}
          <code className="font-semibold">.env.local</code> when you are ready.
        </p>
      )}
      <SectionHeading
        eyebrow="Property Management"
        title="List a new property on AKASAK"
        description="A simple admin-friendly workflow for uploading premium Bangalore listings with images, amenities, pricing, and map coordinates."
      />
      <div className="mt-10">
        <PropertyForm />
      </div>
    </div>
  );
}
