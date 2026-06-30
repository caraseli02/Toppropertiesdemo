import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { properties } from "@/data/properties";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice } from "@/lib/filters";
import { Container } from "@/components/ui";
import {
  ChevronDownIcon,
  CloseIcon,
  HeartFilledIcon,
  KeyIcon,
  MailIcon,
  MenuIcon,
} from "@/components/icons";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { label: "Buy", to: "/listings?mode=sale" },
  { label: "Rent", to: "/listings?mode=long-rent" },
  { label: "New Developments", to: "/listings?tags=New Development" },
  { label: "Destinations", to: "/listings" },
];

function Logo({ tone }: { tone: "dark" | "light" }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5" aria-label="Top Properties home">
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-burgundy font-serif text-lg font-bold text-cream shadow-sm">
        T
      </span>
      <span
        className={cn(
          "font-serif text-lg font-semibold tracking-tight transition-colors sm:text-xl",
          tone === "light" ? "text-cream" : "text-ink",
        )}
      >
        TOP <span className="text-burgundy">PROPERTIES</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);

  const isHome = location.pathname === "/";
  const solid = scrolled || !isHome;
  const tone: "dark" | "light" = solid ? "dark" : "light";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSavedOpen(false);
  }, [location.pathname, location.search]);

  const savedProperties = favorites
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is (typeof properties)[number] => Boolean(p));

  const linkBase = cn(
    "relative text-sm font-medium tracking-wide transition-colors",
    tone === "light" ? "text-cream/85 hover:text-cream" : "text-ink-soft hover:text-burgundy",
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-line bg-cream/90 backdrop-blur-md shadow-sm shadow-ink/5"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo tone={tone} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.label} to={l.to} className={linkBase}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Saved */}
          <div className="relative">
            <button
              onClick={() => setSavedOpen((o) => !o)}
              aria-label="Saved properties"
              className={cn(
                "relative inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors",
                tone === "light" ? "text-cream hover:bg-white/10" : "text-ink hover:bg-sand",
              )}
            >
              <HeartFilledIcon className="text-base" />
              <span className="hidden sm:inline">Saved</span>
              {favorites.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-bold text-cream">
                  {favorites.length}
                </span>
              )}
            </button>

            {savedOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSavedOpen(false)} />
                <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-2xl border border-line bg-cream shadow-xl">
                  <div className="border-b border-line px-4 py-3">
                    <p className="font-serif text-lg text-ink">Saved Residences</p>
                    <p className="text-xs text-ink-soft">
                      {favorites.length} {favorites.length === 1 ? "property" : "properties"}
                    </p>
                  </div>
                  <div className="no-scrollbar max-h-80 overflow-y-auto p-2">
                    {savedProperties.length === 0 ? (
                      <p className="px-3 py-8 text-center text-sm text-ink-soft">
                        Tap the heart on any residence to save it here.
                      </p>
                    ) : (
                      savedProperties.map((p) => (
                        <Link
                          key={p.id}
                          to={`/property/${p.slug}`}
                          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-sand"
                        >
                          <img src={p.image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink">{p.title}</p>
                            <p className="truncate text-xs text-ink-soft">
                              {p.location}, {p.country}
                            </p>
                            <p className="text-xs font-semibold text-burgundy">
                              {p.reserved ? (
                                <span className="inline-flex items-center gap-1">
                                  <KeyIcon className="text-[11px]" /> Reserved
                                </span>
                              ) : (
                                formatPrice(p)
                              )}
                            </p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            to="/listings"
            className={cn(
              "hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:inline-flex",
              tone === "light"
                ? "bg-cream text-ink hover:bg-white"
                : "bg-burgundy text-cream hover:bg-burgundy-dark",
            )}
          >
            <MailIcon className="text-base" /> Enquire
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open menu"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden",
              tone === "light" ? "text-cream hover:bg-white/10" : "text-ink hover:bg-sand",
            )}
          >
            {mobileOpen ? <CloseIcon className="text-xl" /> : <MenuIcon className="text-xl" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-line bg-cream transition-[max-height] duration-300 ease-out lg:hidden",
          mobileOpen ? "max-h-[28rem]" : "max-h-0 border-t-0",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-ink transition hover:bg-sand"
            >
              {l.label}
              <ChevronDownIcon className="-rotate-90 text-base text-ink-soft" />
            </Link>
          ))}
          <Link
            to="/listings"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-burgundy px-5 py-3 text-sm font-medium text-cream"
          >
            <MailIcon className="text-base" /> Enquire now
          </Link>
        </Container>
      </div>
    </header>
  );
}
