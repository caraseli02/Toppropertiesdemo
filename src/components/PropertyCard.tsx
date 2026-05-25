import { Heart, MapPin, Bed, Bath } from "lucide-react";
import { useState } from "react";
import React from "react";
import { formatUsdComparison } from "@/services/priceService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
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
  isFavorite = false,
  onToggleFavorite,
  onClick,
}: PropertyCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const usdComparison = formatUsdComparison(price);

  return (
    <Card
      className={cn(
        "bg-white border border-[var(--border-default)] hover:shadow-lg transition-shadow duration-300 group h-full p-0 gap-0 rounded-[8px] ring-0",
      )}
    >
      <div
        className="relative overflow-hidden bg-[linear-gradient(135deg,#f7f2ec_0%,#ece3d8_48%,#d8c9ba_100%)] flex-shrink-0"
        style={{ aspectRatio: "4/3" }}
      >
        <button
          type="button"
          onClick={onClick}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand)]/40"
          aria-label={`View details for ${title}`}
        />
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "opacity-100 scale-100 group-hover:scale-110" : "opacity-0 scale-95",
          )}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.dataset.fallback) {
              target.dataset.fallback = "1";
              target.src =
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1080&h=720&fit=crop&q=80";
              setImageLoaded(true);
            }
          }}
          loading="lazy"
        />
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(135deg,#f7f2ec_0%,#ece3d8_48%,#d8c9ba_100%)]" />
        )}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-20 pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className="bg-white/95 backdrop-blur-sm rounded-full hover:bg-white hover:scale-105 shadow-md shrink-0 w-[44px] h-[44px] pointer-events-auto focus-visible:ring-[var(--brand)]/30"
            aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          >
            <Heart
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite ? "fill-[var(--brand)] text-[var(--brand)]" : "text-gray-600",
              )}
            />
          </Button>
          {featured && (
            <div className="bg-[var(--brand)] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
              Featured
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-display text-[18px] text-ink mb-1 line-clamp-1" title={title}>
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
          <span className="truncate" title={sqft}>
            {sqft}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[22px] font-bold text-[var(--brand)] leading-tight">{price}</p>
            {usdComparison && (
              <p className="mt-1 text-[13px] font-medium text-charcoal/70">{usdComparison}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
