export interface FaqItem {
  q: string;
  a: string;
}

/** Simple accessible FAQ without extra client JS */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-[24px] border border-[var(--line)] bg-white px-6 py-4 shadow-sm open:shadow-md"
        >
          <summary className="cursor-pointer list-none pr-1 font-semibold text-[var(--green-950)] marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-3">
              <span className="min-w-0 flex-1 text-pretty">{item.q}</span>
              <span className="mt-0.5 shrink-0 text-xs text-[var(--gold)] transition-transform group-open:-rotate-180">
                ▼
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
