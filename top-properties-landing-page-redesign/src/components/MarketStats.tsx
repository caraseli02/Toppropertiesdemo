import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 247,
    suffix: "+",
    label: "Properties Sold",
    description: "In the last 12 months",
  },
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on post-sale surveys",
  },
  {
    icon: Globe,
    value: 32,
    suffix: "",
    label: "Global Markets",
    description: "Across 6 continents",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Years of Excellence",
    description: "Serving discerning clients",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplayValue(start);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif text-5xl sm:text-6xl text-charcoal">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function MarketStats() {
  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy-light font-semibold">
            Trust & Performance
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mt-3">Market Leadership</h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            Numbers that reflect our commitment to excellence and the trust our clients place in us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-burgundy/20 group-hover:border-burgundy/30 transition-all duration-500">
                <stat.icon className="w-6 h-6 text-burgundy-light" />
              </div>
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <h3 className="text-white font-semibold text-lg mt-3">{stat.label}</h3>
              <p className="text-white/40 text-sm mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
