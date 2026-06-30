import type { ListingMode, Property, PropertyType } from "@/data/properties";

export interface FilterState {
  mode: ListingMode | "all";
  q: string;
  type: PropertyType | "all";
  minPrice: number;
  maxPrice: number;
  minBeds: number; // 0 = any
  minBaths: number; // 0 = any
  tags: string[];
  showReserved: boolean;
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 40_000_000;

export const DEFAULT_FILTERS: FilterState = {
  mode: "all",
  q: "",
  type: "all",
  minPrice: PRICE_MIN,
  maxPrice: PRICE_MAX,
  minBeds: 0,
  minBaths: 0,
  tags: [],
  showReserved: false,
};

export const MODE_TABS: { id: ListingMode | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sale", label: "For Sale" },
  { id: "short-rent", label: "Short Rent" },
  { id: "long-rent", label: "Long Rent" },
];

export const PROPERTY_TYPES: PropertyType[] = [
  "Villa",
  "Estate",
  "Penthouse",
  "Apartment",
  "Townhouse",
  "Chalet",
];

export const ALL_TAGS: string[] = [
  "Beachfront",
  "Sea View",
  "Infinity Pool",
  "New Development",
  "Historic",
  "Countryside",
  "Skyline View",
  "Ski-in/Ski-out",
  "Smart Home",
  "Staff",
  "Helipad",
  "Fireplace",
];

export const BED_OPTIONS = [0, 1, 2, 3, 4, 5];

export type SortKey = "featured" | "price-asc" | "price-desc" | "beds-desc" | "sqm-desc" | "newest";

export const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "beds-desc", label: "Most Bedrooms" },
  { id: "sqm-desc", label: "Largest" },
];

export function filterProperties(list: Property[], f: FilterState): Property[] {
  const q = f.q.trim().toLowerCase();
  return list.filter((p) => {
    if (f.mode !== "all" && p.mode !== f.mode) return false;
    if (f.type !== "all" && p.type !== f.type) return false;
    if (!f.showReserved && p.reserved) return false;
    if (p.price < f.minPrice || p.price > f.maxPrice) return false;
    if (f.minBeds > 0 && p.beds < f.minBeds) return false;
    if (f.minBaths > 0 && p.baths < f.minBaths) return false;
    if (f.tags.length && !f.tags.every((t) => p.tags.includes(t))) return false;
    if (q) {
      const hay =
        `${p.title} ${p.location} ${p.region} ${p.country} ${p.type} ${p.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function sortProperties(list: Property[], key: SortKey): Property[] {
  const arr = [...list];
  switch (key) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "beds-desc":
      return arr.sort((a, b) => b.beds - a.beds);
    case "sqm-desc":
      return arr.sort((a, b) => b.sqm - a.sqm);
    case "newest":
      return arr.sort((a, b) => b.year - a.year);
    case "featured":
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year);
  }
}

export function modeLabel(mode: ListingMode): string {
  switch (mode) {
    case "sale":
      return "For Sale";
    case "short-rent":
      return "Short Rent";
    case "long-rent":
      return "Long Rent";
  }
}

export function formatPrice(p: Property): string {
  if (p.reserved) return "Trattativa Riservata";
  const n = p.price.toLocaleString("en-US");
  if (p.mode === "sale") return `€${n}`;
  if (p.mode === "short-rent") return `€${n} / week`;
  return `€${n} / month`;
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return `€${Number.isInteger(v) ? v : v.toFixed(1)}M`;
  }
  if (n >= 1_000) return `€${Math.round(n / 1000)}K`;
  if (n === PRICE_MAX) return "€40M+";
  return `€${n}`;
}

export function countActiveFilters(f: FilterState): number {
  let n = 0;
  if (f.mode !== "all") n++;
  if (f.q.trim()) n++;
  if (f.type !== "all") n++;
  if (f.minPrice !== PRICE_MIN || f.maxPrice !== PRICE_MAX) n++;
  if (f.minBeds > 0) n++;
  if (f.minBaths > 0) n++;
  if (f.tags.length) n++;
  if (f.showReserved) n++;
  return n;
}

export function filtersToQuery(f: FilterState): URLSearchParams {
  const s = new URLSearchParams();
  if (f.mode !== "all") s.set("mode", f.mode);
  if (f.q.trim()) s.set("q", f.q.trim());
  if (f.type !== "all") s.set("type", f.type);
  if (f.minPrice !== PRICE_MIN) s.set("min", String(f.minPrice));
  if (f.maxPrice !== PRICE_MAX) s.set("max", String(f.maxPrice));
  if (f.minBeds > 0) s.set("beds", String(f.minBeds));
  if (f.minBaths > 0) s.set("baths", String(f.minBaths));
  if (f.tags.length) s.set("tags", f.tags.join(","));
  if (f.showReserved) s.set("reserved", "1");
  return s;
}

export function queryToFilters(sp: URLSearchParams): FilterState {
  const f: FilterState = { ...DEFAULT_FILTERS };
  const mode = sp.get("mode");
  if (mode === "sale" || mode === "short-rent" || mode === "long-rent") f.mode = mode;
  const q = sp.get("q");
  if (q !== null) f.q = q;
  const type = sp.get("type");
  if (type) f.type = type as PropertyType;
  const min = sp.get("min");
  if (min !== null && !Number.isNaN(Number(min))) f.minPrice = Number(min);
  const max = sp.get("max");
  if (max !== null && !Number.isNaN(Number(max))) f.maxPrice = Number(max);
  const beds = sp.get("beds");
  if (beds !== null && !Number.isNaN(Number(beds))) f.minBeds = Number(beds);
  const baths = sp.get("baths");
  if (baths !== null && !Number.isNaN(Number(baths))) f.minBaths = Number(baths);
  const tags = sp.get("tags");
  if (tags) f.tags = tags.split(",").filter(Boolean);
  if (sp.get("reserved") === "1") f.showReserved = true;
  return f;
}
