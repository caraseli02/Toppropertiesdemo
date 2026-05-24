import { Plus, Minus, ChevronDown, Check, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { FilterState, Amenity, PropertyType } from "@/types";
import { getDefaultFilters, PRICE_MAX } from "@/constants/filters";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const AMENITIES: Amenity[] = [
  "Swimming Pool",
  "Garden",
  "Garage",
  "Ocean View",
  "Smart Home",
  "Security System",
  "Gym",
  "Home Theater",
  "Balcony",
  "Wine Cellar",
  "Terrace",
  "Elevator",
  "Concierge",
];

const PROPERTY_TYPES: PropertyType[] = [
  "Luxury Villa",
  "Penthouse",
  "Apartment",
  "Estate",
  "Mansion",
  "Loft",
  "Modern Villa",
  "Beach House",
];

const TAGS = ["Luxury Houses", "Top Properties", "Castle", "Sea View"] as const;

const RENT_TYPES = [
  { key: "short" as const, label: "Short Rent" },
  { key: "long" as const, label: "Long Rent" },
  { key: "sale" as const, label: "Sale" },
];

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const formatPrice = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return value.toString();
};

export function FilterModal({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(() => initialFilters || getDefaultFilters());
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (isOpen) setFilters(initialFilters || getDefaultFilters());
  }, [isOpen, initialFilters]);

  const update = (patch: Partial<FilterState>) => setFilters((prev) => ({ ...prev, ...patch }));

  const togglePropertyType = (type: PropertyType) =>
    update({
      propertyTypes: filters.propertyTypes.includes(type)
        ? filters.propertyTypes.filter((t) => t !== type)
        : [...filters.propertyTypes, type],
    });

  const toggleAmenity = (amenity: Amenity) =>
    update({
      amenities: filters.amenities?.includes(amenity)
        ? filters.amenities.filter((a) => a !== amenity)
        : [...(filters.amenities || []), amenity],
    });

  const toggleTag = (tag: string) =>
    update({
      tags: filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag],
    });

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => setFilters(getDefaultFilters());

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-xl max-h-[85vh] flex flex-col gap-0 p-0 overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            <DialogTitle className="text-lg font-semibold">Filter Properties</DialogTitle>
          </div>
          <DialogClose
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Close">
                ✕
              </Button>
            }
          />
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Rent Type */}
          <section>
            <div className="flex gap-2">
              {RENT_TYPES.map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filters.rentType === key ? "default" : "outline"}
                  className="flex-1 rounded-full"
                  onClick={() => update({ rentType: key })}
                  aria-pressed={filters.rentType === key}
                >
                  {label}
                </Button>
              ))}
            </div>
          </section>

          <Separator />

          {/* Price Range */}
          <section className="space-y-3">
            <h3 className="font-semibold">Price range</h3>
            <Slider
              value={[filters.priceRange[1]]}
              min={0}
              max={PRICE_MAX}
              step={PRICE_MAX / 200}
              onValueChange={(v) => update({ priceRange: [filters.priceRange[0], Number(v)] })}
            />
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Min price</div>
                <div className="font-semibold">{formatPrice(filters.priceRange[0])}</div>
              </div>
              <span className="text-muted-foreground text-sm">to</span>
              <div className="flex-1 rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">Max price</div>
                <div className="font-semibold">{formatPrice(filters.priceRange[1])}</div>
              </div>
            </div>
          </section>

          {/* Private Negotiation toggle */}
          <label className="flex items-center justify-between rounded-lg border p-4 cursor-pointer">
            <span className="font-medium text-sm">Show Private Negotiation</span>
            <Switch
              checked={filters.showTrattativa}
              onCheckedChange={(v) => update({ showTrattativa: v })}
            />
          </label>

          <Separator />

          {/* Property Type pills */}
          <section className="space-y-3">
            <h3 className="font-semibold">Property type</h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => {
                const active = filters.propertyTypes.includes(type);
                return (
                  <Button
                    key={type}
                    variant={active ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => togglePropertyType(type)}
                    aria-pressed={active}
                  >
                    {active && <Check className="size-3.5" />}
                    {type}
                  </Button>
                );
              })}
            </div>
          </section>

          <Separator />

          {/* Rooms / sqm / Beds */}
          <section className="space-y-4">
            <h3 className="font-semibold">Rooms and Beds</h3>

            {/* Rooms counter */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rooms</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Decrease rooms"
                  onClick={() => update({ rooms: Math.max(0, filters.rooms - 1) })}
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-6 text-center font-bold tabular-nums">{filters.rooms}</span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Increase rooms"
                  onClick={() => update({ rooms: filters.rooms + 1 })}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* sqm slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">sqm</span>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {filters.sqm[1]} m²
                </span>
              </div>
              <Slider
                value={[filters.sqm[1]]}
                min={0}
                max={500}
                step={10}
                onValueChange={(v) => update({ sqm: [filters.sqm[0], Number(v)] })}
              />
            </div>

            {/* Beds counter */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Beds</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Decrease beds"
                  onClick={() => update({ beds: Math.max(0, filters.beds - 1) })}
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-6 text-center font-bold tabular-nums">{filters.beds}</span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="Increase beds"
                  onClick={() => update({ beds: filters.beds + 1 })}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
            </div>
          </section>

          <Separator />

          {/* Advanced filters toggle */}
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
            aria-expanded={showAdvanced}
          >
            <span>
              {showAdvanced ? "Hide" : "Show"} advanced filters
              <span className="block text-xs font-normal text-muted-foreground">
                Amenities and lifestyle tags
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-muted-foreground transition-transform ${showAdvanced ? "rotate-180" : ""}`}
            />
          </button>

          {showAdvanced && (
            <>
              {/* Tags */}
              <section className="space-y-3">
                <h3 className="font-semibold">Tags</h3>
                <div className="space-y-1">
                  {TAGS.map((tag) => {
                    const active = filters.tags.includes(tag);
                    return (
                      <label
                        key={tag}
                        className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer hover:bg-muted transition-colors"
                      >
                        <span className="text-sm">{tag}</span>
                        <button
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`flex size-8 items-center justify-center rounded-full transition-colors ${
                            active ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                          aria-pressed={active}
                          aria-label={`Toggle tag ${tag}`}
                        >
                          {active && <Check className="size-3.5" />}
                        </button>
                      </label>
                    );
                  })}
                </div>
              </section>

              {/* Amenities */}
              <section className="space-y-3">
                <h3 className="font-semibold">Amenities</h3>
                <div className="space-y-1">
                  {AMENITIES.map((amenity) => {
                    const active = filters.amenities?.includes(amenity);
                    return (
                      <label
                        key={amenity}
                        className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer hover:bg-muted transition-colors"
                      >
                        <span className="text-sm">{amenity}</span>
                        <button
                          type="button"
                          onClick={() => toggleAmenity(amenity)}
                          className={`flex size-8 items-center justify-center rounded-full transition-colors ${
                            active ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                          aria-pressed={active ? true : false}
                          aria-label={`Toggle amenity ${amenity}`}
                        >
                          {active && <Check className="size-3.5" />}
                        </button>
                      </label>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <DialogFooter className="flex-row justify-between border-t px-6 py-4 shrink-0">
          <Button variant="ghost" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={handleApply}>Results</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
