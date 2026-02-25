import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PropertyCard } from './components/PropertyCard';
import { MapView } from './components/MapView';
import { FilterModal } from './components/FilterModal';
import { SearchModal } from './components/SearchModal';
import { PropertyDetail } from './components/PropertyDetail';
import { LoadingCard } from './components/LoadingCard';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LayoutGrid, Map } from 'lucide-react';
import { properties } from '@/data/properties';
import { Property, FilterState } from '@/types';
import { filterProperties } from '@/services/filterService';

const PRICE_MAX = 25000000;

const getDefaultFilters = (): FilterState => ({
  rentType: 'long',
  priceRange: [0, PRICE_MAX],
  showTrattativa: false,
  propertyTypes: [],
  rooms: 0,
  beds: 0,
  sqm: [0, 500],
  tags: [],
});

const isDefaultFilterState = (filters: FilterState): boolean => {
  const defaults = getDefaultFilters();
  return (
    filters.rentType === defaults.rentType &&
    filters.priceRange[1] === defaults.priceRange[1] &&
    filters.showTrattativa === defaults.showTrattativa &&
    filters.propertyTypes.length === 0 &&
    filters.rooms === 0 &&
    filters.beds === 0 &&
    filters.tags.length === 0 &&
    (!filters.amenities || filters.amenities.length === 0)
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>(() => getDefaultFilters());
  const [pendingScrollTarget, setPendingScrollTarget] = useState<'grid' | 'map' | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    return filterProperties(properties, searchQuery, activeFilters);
  }, [searchQuery, activeFilters]);
  const hasVisibleResults = filteredProperties.length > 0;
  const hasActiveSearchOrFilter = searchQuery.trim() !== '' || !isDefaultFilterState(activeFilters);

  // Handler updates state, Effect does the work
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const applyFilters = useCallback((filters: FilterState) => {
    setActiveFilters(filters);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  useEffect(() => {
    if (!pendingScrollTarget) return;

    const targetId = pendingScrollTarget === 'map' ? 'map-section' : 'properties-section';
    scrollToSection(targetId);
    setPendingScrollTarget(null);
  }, [pendingScrollTarget, scrollToSection, viewMode]);

  const openGridFromMenu = useCallback(() => {
    setViewMode('grid');
    setPendingScrollTarget('grid');
  }, []);

  const openMapFromMenu = useCallback(() => {
    setViewMode('map');
    setPendingScrollTarget('map');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header
        onNavigateToMap={openMapFromMenu}
        onNavigateToProperties={openGridFromMenu}
      />
      <SearchBar
        onSearch={handleSearch}
        onFilterClick={() => setIsFilterModalOpen(true)}
        onSearchClick={() => setIsSearchModalOpen(true)}
        value={searchQuery}
      />

      {/* Hero is hidden when searching/filtering to avoid contradictory messaging */}
      {hasVisibleResults && !hasActiveSearchOrFilter && (
        <HeroSection
          properties={properties}
          onViewProperty={(p) => setSelectedProperty(p as any)}
          onSearchClick={() => setIsSearchModalOpen(true)}
        />
      )}

      {/* Main Content */}
      <div id="properties-section" className="py-4 pb-8" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
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
                setActiveFilters(getDefaultFilters());
                setSearchQuery('');
                setViewMode('grid');
              }}
              className="bg-[#b10832] text-white px-6 py-3 rounded-lg hover:bg-[#8e0628] transition-colors font-medium"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* View Toggle */}
            <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-black mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Luxury Properties
                </h1>
                <p className="text-[#868686] text-[13px] md:text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {filteredProperties.length} properties available
                </p>
              </div>

              <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-[#e5e7eb]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${viewMode === 'grid'
                    ? 'bg-[#b10832] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${viewMode === 'map'
                    ? 'bg-[#b10832] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  aria-pressed={viewMode === 'map'}
                  aria-label="Map view"
                >
                  <Map className="w-4 h-4" />
                  <span className="hidden sm:inline">Map</span>
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
              <div id="map-section" style={{ height: 'clamp(320px, 45vh, 560px)' }}>
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

      {/* Footer */}
      <Footer />

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
        properties={properties}
        onSelectProperty={(property) => {
          setSelectedProperty(property);
          setIsSearchModalOpen(false);
        }}
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
