import { ArrowUpRight, Bath, Bed, MapPin } from "lucide-react";
import { formatUsdComparison } from "@/services/priceService";
import { Property } from "@/types";

interface LuxuryPropertiesShowcaseProps {
  properties: readonly Property[];
  onSelect: (property: Property) => void;
}

const propertyKickers = ["Riviera Icon", "Skyline Residence", "Coastal Estate"] as const;

function PropertyMeta({ property, tone = "dark" }: { property: Property; tone?: "dark" | "light" }) {
  const textClass = tone === "light" ? "text-white/80" : "text-charcoal/65";

  return (
    <div className={`flex flex-wrap items-center gap-2 text-[12px] md:text-[13px] ${textClass}`}>
      <span className="inline-flex items-center gap-1">
        <Bed className="h-3.5 w-3.5" />
        {property.beds}
      </span>
      <span aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1">
        <Bath className="h-3.5 w-3.5" />
        {property.baths}
      </span>
      <span aria-hidden="true">•</span>
      <span>{property.sqft}</span>
    </div>
  );
}

export function LuxuryPropertiesShowcase({ properties, onSelect }: LuxuryPropertiesShowcaseProps) {
  const showcaseProperties = properties.slice(0, 3);
  const [heroProperty, ...supportingProperties] = showcaseProperties;

  if (!heroProperty) return null;

  const usdComparison = formatUsdComparison(heroProperty.price);

  return (
    <section aria-label="Curated luxury properties" className="mb-8">
      <div className="grid gap-3 md:gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="grid gap-3 md:gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="min-h-[230px] rounded-[28px] bg-[#e8e4dc] p-6 md:p-8 flex flex-col justify-between overflow-hidden border border-black/5">
            <div className="flex items-start justify-between gap-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal/55">
                Private selection
              </p>
              <span className="h-px flex-1 bg-charcoal/35 mt-2" aria-hidden="true" />
              <ArrowUpRight className="h-5 w-5 text-charcoal" aria-hidden="true" />
            </div>

            <div>
              <h3 className="font-display text-[38px] sm:text-[46px] md:text-[56px] leading-[0.88] tracking-[-0.06em] text-charcoal uppercase max-w-[520px]">
                Fewer homes.
                <br />
                Sharper taste.
              </h3>
              <p className="mt-5 max-w-[420px] text-[14px] md:text-[15px] leading-relaxed text-charcoal/65">
                A tighter luxury edit instead of another endless grid — built around the homes
                with the strongest story, image, and price signal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {supportingProperties.map((property, index) => (
              <button
                key={property.id}
                type="button"
                onClick={() => onSelect(property)}
                className="group relative min-h-[190px] overflow-hidden rounded-[28px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/35 focus-visible:ring-offset-2"
                aria-label={`View details for ${property.title}`}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {propertyKickers[index + 1] ?? property.propertyType ?? "Estate"}
                  </p>
                  <h4 className="font-display text-[20px] md:text-[24px] leading-none text-white">
                    {property.title}
                  </h4>
                  <p className="mt-2 flex items-center gap-1 text-[12px] text-white/75">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(heroProperty)}
          className="group relative min-h-[500px] overflow-hidden rounded-[28px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/35 focus-visible:ring-offset-2 lg:min-h-[560px]"
          aria-label={`View details for ${heroProperty.title}`}
        >
          <img
            src={heroProperty.image}
            alt={heroProperty.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.02)_38%,rgba(0,0,0,0.72)_100%)]" />

          <div className="absolute left-5 top-5 rounded-full bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal backdrop-blur-sm md:left-6 md:top-6">
            {propertyKickers[0]}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <div className="mb-5 max-w-[520px]">
              <h3 className="font-display text-[42px] md:text-[58px] leading-[0.92] tracking-[-0.05em] text-white">
                {heroProperty.title}
              </h3>
              <p className="mt-3 flex items-center gap-2 text-[15px] text-white/78">
                <MapPin className="h-4 w-4" />
                {heroProperty.location}
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-full border border-white/25 bg-white/14 p-2 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <div className="px-3 py-1">
                <PropertyMeta property={heroProperty} tone="light" />
                <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-[24px] md:text-[30px] font-bold leading-none text-white">
                    {heroProperty.price}
                  </p>
                  {usdComparison && <p className="text-[13px] text-white/70">{usdComparison}</p>}
                </div>
              </div>

              <span className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-5 text-[13px] font-semibold uppercase tracking-[0.12em] text-charcoal transition-transform group-hover:translate-x-1">
                View details
                <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
