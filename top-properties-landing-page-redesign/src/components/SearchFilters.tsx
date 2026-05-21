import { motion } from "framer-motion";
import { MapPin, Home, DollarSign, Tag } from "lucide-react";

const filters = [
  {
    icon: MapPin,
    label: "Location",
    options: [
      "All Locations",
      "Côte d'Azur",
      "New York",
      "London",
      "Dubai",
      "Sydney",
      "Aspen",
      "Malibu",
    ],
  },
  {
    icon: Home,
    label: "Property Type",
    options: ["All Types", "Villa", "Penthouse", "Estate", "Apartment", "Chalet", "Mansion"],
  },
  {
    icon: DollarSign,
    label: "Budget",
    options: ["Any Budget", "Under $5M", "$5M - $10M", "$10M - $25M", "$25M+"],
  },
  {
    icon: Tag,
    label: "Status",
    options: ["All Status", "For Sale", "For Rent", "New Listing", "Price Reduced"],
  },
];

export default function SearchFilters() {
  return (
    <section className="py-16 bg-white border-b border-border-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
            Refine Your Search
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mt-3">
            Find Your Perfect Match
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filters.map((filter, index) => (
            <motion.div
              key={filter.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-2 mb-3">
                <filter.icon className="w-4 h-4 text-burgundy" />
                <span className="text-sm font-semibold text-charcoal">{filter.label}</span>
              </div>
              <div className="relative">
                <select className="w-full px-4 py-3.5 bg-ivory border border-border-light rounded-xl text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-burgundy/20 focus:border-burgundy/30 cursor-pointer appearance-none transition-all duration-300 hover:border-burgundy/30">
                  {filter.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-warm-gray"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
