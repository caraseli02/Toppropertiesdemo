import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

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
  description?: string;
}

interface HeroSectionProps {
  properties: Property[];
  onViewProperty: (property: Property) => void;
  onSearchClick: () => void;
}

// Fallback image when Unsplash fails
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80';

export function HeroSection({ properties, onViewProperty, onSearchClick }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Auto-rotate featured properties
  const featured = properties.filter((p) => p.featured).slice(0, 4);
  const displayList = featured.length >= 2 ? featured : properties.slice(0, 4);

  useEffect(() => {
    if (displayList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displayList.length]);

  const currentProperty = displayList[current];
  if (!currentProperty) return null;

  const getImageSrc = (src: string) => failedImages.has(src) ? FALLBACK_IMAGE : src;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '400px', backgroundColor: '#1a1a1a' }}
    >
      {/* Background Images */}
      {displayList.map((prop, i) => (
        <div
          key={prop.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={getImageSrc(prop.image)}
            alt={prop.title}
            className="w-full h-full object-cover"
            onError={() => setFailedImages(prev => new Set(prev).add(prop.image))}
          />
        </div>
      ))}

      {/* Gradient overlay — stronger at bottom for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col justify-end"
        style={{ padding: '24px 24px 28px' }}
      >
        <div
          className="rounded-2xl border border-white/20 bg-black/25 backdrop-blur-md shadow-lg"
          style={{ width: 'min(760px, calc(100vw - 48px))', padding: '16px 16px 14px' }}
        >
          <div className="max-w-2xl">
            {currentProperty.featured && (
              <span
                className="inline-block text-white font-semibold uppercase tracking-wider rounded mb-3"
                style={{
                  backgroundColor: '#b10832',
                  fontSize: '10px',
                  fontFamily: 'Inter, sans-serif',
                  padding: '4px 10px',
                  letterSpacing: '0.08em',
                }}
              >
                Featured
              </span>
            )}

            <h2
              className="text-white font-bold leading-tight line-clamp-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(1.4rem, 4vw, 2.5rem)',
                marginBottom: '4px',
                textShadow: '0 2px 8px rgba(0,0,0,0.45)',
              }}
            >
              {currentProperty.title}
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(255,255,255,0.82)',
                fontSize: '14px',
                marginBottom: '4px',
              }}
            >
              {currentProperty.location}
            </p>

            <p
              className="font-bold max-w-full truncate"
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#f2a4b8',
                fontSize: '18px',
                marginBottom: '16px',
              }}
              title={currentProperty.price}
            >
              {currentProperty.price}
            </p>

            <div className="flex flex-wrap gap-3" style={{ marginBottom: '4px' }}>
              <button
                onClick={() => onViewProperty(currentProperty as any)}
                className="bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center gap-1"
                style={{ fontFamily: 'Inter, sans-serif', padding: '10px 20px' }}
              >
                View Property <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSearchClick}
                className="rounded-lg font-medium text-sm text-white transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '10px 20px',
                }}
              >
                Explore All
              </button>
            </div>
          </div>
        </div>

        {/* Dots - at the very bottom, left-aligned under content */}
        {displayList.length > 1 && (
          <div className="flex -ml-2">
            {displayList.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-11 h-11 flex items-center justify-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className="rounded-full transition-all"
                  style={
                    i === current
                      ? { width: '24px', height: '6px', backgroundColor: 'white' }
                      : { width: '10px', height: '6px', backgroundColor: 'rgba(255,255,255,0.4)' }
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
