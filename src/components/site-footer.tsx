import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";
import { company } from "@/lib/data";

export async function SiteFooter() {
  const user = await getCurrentUser();

  return (
    <footer className="border-t border-white/10 bg-[var(--green-950)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block rounded-xl bg-[#f7f5ef] p-3 ring-1 ring-white/10">
            <Image
              src="/logo.jpeg"
              alt={`${company.name} logo`}
              width={180}
              height={64}
              className="h-12 w-auto object-contain object-left"
            />
          </Link>
          <p className="mt-3 text-sm leading-7 text-white/70">
            A premium Bangalore real estate platform built for buying, renting, and managing luxury properties with confidence.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">Explore</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/listings">Browse listings</Link>
            <Link href="/about">About us</Link>
            <Link href="/services">Services</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            {user?.role === "admin" && <Link href="/add-property">Add property (admin)</Link>}
            {user?.role === "admin" && (
              <Link href="/dashboard" className="text-[var(--gold)]">
                Admin dashboard
              </Link>
            )}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">Legal</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
            <Link href="/rera">RERA & compliance</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">Contact</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <a href={`tel:${company.phone}`}>{company.phone}</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <p>{company.city}, Karnataka</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
