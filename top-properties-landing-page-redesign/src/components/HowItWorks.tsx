import { motion } from "framer-motion";
import { Search, Calendar, FileText, Key } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Browse our curated collection of luxury properties. Use advanced filters to narrow down by location, type, budget, and lifestyle preferences.",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Experience",
    description:
      "Schedule a private viewing at your convenience. Our advisors arrange exclusive access, often before properties reach the open market.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Evaluate",
    description:
      "Receive a comprehensive property report including valuation, market analysis, and investment potential from our research team.",
  },
  {
    number: "04",
    icon: Key,
    title: "Acquire",
    description:
      "Our concierge team handles negotiations, paperwork, and closing — ensuring a seamless transaction from offer to keys in hand.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
            The Process
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mt-3">How It Works</h2>
          <p className="text-warm-gray mt-4 max-w-lg mx-auto">
            A refined four-step journey from discovery to ownership, designed around your time and
            expectations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-px bg-border-light" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative text-center group"
              >
                {/* Number & Icon */}
                <div className="relative inline-flex flex-col items-center mb-8">
                  <span className="font-serif text-7xl text-cream absolute -top-4 left-1/2 -translate-x-1/2 select-none">
                    {step.number}
                  </span>
                  <div className="relative w-16 h-16 rounded-2xl bg-white border-2 border-border-light flex items-center justify-center group-hover:border-burgundy group-hover:bg-burgundy/5 transition-all duration-500 z-10">
                    <step.icon className="w-6 h-6 text-burgundy" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-charcoal mb-3">{step.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
