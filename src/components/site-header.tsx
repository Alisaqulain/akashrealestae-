import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { company } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();

  const navLinks =
    user?.role === "admin"
      ? [...publicLinks.slice(0, 2), { href: "/add-property", label: "Add Property" }, ...publicLinks.slice(2)]
      : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--green-950)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <Link
            href="/"
            className="inline-flex flex-col gap-1 rounded-xl bg-[#f7f5ef] p-2 pr-4 shadow-sm ring-1 ring-white/20 transition hover:ring-[var(--gold)]/50"
          >
            <Image
              src="/logo.jpeg"
              alt={`${company.name} — premium Bangalore real estate`}
              width={200}
              height={72}
              className="h-14 w-auto object-contain object-left"
              priority
            />
          </Link>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">
            Bangalore Luxury Realty
          </p>
        </div>
        <nav className="flex max-w-[min(100%,22rem)] flex-wrap items-center justify-end gap-x-4 gap-y-2 md:max-w-none md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition hover:text-[var(--gold)]"
            >
              {link.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link href="/dashboard" className="text-sm font-medium text-white/80 transition hover:text-[var(--gold)]">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          <a
            href={`tel:${company.phone}`}
            className="hidden text-sm font-semibold text-[var(--gold)] md:inline-flex"
          >
            Call {company.phone}
          </a>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-white/70 md:inline">{user.name}</span>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-white/80">
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-semibold text-[var(--green-950)]"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
