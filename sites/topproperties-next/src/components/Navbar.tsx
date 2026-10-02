import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { properties } from "@/data/properties";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice } from "@/lib/filters";
import { Container } from "@/components/ui";
import { CloseIcon, HeartIcon, MenuIcon } from "@/components/icons";

const links = [
  { label: "Buy", to: "/listings?mode=sale" },
  { label: "Rent", to: "/listings?mode=long-rent" },
  { label: "New developments", to: "/listings?tags=New Development" },
  { label: "The collection", to: "/listings" },
];

export function Navbar() {
  const { favorites } = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  useEffect(() => {
    setMobileOpen(false);
    setSavedOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setSavedOpen(false);
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <header className="collection-navbar">
      <Container className="flex h-20 items-center justify-between gap-3">
        <Link to="/" className="collection-logo" aria-label="Top Properties home">
          <span className="logo-mark">T</span>
          <span>
            TOP<span className="logo-second">PROPERTIES</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="nav-link">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => {
              setSavedOpen(!savedOpen);
              setMobileOpen(false);
            }}
            aria-label="Saved properties"
            aria-expanded={savedOpen}
            aria-controls="saved-properties"
            className="saved-trigger"
          >
            <HeartIcon />
            <span className="hidden sm:inline">Saved homes</span>
            {favorites.length > 0 && <span className="saved-count">{favorites.length}</span>}
          </button>
          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setSavedOpen(false);
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="menu-trigger lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>
      {mobileOpen && (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          {links.map((l) => (
            <Link key={l.label} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
      {savedOpen && (
        <>
          <button
            className="saved-backdrop"
            aria-label="Close saved properties"
            onClick={() => setSavedOpen(false)}
          />
          <div id="saved-properties" className="saved-panel">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl">Saved homes</h2>
              <button
                onClick={() => setSavedOpen(false)}
                aria-label="Close saved homes"
                className="menu-trigger"
              >
                <CloseIcon />
              </button>
            </div>
            <p className="text-sm text-ink-soft">Your collection, on this device.</p>
            {favorites.length === 0 ? (
              <p className="py-8 text-sm">Select the heart on a home to keep it here.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {properties
                  .filter((p) => favorites.includes(p.id))
                  .map((p) => (
                    <Link key={p.id} to={`/property/${p.slug}`} className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-16 w-20 rounded-lg object-cover" />
                      <div>
                        <p className="font-serif text-lg">{p.title}</p>
                        <p className="text-sm text-ink-soft">{p.location}</p>
                        <p className="text-sm text-burgundy">{formatPrice(p)}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}
