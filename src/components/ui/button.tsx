"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 min-w-[2.75rem] touch-manipulation items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 sm:min-h-12 sm:min-w-0",
        variant === "primary" &&
          "bg-[var(--gold)] text-[var(--green-950)] shadow-lg shadow-[var(--gold)]/20 hover:-translate-y-0.5 hover:bg-[#ddb96b]",
        variant === "secondary" &&
          "border border-white/15 bg-white/5 text-white hover:border-[var(--gold)] hover:bg-white/10",
        variant === "ghost" && "text-[var(--green-900)] hover:bg-[var(--gold)]/10",
        className,
      )}
      {...props}
    />
  );
}
