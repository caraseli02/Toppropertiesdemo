import { useCallback, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { properties } from "@/data/properties";
import type { Property } from "@/data/properties";
import {
  MODE_TABS,
  PRICE_MAX,
  PRICE_MIN,
  PROPERTY_TYPES,
  SORT_OPTIONS,
  countActiveFilters,
  filterProperties,
  filtersToQuery,
  formatCompact,
  queryToFilters,
  sortProperties,
} from "@/lib/filters";
import type { FilterState, SortKey } from "@/lib/filters";
import { FiltersDrawer } from "@/components/FiltersDrawer";
import { MapView } from "@/components/MapView";
import { PropertyCard } from "@/components/PropertyCard";
import { Container, Eyebrow, Pill, buttonClasses } from "@/components/ui";
import {
  ChevronDownIcon,
  CloseIcon,
  GridIcon,
  MapIcon,
  SearchIcon,
  SlidersIcon,
} from "@/components/icons";
import { cn } from "@/utils/cn";

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-burgundy/30 bg-burgundy-soft px-3 py-1.5 text-xs font-medium text-burgundy-dark">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full transition hover:bg-burgundy/20"
      >
        <CloseIcon className="text-[12px]" />
      </button>
    </span>
  );
}

export function Listings() {
  const [sp, setSp] = useSearchParams();
  const filters = useMemo(() => queryToFilters(sp), [sp]);
  const setFilters = useCallback(
    (next: FilterState) => {
      setSp(filtersToQuery(next), { replace: true });
    },
    [setSp],
  );
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"list" | "map">("list");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => sortProperties(filterProperties(properties, filters), sort),
    [filters, sort],
  );

  const activeCount = countActiveFilters(filters);
  const effectiveId =
    selectedId && filtered.some((p) => p.id === selectedId)
      ? selectedId
      : (filtered[0]?.id ?? null);
  const selectedProp = filtered.find((p) => p.id === effectiveId) ?? null;

  const clearAll = () => {
    setSp(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="border-b border-line bg-cream-2">
        <Container className="py-10 sm:py-14">
          <Eyebrow>The Portfolio</Eyebrow>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-serif text-4xl text-ink sm:text-5xl">Residences</h1>
            <p className="text-sm text-ink-soft">
              <span className="font-semibold text-ink">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "residence" : "residences"} available
            </p>
          </div>
        </Container>
      </section>

      {/* Toolbar */}
      <div className="sticky top-20 z-30 border-b border-line bg-cream/90 backdrop-blur-md">
        <Container>
          <div className="flex items-center gap-2 py-3">
            <div className="relative min-w-0 max-w-[15rem] flex-1">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-ink-soft" />
              <input
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
                placeholder="Location…"
                className="w-full rounded-full border border-line bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
              />
            </div>

            <div className="no-scrollbar hidden items-center gap-2 overflow-x-auto lg:flex">
              <Pill
                active={filters.type === "all"}
                onClick={() => setFilters({ ...filters, type: "all" })}
              >
                All
              </Pill>
              {PROPERTY_TYPES.map((t) => (
                <Pill
                  key={t}
                  active={filters.type === t}
                  onClick={() => setFilters({ ...filters, type: filters.type === t ? "all" : t })}
                >
                  {t}
                </Pill>
              ))}
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-2">
              {/* Sort */}
              <div className="relative hidden md:block">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  aria-label="Sort results"
                  className="appearance-none rounded-full border border-line bg-white py-2.5 pl-4 pr-9 text-sm text-ink outline-none transition focus:border-burgundy"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-ink-soft" />
              </div>

              {/* View toggle */}
              <div className="flex items-center rounded-full border border-line bg-white p-0.5">
                <button
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm transition",
                    view === "list" ? "bg-burgundy text-cream" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <GridIcon className="text-base" /> <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setView("map")}
                  aria-label="Map view"
                  className={cn(
                    "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm transition",
                    view === "map" ? "bg-burgundy text-cream" : "text-ink-soft hover:text-ink",
                  )}
                >
                  <MapIcon className="text-base" /> <span className="hidden sm:inline">Map</span>
                </button>
              </div>

              <button
                onClick={() => setDrawerOpen(true)}
                className={cn(buttonClasses("outline", "md"), "h-10 px-4")}
              >
                <SlidersIcon className="text-base" />
                <span className="hidden sm:inline">Filters</span>
                {activeCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-bold text-cream">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile sort */}
          <div className="flex items-center gap-2 pb-3 md:hidden">
            <div className="relative flex-1">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort results"
                className="w-full appearance-none rounded-full border border-line bg-white py-2.5 pl-4 pr-9 text-sm outline-none focus:border-burgundy"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    Sort: {o.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-ink-soft" />
            </div>
          </div>

          {/* Active chips */}
          {activeCount > 0 && (
            <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-3">
              {filters.mode !== "all" && (
                <Chip
                  label={MODE_TABS.find((m) => m.id === filters.mode)?.label ?? ""}
                  onRemove={() => setFilters({ ...filters, mode: "all" })}
                />
              )}
              {filters.q.trim() && (
                <Chip
                  label={`“${filters.q.trim()}”`}
                  onRemove={() => setFilters({ ...filters, q: "" })}
                />
              )}
              {filters.type !== "all" && (
                <Chip
                  label={filters.type}
                  onRemove={() => setFilters({ ...filters, type: "all" })}
                />
              )}
              {(filters.minPrice !== PRICE_MIN || filters.maxPrice !== PRICE_MAX) && (
                <Chip
                  label={`${formatCompact(filters.minPrice)} – ${filters.maxPrice >= PRICE_MAX ? "€40M+" : formatCompact(filters.maxPrice)}`}
                  onRemove={() =>
                    setFilters({ ...filters, minPrice: PRICE_MIN, maxPrice: PRICE_MAX })
                  }
                />
              )}
              {filters.minBeds > 0 && (
                <Chip
                  label={`${filters.minBeds}+ beds`}
                  onRemove={() => setFilters({ ...filters, minBeds: 0 })}
                />
              )}
              {filters.minBaths > 0 && (
                <Chip
                  label={`${filters.minBaths}+ baths`}
                  onRemove={() => setFilters({ ...filters, minBaths: 0 })}
                />
              )}
              {filters.tags.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  onRemove={() =>
                    setFilters({ ...filters, tags: filters.tags.filter((x) => x !== t) })
                  }
                />
              ))}
              {filters.showReserved && (
                <Chip
                  label="Trattativa Riservata"
                  onRemove={() => setFilters({ ...filters, showReserved: false })}
                />
              )}
              <button
                onClick={clearAll}
                className="ml-1 shrink-0 text-xs font-medium text-burgundy underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </Container>
      </div>

      {/* Results */}
      <Container className="py-8 sm:py-10">
        {filtered.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : view === "list" ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <MapViewSection
            filtered={filtered}
            effectiveId={effectiveId}
            selectedProp={selectedProp}
            onSelect={setSelectedId}
          />
        )}
      </Container>

      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={filtered.length}
        resultSample={filtered}
      />
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-white/50 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand text-2xl text-burgundy">
        <SearchIcon />
      </div>
      <h3 className="mt-6 font-serif text-2xl text-ink">No residences match your search</h3>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
        Try widening your price range, removing a few filters, or searching a different destination.
      </p>
      <button onClick={onClear} className={buttonClasses("primary", "md") + " mt-7"}>
        Clear all filters
      </button>
    </div>
  );
}

