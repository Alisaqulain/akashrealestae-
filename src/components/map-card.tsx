interface MapCardProps {
  title: string;
  lat: number;
  lng: number;
}

export function MapCard({ title, lat, lng }: MapCardProps) {
  const url = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-sm">
      <div className="border-b border-[var(--line)] px-4 py-3 sm:px-6 sm:py-4">
        <h3 className="break-words font-serif text-xl text-[var(--green-950)] sm:text-2xl">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">Prime Bangalore micro-market location</p>
      </div>
      <iframe
        title={`${title} map`}
        src={url}
        className="h-64 w-full border-0 sm:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
