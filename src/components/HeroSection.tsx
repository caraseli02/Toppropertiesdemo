import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import type { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  properties: readonly Property[];
  onViewProperty: (property: Property) => void;
  onSearchClick: () => void;
  onFilterClick: () => void;
}

export function HeroSection({
  properties,
  onViewProperty,
  onSearchClick,
  onFilterClick,
}: HeroSectionProps) {
  const firstFeatured = properties.find((p) => p.featured) || properties[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-charcoal/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="max-w-[46rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge
              variant="outline"
              className={cn(
                "text-[13px] uppercase tracking-[0.22em] font-semibold mb-6 bg-burgundy-light/10 text-burgundy-light border-burgundy-light/30 px-3 py-1"
              )}
            >
              Curated Luxury Real Estate
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.06] mb-6 max-w-[12ch]"
          >
            Exceptional Homes
            <span className="block text-white/90">for Discerning Lives</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/82 leading-relaxed mb-10 max-w-xl"
          >
            From penthouses to private estates, each property is hand-selected for those who expect
            nothing less than extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              onClick={() => firstFeatured && onViewProperty(firstFeatured)}
              className={cn(
                "inline-flex items-center justify-center gap-3 px-8 py-4 bg-burgundy text-white rounded-full font-semibold text-base hover:bg-burgundy-dark transition-all duration-300 group cursor-pointer"
              )}
            >
              Explore Properties
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/16 backdrop-blur-sm text-white rounded-full font-semibold text-base border border-white/35 hover:bg-white/24 transition-all duration-300 cursor-pointer"
              )}
            >
              Schedule a Private Viewing
            </Button>
          </motion.div>
        </div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 lg:mt-20"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-2xl max-w-4xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                type="button"
                className="space-y-2 text-left cursor-pointer"
                onClick={onSearchClick}
                aria-label="Open location search"
              >
                <span className="block text-xs uppercase tracking-wider text-warm-gray font-semibold cursor-pointer">
                  Location
                </span>
                <span className="block w-full px-4 py-3 bg-cream rounded-xl text-charcoal/70 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-burgundy/30">
                  City, neighborhood...
                </span>
              </button>

              <button
                type="button"
                className="space-y-2 text-left cursor-pointer"
                onClick={onFilterClick}
                aria-label="Open property type filters"
              >
                <span className="block text-xs uppercase tracking-wider text-warm-gray font-semibold cursor-pointer">
                  Property Type
                </span>
                <span className="w-full px-4 py-3 bg-cream rounded-xl text-charcoal/70 text-left text-sm cursor-pointer flex justify-between items-center h-[44px]">
                  <span>All Types</span>
                  <span className="text-xs text-charcoal/60">▼</span>
                </span>
              </button>

              <button
                type="button"
                className="space-y-2 text-left cursor-pointer"
                onClick={onFilterClick}
                aria-label="Open budget filters"
              >
                <span className="block text-xs uppercase tracking-wider text-warm-gray font-semibold cursor-pointer">
                  Budget
                </span>
                <span className="w-full px-4 py-3 bg-cream rounded-xl text-charcoal/70 text-left text-sm cursor-pointer flex justify-between items-center h-[44px]">
                  <span>Any Budget</span>
                  <span className="text-xs text-charcoal/60">▼</span>
                </span>
              </button>

              <div className="flex items-end">
                <Button
                  onClick={onSearchClick}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-burgundy text-white rounded-xl font-semibold text-sm hover:bg-burgundy-dark transition-all duration-300 cursor-pointer h-[44px]"
                  )}
                >
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
            </div>
            <button
              type="button"
              onClick={onFilterClick}
              className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-charcoal hover:text-burgundy transition-colors cursor-pointer"
            >
              Advanced filters: beds, amenities, price range, currency comparisons
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
