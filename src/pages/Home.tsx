import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { properties } from "@/data/properties";
import { DEFAULT_FILTERS } from "@/lib/filters";
import type { FilterState } from "@/lib/filters";
import { SearchPanel } from "@/components/SearchPanel";
import { PropertyCard } from "@/components/PropertyCard";
import { Container, Eyebrow, SectionHeading, buttonClasses } from "@/components/ui";
import { ArrowRightIcon, GlobeIcon, ShieldIcon, StarIcon, UsersIcon } from "@/components/icons";

const HERO_IMG =
  "https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200";

const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900`;

const HERO_TABS: {
  id: string;
  label: string;
  apply: (f: FilterState) => FilterState;
}[] = [
  {
    id: "buy",
    label: "Buy",
    apply: (f) => ({
      ...f,
      mode: "sale",
      tags: f.tags.filter((t) => t !== "New Development"),
    }),
  },
  { id: "rent", label: "Rent", apply: (f) => ({ ...f, mode: "long-rent" }) },
  {
    id: "new",
    label: "New Developments",
    apply: (f) => ({
      ...f,
      mode: "all",
      tags: Array.from(new Set([...f.tags, "New Development"])),
    }),
  },
];

const STATS = [
  { icon: GlobeIcon, value: "15K+", label: "Luxury Properties" },
  { icon: StarIcon, value: "60+", label: "Destinations" },
  { icon: UsersIcon, value: "1:1", label: "Dedicated Experts" },
];

const DESTINATIONS = [
  { name: "French Riviera", region: "French Riviera", img: px(31817160), count: 42 },
  { name: "Amalfi Coast", region: "Amalfi Coast", img: px(29702290), count: 28 },
  { name: "Tuscany", region: "Tuscany", img: px(36591535), count: 35 },
  { name: "Costa del Sol", region: "Costa del Sol", img: px(12715498), count: 31 },
  { name: "Mykonos", region: "Cyclades", img: px(19075379), count: 19 },
  { name: "Dubai", region: "Dubai", img: px(7045915), count: 47 },
];

export function Home() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeTab, setActiveTab] = useState("buy");
  const searchRef = useRef<HTMLDivElement>(null);

  const featured = properties.filter((p) => p.featured).slice(0, 6);

  const pickTab = (tab: (typeof HERO_TABS)[number]) => {
    setActiveTab(tab.id);
    setFilters((f) => tab.apply(f));
    setTimeout(() => searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Luxury coastal villa at sunset"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />

        <Container className="relative flex h-full min-h-[92vh] flex-col justify-end pb-44 pt-32 sm:pb-52">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-cream backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cream" /> Private Collection · Est. 1998
            </span>
            <h1 className="mt-6 font-serif text-[2.75rem] leading-[1.04] text-cream sm:text-6xl lg:text-7xl">
              Find Your <span className="italic text-cream/90">Extraordinary</span> Home
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              A curated portfolio of the world's most remarkable villas, estates and exclusive
              residences — represented with absolute discretion.
            </p>

            {/* CTA tabs */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {HERO_TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => pickTab(t)}
                  className={
                    "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition " +
                    (activeTab === t.id
                      ? "bg-burgundy text-cream shadow-lg shadow-burgundy/30"
                      : "border border-cream/40 bg-cream/10 text-cream backdrop-blur-sm hover:bg-cream/20")
                  }
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Search panel (overlapping) */}
      <div ref={searchRef} className="relative z-20 -mt-32 scroll-mt-24 sm:-mt-36">
        <Container>
          <SearchPanel filters={filters} setFilters={setFilters} />
        </Container>
      </div>

      {/* Stats */}
      <section className="mt-20">
        <Container>
          <div className="grid grid-cols-1 divide-y divide-line rounded-3xl border border-line bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-5 px-7 py-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-burgundy-soft text-xl text-burgundy">
                  <s.icon />
                </span>
                <div>
                  <p className="font-serif text-3xl text-ink">{s.value}</p>
                  <p className="text-sm text-ink-soft">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured */}
      <section className="mt-24">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured Residences"
              title="Homes that define a coastline"
              description="A hand-selected glimpse of the extraordinary — each residence vetted by our private client advisors."
            />
            <button
              onClick={() => navigate("/listings")}
              className={buttonClasses("outline", "md") + " shrink-0"}
            >
              View all <ArrowRightIcon className="text-base" />
            </button>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Destinations */}
      <section className="mt-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="By Destination"
            title="Where extraordinary lives"
            description="From the cliffs of the Riviera to the Cyclades, explore residences by the destinations they define."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {DESTINATIONS.map((d) => (
              <button
                key={d.name}
                onClick={() => navigate(`/listings?q=${encodeURIComponent(d.region)}`)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-line text-left"
              >
                <img
                  src={d.img}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="font-serif text-base text-cream">{d.name}</p>
                  <p className="text-[11px] text-cream/75">{d.count} residences</p>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Standards band */}
      <section className="mt-28">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-line bg-cream-2">
            <div className="grid items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow>The Top Properties Standard</Eyebrow>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
                  Representation worthy of the rare and remarkable
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  Every residence in our collection is personally inspected and vetted. We pair each
                  client with a dedicated advisor who understands not just the market, but the life
                  you intend to live there.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink">
                    <ShieldIcon className="text-base text-burgundy" /> Verified listings
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink">
                    <UsersIcon className="text-base text-burgundy" /> Dedicated advisors
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-ink">
                    <GlobeIcon className="text-base text-burgundy" /> Global reach
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[px(24807124), px(19075381), px(8146212), px(8082562)].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    className={
                      "h-full w-full rounded-2xl object-cover " +
                      (i % 2 === 1 ? "mt-8 aspect-[3/4]" : "aspect-[3/4]")
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA band */}
      <section className="mt-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-burgundy px-8 py-16 text-center sm:px-12 sm:py-20">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-burgundy-light/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-burgundy-dark/40 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
                Begin the search for your extraordinary home
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-cream/80">
                Speak with a private client advisor and access off-market residences reserved for
                our most discerning clients.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => navigate("/listings")}
                  className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-burgundy transition hover:bg-white"
                >
                  Explore residences <ArrowRightIcon className="text-base" />
                </button>
                <button
                  onClick={() => navigate("/listings")}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-medium text-cream transition hover:bg-cream/10"
                >
                  Book a consultation
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home;
