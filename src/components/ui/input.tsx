import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--green-950)] outline-none transition placeholder:text-slate-400 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--green-950)] outline-none transition placeholder:text-slate-400 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "min-h-11 w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--green-950)] outline-none transition focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}
