import { Bath, Bed, Square } from "lucide-react";
import { BrandBadge } from "@/components/BrandBadge";

export type PropertyCardData = {
  id: string;
  name: string;
  location: string;
  price: string;
  image: string;
  tags: string[];
  why?: string;
  beds: number;
  baths: number;
  sqm: number;
  badge?: string;
  reference?: string;
};

type PropertyCardProps = {
  property: PropertyCardData;
  className?: string;
};

export function PropertyCard({ property, className }: PropertyCardProps) {
  const badgeLabel = property.badge ?? property.tags[0]?.toUpperCase() ?? "CURATED";
  const locationLabel = property.location.split(",")[0]?.trim().toUpperCase() ?? property.location;

  return (
    <article
      className={[
        "group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition hover:border-border/80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={property.image}
          alt={`${property.name} luxury home in ${property.location}`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <BrandBadge label={badgeLabel} />
        {property.reference && (
          <span className="font-mono text-[11px] text-muted-foreground">{property.reference}</span>
        )}
        <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {locationLabel}
        </span>
        <h4 className="font-serif text-xl font-semibold text-card-foreground">{property.name}</h4>
        <span className="text-lg font-semibold text-primary">{property.price}</span>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed aria-hidden="true" className="h-3.5 w-3.5" />
            {property.beds} beds
          </span>
          <span className="flex items-center gap-1">
            <Bath aria-hidden="true" className="h-3.5 w-3.5" />
            {property.baths} baths
          </span>
          <span className="flex items-center gap-1">
            <Square aria-hidden="true" className="h-3.5 w-3.5" />
            {property.sqm} m²
          </span>
        </div>
        {property.why && (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{property.why}</p>
        )}
      </div>
    </article>
  );
}
