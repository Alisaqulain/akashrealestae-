import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/badge";
import type { PropertyRecord } from "@/lib/types";
import { formatCompactCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: PropertyRecord;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={property.images?.[0] || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop"}
          alt={property.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge>{property.purpose === "buy" ? "Buy" : "Rent"}</Badge>
          <Badge className="border-white/20 bg-[var(--green-950)]/70 text-white">
            {property.status}
          </Badge>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{property.type}</p>
            <h3 className="mt-2 font-serif text-2xl text-[var(--green-950)]">
              {property.title}
            </h3>
          </div>
          <p className="text-lg font-semibold text-[var(--gold)]">
            {formatCompactCurrency(property.price)}
          </p>
        </div>
        <p className="text-sm text-slate-600">{property.location}, Bangalore</p>
        <div className="grid grid-cols-3 gap-3 rounded-3xl bg-[var(--green-50)] p-4 text-center text-sm text-slate-700">
          <div>
            <p className="font-semibold text-[var(--green-950)]">{property.bedrooms || 0}</p>
            <p>Beds</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--green-950)]">{property.bathrooms || 0}</p>
            <p>Baths</p>
          </div>
          <div>
            <p className="font-semibold text-[var(--green-950)]">{property.area || 0}</p>
            <p>Sq.ft</p>
          </div>
        </div>
        <Link
          href={`/listings/${property.slug}`}
          className="inline-flex text-sm font-semibold text-[var(--green-900)] transition hover:text-[var(--gold)]"
        >
          View property
        </Link>
      </div>
    </article>
  );
}
