import { useState, useEffect, useMemo, useCallback } from "react";
import { Header } from "./components/Header";
import { PropertyCard } from "./components/PropertyCard";
import { MapView } from "./components/MapView";
import { FilterModal } from "./components/FilterModal";
import { SearchModal } from "./components/SearchModal";
import { PropertyDetail } from "./components/PropertyDetail";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { CuratedCollections } from "./components/CuratedCollections";
import { Testimonials } from "./components/Testimonials";
import { FinalCTA } from "./components/FinalCTA";
import { SearchBar } from "./components/SearchBar";
import { LayoutGrid, Map } from "lucide-react";
import { properties } from "@/data/properties";
import { Property, FilterState } from "@/types";
import { filterProperties } from "@/services/filterService";
import { getDefaultFilters } from "@/constants/filters";
import { AnimatePresence } from "framer-motion";
import { ClientPortalModal } from "./components/ClientPortalModal";
import { AgencySpotlightModal } from "./components/AgencySpotlightModal";
import { LegalDocumentModal } from "./components/LegalDocumentModal";
import { ComingSoonToast } from "./components/ComingSoonToast";

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
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailOverlay, setDetailOverlay] = useState<"contact" | "image" | null>(null);
  const [forceMenuOpen, setForceMenuOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>(() => getDefaultFilters());
  const [pendingScrollTarget, setPendingScrollTarget] = useState<"grid" | "map" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [user, setUser] = useState<{ name: string; email: string; avatar: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalDocTitle, setLegalDocTitle] = useState("Privacy Policy");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSelectFooterLink = useCallback(
    (category: string, label: string) => {
      if (category === "properties") {
        if (label === "New Listings") {
          setActiveFilters((prev) => ({ ...prev, rentType: "sale" }));
          setViewMode("grid");
          setPendingScrollTarget("grid");
        } else if (label === "Price Reduced") {
          setActiveFilters((prev) => ({ ...prev, priceRange: [1000, 8000] }));
          setViewMode("grid");
          setPendingScrollTarget("grid");
        } else if (label === "Off-Market") {
          if (!user) {
            setToastMessage(
              "Access to off-market listings requires an active client portal session.",
            );
            setIsLoginModalOpen(true);
          } else {
            setToastMessage("Off-market catalog is now unlocked in your client portal dashboard!");
          }
        }
      } else if (category === "company") {
        if (label === "About Us" || label === "Our Team") {
          setIsAboutModalOpen(true);
        } else {
          setToastMessage(
            `${label} coordinates can be retrieved via private contact inquiry below.`,
          );
          setTimeout(() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else if (category === "resources") {
        setToastMessage(
          `${label} insights are compiled dynamically for registered clients. Please sign in.`,
        );
        setIsLoginModalOpen(true);
      } else if (category === "legal") {
        setLegalDocTitle(label);
        setIsLegalModalOpen(true);
      } else if (category === "social") {
        setToastMessage(
          `${label} official corporate channel updates are coming soon in this demo.`,
        );
      }
    },
    [user],
  );

  const filteredProperties = useMemo(() => {
    return filterProperties(properties, searchQuery, activeFilters);
  }, [searchQuery, activeFilters]);

  const hasVisibleResults = filteredProperties.length > 0;
  const hasActiveSearch = searchQuery.trim() !== "";
  const hasActiveFilters = !isDefaultFilterState(activeFilters);
  const hasActiveSearchOrFilter = hasActiveSearch || hasActiveFilters;

  const emptyStateCtaLabel =
    hasActiveSearch && hasActiveFilters
      ? "Reset search & filters"
      : hasActiveSearch
        ? "Clear search"
        : "Reset filters";

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const applyFilters = useCallback((filters: FilterState) => {
    setActiveFilters(filters);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    if (!pendingScrollTarget) return;
    const targetId = pendingScrollTarget === "map" ? "map-section" : "properties-section";
    scrollToSection(targetId);
    setPendingScrollTarget(null);
  }, [pendingScrollTarget, scrollToSection, viewMode]);

  const openGridFromMenu = useCallback(() => {
    setViewMode("grid");
    setPendingScrollTarget("grid");
  }, []);

  const openMapFromMenu = useCallback(() => {
    setViewMode("map");
    setPendingScrollTarget("map");
  }, []);

  useEffect(() => {
    const uiState = new URLSearchParams(window.location.search).get("ui");
    if (!uiState) return;
    const previewProperty = properties[0];
    switch (uiState) {
      case "map":
        setViewMode("map");
        break;
      case "filter":
        setIsFilterModalOpen(true);
        break;
      case "search":
        setIsSearchModalOpen(true);
        break;
      case "property":
        setSelectedProperty(previewProperty);
        break;
      case "contact":
        setSelectedProperty(previewProperty);
        setDetailOverlay("contact");
        break;
      case "image":
        setSelectedProperty(previewProperty);
        setDetailOverlay("image");
        break;
      case "menu":
        setForceMenuOpen(true);
        break;
      default:
        break;
    }
  }, []);

  const featuredProperties = useMemo(() => {
    return filteredProperties.filter((p) => p.featured).slice(0, 6);
  }, [filteredProperties]);

  const standardProperties = useMemo(() => {
    return filteredProperties.filter(
      (p) => !p.featured || featuredProperties.indexOf(p as any) === -1,
    );
  }, [filteredProperties, featuredProperties]);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Skip link */}
      <a
        href="#properties-section"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-charcoal focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:border focus:border-border-light"
      >
        Skip to content
      </a>

      {/* Transparent navbar — sits over the hero */}
      <Header
        onNavigateToMap={openMapFromMenu}
        onNavigateToProperties={openGridFromMenu}
        forceMenuOpen={forceMenuOpen}
        user={user}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={() => {
          setUser(null);
          setToastMessage("You have signed out of your client portal session.");
        }}
      />

      {/* Hero — only shown when not actively searching/filtering */}
      {hasVisibleResults && !hasActiveSearchOrFilter ? (
        <HeroSection
          properties={properties}
          onViewProperty={(p) => setSelectedProperty(p)}
          onSearchClick={() => setIsSearchModalOpen(true)}
          onFilterClick={() => setIsFilterModalOpen(true)}
        />
      ) : (
        /* When searching/filtering, show compact search bar instead */
        <div className="pt-20">
          <SearchBar
            onSearch={handleSearch}
            onFilterClick={() => setIsFilterModalOpen(true)}
            onSearchClick={() => setIsSearchModalOpen(true)}
            value={searchQuery}
          />
        </div>
      )}

      {/* ── Properties Section ─────────────────────────────── */}
      <div id="properties-section" className="py-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProperties.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="mx-auto w-32 h-32 text-gray-200" fill="none" viewBox="0 0 200 200">
                <path
                  d="M100 35 L160 85 L160 155 L40 155 L40 85 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />
                <rect
                  x="75"
                  y="105"
                  width="50"
                  height="50"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line x1="100" y1="105" x2="100" y2="155" stroke="currentColor" strokeWidth="1.5" />
                <line x1="75" y1="130" x2="125" y2="130" stroke="currentColor" strokeWidth="1.5" />
                <circle
                  cx="145"
                  cy="50"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />
                <line
                  x1="159"
                  y1="64"
                  x2="172"
                  y2="77"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-charcoal mb-2">
              No luxury properties match your criteria
            </h3>
            <p className="font-light text-[16px] text-warm-gray mb-8 max-w-md mx-auto">
              We couldn't find properties matching your current filters. Try broadening your search
              or resetting filters.
            </p>
            <button
              onClick={() => {
                if (hasActiveSearch && hasActiveFilters) {
                  setActiveFilters(getDefaultFilters());
                  setSearchQuery("");
                } else if (hasActiveSearch) {
                  setSearchQuery("");
                } else {
                  setActiveFilters(getDefaultFilters());
                }
                setViewMode("grid");
              }}
              className="bg-burgundy text-white px-8 py-3 rounded-lg hover:bg-burgundy-dark transition-colors font-medium"
            >
              {emptyStateCtaLabel}
            </button>
          </div>
        ) : (
          <>
            {/* View Toggle */}
            <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-charcoal mb-1">
                  Luxury Properties
                </h2>
                <p className="text-warm-gray text-[13px] md:text-[14px]">
                  {filteredProperties.length} properties available
                </p>
              </div>

              <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-border-light">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${
                    viewMode === "grid"
                      ? "bg-burgundy text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-pressed={viewMode === "grid"}
                  aria-label="Grid view"
                  style={{ minHeight: "44px" }}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-sm ${
                    viewMode === "map"
                      ? "bg-burgundy text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  aria-pressed={viewMode === "map"}
                  aria-label="Map view"
                  style={{ minHeight: "44px" }}
                >
                  <Map className="w-4 h-4" />
                  <span>Map</span>
                </button>
              </div>
            </div>

            {/* Content */}
            {viewMode === "grid" ? (
              <>
                {/* Featured */}
                {featuredProperties.length >= 2 && !hasActiveSearchOrFilter && (
                  <section className="mb-12">
                    <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-warm-gray mb-6">
                      Featured
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {featuredProperties.slice(0, 6).map((property, index) => (
                        <div
                          key={property.id}
                          className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
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
                      <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-warm-gray mb-6">
                        All Properties
                      </h2>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(hasActiveSearchOrFilter ? filteredProperties : standardProperties).map(
                        (property) => (
                          <PropertyCard
                            key={property.id}
                            {...property}
                            onClick={() => setSelectedProperty(property)}
                          />
                        ),
                      )}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div id="map-section" style={{ height: "clamp(320px, 45vh, 560px)" }}>
                <MapView
                  properties={filteredProperties.map((p) => ({
                    id: p.id,
                    lat: p.lat,
                    lng: p.lng,
                    price: p.price,
                    title: p.title,
                  }))}
                  onMarkerClick={(id) => {
                    const property = properties.find((p) => p.id === id);
                    if (property) setSelectedProperty(property);
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Redesign sections ──────────────────────────────── */}
      <CuratedCollections />
      <Testimonials />
      <FinalCTA />

      {/* ── Footer ──────────────────────────────────────────── */}
      <Footer onSelectFooterLink={handleSelectFooterLink} />

      {/* ── Modals ──────────────────────────────────────────── */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={applyFilters}
        initialFilters={activeFilters}
      />

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

      {/* ── Luxury Portfolio Preview Modals ─────────────────── */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <ClientPortalModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setToastMessage(`Welcome back, ${loggedInUser.name}. Elite profile active.`);
            }}
          />
        )}

        {isAboutModalOpen && (
          <AgencySpotlightModal
            isOpen={isAboutModalOpen}
            onClose={() => setIsAboutModalOpen(false)}
          />
        )}

        {isLegalModalOpen && (
          <LegalDocumentModal
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
            title={legalDocTitle}
          />
        )}
      </AnimatePresence>

      {toastMessage && (
        <ComingSoonToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </div>
  );
}
