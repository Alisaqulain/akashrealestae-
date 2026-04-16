interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  /** Use on dark green sections so title and copy stay readable */
  variant?: "default" | "onDark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "default",
}: SectionHeadingProps) {
  const isDark = variant === "onDark";

  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-serif text-3xl md:text-5xl ${isDark ? "text-[#f7f5ef]" : "text-[var(--green-950)]"}`}
      >
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 ${isDark ? "text-white/75" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  );
}
