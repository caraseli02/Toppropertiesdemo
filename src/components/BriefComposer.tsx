import type { KeyboardEvent } from "react";
import { useEffect, useRef } from "react";
import { ArrowRight, Send, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

type BriefComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  submitted?: boolean;
  placeholder?: string;
  exampleHint?: string;
  className?: string;
};

export function BriefComposer({
  value,
  onChange,
  onSubmit,
  submitted = false,
  placeholder = "find best options for home in Mallorca",
  exampleHint = "sea-view villa in Port d'Andratx",
  className,
}: BriefComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSubmit = value.trim().length > 0;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (canSubmit) onSubmit();
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-2xl shadow-black/50 backdrop-blur-2xl",
        className,
      )}
    >
      <div className="flex items-end gap-2 p-3">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder={placeholder}
          aria-label="Describe the home you are looking for"
          className="max-h-40 min-h-11 flex-1 resize-none bg-transparent px-2 py-2.5 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          aria-label={submitted ? "Send message" : "Generate property brief"}
          className={cn(
            "flex h-11 shrink-0 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition",
            canSubmit
              ? "bg-primary-foreground text-background hover:opacity-90"
              : "cursor-not-allowed bg-muted text-muted-foreground",
          )}
        >
          {submitted ? (
            <>
              <span className="hidden sm:inline">Send</span>
              <Send aria-hidden="true" className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Generate</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
          Persistent Brief Composer
        </span>
        <span className="text-right text-[10px] text-muted-foreground">{exampleHint}</span>
      </div>
    </div>
  );
}
