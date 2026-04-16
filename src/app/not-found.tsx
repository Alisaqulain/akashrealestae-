import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-[var(--gold)]">404</p>
      <h1 className="mt-4 font-serif text-5xl text-[var(--green-950)]">Property not found</h1>
      <p className="mt-4 max-w-xl text-slate-600">
        The listing you are looking for may have been removed, sold, or is no longer publicly available.
      </p>
      <Link href="/listings" className="mt-8">
        <Button>Back to listings</Button>
      </Link>
    </div>
  );
}
