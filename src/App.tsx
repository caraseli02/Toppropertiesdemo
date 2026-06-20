import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bath,
  Bed,
  Building,
  Compass,
  MessageSquare,
  RefreshCw,
  Send,
  Sparkles,
  Square,
  TrendingUp,
  Waves,
} from "lucide-react";
import { cn } from "@/utils/cn";
import {
  DEFAULT_PROMPT,
  SUGGESTIONS,
  type Brief,
  type FollowUp,
  buildBrief,
  buildFollowUpResponse,
} from "@/app-data";

// ------------------------------------------------------------------
// Components
// ------------------------------------------------------------------

const TRADEOFF_ICONS = {
  building: Building,
  compass: Compass,
  "trending-up": TrendingUp,
  waves: Waves,
};

export default function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [submitted, setSubmitted] = useState(false);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [isHoveringSubmit, setIsHoveringSubmit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [prompt]);

  const handleSubmit = () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    if (!submitted) {
      setBrief(buildBrief());
      setSubmitted(true);
      setFollowUps([]);
    } else {
      const answer = buildFollowUpResponse(trimmed);
      setFollowUps((prev) => [...prev, { question: trimmed, answer }]);
    }

    // Keep the composer editable for follow-ups
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const applyNextQuestion = () => {
    if (!brief) return;
    setPrompt(brief.nextQuestion);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const resetWorkspace = () => {
    setSubmitted(false);
    setBrief(null);
    setFollowUps([]);
    setPrompt(DEFAULT_PROMPT);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-luxury">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-teal-600/8 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[0.625rem] bg-indigo-500/10 text-indigo-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-medium leading-none tracking-tight text-white">
                TopProperties
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Mallorca Private Office
              </span>
            </div>
          </div>
          {submitted && (
            <button
              onClick={resetWorkspace}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              New brief
            </button>
          )}
        </div>
      </header>

      {/* Main workspace */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-screen flex-col items-center justify-center px-6 pb-80 pt-32 text-center sm:pb-56"
            >
              <div className="mx-auto max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-300"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Agentic briefing
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl"
                >
                  Find your place
                  <br />
                  <span className="text-slate-400">in Mallorca</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
                >
                  Describe what home means to you. We’ll generate a curated brief of properties,
                  tradeoffs, and the one question that will move your search forward.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="mt-10 flex flex-wrap justify-center gap-3"
                >
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setPrompt(suggestion)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-400/30 hover:bg-white/10 hover:text-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="brief"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-6xl px-6 pb-96 pt-36 sm:pb-72"
            >
              {/* Brief header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  Generated property brief
                </div>
                <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-white md:text-5xl">
                  Your Mallorca brief
                </h2>
                <p className="mt-3 max-w-2xl text-slate-400">
                  Curated for “{prompt}”. Three directions, one tradeoff panel, and the next best
                  question to answer.
                </p>
              </motion.div>

              {/* Brief summary */}
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12 rounded-[8px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:p-10"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                  Brief summary
                </h3>
                <p className="mt-4 font-serif text-xl leading-relaxed text-slate-100 md:text-2xl">
                  {brief?.summary}
                </p>
              </motion.section>

              {/* Property recommendations */}
              <section className="mb-16">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Curated recommendations
                  </h3>
                  <span className="text-xs text-slate-500">3 properties</span>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {brief?.properties.map((property, index) => (
                    <motion.article
                      key={property.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                      className="group relative flex flex-col overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] transition hover:border-white/20"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.name}
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
                          <span className="whitespace-nowrap text-lg font-medium text-white">
                            {property.price}
                          </span>
                        </div>
                        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                          {property.why}
                        </p>
                        <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Bed className="h-4 w-4" />
                            {property.beds} beds
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bath className="h-4 w-4" />
                            {property.baths} baths
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Square className="h-4 w-4" />
                            {property.sqm} m²
                          </span>
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
                  ))}
                </div>
              </section>

              {/* Buyer tradeoff panel */}
              <section className="mb-16">
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Editorial tradeoff panel
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-slate-400">
                    Comparing the four buying dimensions that matter most in Mallorca: privacy, sea
                    access, Palma convenience, and investment confidence.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {brief?.tradeoffs.map((tradeoff, index) => (
                    <TradeoffCard key={tradeoff.label} tradeoff={tradeoff} index={index} />
                  ))}
                </div>
              </section>

              {/* Next best question */}
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
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-indigo-100">
                    {brief?.nextQuestion}
                  </p>
                  <button
                    onClick={applyNextQuestion}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-indigo-950 transition hover:bg-indigo-50"
                  >
                    Answer this question
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.section>

              {/* Follow-up responses */}
              {followUps.length > 0 && (
                <section className="mt-16">
                  <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                    Follow-up notes
                  </h3>
                  <div className="space-y-4">
                    {followUps.map((followUp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-[8px] border border-white/10 bg-white/[0.04] p-6"
                      >
                        <p className="text-xs text-slate-500">You asked: “{followUp.question}”</p>
                        <p className="mt-2 text-slate-200">{followUp.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Brief Composer */}
      <motion.div
        layout
        className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:w-[calc(100%-2rem)] md:bottom-8"
      >
        <div className="rounded-[8px] border border-white/10 bg-slate-900/85 shadow-2xl shadow-black/50 backdrop-blur-2xl">
          <div className="flex items-end gap-2 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.625rem] bg-indigo-500/10 text-indigo-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder="Describe the home you are looking for..."
              className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2.5 text-base leading-relaxed text-white placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            />
            <button
              onClick={handleSubmit}
              onMouseEnter={() => setIsHoveringSubmit(true)}
              onMouseLeave={() => setIsHoveringSubmit(false)}
              disabled={!prompt.trim()}
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.625rem] text-sm font-medium transition sm:w-auto sm:px-4",
                prompt.trim()
                  ? "bg-white text-slate-950 hover:bg-indigo-50"
                  : "cursor-not-allowed bg-white/10 text-slate-500",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="sr-only sm:not-sr-only">
                  {submitted ? "Send" : "Generate brief"}
                </span>
                {isHoveringSubmit || !submitted ? (
                  submitted ? <Send className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </span>
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-white/5 px-4 py-2.5">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-slate-500">
              Persistent Brief Composer
            </span>
            <span className="text-right text-[11px] text-slate-600">
              {submitted ? "Edit or ask a follow-up" : "Press ⌘ + Enter to submit"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TradeoffCard({
  tradeoff,
  index,
}: {
  tradeoff: NonNullable<Brief["tradeoffs"]>[number];
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
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
          {tradeoff.label}
        </span>
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
