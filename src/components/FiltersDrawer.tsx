import { useEffect } from "react";
import type { FilterState } from "@/lib/filters";
import {
  ALL_TAGS,
  BED_OPTIONS,
  DEFAULT_FILTERS,
  MODE_TABS,
  PRICE_MAX,
  PRICE_MIN,
  PROPERTY_TYPES,
  formatCompact,
} from "@/lib/filters";
import type { Property } from "@/data/properties";
import { CloseIcon, KeyIcon } from "@/components/icons";
import { Button, DualRangeSlider, Pill, Toggle } from "@/components/ui";
import { cn } from "@/utils/cn";

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-6 first:border-t-0 first:pt-0">
      <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
        {title}
      </h4>
      {children}
    </div>
  );
}

export function FiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  resultCount,
  resultSample,
}: {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
  resultSample?: Property[];
}) {
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const toggleTag = (tag: string) => {
    const has = filters.tags.includes(tag);
    set("tags", has ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag]);
  };

  return (
    <div
      className={cn("fixed inset-0 z-[70]", open ? "pointer-events-auto" : "pointer-events-none")}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/50 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Panel */}
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Filters"
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h3 className="font-serif text-2xl text-ink">Refine</h3>
            <p className="text-xs text-ink-soft">
              {resultCount} {resultCount === 1 ? "residence" : "residences"} match
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-burgundy hover:text-burgundy"
          >
            <CloseIcon className="text-lg" />
          </button>
        </header>

        <div className="no-scrollbar flex-1 overflow-y-auto px-6">
          <FieldGroup title="Listing Mode">
            <div className="flex flex-wrap gap-2">
              {MODE_TABS.map((m) => (
                <Pill key={m.id} active={filters.mode === m.id} onClick={() => set("mode", m.id)}>
                  {m.label}
                </Pill>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Location">
            <input
              type="text"
              value={filters.q}
              onChange={(e) => set("q", e.target.value)}
              placeholder="City, region or country…"
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
            />
          </FieldGroup>

          <FieldGroup title="Property Type">
            <div className="flex flex-wrap gap-2">
              <Pill active={filters.type === "all"} onClick={() => set("type", "all")}>
                All
              </Pill>
              {PROPERTY_TYPES.map((t) => (
                <Pill
                  key={t}
                  active={filters.type === t}
                  onClick={() => set("type", filters.type === t ? "all" : t)}
                >
                  {t}
                </Pill>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Price Range">
            <DualRangeSlider
              valueMin={filters.minPrice}
              valueMax={filters.maxPrice}
              onChange={(min, max) => onChange({ ...filters, minPrice: min, maxPrice: max })}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { label: "Under €5M", min: PRICE_MIN, max: 5_000_000 },
                { label: "€5M – €10M", min: 5_000_000, max: 10_000_000 },
                { label: "€10M+", min: 10_000_000, max: PRICE_MAX },
              ].map((preset) => {
                const active = filters.minPrice === preset.min && filters.maxPrice === preset.max;
                return (
                  <button
                    key={preset.label}
                    onClick={() =>
                      onChange({
                        ...filters,
                        minPrice: preset.min,
                        maxPrice: preset.max,
                      })
                    }
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs transition",
                      active
                        ? "border-burgundy bg-burgundy text-cream"
                        : "border-line bg-white text-ink-soft hover:border-burgundy/50",
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </FieldGroup>

          <FieldGroup title="Bedrooms">
            <div className="flex flex-wrap gap-2">
              {BED_OPTIONS.map((b) => (
                <Pill
                  key={b}
                  active={filters.minBeds === b}
                  onClick={() => set("minBeds", filters.minBeds === b ? 0 : b)}
                >
                  {b === 0 ? "Any" : `${b}+`}
                </Pill>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Bathrooms">
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((b) => (
                <Pill
                  key={b}
                  active={filters.minBaths === b}
                  onClick={() => set("minBaths", filters.minBaths === b ? 0 : b)}
                >
                  {b === 0 ? "Any" : `${b}+`}
                </Pill>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Features & Tags">
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((t) => (
                <Pill key={t} active={filters.tags.includes(t)} onClick={() => toggleTag(t)}>
                  {t}
                </Pill>
              ))}
            </div>
          </FieldGroup>

          <FieldGroup title="Privacy">
            <div className="rounded-2xl border border-line bg-white p-4">
              <Toggle
                checked={filters.showReserved}
                onChange={(v) => set("showReserved", v)}
                label="Show Trattativa Riservata"
                hint="Reveal private, unlisted-price estates"
              />
            </div>
          </FieldGroup>

          {resultSample && resultSample.length > 0 && (
            <FieldGroup title="Preview">
              <div className="space-y-2">
                {resultSample.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl border border-line bg-white px-3 py-2"
                  >
                    <span className="truncate text-sm text-ink">{p.title}</span>
                    <span className="ml-3 shrink-0 text-xs font-medium text-burgundy">
                      {p.reserved ? (
                        <span className="inline-flex items-center gap-1">
                          <KeyIcon className="text-[11px]" /> Reserved
                        </span>
                      ) : (
                        formatCompact(p.price)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </FieldGroup>
          )}
        </div>

        <footer className="flex items-center gap-3 border-t border-line px-6 py-4">
          <Button variant="ghost" onClick={() => onChange({ ...DEFAULT_FILTERS })}>
            Reset all
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </Button>
        </footer>
      </aside>
    </div>
  );
}
