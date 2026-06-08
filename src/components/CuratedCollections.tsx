import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const collections = [
  {
    id: "coastal",
    title: "Coastal Living",
    subtitle: "Waterfront villas & beachfront estates",
    count: 12,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    id: "urban",
    title: "Urban Penthouses",
    subtitle: "Sky-high living in global capitals",
    count: 8,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    id: "mountain",
    title: "Mountain Retreats",
    subtitle: "Alpine chalets & ski-in properties",
    count: 6,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    id: "historic",
    title: "Historic Estates",
    subtitle: "Timeless architecture & heritage homes",
    count: 5,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&h=500&q=80",
  },
];

interface CuratedCollectionsProps {
  onSelectCollection?: (collectionId: string) => void;
}

export function CuratedCollections({ onSelectCollection }: CuratedCollectionsProps) {
  return (
    <section id="collections" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
            Collections
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mt-3">Curated for You</h2>
          <p className="text-warm-gray mt-4 max-w-lg mx-auto">
            Explore our themed collections, each thoughtfully assembled around a distinct lifestyle
            vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.button
              key={collection.title}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onSelectCollection?.(collection.id)}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/35 focus-visible:ring-offset-2"
              aria-label={`Browse ${collection.title} collection`}
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent" />

              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-white/60 text-xs uppercase tracking-wider font-medium mb-2 block">
                      {collection.count} Properties
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-1">
                      {collection.title}
                    </h3>
                    <p className="text-white/70 text-sm">{collection.subtitle}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-burgundy transition-all duration-300 flex-shrink-0 ml-4">
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
