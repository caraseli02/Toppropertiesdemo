import { RefreshCw, Sparkles } from "lucide-react";

type AppHeaderProps = {
  showReset?: boolean;
  onReset?: () => void;
};

export function AppHeader({ showReset, onReset }: AppHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/15 text-accent"
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-medium leading-none tracking-tight text-foreground">
              TopProperties
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Mallorca Private Office
            </span>
          </div>
        </div>
        {showReset && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
            New brief
          </button>
        )}
      </div>
    </header>
  );
}
