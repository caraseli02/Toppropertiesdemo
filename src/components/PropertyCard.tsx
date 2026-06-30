import { Link } from "react-router-dom";
import type { Property } from "@/data/properties";
import { formatPrice, modeLabel } from "@/lib/filters";
import { Badge, FavoriteButton } from "@/components/ui";
import { BathIcon, BedIcon, KeyIcon, MapPinIcon, RulerIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

function FactsRow({ p }: { p: Property }) {
  return (
    <div className="flex items-center gap-4 text-sm text-ink-soft">
      <span className="inline-flex items-center gap-1.5">
        <BedIcon className="text-[17px] text-burgundy" /> {p.beds}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <BathIcon className="text-[17px] text-burgundy" /> {p.baths}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <RulerIcon className="text-[17px] text-burgundy" /> {p.sqm} m²
      </span>
    </div>
  );
}

export function PropertyCard({
  property: p,
  className,
  variant = "default",
}: {
  property: Property;
  className?: string;
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <Link
        to={`/property/${p.slug}`}
        className={cn(
          "group flex gap-3 rounded-2xl border border-line bg-white p-2.5 shadow-sm transition hover:border-burgundy/40 hover:shadow-md",
          className,
        )}
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <p className="truncate font-serif text-base text-ink">{p.title}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-soft">
            <MapPinIcon className="text-[13px]" /> {p.location}, {p.country}
          </p>
          <p className="mt-1 text-sm font-semibold text-burgundy">{formatPrice(p)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/property/${p.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-burgundy/30 hover:shadow-xl hover:shadow-ink/5",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-70" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {p.featured && <Badge tone="gold">Featured</Badge>}
          {p.reserved && (
            <Badge tone="reserved">
              <KeyIcon className="text-[11px]" /> Trattativa Riservata
            </Badge>
          )}
        </div>
        <FavoriteButton id={p.id} className="absolute right-3 top-3" />
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-cream/95 px-3 py-1.5 text-sm font-semibold text-ink shadow-sm backdrop-blur-sm">
            {formatPrice(p)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-burgundy">
            {p.type}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-ink-soft">
            {modeLabel(p.mode)}
          </span>
        </div>
        <h3 className="mt-1.5 font-serif text-xl leading-snug text-ink">{p.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-soft">
          <MapPinIcon className="text-[15px] text-ink-soft" />
          {p.location}, {p.country}
        </p>

        <div className="mt-auto">
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <FactsRow p={p} />
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-medium text-ink-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
