import { Heart, MapPin, Bed, Bath } from 'lucide-react';
import { useState } from 'react';

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

export function PropertyCard({ 
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
      className="bg-white rounded-[8px] overflow-hidden border border-[#e5e7eb] hover:shadow-lg transition-all duration-300 cursor-pointer group"
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
      <div className="relative h-[200px] overflow-hidden bg-gray-200">
        <img 
          src={image} 
          alt={title} 
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 scale-100 group-hover:scale-110' : 'opacity-0 scale-95'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all hover:scale-110 shadow-md"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-[#b10832] text-[#b10832]' : 'text-gray-600'}`}
          />
        </button>
        {featured && (
          <div className="absolute top-3 left-3 bg-[#b10832] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <h3 
            className="font-semibold text-[18px] text-black mb-1 line-clamp-1" 
            style={{ fontFamily: 'Inter, sans-serif' }}
            title={title}
          >
            {title}
          </h3>
          <div className="flex items-center text-[#868686] text-[14px]">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1" style={{ fontFamily: 'Inter, sans-serif' }}>{location}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-[14px] text-[#868686] mb-3 py-2 border-t border-[#e5e7eb]">
          <div className="flex items-center gap-1" title={`${beds} bedrooms`}>
            <Bed className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{beds}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1" title={`${baths} bathrooms`}>
            <Bath className="w-4 h-4" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{baths}</span>
          </div>
          <span>•</span>
          <span style={{ fontFamily: 'Inter, sans-serif' }} title={sqft}>{sqft}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <p 
            className="text-[24px] font-bold text-[#b10832]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {price}
          </p>
        </div>
      </div>
    </div>
  );
}