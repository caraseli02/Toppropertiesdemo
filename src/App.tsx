import { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PropertyCard } from './components/PropertyCard';
import { MapView } from './components/MapView';
import { FilterModal } from './components/FilterModal';
import { SearchModal } from './components/SearchModal';
import { PropertyDetail } from './components/PropertyDetail';
import { LoadingCard } from './components/LoadingCard';
import { LayoutGrid, Map } from 'lucide-react';
import svgPaths from './imports/svg-lbcekml827';

interface Property {
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
  gallery?: string[];
  description?: string;
  yearBuilt?: number;
  propertyType?: string;
  amenities?: string[];
}

const properties: Property[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1598635031829-4bfae29d33eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MDIzOTM5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Villa Azure',
    location: 'Côte d\'Azur, France',
    price: '€4,500,000',
    beds: 5,
    baths: 4,
    sqft: '4,200 sq ft',
    featured: true,
    lat: 43.7,
    lng: 7.2,
    yearBuilt: 2019,
    propertyType: 'Luxury Villa',
    gallery: [
      'https://images.unsplash.com/photo-1598635031829-4bfae29d33eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MDIzOTM5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDE0OTUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1620086464194-5127366b51ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwMjA4OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1702411200201-3061d0eea802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwc3VpdGV8ZW58MXx8fHwxNzcwMjM1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1720975658882-54ccac0b8c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzAyMzk2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['Swimming Pool', 'Garden', 'Garage', 'Ocean View', 'Smart Home', 'Security System'],
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAxNjgwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Manhattan Penthouse',
    location: 'New York, USA',
    price: '$8,900,000',
    beds: 4,
    baths: 3.5,
    sqft: '3,800 sq ft',
    featured: true,
    lat: 40.7,
    lng: -74.0,
    yearBuilt: 2021,
    propertyType: 'Penthouse',
    gallery: [
      'https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAxNjgwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1617403493677-a0cbfc484010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwb2ZmaWNlfGVufDF8fHx8MTc3MDIzOTY4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1658760046471-896cbc719c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZXxlbnwxfHx8fDE3NzAyMzIyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDE0OTUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['Gym', 'Home Theater', 'Smart Home', 'Security System', 'Balcony', 'Wine Cellar'],
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaGZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzcwMjM5Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Beachfront Paradise',
    location: 'Malibu, California',
    price: '$12,300,000',
    beds: 6,
    baths: 5,
    sqft: '5,500 sq ft',
    featured: false,
    lat: 34.0,
    lng: -118.7,
    yearBuilt: 2020,
    propertyType: 'Beachfront Villa',
    gallery: [
      'https://images.unsplash.com/photo-1739140019682-05bd100b5a5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaGZyb250JTIwcHJvcGVydHl8ZW58MXx8fHwxNzcwMjM5Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1720975658882-54ccac0b8c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb3V0ZG9vcnxlbnwxfHx8fDE3NzAyMzk2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1702411200201-3061d0eea802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwc3VpdGV8ZW58MXx8fHwxNzcwMjM1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1620086464194-5127366b51ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwMjA4OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['Swimming Pool', 'Ocean View', 'Balcony', 'Garden', 'Garage', 'Fireplace'],
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1640303850203-7bf7c76b4557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuc2lvbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzAyMzkzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Historic Mansion',
    location: 'London, United Kingdom',
    price: '£6,750,000',
    beds: 7,
    baths: 6,
    sqft: '6,800 sq ft',
    featured: false,
    lat: 51.5,
    lng: -0.1,
    yearBuilt: 1895,
    propertyType: 'Historic Mansion',
    gallery: [
      'https://images.unsplash.com/photo-1640303850203-7bf7c76b4557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbWFuc2lvbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzAyMzkzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDE0OTUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1617403493677-a0cbfc484010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwb2ZmaWNlfGVufDF8fHx8MTc3MDIzOTY4NXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1658760046471-896cbc719c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZXxlbnwxfHx8fDE3NzAyMzIyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1620086464194-5127366b51ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwMjA4OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['Garden', 'Wine Cellar', 'Fireplace', 'Security System', 'Garage', 'Home Theater'],
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1709508496457-e2f9c42493c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb3VudGFpbiUyMGNoYWxldHxlbnwxfHx8fDE3NzAyMzkzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Alpine Chalet',
    location: 'Verbier, Switzerland',
    price: 'CHF 9,200,000',
    beds: 5,
    baths: 4.5,
    sqft: '4,600 sq ft',
    featured: true,
    lat: 46.1,
    lng: 7.2,
    yearBuilt: 2018,
    propertyType: 'Mountain Chalet',
    gallery: [
      'https://images.unsplash.com/photo-1709508496457-e2f9c42493c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb3VudGFpbiUyMGNoYWxldHxlbnwxfHx8fDE3NzAyMzkzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1702411200201-3061d0eea802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwc3VpdGV8ZW58MXx8fHwxNzcwMjM1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1638885930125-85350348d266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc3MDE0OTUxMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1658760046471-896cbc719c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZXxlbnwxfHx8fDE3NzAyMzIyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['Mountain View', 'Fireplace', 'Gym', 'Smart Home', 'Security System', 'Garage'],
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1623051786509-57224cdc43e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwYXBhcnRtZW50JTIwYmFsY29ueXxlbnwxfHx8fDE3NzAyMzkzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Skyline Residence',
    location: 'Dubai, UAE',
    price: 'AED 18,500,000',
    beds: 4,
    baths: 4,
    sqft: '4,100 sq ft',
    featured: false,
    lat: 25.2,
    lng: 55.3,
    yearBuilt: 2022,
    propertyType: 'Luxury Apartment',
    gallery: [
      'https://images.unsplash.com/photo-1623051786509-57224cdc43e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwYXBhcnRtZW50JTIwYmFsY29ueXxlbnwxfHx8fDE3NzAyMzkzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1642976975710-1d8890dbf5ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzAxNjgwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1620086464194-5127366b51ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcwMjA4OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1702411200201-3061d0eea802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwc3VpdGV8ZW58MXx8fHwxNzcwMjM1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    amenities: ['Balcony', 'Gym', 'Swimming Pool', 'Smart Home', 'Security System', 'Home Theater'],
  },
];

interface FilterState {
  rentType: 'short' | 'long' | 'sale';
  priceRange: [number, number];
  showTrattativa: boolean;
  propertyTypes: string[];
  rooms: number;
  beds: number;
  sqm: [number, number];
  tags: string[];
}

export default function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    rentType: 'long',
    priceRange: [0, 10000],
    showTrattativa: false,
    propertyTypes: [],
    rooms: 0,
    beds: 0,
    sqm: [0, 500],
    tags: [],
  });

  const handleSearch = (query: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (!query.trim()) {
        applyFilters(activeFilters);
        setIsLoading(false);
        return;
      }
      
      const filtered = properties.filter(property => 
        property.title.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 300);
  };

  const applyFilters = (filters: FilterState) => {
    setActiveFilters(filters);
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      let filtered = properties;

      // Convert price to USD equivalent for filtering (simplified)
      const getPriceInUSD = (priceString: string): number => {
        const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
        if (priceString.includes('€')) return numericPrice * 1.1;
        if (priceString.includes('£')) return numericPrice * 1.3;
        if (priceString.includes('CHF')) return numericPrice * 1.15;
        if (priceString.includes('AED')) return numericPrice * 0.27;
        return numericPrice;
      };

      // Price filter
      filtered = filtered.filter(property => {
        const price = getPriceInUSD(property.price);
        return price >= filters.priceRange[0] * 1000 && price <= filters.priceRange[1] * 1000;
      });

      // Bedrooms filter
      if (filters.beds > 0) {
        filtered = filtered.filter(property => property.beds >= filters.beds);
      }

      // Rooms filter
      if (filters.rooms > 0) {
        filtered = filtered.filter(property => property.beds >= filters.rooms);
      }

      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SearchBar 
        onSearch={handleSearch} 
        onFilterClick={() => setIsFilterModalOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
      />
      
      {/* Main Content */}
      <div className="px-[10px] py-4 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-4">
              <svg className="mx-auto w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              No Properties Found
            </h3>
            <p className="font-light text-[16px] text-[#868686] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              Try adjusting your filters or search criteria
            </p>
            <button
              onClick={() => {
                setActiveFilters({
                  rentType: 'long',
                  priceRange: [0, 10000],
                  showTrattativa: false,
                  propertyTypes: [],
                  rooms: 0,
                  beds: 0,
                  sqm: [0, 500],
                  tags: [],
                });
                setFilteredProperties(properties);
              }}
              className="bg-[#b10832] text-white px-6 py-3 rounded-lg hover:bg-[#8e0628] transition-colors font-medium"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* View Toggle - Desktop only */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-black mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Luxury Properties
                </h1>
                <p className="text-[#868686] text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {filteredProperties.length} properties available
                </p>
              </div>
              
              <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-[#e5e7eb]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-[#b10832] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'map' 
                      ? 'bg-[#b10832] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Map className="w-4 h-4" />
                  <span>Map</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    {...property}
                    onClick={() => setSelectedProperty(property)}
                  />
                ))}
              </div>
            ) : (
              <div className="h-[calc(100vh-300px)] min-h-[500px]">
                <MapView 
                  properties={filteredProperties.map(p => ({
                    id: p.id,
                    lat: p.lat,
                    lng: p.lng,
                    price: p.price,
                    title: p.title,
                  }))}
                  onMarkerClick={(id) => {
                    const property = properties.find(p => p.id === id);
                    if (property) setSelectedProperty(property);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Banner - matching original design exactly */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#b10832] h-[64px] rounded-tl-[8px] rounded-tr-[8px] flex items-center justify-center z-40">
        <svg className="absolute left-1/2 -translate-x-1/2 top-0 w-3 h-3" fill="none" viewBox="0 0 12 12">
          <path d={svgPaths.p16b94100} stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p 
          className="font-normal text-[16px] text-center text-white whitespace-pre-wrap px-4"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Discover more than 15 luxury properties
        </p>
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={applyFilters}
        initialFilters={activeFilters}
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSearch={handleSearch}
      />

      {/* Property Detail */}
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}