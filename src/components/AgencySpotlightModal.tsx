import { useEffect } from "react";
import { X, Award, MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";

interface AgencySpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgencySpotlightModal({ isOpen, onClose }: AgencySpotlightModalProps) {
  const containerRef = useFocusTrap(isOpen);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const agents = [
    {
      name: "James Mitchell",
      role: "Senior Partner, Coastal Estates",
      image: "/images/agents/james-mitchell.png",
      bio: "Over 18 years of experience orchestrating high-end acquisitions along the Côte d'Azur and Italian Riviera. Known for absolute discretion and strategic market timing.",
      phone: "+33 (0) 6 12 34 56 78",
      email: "j.mitchell@topproperties.demo",
      location: "Nice & Monaco",
    },
    {
      name: "Sarah Anderson",
      role: "Global Advisor, Penthouse Collection",
      image: "/images/agents/sarah-anderson.png",
      bio: "Specializing in ultra-luxury penthouse suites and architectural modern masterpieces across Barcelona, London, and New York. Trusted advisor to Fortune 500 executives.",
      phone: "+34 612 987 654",
      email: "s.anderson@topproperties.demo",
      location: "Barcelona & New York",
    },
  ];

  return (
    <div className="fixed inset-0 z-[1300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-white overflow-hidden shadow-2xl border border-charcoal/5 flex flex-col max-h-[90vh]"
        style={{ borderRadius: "12px" }}
      >
        {/* Header Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-gray-100 flex items-center justify-center text-charcoal shadow-sm transition-colors border border-charcoal/5"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Cover Header */}
          <div className="bg-charcoal text-white py-14 px-8 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-burgundy via-transparent to-transparent pointer-events-none" />
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.25em] text-burgundy-light block mb-2 font-semibold">
                Est. 2008 — Barcelona
              </span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-4">
                Top Properties Curation
              </h2>
              <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                We believe that purchasing real estate is more than acquiring physical structure; it
                is the seamless alignment of lifestyle, legacy, and architectural artistry. Every
                estate in our portfolio is hand-reviewed by our executive board.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Stats / Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-charcoal/5">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-2xl font-bold text-burgundy font-serif">€4.2B+</p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                  Combined Transaction Volume
                </p>
              </div>
              <div className="space-y-1 text-center md:text-left">
                <p className="text-2xl font-bold text-burgundy font-serif">14</p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                  Exclusive Global Markets
                </p>
              </div>
              <div className="space-y-1 text-center md:text-left">
                <p className="text-2xl font-bold text-burgundy font-serif">98.4%</p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                  Off-Market Deal Confidentiality
                </p>
              </div>
              <div className="space-y-1 text-center md:text-left">
                <p className="text-2xl font-bold text-burgundy font-serif">150+</p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-warm-gray">
                  Curated Active Estates
                </p>
              </div>
            </div>

            {/* Meet the Founders / Agents */}
            <section className="space-y-8">
              <div className="text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] text-warm-gray block mb-1">
                  Private Advisors
                </span>
                <h3 className="font-serif text-2xl text-charcoal">Global Advisory Board</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {agents.map((agent) => (
                  <article
                    key={agent.name}
                    className="flex flex-col sm:flex-row gap-6 p-5 border border-charcoal/5 rounded-xl bg-ivory/40 group hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    {/* Portrait */}
                    <div className="w-full sm:w-28 sm:h-36 shrink-0 bg-gray-100 overflow-hidden rounded-lg relative">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>

                    {/* Agent Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-charcoal mb-0.5">{agent.name}</h4>
                        <p className="text-xs font-medium text-burgundy tracking-wide mb-3">
                          {agent.role}
                        </p>
                        <p className="text-xs text-warm-gray leading-relaxed font-light mb-4">
                          {agent.bio}
                        </p>
                      </div>

                      {/* Contact Channels */}
                      <div className="space-y-1.5 border-t border-charcoal/5 pt-3">
                        <div className="flex items-center gap-2 text-[11px] text-warm-gray font-light">
                          <MapPin className="w-3.5 h-3.5 text-burgundy" />
                          <span>{agent.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-warm-gray font-light">
                          <Phone className="w-3.5 h-3.5 text-burgundy" />
                          <a
                            href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                            className="hover:text-burgundy transition-colors"
                          >
                            {agent.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-warm-gray font-light">
                          <Mail className="w-3.5 h-3.5 text-burgundy" />
                          <a
                            href={`mailto:${agent.email}`}
                            className="hover:text-burgundy transition-colors"
                          >
                            {agent.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Philosophy block */}
            <div className="bg-burgundy/5 p-6 rounded-2xl border border-burgundy/10 flex flex-col md:flex-row gap-6 items-center">
              <Award className="w-12 h-12 text-burgundy shrink-0" />
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-sm font-semibold text-charcoal uppercase tracking-wider">
                  The Golden Curation Seal
                </h4>
                <p className="text-xs text-warm-gray leading-relaxed font-light">
                  Top Properties was honored with the *Best Luxury Agency Europe Award* for three
                  consecutive years. Our pledge is absolute confidentiality, impeccable due
                  diligence, and white-glove bespoke assistance from Monaco to Mallorca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
