import { Heart, MapPin, Bed, Bath } from 'lucide-react';
import { useState } from 'react';
import React from 'react';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  featured?: boolean;
  onClick?: () => void;
}

export const PropertyCard = React.memo<PropertyCardProps>(function PropertyCard({
  image,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  featured,
  onClick
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="bg-white overflow-hidden border border-[var(--border-default)] hover:shadow-lg transition-all duration-300 cursor-pointer group"
      style={{ borderRadius: '8px' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`View details for ${title}`}
    >
      <div className="relative overflow-hidden bg-gray-200" style={{ aspectRatio: '4/3' }}>
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-95'
            }`}
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
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="bg-white/95 backdrop-blur-sm flex items-center justify-center rounded-full hover:bg-white transition-all hover:scale-105 shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
            style={{ width: '44px', height: '44px' }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[var(--brand)] text-[var(--brand)]' : 'text-gray-600'}`}
            />
          </button>
          {featured && (
            <div className="bg-[var(--brand)] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
              Featured
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3
            className="font-semibold text-[18px] text-black mb-1 line-clamp-1"
           
            title={title}
          >
            {title}
          </h3>
          <div className="flex items-center text-[var(--text-secondary)] text-[14px]">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[14px] text-[var(--text-secondary)] mb-3 py-2 border-t border-[var(--border-default)] min-w-0">
          <div className="flex items-center gap-1" title={`${beds} bedrooms`}>
            <Bed className="w-4 h-4" />
            <span>{beds}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1" title={`${baths} bathrooms`}>
            <Bath className="w-4 h-4" />
            <span>{baths}</span>
          </div>
          <span>•</span>
          <span className="truncate" title={sqft}>{sqft}</span>
        </div>

        <div className="flex items-center justify-between">
          <p
            className="text-[24px] font-bold text-[var(--brand)] break-all leading-tight"
           
          >
            {price}
          </p>
        </div>
      </div>
    </div>
  );
});
