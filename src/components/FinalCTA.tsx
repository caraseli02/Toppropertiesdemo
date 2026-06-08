import { motion } from "framer-motion";
import { ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FinalCTAProps {
  onScheduleViewing?: () => void;
}

export function FinalCTA({ onScheduleViewing }: FinalCTAProps) {
  return (
    <section id="contact" className="py-24 bg-charcoal relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Luxury interior"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/90" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-burgundy-light font-semibold">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mt-4 leading-tight">
            Your Next Chapter
            <span className="block text-white/80">Starts Here</span>
          </h2>
          <p className="text-white/50 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            Let our advisors curate a selection of properties tailored to your vision. Private
            viewings available worldwide.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("properties-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 bg-burgundy text-white rounded-full font-semibold text-base hover:bg-burgundy-dark transition-all duration-300 group cursor-pointer",
              )}
            >
              Explore Properties
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onScheduleViewing}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-full font-semibold text-base border border-white/15 hover:bg-white/10 transition-all duration-300 cursor-pointer",
              )}
            >
              <Calendar className="w-4 h-4" />
              Schedule a Private Viewing
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
