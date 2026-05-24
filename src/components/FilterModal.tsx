import { Plus, Minus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { FilterState, Amenity, PropertyType } from "@/types";
import { getDefaultFilters, PRICE_MAX } from "@/constants/filters";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

const propertyTypesList: PropertyType[] = [
  "Luxury Villa",
  "Penthouse",
  "Apartment",
  "Estate",
  "Mansion",
  "Loft",
  "Modern Villa",
  "Beach House",
];
const tagsList = ["Luxury Houses", "Top Properties", "Castle", "Sea View"];

const formatPrice = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

export function FilterModal({ isOpen, onClose, onApply, initialFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterState>(() => initialFilters || getDefaultFilters());
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Keep modal state as a draft synced from applied filters when opened.
  useEffect(() => {
    if (isOpen) {
      setFilters(initialFilters || getDefaultFilters());
    }
  }, [isOpen, initialFilters]);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters(getDefaultFilters());
  };

  const togglePropertyType = (type: PropertyType) => {
    setFilters((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const toggleAmenity = (amenity: Amenity) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...(prev.amenities || []), amenity],
    }));
  };

  const toggleTag = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 flex items-center justify-between border-b border-[var(--border-default)] z-10">
          <DialogTitle className="text-xl font-bold">Filter Properties</DialogTitle>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Rent Type Tabs */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, rentType: "short" }))}
              className={`px-3 py-2 sm:flex-1 sm:px-6 sm:py-3 rounded-full border-2 transition-all font-medium text-sm sm:text-base ${
                filters.rentType === "short"
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "bg-white text-ink border-[var(--border-default)]"
              }`}
              type="button"
              aria-pressed={filters.rentType === "short"}
            >
              Short Rent
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, rentType: "long" }))}
              className={`px-3 py-2 sm:flex-1 sm:px-6 sm:py-3 rounded-full border-2 transition-all font-medium text-sm sm:text-base ${
                filters.rentType === "long"
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "bg-white text-ink border-[var(--border-default)]"
              }`}
              type="button"
              aria-pressed={filters.rentType === "long"}
            >
              Long Rent
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, rentType: "sale" }))}
              className={`px-3 py-2 sm:flex-1 sm:px-6 sm:py-3 rounded-full border-2 transition-all font-medium text-sm sm:text-base ${
                filters.rentType === "sale"
                  ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                  : "bg-white text-ink border-[var(--border-default)]"
              }`}
              type="button"
              aria-pressed={filters.rentType === "sale"}
            >
              Sale
            </button>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Price range</h3>
            <div className="space-y-4">
              <input
                type="range"
                min="0"
                max={PRICE_MAX}
                step={PRICE_MAX / 200}
                value={filters.priceRange[1]}
                aria-label="Maximum price"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                  }))
                }
                className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
                style={{
                  minHeight: "44px",
                  background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${(filters.priceRange[1] / PRICE_MAX) * 100}%, var(--slider-track) ${(filters.priceRange[1] / PRICE_MAX) * 100}%, var(--slider-track) 100%)`,
                }}
              />
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white rounded-lg border border-gray-300 p-3">
                  <div className="text-xs text-gray-500 mb-1">Min price</div>
                  <div className="font-semibold">{formatPrice(filters.priceRange[0])}</div>
                </div>
                <span className="text-gray-400">to</span>
                <div className="flex-1 bg-white rounded-lg border border-gray-300 p-3">
                  <div className="text-xs text-gray-500 mb-1">Max price</div>
                  <div className="font-semibold">{formatPrice(filters.priceRange[1])}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Show Trattativa */}
          <div className="flex items-center justify-between bg-white rounded-lg p-4">
            <span id="show-private-negotiation-label" className="font-medium">
              Show Private Negotiation
            </span>
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, showTrattativa: !prev.showTrattativa }))
              }
              className={`relative w-14 rounded-full transition-colors border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 ${
                filters.showTrattativa
                  ? "bg-[var(--brand)] border-[var(--brand)]"
                  : "bg-gray-200 border-gray-300"
              }`}
              style={{ height: "44px" }}
              type="button"
              role="switch"
              aria-checked={filters.showTrattativa}
              aria-labelledby="show-private-negotiation-label"
            >
              <div
                className={`absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform border border-gray-200 ${
                  filters.showTrattativa ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Property Type */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Property type</h3>
            <div className="flex flex-wrap gap-3">
              {propertyTypesList.map((type) => (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    filters.propertyTypes.includes(type)
                      ? "bg-[var(--brand)] text-white"
                      : "bg-white text-ink border border-gray-300"
                  }`}
                  type="button"
                  style={{ minHeight: "44px" }}
                  aria-pressed={filters.propertyTypes.includes(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms and Beds */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Rooms and Beds</h3>
            <div className="space-y-4 bg-white rounded-lg p-4">
              {/* Rooms */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Rooms</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, rooms: Math.max(0, prev.rooms - 1) }))
                    }
                    className="rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                    style={{ width: "44px", height: "44px" }}
                    aria-label="Decrease rooms"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold w-8 text-center">{filters.rooms}</span>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, rooms: prev.rooms + 1 }))}
                    className="rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                    style={{ width: "44px", height: "44px" }}
                    aria-label="Increase rooms"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* mq (Square meters) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">sqm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={filters.sqm[1]}
                  aria-label="Maximum square meters"
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sqm: [prev.sqm[0], parseInt(e.target.value)],
                    }))
                  }
                  className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-[var(--brand)]"
                  style={{
                    minHeight: "44px",
                    background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${(filters.sqm[1] / 500) * 100}%, var(--slider-track) ${(filters.sqm[1] / 500) * 100}%, var(--slider-track) 100%)`,
                  }}
                />
              </div>

              {/* Beds */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Beds</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, beds: Math.max(0, prev.beds - 1) }))
                    }
                    className="rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                    style={{ width: "44px", height: "44px" }}
                    aria-label="Decrease beds"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-2xl font-bold w-8 text-center">{filters.beds}</span>
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, beds: prev.beds + 1 }))}
                    className="rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                    style={{ width: "44px", height: "44px" }}
                    aria-label="Increase beds"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvancedFilters((value) => !value)}
            className="w-full rounded-xl border border-[var(--border-default)] bg-white px-4 py-3 text-left font-semibold text-ink transition-colors hover-bg-brand-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
            aria-expanded={showAdvancedFilters}
          >
            {showAdvancedFilters ? "Hide advanced filters" : "Show advanced filters"}
            <span className="block text-sm font-normal text-[var(--text-secondary)]">
              Amenities and lifestyle tags
            </span>
          </button>

          {showAdvancedFilters && (
            <>
              {/* Tags */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Tags</h3>
                <div className="space-y-3 bg-white rounded-lg p-4">
                  {tagsList.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center justify-between cursor-pointer group"
                    >
                      <span className="font-medium text-gray-700">{tag}</span>
                      <button
                        onClick={() => toggleTag(tag)}
                        className={`relative rounded-full transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 ${filters.tags.includes(tag) ? "bg-[var(--brand)] text-white" : "bg-gray-300"}`}
                        style={{ width: "44px", height: "44px" }}
                        type="button"
                        aria-pressed={filters.tags.includes(tag)}
                        aria-label={`Toggle tag ${tag}`}
                      >
                        {filters.tags.includes(tag) && <Check className="w-4 h-4" />}
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenity Filters */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Amenities</h3>
                <div className="space-y-3 bg-white rounded-lg p-4">
                  {AMENITIES.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span className="font-medium text-gray-700">{amenity}</span>
                      <button
                        onClick={() => toggleAmenity(amenity)}
                        className={`relative rounded-full transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 ${filters.amenities?.includes(amenity) ? "bg-[var(--brand)] text-white" : "bg-gray-300"}`}
                        style={{ width: "44px", height: "44px" }}
                        type="button"
                        aria-pressed={filters.amenities?.includes(amenity) ? true : false}
                        aria-label={`Toggle amenity ${amenity}`}
                      >
                        {filters.amenities?.includes(amenity) && <Check className="w-4 h-4" />}
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 flex items-center justify-between gap-4 border-t border-[var(--border-default)] rounded-b-2xl flex-shrink-0">
          <button
            onClick={handleReset}
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Reset Filters
          </button>
          <button
            onClick={handleApply}
            className="px-8 py-3 bg-[var(--brand)] text-white rounded-lg hover:bg-[var(--brand-dark)] transition-colors font-medium"
          >
            Results
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
