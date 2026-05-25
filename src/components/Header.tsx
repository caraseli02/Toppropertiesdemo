import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2 } from "lucide-react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

interface HeaderProps {
  onNavigateToMap?: () => void;
  onNavigateToProperties?: () => void;
  forceMenuOpen?: boolean;
  user: { name: string; email: string; avatar: string } | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export function Header({
  onNavigateToMap,
  onNavigateToProperties,
  forceMenuOpen = false,
  user,
  onOpenLogin,
  onLogout,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const containerRef = useFocusTrap(mobileOpen);
  useBodyScrollLock(mobileOpen);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (forceMenuOpen) setMobileOpen(true);
  }, [forceMenuOpen]);

  const navLinks = [
    {
      label: "Properties",
      action: () => {
        onNavigateToProperties?.();
        setMobileOpen(false);
      },
    },
    {
      label: "Map View",
      action: () => {
        onNavigateToMap?.();
        setMobileOpen(false);
      },
    },
    {
      label: "Collections",
      action: () => {
        document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      },
    },
    {
      label: "Testimonials",
      action: () => {
        document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      },
    },
    {
      label: "Contact",
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      },
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Top Properties - Home"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  scrolled ? "bg-burgundy" : "bg-white/20 backdrop-blur-sm"
                }`}
              >
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-xl leading-none tracking-tight transition-colors duration-300 ${
                    scrolled ? "text-charcoal" : "text-white"
                  }`}
                >
                  Top Properties
                </span>
                <span
                  className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                    scrolled ? "text-warm-gray" : "text-white/70"
                  }`}
                >
                  Luxury Real Estate
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-burgundy cursor-pointer ${
                    scrolled ? "text-charcoal-light" : "text-white/90"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="relative group">
                  <button
                    className="flex items-center gap-2 cursor-pointer focus-visible:outline-none"
                    aria-label="User menu"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-burgundy object-cover"
                    />
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        scrolled ? "text-charcoal" : "text-white/90 group-hover:text-white"
                      }`}
                    >
                      {user.name}
                    </span>
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-charcoal/5 shadow-xl rounded-lg py-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-right z-50">
                    <div className="px-4 py-2 border-b border-charcoal/5">
                      <p className="text-[10px] uppercase tracking-wider text-warm-gray">
                        Client Profile
                      </p>
                      <p className="text-xs font-semibold text-charcoal truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => onNavigateToProperties?.()}
                      className="w-full text-left px-4 py-2 text-xs text-charcoal hover:bg-ivory hover:text-burgundy transition-colors cursor-pointer"
                    >
                      Saved Portfolio (3)
                    </button>
                    <button
                      onClick={() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-charcoal hover:bg-ivory hover:text-burgundy transition-colors cursor-pointer"
                    >
                      Schedule Viewings
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-xs text-burgundy hover:bg-burgundy/5 transition-colors cursor-pointer border-t border-charcoal/5"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    scrolled
                      ? "text-charcoal-light hover:text-burgundy"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
              )}
              <button
                onClick={() => onNavigateToProperties?.()}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  scrolled
                    ? "bg-burgundy text-white hover:bg-burgundy-dark"
                    : "bg-white text-charcoal hover:bg-white/90"
                }`}
              >
                Explore Properties
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 overflow-y-auto"
            style={{ zIndex: 1100 }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={link.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-serif text-charcoal hover:text-burgundy transition-colors text-left cursor-pointer"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => {
                    onNavigateToProperties?.();
                    setMobileOpen(false);
                  }}
                  className="w-full py-4 bg-burgundy text-white text-center rounded-xl font-semibold text-lg cursor-pointer"
                >
                  Explore Properties
                </button>
                <button
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    setMobileOpen(false);
                  }}
                  className="w-full py-4 border border-charcoal/10 text-charcoal text-center rounded-xl font-medium text-lg cursor-pointer"
                >
                  Schedule a Private Viewing
                </button>

                {user ? (
                  <div className="flex items-center gap-3 p-4 border border-charcoal/5 rounded-xl bg-ivory/50 mt-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border border-burgundy object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-warm-gray">
                        Client Session
                      </p>
                      <p className="text-sm font-semibold text-charcoal truncate">{user.name}</p>
                      <p className="text-[10px] text-warm-gray truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setMobileOpen(false);
                      }}
                      className="px-3 py-1.5 bg-burgundy/10 hover:bg-burgundy/20 text-burgundy text-xs font-semibold rounded-full transition-all shrink-0 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onOpenLogin();
                      setMobileOpen(false);
                    }}
                    className="w-full py-4 border border-charcoal/10 text-charcoal text-center rounded-xl font-medium text-lg cursor-pointer mt-4"
                  >
                    Client Portal Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
