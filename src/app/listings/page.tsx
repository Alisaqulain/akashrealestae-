import type { Metadata } from "next";

import { ListingsFilter } from "@/components/listings-filter";
import { PropertyCard } from "@/components/property-card";
import { SectionHeading } from "@/components/section-heading";
import { getProperties } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Listings",
  description: "Browse premium real estate listings across Bangalore.",
};

interface ListingsPageProps {
  searchParams: Promise<{
    location?: string;
    type?: string;
    purpose?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const filters = await searchParams;
  const properties = await getProperties(filters);

  return (
    <div className="container-shell py-10 sm:py-16">
      <SectionHeading
        eyebrow="Property Listings"
        title="Explore AKASAK's active Bangalore inventory"
        description="Search by locality, compare buy or rent options, and shortlist premium homes or plots with quick access to every important detail."
      />
      <div className="mt-10">
        <ListingsFilter />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property._id.toString()} property={property} />
        ))}
      </div>
      {!properties.length && (
        <div className="mt-10 rounded-[28px] border border-[var(--line)] bg-white p-10 text-center shadow-sm">
          <p className="font-serif text-3xl text-[var(--green-950)]">No properties matched</p>
          <p className="mt-3 text-slate-600">
            Adjust your filters to discover more homes across Bangalore.
          </p>
        </div>
      )}
    </div>
  );
}
