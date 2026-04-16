import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ContactForm } from "@/components/contact-form";
import { MapCard } from "@/components/map-card";
import { Badge } from "@/components/badge";
import { company } from "@/lib/data";
import { getPropertyBySlug } from "@/lib/queries";
import { formatCurrency, getWhatsAppLink } from "@/lib/utils";

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property not found" };
  }

  return {
    title: property.title,
    description: property.description.slice(0, 150),
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const whatsAppMessage = `Hello AKASAK, I'm interested in ${property.title} in ${property.location}.`;

  return (
    <div className="container-shell py-10 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <section className="space-y-5 sm:space-y-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Badge>{property.type}</Badge>
            <Badge>{property.purpose === "buy" ? "Buy" : "Rent"}</Badge>
            <Badge>{property.status}</Badge>
          </div>
          <div>
            <h1 className="text-balance break-words font-serif text-3xl text-[var(--green-950)] sm:text-4xl md:text-5xl">
              {property.title}
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              {property.location}, {property.city}
            </p>
            <p className="mt-4 text-2xl font-semibold text-[var(--gold)] sm:text-3xl">
              {formatCurrency(property.price)}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-[24px] sm:h-72 sm:rounded-[32px] md:col-span-2 md:h-80">
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            {property.images.slice(1, 3).map((image: string) => (
              <div
                key={image}
                className="relative h-48 overflow-hidden rounded-[24px] sm:h-52 sm:rounded-[32px] md:h-56"
              >
                <Image src={image} alt={property.title} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-[28px] border border-[var(--line)] bg-white p-4 shadow-sm sm:gap-4 sm:p-6 md:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">Bedrooms</p>
              <p className="mt-2 text-lg font-semibold text-[var(--green-950)] sm:text-xl">{property.bedrooms}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Bathrooms</p>
              <p className="mt-2 text-lg font-semibold text-[var(--green-950)] sm:text-xl">{property.bathrooms}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Area</p>
              <p className="mt-2 text-lg font-semibold text-[var(--green-950)] sm:text-xl">{property.area} sq.ft</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm text-slate-500">Address</p>
              <p className="mt-2 break-words text-lg font-semibold text-[var(--green-950)] sm:text-xl">
                {property.address}
              </p>
            </div>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl text-[var(--green-950)] sm:text-3xl">About this property</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:leading-8">{property.description}</p>
          </div>
          <div className="rounded-[28px] border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8">
            <h2 className="font-serif text-2xl text-[var(--green-950)] sm:text-3xl">Amenities</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {property.amenities.map((amenity: string) => (
                <span
                  key={amenity}
                  className="rounded-full border border-[var(--line)] bg-[var(--green-50)] px-4 py-2 text-sm text-[var(--green-950)]"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
          <MapCard
            title={property.location}
            lat={property.coordinates?.lat || 12.9716}
            lng={property.coordinates?.lng || 77.5946}
          />
        </section>

        <aside className="space-y-5 sm:space-y-6">
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--green-950)] p-5 text-white shadow-sm sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">Quick connect</p>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl">Talk to a property specialist</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Call or WhatsApp the AKASAK team for this property. We help buyers and tenants move quickly.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${company.phone}`}
                className="touch-manipulation rounded-full bg-[var(--gold)] px-5 py-3.5 text-center text-sm font-semibold text-[var(--green-950)] active:opacity-90"
              >
                Call {company.phone}
              </a>
              <a
                href={getWhatsAppLink(whatsAppMessage)}
                target="_blank"
                rel="noreferrer"
                className="touch-manipulation rounded-full border border-white/15 px-5 py-3.5 text-center text-sm font-semibold text-white active:bg-white/10"
              >
                WhatsApp now
              </a>
            </div>
          </div>
          <ContactForm propertyId={property._id.toString()} />
        </aside>
      </div>
    </div>
  );
}
