import { motion } from "framer-motion";
import { ArrowRight, Bed, ChevronRight, Maximize, MapPin, Sparkles, Star } from "lucide-react";

const discoveryShortcuts = [
  "Best fit for a family base",
  "Best sea-view value",
  "Best for capital preservation",
];

const supportingCards = [
  {
    name: "Portals Nous",
    location: "West coast",
    price: "€3.9M",
    detail: "Quiet coastal villa with direct terrace light.",
  },
  {
    name: "Santa Ponsa",
    location: "Southwest Mallorca",
    price: "€5.2M",
    detail: "Modern new-build with strong rental profile.",
  },
  {
    name: "Deià",
    location: "Northwest coast",
    price: "€6.1M",
    detail: "Stone home with privacy and mountain views.",
  },
];

export default function FeaturedProperties() {
  return (
    <section id="properties" className="bg-ivory py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-burgundy">
              Featured match
            </span>
            <h2 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Discovery rail</h2>
            <p className="mt-3 max-w-xl text-warm-gray">
              A single premium result, plus a short, curator-style shortlist to keep the page
              readable.
            </p>
          </div>
          <a
            href="#shortlist"
            className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            Jump to shortlist
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div id="shortlist" className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group overflow-hidden rounded-[2rem] border border-border-light bg-white shadow-[0_22px_70px_rgba(26,26,26,0.08)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Featured Mallorca villa"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal shadow-sm backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-burgundy" />
                Featured recommendation
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 border-b border-border-light pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-warm-gray">
                    Son Vida / Palma
                  </p>
                  <h3 className="mt-2 font-serif text-3xl text-charcoal">
                    Contemporary villa with sea views
                  </h3>
                </div>
                <div className="rounded-full border border-border-light bg-cream px-4 py-2 text-sm font-semibold text-charcoal">
                  €4.8M
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-charcoal-light">
                <span className="inline-flex items-center gap-1.5">
                  <Bed className="h-4 w-4 text-warm-gray" />5 bed
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-warm-gray" />
                  Palma, Mallorca
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="h-4 w-4 text-warm-gray" />
                  4,200 sq ft
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-warm-gray" />
                  Sea view + pool
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-cream p-4 text-sm leading-relaxed text-charcoal-light">
                <span className="font-semibold text-charcoal">Why it stands out:</span> strong view
                corridor, private outdoor living, and a low-density setting that reads well for
                primary residence or hold.
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-burgundy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark">
                  View details
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="inline-flex items-center justify-center rounded-full border border-border-light bg-white px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:border-burgundy/30 hover:text-burgundy">
                  Save shortlist
                </button>
              </div>
            </div>
          </motion.article>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="rounded-[1.75rem] border border-border-light bg-white p-5 shadow-[0_18px_50px_rgba(26,26,26,0.06)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-burgundy">
                Recommended for you
              </p>
              <div className="mt-4 space-y-3">
                {discoveryShortcuts.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl bg-cream px-4 py-3 text-sm text-charcoal-light"
                  >
                    <span>{item}</span>
                    <ChevronRight className="h-4 w-4 text-warm-gray" />
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              {supportingCards.map((card, index) => (
                <motion.article
                  key={card.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[1.5rem] border border-border-light bg-white p-4 shadow-[0_14px_42px_rgba(26,26,26,0.05)] transition-shadow hover:shadow-[0_18px_50px_rgba(26,26,26,0.08)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-warm-gray">
                        {card.location}
                      </p>
                      <h3 className="mt-2 font-serif text-xl text-charcoal">{card.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal-light/80">
                        {card.detail}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-cream px-3 py-1.5 text-sm font-semibold text-charcoal">
                      {card.price}
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
