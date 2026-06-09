import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

const quickChips = ["Price", "Bedrooms", "Sea view", "Waterfront", "New build", "Investment"];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-border-light/60 bg-[radial-gradient(circle_at_top_left,_rgba(177,8,50,0.08),_transparent_32%),linear-gradient(180deg,_#fbf8f3_0%,_#f6f1ea_100%)]"
    >
      <div className="mx-auto grid grid-cols-1 min-h-[100svh] max-w-7xl items-center gap-12 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-20 lg:pt-32">
        <div className="relative z-10 w-full min-w-0 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-light bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-warm-gray shadow-[0_12px_40px_rgba(26,26,26,0.04)] backdrop-blur"
          >
            Mallorca shortlist
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
            Curated homes only
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-serif text-5xl leading-[1.02] tracking-tight text-charcoal sm:text-6xl lg:text-[4.9rem]"
          >
            Find the best homes in
            <span className="block text-burgundy">Mallorca.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-light/80 sm:text-xl"
          >
            Sea views, prime neighborhoods, and investment-grade homes — curated in one place, like
            a private desk for your brief.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 w-full rounded-[1.5rem] border border-border-light bg-white/90 p-4 shadow-[0_24px_80px_rgba(26,26,26,0.08)] backdrop-blur"
          >
            <div className="flex w-full min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
              <label className="w-full min-w-0 flex-1">
                <span className="sr-only">Describe the home, area, or view you want</span>
                <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-border-light bg-cream px-4 py-4 transition-colors focus-within:border-burgundy/40 focus-within:ring-2 focus-within:ring-burgundy/10">
                  <Search className="h-5 w-5 shrink-0 text-warm-gray" />
                  <input
                    type="text"
                    placeholder="Describe the home, area, or view you want"
                    className="min-w-0 w-full bg-transparent text-sm text-charcoal placeholder:text-warm-gray/70 focus:outline-none sm:text-base"
                  />
                </div>
              </label>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-burgundy px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark lg:w-auto">
                Find best options
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-warm-gray">Try: sea-view villa near Palma with pool</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 flex w-full max-w-full min-w-0 gap-3 overflow-x-auto pb-2 lg:flex-wrap lg:overflow-visible"
          >
            {quickChips.map((chip) => (
              <button
                key={chip}
                className="shrink-0 rounded-full border border-border-light bg-white px-4 py-2 text-sm font-medium text-charcoal-light shadow-sm transition-colors hover:border-burgundy/30 hover:text-burgundy"
              >
                {chip}
              </button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-4 text-sm text-warm-gray"
          >
            <span>Best fit for a family base</span>
            <span className="h-1.5 w-1.5 rounded-full bg-border-light" />
            <span>Best sea-view value</span>
            <span className="h-1.5 w-1.5 rounded-full bg-border-light" />
            <span>Best for capital preservation</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:pl-8"
        >
          <div className="absolute -left-10 top-8 hidden h-40 w-40 rounded-full bg-burgundy/10 blur-3xl lg:block" />
          <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_28px_90px_rgba(26,26,26,0.12)]">
            <div className="relative aspect-[4/5] min-h-[540px] lg:min-h-[680px]">
              <img
                src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=1200&q=80"
                alt="Mallorca villa overlooking the sea"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/78 via-charcoal/18 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-[1.5rem] border border-white/12 bg-charcoal/66 p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-md">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/65">
                        Featured recommendation
                      </p>
                      <h2 className="mt-2 font-serif text-2xl sm:text-3xl">Son Vida, Palma</h2>
                    </div>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                      €4.8M
                    </span>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/78 sm:text-base">
                    Contemporary villa with sea views, private outdoor living, and a calm,
                    low-density setting.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-sm text-white/86">
                    {["5 bed", "Pool", "Garage", "Terrace", "Sea view"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                        Why it stands out
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-white/82">
                        <li>• strong view corridor</li>
                        <li>• private outdoor living</li>
                        <li>• high resale quality</li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-3 sm:min-w-[10rem]">
                      <button className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-white/90">
                        View details
                      </button>
                      <button className="rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
