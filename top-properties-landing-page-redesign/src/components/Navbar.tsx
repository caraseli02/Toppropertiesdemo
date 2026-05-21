import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Building2 } from "lucide-react";

const navLinks = [
  { label: "Properties", href: "#properties" },
  { label: "Collections", href: "#collections" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="#" className="flex items-center gap-3 group">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  scrolled ? "bg-burgundy" : "bg-white/20 backdrop-blur-sm"
                }`}
              >
                <Building2
                  className={`w-5 h-5 transition-colors duration-300 ${scrolled ? "text-white" : "text-white"}`}
                />
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
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-burgundy ${
                    scrolled ? "text-charcoal-light" : "text-white/90"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                className={`text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-charcoal-light hover:text-burgundy"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Sign In
              </a>
              <a
                href="#properties"
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? "bg-burgundy text-white hover:bg-burgundy-dark"
                    : "bg-white text-charcoal hover:bg-white/90"
                }`}
              >
                Explore Properties
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? "text-charcoal" : "text-white"
              }`}
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl font-serif text-charcoal hover:text-burgundy transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href="#properties"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-4 bg-burgundy text-white text-center rounded-xl font-semibold text-lg"
                >
                  Explore Properties
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-4 border border-charcoal/10 text-charcoal text-center rounded-xl font-medium text-lg"
                >
                  Schedule a Private Viewing
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
