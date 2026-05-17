import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Calendar,
  Check,
} from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { ContactModal } from "./ContactModal";
import { ImageModal } from "./ImageModal";
import { ComingSoonToast } from "./ComingSoonToast";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { Property } from "@/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type ContactMode = "contact" | "viewing" | "info";

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
  initialOverlay?: "contact" | "image" | null;
}

// Helper to fix map rendering issues in modals
function MapInvalidator() {
  const map = useMap();
  useEffect(() => {
    // Force a resize calculation after a brief delay to ensure container has dimensions
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

import { useFocusTrap } from "@/hooks/useFocusTrap";

export function PropertyDetail({ property, onClose, initialOverlay = null }: PropertyDetailProps) {
  const focusTrapRef = useFocusTrap(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMode, setContactMode] = useState<ContactMode>("contact");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  useBodyScrollLock(true);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "auto" });
    setCurrentImageIndex(0);
    setBrokenImages(new Set());
    setIsFavorite(false);
    setShowVirtualTour(false);
    setIsImageModalOpen(false);
    setIsContactModalOpen(false);
    setToastMessage(null);
    setContactMode("contact");
  }, [property.id]);

  useEffect(() => {
    if (initialOverlay === "contact") {
      setContactMode("contact");
      setIsContactModalOpen(true);
      return;
    }

    if (initialOverlay === "image") {
      setCurrentImageIndex(0);
      setIsImageModalOpen(true);
    }
  }, [initialOverlay, property.id]);

  const handleImageError = (index: number) => {
    setBrokenImages((prev) => new Set(prev).add(index));
  };

  const gallery = useMemo(
    () => (property.gallery?.length ? property.gallery : [property.image]),
    [property.gallery, property.image],
  );

  useEffect(() => {
    if (!brokenImages.has(currentImageIndex)) return;
    if (gallery.length <= 1) return;

    for (let offset = 1; offset < gallery.length; offset += 1) {
      const candidateIndex = (currentImageIndex + offset) % gallery.length;
      if (!brokenImages.has(candidateIndex)) {
        setCurrentImageIndex(candidateIndex);
        return;
      }
    }
  }, [brokenImages, currentImageIndex, gallery]);

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const nextImage = () => {
    if (gallery.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    if (gallery.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const amenities = property.amenities || [
    "Swimming Pool",
    "Gym",
    "Garden",
    "Garage",
    "Smart Home",
    "Security System",
    "Ocean View",
    "Fireplace",
  ];

  const detailContent = (
    <div
      ref={(el) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        focusTrapRef.current = el;
      }}
      className="fixed inset-0 bg-white overflow-y-auto"
      style={{ zIndex: 2000 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-detail-title"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[var(--border-default)] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
              style={{ height: "44px", paddingLeft: "12px", paddingRight: "12px" }}
              aria-label="Close property details"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-xs md:text-sm font-medium text-gray-700">Close</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setToastMessage("Share links are being prepared for this demo.")}
                className="flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                style={{ width: "44px", height: "44px" }}
                aria-label="Share property"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                style={{ width: "44px", height: "44px" }}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite ? "fill-[var(--brand)] text-[var(--brand)]" : "text-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-[var(--surface-dark)]">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full" style={{ height: "50vh", minHeight: "320px" }}>
            {brokenImages.has(currentImageIndex) ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <svg
                    className="mx-auto w-16 h-16 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Image unavailable</p>
                </div>
              </div>
            ) : (
              <img
                src={gallery[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError(currentImageIndex)}
              />
            )}

            {/* Gallery Navigation */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-overlay-soft text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {gallery.length}
                </div>
              </>
            )}

            {/* Virtual tour status */}
            <button
              type="button"
              onClick={() => setShowVirtualTour(!showVirtualTour)}
              className="absolute bottom-4 left-4 bg-white/95 text-ink px-5 py-3 rounded-lg transition-colors font-medium hover-bg-brand-subtle"
            >
              {showVirtualTour ? "Hide tour status" : "Virtual tour coming soon"}
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-2 p-4 overflow-x-auto bg-[var(--surface-dark)]">
            {gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => openImageModal(index)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${
                  index === currentImageIndex ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                aria-label={`View image ${index + 1} of ${gallery.length}`}
              >
                <img
                  src={img}
                  alt={`View ${index + 1} of ${gallery.length}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Image Modal */}
          <ImageModal
            images={gallery}
            initialIndex={currentImageIndex}
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
          />
        </div>
      </div>

      {/* Virtual Tour Overlay */}
      {showVirtualTour && (
        <div className="bg-[var(--surface-dark)] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-8 text-white">
              <div className="max-w-2xl">
                <div className="w-12 h-12 mb-4 bg-[var(--brand)] rounded-full flex items-center justify-center">
                  <Maximize className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display mb-2">Virtual tour is being prepared</h3>
                <p className="text-white/70">
                  This demo does not fake a 360° walkthrough. Contact the agent to request media
                  availability for this property.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Location */}
            <div>
              <h1 id="property-detail-title" className="text-4xl font-display text-ink mb-3">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Bed className="w-5 h-5" />
                  <span className="text-sm">Bedrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.beds}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Bath className="w-5 h-5" />
                  <span className="text-sm">Bathrooms</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.baths}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Maximize className="w-5 h-5" />
                  <span className="text-sm">Area</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.sqft}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Year Built</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{property.yearBuilt || 2020}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description ||
                  `Full property notes for ${property.title} are being prepared. Contact the agent for availability, floor plans, viewing windows, and private media.`}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-success-soft rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Neighborhood</h2>
              <p className="text-gray-600 mb-4">
                Discover the lifestyle that comes with this address.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src="/images/neighborhoods/cote-dazur/marina.png"
                    alt="Marina and waterfront"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">Marina</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src="/images/neighborhoods/cote-dazur/dining.png"
                    alt="Fine dining"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">Dining</span>
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img
                    src="/images/neighborhoods/cote-dazur/beach.png"
                    alt="Beach club"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <span className="text-white text-sm font-medium">Beach</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div
                className="rounded-xl overflow-hidden shadow-sm border border-[var(--border-default)] relative z-0"
                style={{ minHeight: "320px", height: "384px" }}
              >
                <MapContainer
                  center={[property.lat, property.lng]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  dragging={false} // Static feel like Airbnb preview
                  doubleClickZoom={false}
                >
                  <MapInvalidator />
                  <TileLayer
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                  />

                  {/* Custom Circle Marker similar to Airbnb */}
                  <Marker
                    position={[property.lat, property.lng]}
                    title={`Location of ${property.title}`}
                    alt={`Location of ${property.title}`}
                    icon={L.divIcon({
                      className: "custom-pin-marker",
                      html: '<div style="width:48px;height:48px;background:rgba(177,8,50,0.2);border-radius:9999px;display:flex;align-items:center;justify-content:center;"><div style="width:16px;height:16px;background:var(--brand);border-radius:9999px;box-shadow:0 4px 10px rgba(0,0,0,0.2);border:2px solid #fff;"></div></div>',
                      iconSize: [48, 48],
                      iconAnchor: [24, 24],
                    })}
                  />
                </MapContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="bg-white border border-[var(--border-default)] rounded-xl p-6 shadow-lg">
                <p className="text-3xl font-bold text-[var(--brand)] mb-6">{property.price}</p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setContactMode("viewing");
                      setIsContactModalOpen(true);
                    }}
                    className="w-full bg-[var(--brand)] hover:bg-[var(--brand-dark)] text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Schedule Viewing
                  </button>
                  <button
                    onClick={() => {
                      setContactMode("contact");
                      setIsContactModalOpen(true);
                    }}
                    className="w-full border-2 border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Message Agent
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white border border-[var(--border-default)] rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Property Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium">{property.propertyType || "Luxury Villa"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year Built</span>
                    <span className="font-medium">{property.yearBuilt || 2020}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Media</span>
                    <span className="font-medium">By request</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Viewing</span>
                    <span className="font-medium">Appointment only</span>
                  </div>
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-white border border-[var(--border-default)] rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-4">Your Agent</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/images/agents/sarah-anderson.png"
                    alt="Sarah Anderson, Luxury Properties Specialist"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">Sarah Anderson</p>
                    <p className="text-sm text-gray-600">Luxury Properties Specialist</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setToastMessage("Agent profiles are coming soon in this demo.")}
                  className="w-full border border-gray-300 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{ minHeight: "44px" }}
                >
                  Agent profile coming soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        propertyTitle={property.title}
        mode={contactMode}
      />
      {toastMessage && (
        <ComingSoonToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </div>
  );

  return createPortal(detailContent, document.body);
}
