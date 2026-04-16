import type { ReactNode } from "react";

/** Consistent readable width for policy and long-form pages */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 text-base leading-8 text-slate-700 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-[var(--green-950)] [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-[var(--green-950)] [&_li]:mt-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">
      {children}
    </div>
  );
}
