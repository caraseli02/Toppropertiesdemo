import { motion } from "framer-motion";
import {
  Bath,
  Bed,
  Building,
  Compass,
  MessageSquare,
  Square,
  TrendingUp,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import type { BriefPropertyPrimitive, BriefTradeoffPrimitive, FollowUpPrimitive } from "@/app-data";

const TRADEOFF_ICONS = {
  building: Building,
  compass: Compass,
  "trending-up": TrendingUp,
  waves: Waves,
} as const;

const STAT_ICONS = {
  bed: Bed,
  bath: Bath,
  square: Square,
} as const;

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn("text-xs font-semibold uppercase tracking-[0.15em] text-slate-500", className)}
    >
      {children}
    </span>
  );
}

export function SuggestionPills({
  suggestions,
  onSelect,
}: {
  suggestions: readonly string[];
  onSelect: (suggestion: string) => void;
}) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-400/30 hover:bg-white/10 hover:text-white"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

export function SummaryPanel({ summary }: { summary: string }) {
  return (
    <section className="mb-12 rounded-[8px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-10">
      <SectionLabel>Brief summary</SectionLabel>
      <p className="mt-4 font-serif text-xl leading-relaxed text-slate-100 md:text-2xl">
        {summary}
      </p>
    </section>
  );
}

export function PropertyCard({
  property,
  index,
}: {
  property: BriefPropertyPrimitive;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] transition hover:border-white/20"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.alt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
          {property.location}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="font-serif text-2xl text-white">{property.name}</h4>
            <p className="mt-1 text-sm text-slate-400">{property.location}</p>
          </div>
          <span className="whitespace-nowrap text-lg font-medium text-white">{property.price}</span>
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">{property.why}</p>
        <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
          {property.stats.map((stat) => {
            const Icon = STAT_ICONS[stat.icon];
            return (
              <span key={`${property.id}-${stat.label}`} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4" />
                {stat.value}
              </span>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {property.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function TradeoffCard({
  tradeoff,
  index,
}: {
  tradeoff: BriefTradeoffPrimitive;
  index: number;
}) {
  const Icon = TRADEOFF_ICONS[tradeoff.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
      className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-white/20"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
          <Icon className="h-5 w-5" />
        </div>
        <SectionLabel>{tradeoff.label}</SectionLabel>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <span className="font-serif text-xl text-white">{tradeoff.winner}</span>
        <span className="rounded-full border border-indigo-300/15 bg-indigo-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-indigo-200">
          {tradeoff.verdict}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{tradeoff.note}</p>
    </motion.div>
  );
}

export function NextQuestionPanel({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="relative overflow-hidden rounded-[8px] border border-indigo-400/20 bg-indigo-950/30 p-8 text-center backdrop-blur-md md:p-12"
    >
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-[80px]" />
      <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-teal-500/10 blur-[80px]" />
      <div className="relative">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
          <MessageSquare className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-2xl text-white md:text-3xl">Next best question</h3>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-indigo-100">{question}</p>
        <button
          onClick={onAnswer}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-indigo-950 transition hover:bg-indigo-50"
        >
          Answer this question
        </button>
      </div>
    </motion.section>
  );
}

export function FollowUpCard({ followUp }: { followUp: FollowUpPrimitive }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
    >
      <p className="text-xs text-slate-500">You asked: “{followUp.question}”</p>
      <p className="mt-2 text-slate-200">{followUp.answer}</p>
    </motion.div>
  );
}
