import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

type IntentKey = "sea-view" | "palma" | "investment" | "quiet";

type Listing = {
  id: string;
  intent: IntentKey;
  area: string;
  title: string;
  image: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  excerpt: string;
  rationale: string;
  bullets: string[];
};

const intentMeta: Record<
  IntentKey,
  {
    label: string;
    prompt: string;
    summary: string;
    notes: { title: string; body: string }[];
    defaultListingId: string;
  }
> = {
  "sea-view": {
    label: "Sea view",
    prompt: "Sea-view villa near Palma with pool",
    summary:
      "Best sea-view value in the current edit, with a clear horizon line and private outdoor space.",
    notes: [
      {
        title: "Best sea-view value",
        body: "A strong view corridor without drifting into resort-like density.",
      },
      {
        title: "Private terraces",
        body: "Outdoor living stays large enough to feel like a primary residence.",
      },
      {
        title: "Resale quality",
        body: "The property reads calm, expensive, and easy to keep in a premium shortlist.",
      },
    ],
    defaultListingId: "6",
  },
  palma: {
    label: "Close to Palma",
    prompt: "Walkable Palma home with terrace and lift",
    summary: "Best for city convenience, lock-up-and-leave ownership, and walkable daily life.",
    notes: [
      {
        title: "Walkable address",
        body: "Best when you want urban convenience without giving up privacy.",
      },
      {
        title: "Historic character",
        body: "A softer, editorial feel that suits a refined city base.",
      },
      { title: "Low-friction ownership", body: "Simple, polished, and easy to revisit often." },
    ],
    defaultListingId: "2",
  },
  investment: {
    label: "Investment",
    prompt: "Rental-ready Mallorca property with strong upside",
    summary: "Balanced for capital preservation, rental appeal, and a premium buyer profile.",
    notes: [
      {
        title: "Capital preservation",
        body: "The edit favours properties that read durable rather than speculative.",
      },
      {
        title: "Rental profile",
        body: "Prime addresses and clear lifestyle hooks make the story easy to underwrite.",
      },
      { title: "Buyer confidence", body: "A shortlist that feels measured, not promotional." },
    ],
    defaultListingId: "3",
  },
  quiet: {
    label: "Quiet area",
    prompt: "Quiet family base with beach access",
    summary: "Best for a calmer daily rhythm, with beach access and a low-density feel.",
    notes: [
      {
        title: "Low-density calm",
        body: "A quieter pocket that still feels premium and connected.",
      },
      { title: "Family base", body: "Useful if the second home needs to live like a real home." },
      {
        title: "Easy beach rhythm",
        body: "Relaxed access to the coast without overdoing the noise.",
      },
    ],
    defaultListingId: "4",
  },
};

const listings: readonly Listing[] = [
  {
    id: "6",
    intent: "sea-view",
    area: "Valldemossa",
    title: "Seafront Mega-Villa in Valldemossa",
    image: "/images/properties/seafront-mega-villa-in-valldem/hero.jpg",
    price: "€9,000,000",
    beds: 6,
    baths: 6,
    sqft: "10,764 sq ft",
    excerpt: "Wide Mediterranean horizon, private pool, and a quiet hillside approach.",
    rationale: "Best sea-view value with the strongest view corridor in the first edit.",
    bullets: [
      "Wide sea-facing terraces",
      "Private pool and spa feel",
      "Low-noise hillside approach",
    ],
  },
  {
    id: "2",
    intent: "palma",
    area: "Palma Old Town",
    title: "Luxury Apartment in Palma Old Town",
    image: "/images/properties/luxury-apartment-in-palma-old-/hero.jpg",
    price: "€5,950,000",
    beds: 5,
    baths: 5,
    sqft: "7,018 sq ft",
    excerpt: "Historic centre convenience with terraces, lift access, and polished finishes.",
    rationale: "Best for a city base that still feels private and premium.",
    bullets: [
      "Walkable daily life",
      "Historic address with polish",
      "Ideal lock-up-and-leave base",
    ],
  },
  {
    id: "3",
    intent: "investment",
    area: "Port de Pollença",
    title: "Beachfront Property in Port de Pollença",
    image: "/images/properties/beachfront-property-in-port-de/hero.jpg",
    price: "€985,000",
    beds: 3,
    baths: 2,
    sqft: "1,302 sq ft",
    excerpt: "Straightforward beach access with a clean, investment-friendly profile.",
    rationale: "Best sea-view value for buyers who care about rental appeal.",
    bullets: ["Beachfront position", "Rental-ready profile", "Easy to understand shortlist fit"],
  },
  {
    id: "4",
    intent: "quiet",
    area: "Son Serra de Marina",
    title: "Beachfront Villa with Rental License",
    image: "/images/properties/beachfront-villa-with-rental-l/hero.jpg",
    price: "€925,000",
    beds: 3,
    baths: 2,
    sqft: "1,572 sq ft",
    excerpt: "A calmer coastal base with a practical license and open outdoor space.",
    rationale: "Best for a quieter second home with easy rental optionality.",
    bullets: ["Quiet coastal setting", "Holiday rental license", "Simple ownership profile"],
  },
];

