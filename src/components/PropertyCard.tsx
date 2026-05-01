import { Heart, MapPin, Bed, Bath, Ruler, ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import React from 'react';
import { Amenity, PropertyType } from '@/types';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  propertyType?: PropertyType;
  amenities?: readonly Amenity[];
  featured?: boolean;
  onClick?: () => void;
}

const statusForProperty = (id: string) => {
  const statuses = ['Updated this week', 'Viewing slots open', 'Price visible', 'New gallery added'];
  const index = Number.parseInt(id, 10);
  return statuses[Number.isNaN(index) ? 0 : index % statuses.length];
};

export const PropertyCard = React.memo<PropertyCardProps>(function PropertyCard({
  id,
  image,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  propertyType,
  amenities,
  featured,
  onClick
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const neighborhood = location.split(',')[0]?.trim() || location;
  const decisionTags = useMemo(() => {
    const tags = [propertyType, ...(amenities || [])]
      .filter(Boolean)
      .map(String)
      .filter((tag) => !['Security System', 'Smart Home'].includes(tag));
    return tags.slice(0, 2);
  }, [amenities, propertyType]);

  return (
    <article
      className="bg-white overflow-hidden border border-[var(--border-default)] hover:shadow-xl transition-shadow duration-300 group h-full flex flex-col"
      style={{ borderRadius: '12px' }}
      aria-label={`${title}, ${location}, ${price}`}
    >
      <div className="relative overflow-hidden bg-gray-200" style={{ aspectRatio: featured ? '16/10' : '4/3' }}>
        <button type="button" onClick={onClick} className="block w-full h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)]/40" aria-label={`View details for ${title}`}>
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${imageLoaded ? 'opacity-100 scale-100 group-hover:scale-105' : 'opacity-0 scale-95'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.dataset.fallback) {
                target.dataset.fallback = '1';
                target.src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1080&h=720&fit=crop&q=80';
                setImageLoaded(true);
              }
            }}
            loading="lazy"
          />
        </button>
        {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10 pointer-events-none">
          <div className="space-y-2">
            {featured && (
              <div className="bg-[var(--brand)] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md w-fit">
                Featured
              </div>
            )}
            <div className="bg-white/95 text-ink px-3 py-1.5 rounded-full text-xs font-medium shadow-md w-fit">
              {statusForProperty(id)}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white transition-transform hover:scale-105 shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 pointer-events-auto"
            style={{ width: '44px', height: '44px' }}
            aria-label={isFavorite ? `Remove ${title} from favorites` : `Save ${title}`}
          >
            <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[var(--brand)] text-[var(--brand)]' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-3">
          <div className="flex items-center text-[var(--text-secondary)] text-[13px] mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{neighborhood}</span>
          </div>
          <button type="button" onClick={onClick} className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 rounded-sm">
            <h3 className="font-display text-[18px] text-ink mb-1 line-clamp-1" title={title}>{title}</h3>
          </button>
          <p className="text-[13px] text-[var(--text-secondary)] line-clamp-1">{location}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {decisionTags.map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--surface-muted)] border border-[var(--border-default)] px-2.5 py-1 text-xs text-gray-700">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-[13px] text-[var(--text-secondary)] mb-4 py-3 border-y border-[var(--border-default)] min-w-0">
          <div className="flex items-center gap-1" title={`${beds} bedrooms`}>
            <Bed className="w-4 h-4" />
            <span>{beds} bd</span>
          </div>
          <div className="flex items-center gap-1" title={`${baths} bathrooms`}>
            <Bath className="w-4 h-4" />
            <span>{baths} ba</span>
          </div>
          <div className="flex items-center gap-1 min-w-0" title={sqft}>
            <Ruler className="w-4 h-4 shrink-0" />
            <span className="truncate">{sqft}</span>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--text-secondary)] font-semibold">Asking price</p>
            <p className="text-[24px] font-bold text-[var(--brand)] leading-tight">{price}</p>
          </div>
          <button
            type="button"
            onClick={onClick}
            className="min-h-[44px] rounded-lg border border-[var(--border-default)] px-3 text-sm font-medium text-ink hover:bg-[var(--surface-muted)] transition-colors flex items-center gap-1"
          >
            Details <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
});