function MapViewSection({
  filtered,
  effectiveId,
  selectedProp,
  onSelect,
}: {
  filtered: Property[];
  effectiveId: string | null;
  selectedProp: Property | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {/* Desktop: rail + map */}
      <div className="hidden gap-5 lg:grid lg:grid-cols-[360px_1fr]">
        <div className="no-scrollbar max-h-[74vh] space-y-3 overflow-y-auto pr-1">
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelect(p.id)}
              className={cn(
                "cursor-pointer rounded-2xl transition",
                effectiveId === p.id ? "ring-2 ring-burgundy ring-offset-2 ring-offset-cream" : "",
              )}
            >
              <PropertyCard property={p} variant="compact" />
            </div>
          ))}
        </div>
        <div className="sticky top-24 h-[74vh]">
          <MapView properties={filtered} selectedId={effectiveId} onSelect={onSelect} />
        </div>
      </div>

      {/* Mobile: full map + bottom preview */}
      <div className="lg:hidden">
        <div className="h-[58vh]">
          <MapView properties={filtered} selectedId={effectiveId} onSelect={onSelect} />
        </div>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Tap a pin to preview · {filtered.length} residences
        </p>
        {selectedProp && (
          <div className="sticky bottom-3 z-30 mx-auto mt-3 max-w-md">
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5 shadow-xl">
              <img
                src={selectedProp.image}
                alt=""
                className="h-16 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-base text-ink">{selectedProp.title}</p>
                <p className="truncate text-xs text-ink-soft">
                  {selectedProp.location}, {selectedProp.country}
                </p>
                <p className="text-sm font-semibold text-burgundy">
                  {selectedProp.reserved
                    ? "Trattativa Riservata"
                    : formatCompact(selectedProp.price)}
                </p>
              </div>
              <Link
                to={`/property/${selectedProp.slug}`}
                className={buttonClasses("primary", "sm") + " shrink-0"}
              >
                View
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Listings;
