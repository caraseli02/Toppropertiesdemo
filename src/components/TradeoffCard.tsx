import type { LucideIcon } from "lucide-react";
import { Building, Compass, TrendingUp, Waves } from "lucide-react";

export type TradeoffCardData = {
  label: string;
  icon: "building" | "compass" | "trending-up" | "waves";
  winner: string;
  verdict: string;
  note: string;
};

const TRADEOFF_ICONS: Record<TradeoffCardData["icon"], LucideIcon> = {
  building: Building,
  compass: Compass,
  "trending-up": TrendingUp,
  waves: Waves,
};

type TradeoffCardProps = {
  tradeoff: TradeoffCardData;
  className?: string;
};

export function TradeoffCard({ tradeoff, className }: TradeoffCardProps) {
  const Icon = TRADEOFF_ICONS[tradeoff.icon];

  return (
    <article
      className={[
        "flex flex-col gap-3 rounded-lg border border-border bg-card p-5 transition hover:border-border/80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex items-center gap-2.5">
        <div
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary"
        >
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {tradeoff.label}
        </span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-serif text-xl text-card-foreground">{tradeoff.winner}</span>
        <span className="w-fit rounded-full bg-muted px-3 py-1 text-[11px] font-semibold text-accent-foreground">
          {tradeoff.verdict}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{tradeoff.note}</p>
    </article>
  );
}
