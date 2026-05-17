import { FilterState } from "@/types";

export const PRICE_MAX = 25000000;

export const getDefaultFilters = (): FilterState => ({
  rentType: "long",
  priceRange: [0, PRICE_MAX],
  showTrattativa: false,
  propertyTypes: [],
  rooms: 0,
  beds: 0,
  sqm: [0, 500],
  tags: [],
});
