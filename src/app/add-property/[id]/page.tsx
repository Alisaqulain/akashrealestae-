import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";

import { PropertyForm } from "@/components/property-form";
import { SectionHeading } from "@/components/section-heading";
import { getCurrentUser } from "@/lib/auth";
import { connectToDatabase, isDatabaseEnabled } from "@/lib/db";
import Property from "@/models/Property";

export const metadata: Metadata = {
  title: "Edit Property",
};

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/listings");
  }

  const { id } = await params;

  if (!isDatabaseEnabled()) {
    return (
      <div className="container-shell py-16">
        <p className="rounded-[28px] border border-[var(--line)] bg-white p-8 text-slate-700 shadow-sm">
          MongoDB is not configured yet. Add a valid <code className="text-[var(--green-950)]">MONGODB_URI</code> to{" "}
          <code className="text-[var(--green-950)]">.env.local</code>, restart the dev server, then return to edit this
          listing.
        </p>
      </div>
    );
  }

  await connectToDatabase();

  const property = await Property.findById(id).lean();
  if (!property) {
    notFound();
  }

  return (
    <div className="container-shell py-16">
      <SectionHeading
        eyebrow="Edit Listing"
        title="Update property details and gallery"
        description="Refine pricing, descriptions, amenities, or media without rebuilding the listing from scratch."
      />
      <div className="mt-10">
        <PropertyForm property={JSON.parse(JSON.stringify(property))} />
      </div>
    </div>
  );
}
