import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import type { Property } from "@/types";

interface HeroSectionProps {
  properties: readonly Property[];
  onViewProperty: (property: Property) => void;
  onSearchClick: () => void;
}

// Single featured image — use the first featured property or first available
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80";

export function HeroSection({ properties, onViewProperty, onSearchClick }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Pick featured image
  const featured = properties.find((p) => p.featured) ?? properties[0];
  const imageSrc = imageFailed ? FALLBACK_IMAGE : (featured?.image ?? FALLBACK_IMAGE);

  // Staggered fade-in animation on mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setMounted(true);
    } else {
      const t = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(t);
    }
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearchClick();
    },
    [onSearchClick],
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "clamp(480px, 70vh, 700px)",
        backgroundColor: "var(--surface-dark, #1a1a1a)",
      }}
    >
      {/* Soft gradient mesh background — replaces full-bleed photo for a lighter, modern feel */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, oklch(0.95 0.015 25) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 30%, oklch(0.92 0.02 350) 0%, transparent 40%),
            radial-gradient(ellipse at 60% 80%, oklch(0.90 0.012 200) 0%, transparent 45%),
            linear-gradient(135deg, oklch(0.96 0.008 60) 0%, oklch(0.94 0.005 280) 100%)
          `,
        }}
      />

      {/* Split layout container: 60/40 on desktop, stacked on mobile */}
      <div
        className="relative z-10 flex flex-col lg:flex-row w-full"
        style={{ minHeight: "clamp(480px, 70vh, 700px)" }}
      >
        {/* LEFT — Typography + CTA (60%) */}
        <div
          className="flex flex-col justify-center px-6 py-12 lg:px-16 lg:py-0 lg:w-[60%]"
          style={{ gap: "24px" }}
        >
          {/* Kicker */}
          <span
            className="inline-block font-semibold uppercase tracking-widest"
            style={{
              color: "var(--brand, #b10832)",
              fontSize: "12px",
              letterSpacing: "0.15em",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            Luxury Real Estate
          </span>

          {/* Main headline — oversized serif */}
          <h1
            style={{
              fontFamily: '"Bodoni Moda", "Young Serif", Georgia, serif',
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "oklch(0.18 0.01 25)",
              maxWidth: "600px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
            }}
          >
            Find Your
            <br />
            <span style={{ color: "var(--brand, #b10832)" }}>Place</span>
          </h1>

          {/* Subheading */}
          <p
            style={{
              color: "oklch(0.40 0.01 25)",
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              fontWeight: 300,
              maxWidth: "440px",
              lineHeight: 1.6,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
            }}
          >
            Curated properties in the world's most desirable locations.
            Exceptional living, effortless discovery.
          </p>

          {/* Glassmorphic search bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full"
            style={{
              maxWidth: "480px",
              background: "oklch(1 0 0 / 0.6)",
              backdropFilter: "blur(20px) saturate(1.4)",
              WebkitBackdropFilter: "blur(20px) saturate(1.4)",
              border: "1px solid oklch(1 0 0 / 0.35)",
              borderRadius: "16px",
              padding: "6px 6px 6px 20px",
              boxShadow: "0 8px 32px oklch(0 0 0 / 0.08), inset 0 1px 0 oklch(1 0 0 / 0.5)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
            }}
          >
            <Search
              className="shrink-0"
              style={{ width: "18px", height: "18px", color: "oklch(0.45 0.01 25)" }}
              aria-hidden="true"
            />
            <label htmlFor="hero-search" className="sr-only">
              Search properties
            </label>
            <input
              id="hero-search"
              type="text"
              placeholder="City, neighborhood, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none px-3"
              style={{
                fontSize: "15px",
                color: "oklch(0.18 0.01 25)",
                minHeight: "44px",
              }}
            />
            <button
              type="submit"
              className="shrink-0 font-medium flex items-center gap-2 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: "var(--brand, #b10832)",
                color: "oklch(1 0 0)",
                borderRadius: "12px",
                padding: "12px 24px",
                fontSize: "14px",
                minHeight: "44px",
                outlineColor: "var(--brand, #b10832)",
              }}
            >
              Search
            </button>
          </form>
        </div>

        {/* RIGHT — Featured property image (40%) */}
        <div
          className="relative lg:w-[40%] flex items-end justify-center overflow-hidden lg:py-12 lg:pr-12 lg:pl-0"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.4s",
          }}
        >
          {/* Decorative soft shadow behind image */}
          <div
            className="absolute"
            style={{
              width: "85%",
              height: "80%",
              right: "8%",
              top: "10%",
              background: "oklch(0.5 0.03 350 / 0.15)",
              filter: "blur(60px)",
              borderRadius: "24px",
            }}
          />

          <div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: "480px",
              borderRadius: "20px",
              boxShadow: "0 24px 64px oklch(0 0 0 / 0.12), 0 4px 16px oklch(0 0 0 / 0.06)",
              aspectRatio: "4 / 5",
              margin: "0 auto",
            }}
          >
            {/* Placeholder shimmer while loading */}
            {!imageLoaded && !imageFailed && (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, oklch(0.93 0.005 60) 8%, oklch(0.96 0.005 60) 18%, oklch(0.93 0.005 60) 33%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s linear infinite",
                }}
              />
            )}

            <img
              src={imageSrc}
              alt={featured?.title ?? "Featured luxury property"}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-out, transform 0.7s ease-out",
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />

            {/* Image overlay with property info */}
            {featured && (
              <div
                className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
                style={{
                  padding: "20px",
                  background: "linear-gradient(to top, oklch(0 0 0 / 0.6) 0%, transparent 100%)",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "oklch(1 0 0 / 0.85)",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {featured.location}
                  </p>
                  <p
                    style={{
                      color: "oklch(1 0 0)",
                      fontSize: "15px",
                      fontWeight: 600,
                      marginTop: "2px",
                    }}
                  >
                    {featured.price}
                  </p>
                </div>
                <button
                  onClick={() => onViewProperty(featured as any)}
                  className="font-medium transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    backgroundColor: "oklch(1 0 0 / 0.9)",
                    color: "oklch(0.18 0.01 25)",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    fontSize: "13px",
                    minHeight: "44px",
                    outlineColor: "oklch(1 0 0)",
                  }}
                >
                  View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
