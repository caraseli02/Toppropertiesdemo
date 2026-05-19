import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";

export default function Hero() {
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
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-burgundy-light text-xs uppercase tracking-[0.3em] font-semibold mb-6"
          >
            Curated Luxury Real Estate
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
          >
            Exceptional Homes for
            <span className="block text-white/90">Discerning Lives</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-xl"
          >
            From penthouses to private estates — each property is hand-selected for those who expect
            nothing less than extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#properties"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-burgundy text-white rounded-full font-semibold text-base hover:bg-burgundy-dark transition-all duration-300 group"
            >
              Explore Properties
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Schedule a Private Viewing
            </a>
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
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-warm-gray font-semibold">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, neighborhood..."
                  className="w-full px-4 py-3 bg-cream rounded-xl text-charcoal placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-burgundy/30 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-warm-gray font-semibold">
                  Property Type
                </label>
                <select className="w-full px-4 py-3 bg-cream rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-burgundy/30 text-sm appearance-none cursor-pointer">
                  <option>All Types</option>
                  <option>Villa</option>
                  <option>Penthouse</option>
                  <option>Estate</option>
                  <option>Apartment</option>
                  <option>Chalet</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-warm-gray font-semibold">
                  Budget
                </label>
                <select className="w-full px-4 py-3 bg-cream rounded-xl text-charcoal focus:outline-none focus:ring-2 focus:ring-burgundy/30 text-sm appearance-none cursor-pointer">
                  <option>Any Budget</option>
                  <option>$1M - $5M</option>
                  <option>$5M - $10M</option>
                  <option>$10M - $25M</option>
                  <option>$25M+</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-burgundy text-white rounded-xl font-semibold text-sm hover:bg-burgundy-dark transition-all duration-300">
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