const intentOrder: IntentKey[] = ["sea-view", "palma", "investment", "quiet"];

function deriveIntent(prompt: string): IntentKey {
  const value = prompt.toLowerCase();

  if (/(palma|old town|city|lift|walk|urban)/.test(value)) return "palma";
  if (/(invest|rental|yield|return|capital|resale)/.test(value)) return "investment";
  if (/(quiet|family|calm|retreat|private|low-density)/.test(value)) return "quiet";
  return "sea-view";
}

function App() {
  const [activeIntent, setActiveIntent] = useState<IntentKey>("sea-view");
  const [prompt, setPrompt] = useState(intentMeta["sea-view"].prompt);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const featuredListing = useMemo(() => {
    if (selectedListingId) {
      const selected = listings.find((listing) => listing.id === selectedListingId);
      if (selected) return selected;
    }

    return (
      listings.find((listing) => listing.id === intentMeta[activeIntent].defaultListingId) ??
      listings[0]
    );
  }, [activeIntent, selectedListingId]);

  const supportingListings = listings.filter((listing) => listing.id !== featuredListing.id);
  const activeIntentCopy = intentMeta[activeIntent];
  const isSaved = savedIds.includes(featuredListing.id);

  const onSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActiveIntent(deriveIntent(prompt));
    setSelectedListingId(null);
  };

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id],
    );
  };

  const selectIntent = (intent: IntentKey) => {
    setActiveIntent(intent);
    setPrompt(intentMeta[intent].prompt);
    setSelectedListingId(null);
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-stone-950">
      <header className="sticky top-0 z-30 border-b border-black/5 bg-[#f6f1e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-950 text-white shadow-[0_18px_40px_-26px_rgba(28,25,23,0.7)]">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <div>
              <p className="font-serif text-xl leading-none tracking-[-0.03em] text-stone-950">
                TopProperties
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-stone-500">
                Mallorca luxury homes
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-stone-500 sm:inline-flex">
            <ShieldCheck className="h-4 w-4 text-[#b08d4f]" />
            private edit · v1 slice
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="lg:pt-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-stone-500">
              <Sparkles className="h-3.5 w-3.5 text-[#b08d4f]" />
              curated Mallorca only
            </div>

            <h1 className="mt-6 max-w-[12ch] font-serif text-5xl leading-[0.95] tracking-[-0.05em] text-stone-950 sm:text-6xl lg:text-[5.4rem]">
              Find the best homes in Mallorca.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              Sea views, prime neighborhoods, and investment-grade homes — curated in one place for
              a private editorial shortlist.
            </p>

            <form onSubmit={onSearchSubmit} className="mt-8 max-w-3xl">
              <label className="text-sm font-medium text-stone-600" htmlFor="search-prompt">
                Describe the home, area, or view you want
              </label>
              <div className="mt-3 flex flex-col gap-3 rounded-[1.75rem] border border-black/8 bg-white/80 p-3 shadow-[0_24px_80px_-48px_rgba(50,38,24,0.45)] backdrop-blur sm:flex-row sm:items-center">
                <div className="flex min-h-12 items-center gap-3 rounded-[1.3rem] bg-stone-50 px-4 text-stone-500 sm:flex-1">
                  <Search className="h-4 w-4 shrink-0 text-[#b08d4f]" />
                  <input
                    id="search-prompt"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    className="w-full bg-transparent text-[15px] text-stone-950 placeholder:text-stone-400 focus:outline-none"
                    placeholder="Describe the home, area, or view you want"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[1.15rem] bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
                >
                  Find best options
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-sm text-stone-500">
                Try: sea-view villa near Palma with pool
              </p>
            </form>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {intentOrder.map((intent) => {
                const isActive = activeIntent === intent;
                return (
                  <button
                    key={intent}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => selectIntent(intent)}
                    className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-stone-950 bg-stone-950 text-white shadow-[0_18px_36px_-26px_rgba(28,25,23,0.75)]"
                        : "border-black/10 bg-white/70 text-stone-600 hover:border-black/20 hover:bg-white"
                    }`}
                  >
                    {intentMeta[intent].label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-[1.75rem] border border-black/8 bg-white/65 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Recommended for you
              </p>
              <p className="mt-3 text-lg font-medium text-stone-950">{activeIntentCopy.summary}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {activeIntentCopy.notes.map((note) => (
                  <div
                    key={note.title}
                    className="rounded-[1.35rem] border border-black/8 bg-white/80 p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                      {note.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{note.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <FeaturedListingCard
              listing={featuredListing}
              label={activeIntentCopy.label}
              saved={isSaved}
              onSelect={() => setSelectedListingId(featuredListing.id)}
              onToggleSaved={() => toggleSaved(featuredListing.id)}
            />
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                Supporting matches
              </p>
              <h2 className="mt-2 font-serif text-2xl text-stone-950 sm:text-3xl">
                Comparable properties
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-stone-500 sm:text-right">
              Tap any card to move it into the hero slot and update the recommendation rail.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {supportingListings.map((listing) => (
              <SupportCard
                key={listing.id}
                listing={listing}
                onSelect={() => {
                  setSelectedListingId(listing.id);
                  setPrompt(listing.title);
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FeaturedListingCard({
  listing,
  label,
  saved,
  onSelect,
  onToggleSaved,
}: {
  listing: Listing;
  label: string;
  saved: boolean;
  onSelect: () => void;
  onToggleSaved: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_28px_90px_-48px_rgba(37,26,14,0.48)]">
      <button type="button" onClick={onSelect} className="group block w-full text-left">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
          <img
            src={listing.image}
            alt={listing.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="eager"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-stone-950/80 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
              Featured match
            </span>
            <span className="inline-flex items-center rounded-full bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-stone-600 backdrop-blur-sm">
              {label}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 rounded-[1.5rem] border border-white/14 bg-white/12 p-4 text-white backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">{listing.area}</p>
            <h3 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.03em] sm:text-[2.15rem]">
              {listing.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">{listing.excerpt}</p>
          </div>
        </div>
      </button>

      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5">
            <MapPin className="h-4 w-4 text-[#b08d4f]" />
            {listing.area}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5">
            <BedDouble className="h-4 w-4 text-[#b08d4f]" />
            {listing.beds} bed
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5">
            <Bath className="h-4 w-4 text-[#b08d4f]" />
            {listing.baths} bath
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5">
            {listing.sqft}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-3xl font-semibold tracking-[-0.03em] text-stone-950">
            {listing.price}
          </p>
          <p className="mt-2 max-w-xl text-base leading-7 text-stone-600">{listing.rationale}</p>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-stone-50 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Why it stands out</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
            {listing.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b08d4f]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[1.15rem] bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onToggleSaved}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[1.15rem] border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition-colors hover:border-black/20 hover:bg-stone-50"
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-[#b08d4f] text-[#b08d4f]" : ""}`} />
            {saved ? "Saved" : "Save shortlist"}
          </button>
        </div>
      </div>
    </article>
  );
}

function SupportCard({ listing, onSelect }: { listing: Listing; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group overflow-hidden rounded-[1.65rem] border border-black/8 bg-white text-left shadow-[0_22px_70px_-54px_rgba(37,26,14,0.42)] transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/86 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-stone-500 backdrop-blur-sm">
          {listing.area}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-serif text-xl tracking-[-0.03em] text-stone-950">{listing.title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-600">{listing.rationale}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-stone-500">
          <span className="rounded-full bg-stone-50 px-3 py-1.5">{listing.price}</span>
          <span className="rounded-full bg-stone-50 px-3 py-1.5">{listing.beds} bed</span>
          <span className="rounded-full bg-stone-50 px-3 py-1.5">{listing.sqft}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-black/6 pt-4">
          <span className="text-sm font-medium text-stone-900">Move to hero</span>
          <ArrowRight className="h-4 w-4 text-[#b08d4f] transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}

export default App;
