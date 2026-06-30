import type { Property } from "@/data/properties";
import { formatCompact, formatPrice } from "@/lib/filters";
import { MapPinIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

export function MapView({
  properties,
  selectedId,
  onSelect,
  className,
}: {
  properties: Property[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const selected = properties.find((p) => p.id === selectedId);

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden rounded-2xl bg-[#e7ddc9]", className)}
    >
      {/* Stylised base map */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#efe7d6" />
            <stop offset="100%" stopColor="#e3d8c1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#land)" />
        {/* Water */}
        <path
          d="M400 60 C 320 70, 300 150, 360 210 C 390 245, 360 300, 400 330 L 400 400 L 260 400 C 250 340, 300 300, 320 250 C 345 190, 300 130, 400 60 Z"
          fill="#cfe1e2"
        />
        <path
          d="M400 60 C 320 70, 300 150, 360 210 C 390 245, 360 300, 400 330"
          fill="none"
          stroke="#bcd2d4"
          strokeWidth="2"
        />
        {/* Parks */}
        <rect x="40" y="220" width="70" height="60" rx="10" fill="#d8e3c9" />
        <rect x="150" y="80" width="54" height="48" rx="10" fill="#d8e3c9" />
        <rect x="120" y="300" width="60" height="50" rx="10" fill="#d8e3c9" />
        {/* Roads */}
        <g stroke="#fbf6ee" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.95">
          <path d="M-10 120 C 80 120, 120 60, 230 90 S 360 150, 420 120" />
          <path d="M60 -10 C 80 80, 160 140, 150 240 S 90 360, 120 420" />
          <path d="M-10 300 C 100 300, 180 260, 260 300 S 380 360, 420 330" />
          <path d="M250 -10 C 240 80, 300 160, 270 250 S 200 360, 240 420" />
        </g>
        <g stroke="#e7dcc6" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8">
          <path d="M-10 180 C 100 200, 200 150, 320 200" />
          <path d="M200 -10 C 210 100, 150 180, 210 280" />
        </g>
      </svg>

      {/* Pins */}
      {properties.map((p) => {
        const isSel = p.id === selectedId;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelect?.(p.id)}
            style={{ left: `${p.pin.x}%`, top: `${p.pin.y}%` }}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            aria-label={`${p.title}, ${formatPrice(p)}`}
          >
            {isSel && (
              <span className="absolute left-1/2 top-1/2 -z-10 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-burgundy/30" />
            )}
            <span
              className={cn(
                "flex items-center justify-center rounded-full border-2 border-cream shadow-md transition-all duration-200",
                isSel
                  ? "h-9 min-w-9 px-2 text-xs font-bold text-cream"
                  : "h-5 w-5 bg-burgundy group-hover:scale-125",
              )}
              style={isSel ? { backgroundColor: "#54141f" } : undefined}
            >
              {isSel ? formatCompact(p.price) : ""}
            </span>
            {/* Hover tooltip (desktop) */}
            <span
              className={cn(
                "pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[11px] font-medium text-cream opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100",
                isSel && "opacity-100",
              )}
            >
              {p.title}
            </span>
          </button>
        );
      })}

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] font-medium text-ink-soft shadow-sm backdrop-blur-sm">
        <MapPinIcon className="text-sm text-burgundy" /> {properties.length} residences · stylised
        map
      </div>

      {selected && (
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] font-semibold text-burgundy shadow-sm backdrop-blur-sm">
          {selected.location}
        </div>
      )}
    </div>
  );
}
