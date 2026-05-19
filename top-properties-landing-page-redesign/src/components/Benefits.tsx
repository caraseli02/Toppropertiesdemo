import { motion } from "framer-motion";
import { Shield, BarChart3, KeyRound, Compass, FileCheck, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "Every property is personally inspected and verified by our team of specialists before listing.",
    audience: "Buyers",
  },
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description:
      "Access exclusive market data, price trends, and investment forecasts for informed decisions.",
    audience: "Investors",
  },
  {
    icon: KeyRound,
    title: "Private Access",
    description:
      "Gain entry to off-market properties and pre-market listings not available anywhere else.",
    audience: "Buyers",
  },
  {
    icon: Compass,
    title: "Local Expertise",
    description:
      "Our network of local experts provides insider knowledge on neighborhoods, regulations, and opportunities.",
    audience: "Agents",
  },
  {
    icon: FileCheck,
    title: "Seamless Process",
    description:
      "From viewing to closing, our dedicated concierge team manages every detail of your transaction.",
    audience: "Buyers",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "A personal advisor assigned to you throughout your property journey, available around the clock.",
    audience: "Investors",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy font-semibold">
            Why Top Properties
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mt-3">
            Built for Excellence
          </h2>
          <p className="text-warm-gray mt-4 max-w-lg mx-auto">
            Whether you're buying, investing, or representing clients, we provide the tools and
            expertise you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="group bg-white rounded-2xl p-8 border border-border-light hover:border-burgundy/20 hover:shadow-lg transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center group-hover:bg-burgundy/10 transition-colors duration-500">
                  <benefit.icon className="w-6 h-6 text-burgundy" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-warm-gray bg-cream px-3 py-1 rounded-full">
                  {benefit.audience}
                </span>
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-burgundy transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
