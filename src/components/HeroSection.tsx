import { useState, useEffect } from 'react';
import { ChevronRight, ShieldCheck, MapPin, SlidersHorizontal } from 'lucide-react';

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

const NARRATIVE_SLIDES = [
  {
    label: 'Private property search',
    heading: 'Find homes worth crossing a city for',
    subheading: 'A quieter way to compare standout villas, penthouses, and apartments — with pricing, location, and living details upfront.',
    cta: 'Start with preferences',
    ctaAction: 'search' as const,
  },
  {
    label: 'Curated discovery',
    heading: 'Shortlist the places that actually fit',
    subheading: 'Scan lifestyle signals first: views, outdoor space, bedrooms, area, and the features that make each property work.',
    cta: 'View featured home',
    ctaAction: 'property' as const,
  },
  {
    label: 'Decision-ready details',
    heading: 'Move from browsing to confident choice',
    subheading: 'Open a listing for gallery, map context, amenities, and a clear next step — request info, contact, or schedule a viewing.',
    cta: 'Explore collection',
    ctaAction: 'search' as const,
  },
];

const TRUST_CUES = [
  { icon: ShieldCheck, label: 'Transparent pricing' },
  { icon: MapPin, label: 'Location-first browsing' },
  { icon: SlidersHorizontal, label: 'Filters built for decisions' },
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&q=80';

export function HeroSection({ properties, onViewProperty, onSearchClick }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());

  const featured = properties.filter((p) => p.featured).slice(0, 3);
  const bgImages = featured.length >= 3
    ? featured.map(p => p.image)
    : properties.slice(0, 3).map(p => p.image);

  useEffect(() => {
    if (NARRATIVE_SLIDES.length <= 1) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % NARRATIVE_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const getImageSrc = (src: string) => failedImages.has(src) ? FALLBACK_IMAGE : src;
  const slide = NARRATIVE_SLIDES[current];

  const handleCta = () => {
    if (slide.ctaAction === 'property' && featured[current]) {
      onViewProperty(featured[current] as any);
    } else {
      onSearchClick();
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(430px, 66vh, 680px)', backgroundColor: 'var(--surface-dark)' }}
      aria-labelledby="hero-title"
    >
      {bgImages.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1200"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={getImageSrc(src)}
            alt=""
            className={`w-full h-full object-cover transition-[filter,transform] duration-700 ${imagesLoaded.has(src) ? 'blur-0 scale-100' : 'blur-xl scale-105'}`}
            onLoad={() => setImagesLoaded(prev => new Set(prev).add(src))}
            onError={() => setFailedImages(prev => new Set(prev).add(src))}
          />
        </div>
      ))}

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(12,16,24,0.92) 0%, rgba(12,16,24,0.70) 42%, rgba(12,16,24,0.18) 100%)',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: 'var(--brand)' }} />

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end lg:items-center py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <span
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-semibold uppercase tracking-widest mb-5"
            style={{ color: 'var(--brand)', fontSize: '11px', letterSpacing: '0.15em' }}
          >
            {slide.label}
          </span>

          <h1
            id="hero-title"
            className="text-white font-bold leading-[0.96] mb-5"
            style={{ fontSize: 'clamp(2.55rem, 7vw, 5.8rem)', textShadow: '0 2px 18px rgba(0,0,0,0.45)' }}
          >
            {slide.heading}
          </h1>

          <p
            className="mb-7"
            style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 300, maxWidth: '620px', lineHeight: 1.55 }}
          >
            {slide.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-8">
            <button
              onClick={handleCta}
              className="bg-[var(--brand)] text-white rounded-lg font-medium hover:bg-[var(--brand-dark)] transition-colors flex items-center justify-center gap-2 min-h-[48px] px-6"
            >
              {slide.cta} <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSearchClick}
              className="bg-white/12 border border-white/25 text-white rounded-lg font-medium hover:bg-white/20 transition-colors min-h-[48px] px-6"
            >
              Compare by lifestyle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
            {TRUST_CUES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-xl border border-white/14 bg-white/10 px-3 py-3 text-white/82 backdrop-blur-sm">
                <Icon className="w-4 h-4 text-[var(--brand)] shrink-0" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {NARRATIVE_SLIDES.length > 1 && (
          <div className="absolute bottom-5 right-4 sm:right-6 lg:right-8 flex gap-2">
            {NARRATIVE_SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-11 flex items-center justify-center"
                style={{ minWidth: '44px' }}
                aria-label={`Go to: ${s.label}`}
              >
                <span
                  className="rounded-full transition-all duration-500"
                  style={i === current ? { width: '34px', height: '4px', backgroundColor: 'var(--brand)' } : { width: '12px', height: '4px', backgroundColor: 'rgba(255,255,255,0.35)' }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
