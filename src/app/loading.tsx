export default function Loading() {
  return (
    <div className="container-shell py-24">
      <div className="animate-pulse space-y-6">
        <div className="h-12 w-64 rounded-full bg-[var(--gold)]/20" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-[28px] border border-[var(--line)] bg-white p-6">
              <div className="h-52 rounded-3xl bg-slate-200" />
              <div className="mt-6 h-6 w-2/3 rounded-full bg-slate-200" />
              <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
              <div className="mt-6 h-20 rounded-3xl bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
