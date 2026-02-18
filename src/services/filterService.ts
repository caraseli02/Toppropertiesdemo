import { Property, FilterState, Amenity } from '@/types';
import { parsePrice } from './priceService';

/**
 * Filter properties based on search query and filter criteria.
 * This is a pure function for testability.
 *
 * @param properties - Array of properties to filter
 * @param searchQuery - Text to search for in title/location
 * @param activeFilters - Filter criteria
 * @returns Filtered array of properties
 */
export function filterProperties(
  properties: readonly Property[],
  searchQuery: string,
  activeFilters: FilterState
): Property[] {
  let filtered = [...properties];

  // 1. Apply Search Query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(property =>
      property.title.toLowerCase().includes(query) ||
      property.location.toLowerCase().includes(query)
    );
  }

  // 2. Apply Price Filter with error handling
  if (activeFilters.priceRange && activeFilters.priceRange[0] !== undefined && activeFilters.priceRange[1] !== undefined) {
    const minPrice = activeFilters.priceRange[0] * 1000;
    const maxPrice = activeFilters.priceRange[1] * 1000;

    filtered = filtered.filter(property => {
      const price = parsePrice(property.price);
      // Only include properties where price parsing succeeds
      if (price === null) return false;
      return price >= minPrice && price <= maxPrice;
    });
  }

  // 3. Apply Bedrooms Filter with null check
  if (activeFilters.beds !== undefined && activeFilters.beds > 0) {
    filtered = filtered.filter(property => property.beds >= activeFilters.beds);
  }

  // 4. Apply Rooms Filter with null check
  if (activeFilters.rooms !== undefined && activeFilters.rooms > 0) {
    filtered = filtered.filter(property => property.beds >= activeFilters.rooms);
  }

  // 5. Apply Property Type Filter with null checks
  if (activeFilters.propertyTypes && activeFilters.propertyTypes.length > 0) {
    filtered = filtered.filter(property =>
      property.propertyType !== undefined &&
      activeFilters.propertyTypes.includes(property.propertyType)
    );
  }

  // 6. Apply Amenity Filter with null check and proper logic
  if (activeFilters.amenities !== undefined && activeFilters.amenities.length > 0) {
    filtered = filtered.filter(property => {
      // Property must have amenities array
      if (!property.amenities || property.amenities.length === 0) {
        return false;
      }

      // All selected amenities must be present (AND logic)
      return activeFilters.amenities.every((amenity: Amenity) =>
        property.amenities!.includes(amenity)
      );
    });
  }

  return filtered;
}

/**
 * Check if a property matches all filters.
 *
 * @param property - The property to check
 * @param filters - Filter criteria
 * @returns true if property matches all filters
 */
export function propertyMatchesFilters(
  property: Property,
  filters: FilterState
): boolean {
  // Price filter
  if (filters.priceRange && filters.priceRange[0] !== undefined && filters.priceRange[1] !== undefined) {
    const minPrice = filters.priceRange[0] * 1000;
    const maxPrice = filters.priceRange[1] * 1000;
    const price = parsePrice(property.price);
    if (price === null || price < minPrice || price > maxPrice) {
      return false;
    }
  }

  // Bedrooms filter
  if (filters.beds !== undefined && filters.beds > 0 && property.beds < filters.beds) {
    return false;
  }

  // Rooms filter
  if (filters.rooms !== undefined && filters.rooms > 0 && property.beds < filters.rooms) {
    return false;
  }

  // Property type filter
  if (filters.propertyTypes && filters.propertyTypes.length > 0) {
    if (!property.propertyType || !filters.propertyTypes.includes(property.propertyType)) {
      return false;
    }
  }

  // Amenity filter
  if (filters.amenities && filters.amenities.length > 0) {
    if (!property.amenities || property.amenities.length === 0) {
      return false;
    }
    if (!filters.amenities.every((amenity: Amenity) => property.amenities!.includes(amenity))) {
      return false;
    }
  }

  return true;
}
