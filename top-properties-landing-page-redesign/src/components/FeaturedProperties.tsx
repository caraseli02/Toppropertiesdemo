import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize, Heart, ChevronRight } from "lucide-react";

const properties = [
  {
    id: 1,
    name: "Villa Azure",
    location: "Côte d'Azur, France",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    price: "€4,500,000",
    featured: true,
    tag: "Featured",
  },
  {
    id: 2,
    name: "Manhattan Penthouse",
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    beds: 4,
    baths: 3.5,
    sqft: "3,800",
    price: "$8,900,000",
    featured: true,
    tag: "New Listing",
  },
  {
    id: 3,
    name: "Alpine Chalet",
    location: "Verbier, Switzerland",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    beds: 5,
    baths: 4.5,
    sqft: "4,600",
    price: "CHF 9,200,000",
    featured: false,
    tag: null,
  },
  {
    id: 4,
    name: "Modern Sunset Villa",
    location: "Los Angeles, California",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    beds: 4,
    baths: 4.5,
    sqft: "3,500",
    price: "$6,500,000",
    featured: false,
    tag: "Price Reduced",
  },
  {
    id: 5,
    name: "Glass House",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    price: "$11,000,000",
    featured: false,
    tag: null,
  },
  {
    id: 6,
    name: "Seaside Retreat",
    location: "Sydney, Australia",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    beds: 4,
    baths: 3,
    sqft: "3,200",
    price: "AUD 9,500,000",
    featured: false,
    tag: null,
  },
];

function PropertyCard({ property, index }: { property: (typeof properties)[0]; index: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl overflow-hidden border border-border-light hover:shadow-xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative img-zoom-container aspect-[4/3]">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        {property.tag && (
          <span
            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
              property.tag === "Featured"
                ? "bg-burgundy text-white"
                : property.tag === "New Listing"
                  ? "bg-charcoal text-white"
                  : "bg-white text-charcoal"
            }`}
          >
            {property.tag}
          </span>
        )}

        {/* Like Button */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-sm"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${liked ? "fill-burgundy text-burgundy" : "text-charcoal/60"}`}
          />
        </button>

        {/* Price overlay on hover */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <span className="text-white font-serif text-2xl">{property.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        <h3 className="font-serif text-xl text-charcoal mb-2 group-hover:text-burgundy transition-colors duration-300">
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5 text-warm-gray text-sm mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {property.location}
        </div>

        <div className="flex items-center gap-4 text-sm text-charcoal-light border-t border-border-light pt-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-warm-gray" />
            <span>{property.beds}</span>
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-warm-gray" />
            <span>{property.baths}</span>
          </div>
          <div className="w-px h-4 bg-border-light" />
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-warm-gray" />
            <span>{property.sqft} sq ft</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
          <span className="font-serif text-xl text-burgundy">{property.price}</span>
          <button className="text-sm font-medium text-charcoal-light hover:text-burgundy transition-colors flex items-center gap-1">
            Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProperties() {
  return (
    <section id="properties" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
              Featured
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mt-3">
              Luxury Properties
            </h2>
            <p className="text-warm-gray mt-3 max-w-md">
              24 hand-selected properties available across the world's most desirable locations.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-burgundy-dark transition-colors group"
          >
            View All Properties
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
