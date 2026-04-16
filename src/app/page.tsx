import Image from "next/image";
import Link from "next/link";

import { HomeFaq } from "@/components/home-faq";
import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { company, featuredLocalities, homeProcessSteps, homeServices, stats } from "@/lib/data";
import { getFeaturedProperties } from "@/lib/queries";

export default async function Home() {
  const featuredProperties = await getFeaturedProperties();
  const user = await getCurrentUser();
  const isAdmin = user?.role === "admin";

  return (
    <div>
      <section className="bg-[var(--green-950)] text-white">
        <div className="container-shell grid gap-10 py-20 md:grid-cols-[1.2fr_0.8fr] md:py-28">
          <Reveal className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--gold)]">
              Premium Real Estate In Bangalore
            </p>
            <h1 className="max-w-3xl text-balance font-serif text-5xl leading-tight md:text-7xl">
              Find luxury homes, investment-ready plots, and curated rentals with AKASAK.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/75">
              A premium property platform designed for modern buyers, landlords, and developers who want elegant discovery, trustworthy listings, and simple property management.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/listings">
                <Button>Explore listings</Button>
              </Link>
              {isAdmin ? (
                <Link href="/add-property">
                  <Button variant="secondary">Add property (admin)</Button>
                </Link>
              ) : (
                <Link href="/contact">
                  <Button variant="secondary">Talk to our team</Button>
                </Link>
              )}
            </div>
            <div className="grid gap-4 pt-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="luxury-panel rounded-[28px] p-5">
                  <p className="font-serif text-4xl text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/65">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-[36px] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
                alt="Luxury property exterior"
                width={900}
                height={1000}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-shell py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Featured Collection"
            title="Handpicked homes across Bangalore's prime neighborhoods"
            description="Browse curated apartments, villas, and plots across fast-moving micro-markets with transparent information and strong presentation."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProperties.map((property, index) => (
            <Reveal key={property._id.toString()} delay={index * 0.05}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
        {!featuredProperties.length && (
          <div className="mt-10 rounded-[28px] border border-[var(--line)] bg-white p-10 text-center shadow-sm">
            <p className="font-serif text-3xl text-[var(--green-950)]">No live listings yet</p>
            <p className="mt-3 text-slate-600">
              {isAdmin
                ? "Publish your first listing from the admin dashboard or the Add property page once MongoDB is connected."
                : "New homes will appear here as soon as they are published. Explore localities below or get in touch for off-market options."}
            </p>
            {isAdmin && (
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link href="/dashboard">
                  <Button>Open dashboard</Button>
                </Link>
                <Link href="/add-property">
                  <Button variant="secondary">Add property</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--green-50)] py-20">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="What we offer"
              title="Buy, rent, and premium listing support"
              description="Whether you are upgrading your home, leasing a workspace, or marketing a signature asset, AKASAK keeps the experience focused and calm."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {homeServices.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="h-full rounded-[28px] border border-[var(--line)] bg-white p-8 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">{item.title}</p>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="Three calm steps from search to conversation"
            description="No clutter, no noise—just structured discovery and direct lines to the AKASAK team."
            align="center"
          />
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {homeProcessSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.08}>
              <div className="relative rounded-[28px] border border-[var(--line)] bg-white p-8 pt-12 shadow-sm">
                <span className="absolute left-8 top-6 font-serif text-5xl text-[var(--gold)]/35">{item.step}</span>
                <h3 className="font-serif text-2xl text-[var(--green-950)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Why AKASAK"
              title="Built for a luxury buying and selling journey"
              description="From first discovery to final inquiry, the experience is designed to feel modern, premium, and beginner-friendly for both clients and admins."
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "JWT-based authentication",
              "Admin approval workflow",
              "Cloudinary multi-image uploads",
              "Location and price filters",
              "Direct phone and WhatsApp CTA",
              "Inquiry capture and management",
            ].map((item, index) => (
              <Reveal key={item} delay={index * 0.05}>
                <div className="rounded-[28px] border border-[var(--line)] bg-[var(--green-50)] p-6">
                  <p className="font-semibold text-[var(--green-950)]">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Bangalore Focus"
            title="Micro-markets our clients ask for most"
            description="Track active opportunities across the city and shortlist listings in neighborhoods with strong lifestyle and investment potential."
            align="center"
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featuredLocalities.map((locality, index) => (
            <Reveal key={locality} delay={index * 0.05}>
              <Link
                href={`/listings?location=${encodeURIComponent(locality)}`}
                className="rounded-[28px] border border-[var(--line)] bg-white px-6 py-8 text-center text-lg font-semibold text-[var(--green-950)] shadow-sm transition hover:-translate-y-1 hover:border-[var(--gold)]"
              >
                {locality}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--green-950)] py-20 text-[#f7f5ef]">
        <div className="container-shell">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="Answers before you book a viewing"
              description="Straightforward policies so you always know how AKASAK works."
              align="center"
              variant="onDark"
            />
          </Reveal>
          <div className="mt-10">
            <HomeFaq />
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <Reveal>
          <div className="rounded-[36px] border border-[var(--line)] bg-white px-8 py-12 text-center shadow-sm">
            <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold)]">Visit & consult</p>
            <h2 className="mt-4 font-serif text-3xl text-[var(--green-950)] md:text-4xl">
              Prefer a scheduled consultation in Bangalore?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Share your brief—budget, locality, timeline—and we will align inventory or next steps with your goals.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button>Book via contact form</Button>
              </Link>
              <a href={`tel:${company.phone}`}>
                <Button variant="secondary">Call {company.phone}</Button>
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-[var(--green-950)] py-20 text-white">
        <div className="container-shell rounded-[36px] border border-white/10 px-8 py-12 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold)]">Get In Touch</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">
            Speak with an AKASAK property advisor today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Whether you are buying, renting, or listing an asset, our Bangalore team can guide you with the next best step.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={`tel:${company.phone}`}>
              <Button>Call {company.phone}</Button>
            </a>
            <Link href="/contact">
              <Button variant="secondary">Open contact page</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
