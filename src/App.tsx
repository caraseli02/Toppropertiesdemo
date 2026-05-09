import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { PropertyCard } from './components/PropertyCard';
import { MapView } from './components/MapView';
import { FilterModal } from './components/FilterModal';
import { SearchModal } from './components/SearchModal';
import { PropertyDetail } from './components/PropertyDetail';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LayoutGrid, Map } from 'lucide-react';
import { properties } from '@/data/properties';
import { Property, FilterState } from '@/types';
import { filterProperties } from '@/services/filterService';
import { getDefaultFilters } from '@/constants/filters';

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
  const [detailOverlay, setDetailOverlay] = useState<'contact' | 'image' | null>(null);
  const [forceMenuOpen, setForceMenuOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>(() => getDefaultFilters());
  const [pendingScrollTarget, setPendingScrollTarget] = useState<'grid' | 'map' | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    return filterProperties(properties, searchQuery, activeFilters);
  }, [searchQuery, activeFilters]);
  const hasVisibleResults = filteredProperties.length > 0;
  const hasActiveSearch = searchQuery.trim() !== '';
  const hasActiveFilters = !isDefaultFilterState(activeFilters);
  const hasActiveSearchOrFilter = hasActiveSearch || hasActiveFilters;
  const emptyStateCtaLabel = hasActiveSearch && hasActiveFilters
    ? 'Reset search & filters'
    : hasActiveSearch
      ? 'Clear search'
      : 'Reset filters';

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

  useEffect(() => {
    const uiState = new URLSearchParams(window.location.search).get('ui');
    if (!uiState) return;

    const previewProperty = properties[0];

    switch (uiState) {
      case 'map':
        setViewMode('map');
        break;
      case 'filter':
        setIsFilterModalOpen(true);
        break;
      case 'search':
        setIsSearchModalOpen(true);
        break;
      case 'property':
        setSelectedProperty(previewProperty);
        break;
      case 'contact':
        setSelectedProperty(previewProperty);
        setDetailOverlay('contact');
        break;
      case 'image':
        setSelectedProperty(previewProperty);
        setDetailOverlay('image');
        break;
      case 'menu':
        setForceMenuOpen(true);
        break;
      default:
        break;
    }
  }, []);

  // Separate featured vs standard properties
  const featuredProperties = useMemo(() => {
    return filteredProperties.filter(p => p.featured).slice(0, 6);
  }, [filteredProperties]);
  const standardProperties = useMemo(() => {
    return filteredProperties.filter(p => !p.featured || featuredProperties.indexOf(p as any) === -1);
  }, [filteredProperties, featuredProperties]);

  return (
    <div className="min-h-screen bg-white">
      <a href="#properties-section" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:border focus:border-[var(--border-default)]">
        Skip to content
      </a>
      <Header
        onNavigateToMap={openMapFromMenu}
        onNavigateToProperties={openGridFromMenu}
        forceMenuOpen={forceMenuOpen}
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
          onViewProperty={(p) => setSelectedProperty(p)}
          onSearchClick={() => setIsSearchModalOpen(true)}
        />
      )}

      {/* Main Content */}
      <div id="properties-section" className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProperties.length === 0 ? (
          /* Illustrated Empty State */
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="mx-auto w-32 h-32 text-gray-200" fill="none" viewBox="0 0 200 200">
                {/* Stylized house with magnifying glass */}
                <path d="M100 35 L160 85 L160 155 L40 155 L40 85 Z" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <rect x="75" y="105" width="50" height="50" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="100" y1="105" x2="100" y2="155" stroke="currentColor" strokeWidth="1.5" />
                <line x1="75" y1="130" x2="125" y2="130" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="145" cy="50" r="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
                <line x1="159" y1="64" x2="172" y2="77" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-display text-ink mb-2">
              No luxury properties match your criteria
            </h3>
            <p className="font-light text-[16px] text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
              We couldn't find properties matching your current filters. Try broadening your search or resetting filters.
            </p>
            <button
              onClick={() => {
                if (hasActiveSearch && hasActiveFilters) {
                  setActiveFilters(getDefaultFilters());
                  setSearchQuery('');
                } else if (hasActiveSearch) {
                  setSearchQuery('');
                } else {
                  setActiveFilters(getDefaultFilters());
                }
                setViewMode('grid');
              }}
              className="bg-[var(--brand)] text-white px-8 py-3 rounded-lg hover:bg-[var(--brand-dark)] transition-colors font-medium"
            >
              {emptyStateCtaLabel}
            </button>
          </div>
        ) : (
          <>
            {/* View Toggle */}
            <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-display text-ink mb-1">
                  Luxury Properties
                </h2>
                <p className="text-[var(--text-secondary)] text-[13px] md:text-[14px]">
                  {filteredProperties.length} properties available
                </p>
              </div>

              <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-[var(--border-default)]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${viewMode === 'grid'
                    ? 'bg-[var(--brand)] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  aria-pressed={viewMode === 'grid'}
                  aria-label="Grid view"
                  style={{ minHeight: '44px' }}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${viewMode === 'map'
                    ? 'bg-[var(--brand)] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  aria-pressed={viewMode === 'map'}
                  aria-label="Map view"
                  style={{ minHeight: '44px' }}
                >
                  <Map className="w-4 h-4" />
                  <span>Map</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
              <>
                {/* Featured Properties - Masonry Layout */}
                {featuredProperties.length >= 2 && !hasActiveSearchOrFilter && (
                  <section className="mb-12">
                    <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-6">
                      Featured
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {featuredProperties.slice(0, 6).map((property, index) => (
                        <div
                          key={property.id}
                          className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                        >
                          <PropertyCard
                            {...property}
                            featured={index === 0}
                            onClick={() => setSelectedProperty(property)}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Standard Grid */}
                {(hasActiveSearchOrFilter ? filteredProperties : standardProperties).length > 0 && (
                  <section>
                    {featuredProperties.length >= 2 && !hasActiveSearchOrFilter && (
                      <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-6">
                        All Properties
                      </h2>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(hasActiveSearchOrFilter ? filteredProperties : standardProperties).map((property) => (
                        <PropertyCard
                          key={property.id}
                          {...property}
                          onClick={() => setSelectedProperty(property)}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </>
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
          onClose={() => {
            setSelectedProperty(null);
            setDetailOverlay(null);
          }}
          initialOverlay={detailOverlay}
        />
      )}
    </div>
  );
}
