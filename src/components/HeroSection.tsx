import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import type { Property } from "@/types";

interface HeroSectionProps {
  properties: readonly Property[];
  onViewProperty: (property: Property) => void;
  onSearchClick: () => void;
}

// Narrative slides — each tells part of the brand story
const NARRATIVE_SLIDES = [
  {
    label: "Discover",
    heading: "Where Luxury Becomes Home",
    subheading: "Curated properties in the world's most desirable locations",
    cta: "Explore Collection",
    ctaAction: "search" as const,
  },
  {
    label: "Experience",
    heading: "Architecture That Inspires",
    subheading: "From penthouses to private estates — each one exceptional",
    cta: "View Featured",
    ctaAction: "property" as const,
  },
  {
    label: "Belong",
    heading: "Your Next Chapter Starts Here",
    subheading: "Find the property that matches your vision",
    cta: "Start Searching",
    ctaAction: "search" as const,
  },
];

// Fallback image when Unsplash fails
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80";

export function HeroSection({ properties, onViewProperty, onSearchClick }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  // Use featured properties for background images, one per narrative slide
  const featured = properties.filter((p) => p.featured).slice(0, 3);
  const bgImages =
    featured.length >= 3
      ? featured.map((p) => p.image)
      : properties.slice(0, 3).map((p) => p.image);

  useEffect(() => {
    if (NARRATIVE_SLIDES.length <= 1) return;
    // Respect reduced motion — don't auto-rotate
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % NARRATIVE_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getImageSrc = (src: string) => (failedImages.has(src) ? FALLBACK_IMAGE : src);

  const slide = NARRATIVE_SLIDES[current];

  const handleCta = () => {
    if (slide.ctaAction === "property" && featured[current]) {
      onViewProperty(featured[current] as any);
    } else {
      onSearchClick();
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(280px, 50vh, 520px)", backgroundColor: "var(--surface-dark)" }}
    >
      {/* Background Images with blur-up */}
      {bgImages.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1200"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={getImageSrc(src)}
            alt="Luxury property showcase"
            className={`w-full h-full object-cover transition-[filter] duration-700 ${imagesLoaded.has(src) ? "blur-0" : "blur-xl scale-105"}`}
            onLoad={() => setImagesLoaded((prev) => new Set(prev).add(src))}
            onError={() => setFailedImages((prev) => new Set(prev).add(src))}
          />
        </div>
      ))}

      {/* Gradient overlay — stronger at bottom for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Brand accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: "var(--brand)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end" style={{ padding: "32px 24px" }}>
        <div style={{ width: "min(640px, calc(100vw - 48px))" }}>
          {/* Narrative label */}
          <span
            className="inline-block font-semibold uppercase tracking-widest mb-4"
            style={{
              color: "var(--brand)",
              fontSize: "11px",
              letterSpacing: "0.15em",
            }}
          >
            {slide.label}
          </span>

          <h1
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            }}
          >
            {slide.heading}
          </h1>

          <p
            className="mb-8"
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              fontWeight: 300,
              maxWidth: "480px",
            }}
          >
            {slide.subheading}
          </p>

          <button
            onClick={handleCta}
            className="bg-[var(--brand)] text-white rounded-lg font-medium hover:bg-[var(--brand-dark)] transition-colors flex items-center gap-2"
            style={{ padding: "14px 28px", fontSize: "15px" }}
          >
            {slide.cta} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        {NARRATIVE_SLIDES.length > 1 && (
          <div className="flex gap-2 mt-8">
            {NARRATIVE_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-11 flex items-center justify-center"
                style={{ minWidth: "44px" }}
                aria-label={`Go to: ${s.label}`}
              >
                <span
                  className="rounded-full transition-all duration-500"
                  style={
                    i === current
                      ? { width: "32px", height: "4px", backgroundColor: "var(--brand)" }
                      : { width: "12px", height: "4px", backgroundColor: "rgba(255,255,255,0.3)" }
                  }
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
