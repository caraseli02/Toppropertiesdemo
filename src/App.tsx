import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import {
  DEFAULT_PROMPT,
  SUGGESTIONS,
  type Brief,
  type FollowUp,
  buildBrief,
  buildFollowUpResponse,
} from "@/app-data";
import { AppHeader } from "@/components/AppHeader";
import { BriefComposer } from "@/components/BriefComposer";
import { PropertyCard } from "@/components/PropertyCard";
import { SuggestionChip } from "@/components/SuggestionChip";
import { TradeoffCard } from "@/components/TradeoffCard";

export default function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [submitted, setSubmitted] = useState(false);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);

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
  };

  const applyNextQuestion = () => {
    if (!brief) return;
    setPrompt(brief.nextQuestion);
  };

  const resetWorkspace = () => {
    setSubmitted(false);
    setBrief(null);
    setFollowUps([]);
    setPrompt(DEFAULT_PROMPT);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-luxury">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <AppHeader showReset={submitted} onReset={resetWorkspace} />

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
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground"
                >
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                  Agentic briefing
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-foreground md:text-7xl"
                >
                  Find your place
                  <br />
                  <span className="text-muted-foreground">in Mallorca</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
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
                    <SuggestionChip
                      key={suggestion}
                      label={suggestion}
                      active={prompt === suggestion}
                      onClick={() => setPrompt(suggestion)}
                    />
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-accent-foreground">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                  Generated property brief
                </div>
                <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight text-foreground md:text-5xl">
                  Your Mallorca brief
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Curated for “{prompt}”. Three directions, one tradeoff panel, and the next best
                  question to answer.
                </p>
              </motion.div>

              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-12 rounded-lg border border-border bg-card/60 p-8 backdrop-blur-sm md:p-10"
              >
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  Brief summary
                </h3>
                <p className="mt-4 font-serif text-xl leading-relaxed text-foreground md:text-2xl">
                  {brief?.summary}
                </p>
              </motion.section>

              <section className="mb-16">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Curated recommendations
                  </h3>
                  <span className="text-xs text-muted-foreground">3 properties</span>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                  {brief?.properties.map((property, index) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="mb-16">
                <div className="mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Editorial tradeoff panel
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                    Comparing the four buying dimensions that matter most in Mallorca: privacy, sea
                    access, Palma convenience, and investment confidence.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {brief?.tradeoffs.map((tradeoff, index) => (
                    <motion.div
                      key={tradeoff.label}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.08 }}
                    >
                      <TradeoffCard tradeoff={tradeoff} />
                    </motion.div>
                  ))}
                </div>
              </section>

              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="relative overflow-hidden rounded-lg border border-primary/20 bg-card p-8 text-center backdrop-blur-md md:p-12"
              >
                <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-primary/20 blur-[80px]" />
                <div className="relative">
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground md:text-3xl">
                    Next best question
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    {brief?.nextQuestion}
                  </p>
                  <button
                    type="button"
                    onClick={applyNextQuestion}
                    className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
                  >
                    Answer this question
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </motion.section>

              {followUps.length > 0 && (
                <section className="mt-16">
                  <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Follow-up notes
                  </h3>
                  <div className="space-y-4">
                    {followUps.map((followUp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="rounded-lg border border-border bg-card/60 p-6"
                      >
                        <p className="text-xs text-muted-foreground">
                          You asked: “{followUp.question}”
                        </p>
                        <p className="mt-2 text-foreground">{followUp.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <motion.div
        layout
        className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-3xl -translate-x-1/2 pb-[env(safe-area-inset-bottom)] sm:bottom-6 sm:w-[calc(100%-2rem)] md:bottom-8"
      >
        <BriefComposer
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          submitted={submitted}
        />
      </motion.div>
    </div>
  );
}
