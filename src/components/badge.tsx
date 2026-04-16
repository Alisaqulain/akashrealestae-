import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
