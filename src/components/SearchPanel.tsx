import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { properties } from "@/data/properties";
import type { FilterState } from "@/lib/filters";
import {
  MODE_TABS,
  PROPERTY_TYPES,
  countActiveFilters,
  filterProperties,
  filtersToQuery,
} from "@/lib/filters";
import { FiltersDrawer } from "@/components/FiltersDrawer";
import { Button, DualRangeSlider, Pill } from "@/components/ui";
import { ChevronDownIcon, KeyIcon, SearchIcon, SlidersIcon } from "@/components/icons";
import { cn } from "@/utils/cn";

function MiniSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-block h-5 w-9 shrink-0 rounded-full transition-colors",
        checked ? "bg-burgundy" : "bg-sand-deep",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all",
          checked ? "left-[18px]" : "left-0.5",
        )}
      />
    </span>
  );
}

export function SearchPanel({
  filters,
  setFilters,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeCount = countActiveFilters(filters);
  const results = filterProperties(properties, filters);

  const submit = () => {
    void navigate(`/listings?${filtersToQuery(filters).toString()}`);
  };

  return (
    <div className="rounded-3xl border border-line bg-white p-4 shadow-xl shadow-ink/[0.06] sm:p-5">
      {/* Mode tabs + reserved toggle */}
      <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {MODE_TABS.map((m) => (
            <Pill
              key={m.id}
              active={filters.mode === m.id}
              onClick={() => setFilters({ ...filters, mode: m.id })}
            >
              {m.label}
            </Pill>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFilters({ ...filters, showReserved: !filters.showReserved })}
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-medium transition",
            filters.showReserved
              ? "border-burgundy bg-burgundy-soft text-burgundy-dark"
              : "border-line bg-white text-ink-soft hover:border-burgundy/40",
          )}
        >
          <KeyIcon className="text-sm" />
          <span>Show Trattativa Riservata</span>
          <MiniSwitch checked={filters.showReserved} />
        </button>
      </div>

      {/* Fields */}
      <div className="mt-4 grid gap-3 lg:grid-cols-12">
        {/* Location */}
        <div className="lg:col-span-3">
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Location
          </label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-ink-soft" />
            <input
              type="text"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="City, region or country"
              className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-3 text-sm text-ink outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
            />
          </div>
        </div>

        {/* Price */}
        <div className="lg:col-span-3">
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Price Range
          </label>
          <div className="rounded-xl border border-line bg-white px-4 py-2.5">
            <DualRangeSlider
              valueMin={filters.minPrice}
              valueMax={filters.maxPrice}
              onChange={(min, max) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
            />
          </div>
        </div>

        {/* Type */}
        <div className="lg:col-span-2">
          <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
            Property Type
          </label>
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value as FilterState["type"] })
              }
              className="w-full appearance-none rounded-xl border border-line bg-white py-3 pl-4 pr-10 text-sm text-ink outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
            >
              <option value="all">All types</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base text-ink-soft" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-end gap-2.5 lg:col-span-4">
          <Button className="h-[46px] flex-1" onClick={submit}>
            <SearchIcon className="text-base" /> Search
          </Button>
          <Button variant="outline" className="h-[46px]" onClick={() => setDrawerOpen(true)}>
            <SlidersIcon className="text-base" />
            <span className="hidden sm:inline">Filters</span>
            {activeCount > 0 && (
              <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-bold text-cream">
                {activeCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        Showing <span className="font-semibold text-ink">{results.length}</span> matching{" "}
        {results.length === 1 ? "residence" : "residences"}
      </p>

      <FiltersDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
        resultSample={results}
      />
    </div>
  );
}
