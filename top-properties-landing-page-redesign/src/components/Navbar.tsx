import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Featured", href: "#properties" },
  { label: "Shortlist", href: "#shortlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-border-light/70 bg-ivory/92 backdrop-blur-xl shadow-[0_10px_40px_rgba(26,26,26,0.06)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ${
                scrolled ? "bg-burgundy" : "bg-white/15 ring-1 ring-white/20 backdrop-blur-sm"
              }`}
            >
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-serif text-xl tracking-tight transition-colors ${scrolled ? "text-charcoal" : "text-white"}`}
              >
                Top Properties
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.24em] transition-colors ${scrolled ? "text-warm-gray" : "text-white/70"}`}
              >
                Mallorca shortlist
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-burgundy ${
                  scrolled ? "text-charcoal-light" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="#shortlist"
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-charcoal-light hover:text-burgundy"
                  : "text-white/85 hover:text-white"
              }`}
            >
              Private shortlist
            </a>
            <a
              href="#properties"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? "bg-burgundy text-white hover:bg-burgundy-dark"
                  : "bg-white text-charcoal hover:bg-white/90"
              }`}
            >
              Find best options
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className={`rounded-lg p-2 transition-colors lg:hidden ${scrolled ? "text-charcoal" : "text-white"}`}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ivory px-6 pt-24"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="font-serif text-3xl text-charcoal hover:text-burgundy"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="#properties"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-burgundy px-5 py-4 text-center text-base font-semibold text-white"
                >
                  Find best options
                </a>
                <a
                  href="#shortlist"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-border-light bg-white px-5 py-4 text-center text-base font-medium text-charcoal"
                >
                  View shortlist
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
