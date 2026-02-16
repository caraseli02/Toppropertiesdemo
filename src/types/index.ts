// Domain union types for compile-time safety
export type PropertyType =
  | 'Luxury Villa'
  | 'Penthouse'
  | 'Beachfront Villa'
  | 'Beach House'
  | 'Mountain Chalet'
  | 'Loft'
  | 'Modern Villa'
  | 'Apartment'
  | 'Historic Mansion'
  | 'Sustainable'
  | 'Mansion'
  | 'Machiya'
  | 'Contemporary'
  | 'Glass House'
  | 'Tuscan Villa'
  | 'Eco-Friendly Home'
  | 'Mega Mansion'
  | 'Estate';

export type Amenity =
  | 'Swimming Pool'
  | 'Pool'
  | 'Garden'
  | 'Garage'
  | 'Ocean View'
  | 'City View'
  | 'Smart Home'
  | 'Security System'
  | 'Gym'
  | 'Home Theater'
  | 'Theater'
  | 'Balcony'
  | 'Wine Cellar'
  | 'Terrace'
  | 'Elevator'
  | 'Lift'
  | 'Concierge'
  | 'Spa'
  | 'Fireplace'
  | 'Ski-in/Ski-out'
  | 'Mountain View'
  | 'Heated Floors'
  | 'Vineyard'
  | 'Vineyard' // Typo in data
  | 'Historic'
  | 'Historic Building'
  | 'BBQ Area'
  | 'Deck'
  | 'Open Plan'
  | 'Industrial Style'
  | 'Roof Terrace'
  | 'Central'
  | 'Private Dock'
  | 'Infinity Pool'
  | 'Rooftop'
  | 'Tea Room'
  | 'Tatami Mats'
  | 'Inner Courtyard'
  | 'Zen Garden'
  | 'Detailed Landscaping'
  | 'Fire Pit'
  | 'Solar Panels'
  | 'Green Roof'
  | 'Rainwater Harvesting'
  | 'Smart Controls'
  | 'Tennis Court'
  | 'Guest House'
  | 'Staff Quarters'
  | 'Traditional Architecture'
  | 'Gaudi Architecture'
  | 'Volcano View'
  | 'Plunge Pool'
  | 'Skyline View'
  | 'Ocean Front'
  | 'Lake View'
  | 'Bay View'
  | 'Beach Access'
  | 'Security';

// Main Property interface
export interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  featured?: boolean;
  lat: number;
  lng: number;
  gallery?: readonly string[];
  description?: string;
  yearBuilt?: number;
  propertyType?: PropertyType;
  amenities?: readonly Amenity[];
}

// Filter state for property searching
export interface FilterState {
  rentType: 'short' | 'long' | 'sale';
  priceRange: [number, number];
  showTrattativa: boolean;
  propertyTypes: PropertyType[];
  rooms: number;
  beds: number;
  sqm: [number, number];
  tags: string[];
  amenities?: Amenity[];
}

// Property marker for map
export interface PropertyMarker {
  id: string;
  lat: number;
  lng: number;
  price: string;
  title: string;
}
