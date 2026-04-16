import Image from "next/image";
import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { MobileMenu, type NavLinkItem } from "@/components/mobile-menu";
import { company } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

const publicLinks: NavLinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

function buildNavLinks(role: string | undefined): NavLinkItem[] {
  if (role === "admin") {
    return [
      ...publicLinks.slice(0, 2),
      { href: "/add-property", label: "Add Property" },
      ...publicLinks.slice(2),
      { href: "/dashboard", label: "Dashboard" },
    ];
  }
  return publicLinks;
}

export async function SiteHeader() {
  const user = await getCurrentUser();
  const navLinks = buildNavLinks(user?.role);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--green-950)]/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 shrink">
            <Link
              href="/"
              className="inline-flex max-w-full flex-col gap-0.5 rounded-xl bg-[#f7f5ef] p-1.5 pr-2 shadow-sm ring-1 ring-white/20 transition hover:ring-[var(--gold)]/50 sm:p-2 sm:pr-4"
            >
              <Image
                src="/logo.jpeg"
                alt={`${company.name} — premium Bangalore real estate`}
                width={200}
                height={72}
                className="h-9 w-auto max-w-[min(100%,11rem)] object-contain object-left sm:h-11 sm:max-w-none md:h-14"
                priority
              />
            </Link>
            <p className="mt-1 truncate text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--gold)] sm:text-xs sm:tracking-[0.3em]">
              Bangalore Luxury Realty
            </p>
          </div>

          <nav
            className="hidden min-w-0 flex-1 justify-center gap-3 overflow-x-auto px-1 [-ms-overflow-style:none] [scrollbar-width:none] md:flex md:gap-3 lg:gap-6 [&::-webkit-scrollbar]:hidden"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-white/80 transition hover:text-[var(--gold)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <a
              href={`tel:${company.phone}`}
              className="hidden min-h-11 items-center rounded-lg px-2 text-sm font-semibold text-[var(--gold)] hover:bg-white/5 xl:inline-flex"
            >
              Call {company.phone}
            </a>
            <a
              href={`tel:${company.phone}`}
              className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg border border-white/15 text-[var(--gold)] hover:bg-white/5 xl:hidden"
              aria-label={`Call ${company.phone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.21z" />
              </svg>
            </a>
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="hidden max-w-[6rem] truncate text-sm text-white/70 xl:inline">{user.name}</span>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link
                  href="/login"
                  className="touch-manipulation rounded-lg px-2 py-2.5 text-sm font-semibold text-white/90 hover:bg-white/10 sm:px-3"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="touch-manipulation rounded-full bg-[var(--gold)] px-3 py-2.5 text-sm font-semibold text-[var(--green-950)] sm:px-4"
                >
                  Signup
                </Link>
              </div>
            )}
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
