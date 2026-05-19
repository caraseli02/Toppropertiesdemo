import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Top Properties understood exactly what we were looking for — a home that felt like a retreat without sacrificing access to the city. Their discretion and attention to detail made the entire process effortless.",
    author: "Alexandra & James Whitfield",
    role: "Acquired Villa Azure, Côte d'Azur",
    avatar: "AW",
  },
  {
    id: 2,
    quote:
      "As an investor, I value data and transparency. The market intelligence reports provided by Top Properties gave me the confidence to move quickly on a penthouse that has since appreciated 18%.",
    author: "Marcus Chen",
    role: "Investor, Manhattan Penthouse",
    avatar: "MC",
  },
  {
    id: 3,
    quote:
      "The private viewing experience was unlike anything I've encountered. No crowds, no pressure — just a thoughtful presentation of a property that genuinely matched my lifestyle.",
    author: "Isabelle Moreau",
    role: "Acquired Alpine Chalet, Verbier",
    avatar: "IM",
  },
  {
    id: 4,
    quote:
      "Their local expertise in Barcelona was invaluable. From understanding regulations to negotiating terms, the team handled everything with professionalism and speed.",
    author: "Raj Patel",
    role: "Investor, Passeig de Gràcia",
    avatar: "RP",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-burgundy/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy/5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mt-3">Client Voices</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-10 h-10 text-burgundy/20 mx-auto mb-8" />
              <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal leading-relaxed max-w-4xl mx-auto mb-10">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-burgundy flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{t.avatar}</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-charcoal">{t.author}</p>
                  <p className="text-sm text-warm-gray">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:border-burgundy hover:bg-burgundy/5 transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-charcoal group-hover:text-burgundy transition-colors" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-burgundy w-6" : "bg-border-light hover:bg-warm-gray w-2"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center hover:border-burgundy hover:bg-burgundy/5 transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-charcoal group-hover:text-burgundy transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
