import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { useFavorites } from "@/context/FavoritesContext";
import { HeartFilledIcon, HeartIcon } from "@/components/icons";
import { PRICE_MAX, PRICE_MIN, formatCompact } from "@/lib/filters";

/* ---------------- Layout ---------------- */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-burgundy",
        className,
      )}
    >
      <span className="h-px w-6 bg-burgundy/50" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
      )}
      <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-soft">{description}</p>}
    </div>
  );
}

/* ---------------- Buttons ---------------- */

type Variant = "primary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-burgundy text-cream hover:bg-burgundy-dark shadow-sm shadow-burgundy/20",
  outline: "border border-line bg-white text-ink hover:border-burgundy hover:text-burgundy",
  ghost: "text-ink hover:bg-sand",
  dark: "bg-ink text-cream hover:bg-black",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-[0.95rem] py-3.5",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/40 disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button className={cn(buttonClasses(variant, size), className)} {...props}>
      {children}
    </button>
  );
}

/* ---------------- Badges & Pills ---------------- */

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "burgundy" | "reserved" | "gold";
  className?: string;
}) {
  const tones = {
    default: "bg-cream/90 text-ink backdrop-blur-sm",
    burgundy: "bg-burgundy text-cream",
    reserved: "bg-cream/90 text-burgundy-dark backdrop-blur-sm ring-1 ring-burgundy/30",
    gold: "bg-gold/15 text-[#7a5e2b] ring-1 ring-gold/40",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Pill({
  active,
  onClick,
  children,
  className,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-200",
        active
          ? "border-burgundy bg-burgundy text-cream"
          : "border-line bg-white text-ink-soft hover:border-burgundy/50 hover:text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ---------------- Toggle ---------------- */

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 text-left"
    >
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint && <span className="block text-xs text-ink-soft">{hint}</span>}
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-burgundy" : "bg-sand-deep",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200",
            checked ? "left-[22px]" : "left-0.5",
          )}
        />
      </span>
    </button>
  );
}

/* ---------------- Favorite button ---------------- */

export function FavoriteButton({ id, className }: { id: string; className?: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(id);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Save to favorites"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-sm transition hover:scale-110 hover:bg-white",
        active && "text-burgundy",
        className,
      )}
    >
      {active ? <HeartFilledIcon className="text-[18px]" /> : <HeartIcon className="text-[18px]" />}
    </button>
  );
}

/* ---------------- Dual range slider ---------------- */

export function DualRangeSlider({
  valueMin,
  valueMax,
  onChange,
}: {
  valueMin: number;
  valueMax: number;
  onChange: (min: number, max: number) => void;
}) {
  const range = PRICE_MAX - PRICE_MIN;
  const step = 250000;
  const pctMin = ((valueMin - PRICE_MIN) / range) * 100;
  const pctMax = ((valueMax - PRICE_MIN) / range) * 100;

  return (
    <div>
      <div className="relative h-6">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-sand-deep" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-burgundy"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={step}
          value={valueMin}
          onChange={(e) => onChange(Math.min(Number(e.target.value), valueMax - step), valueMax)}
          className="dual-range"
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={step}
          value={valueMax}
          onChange={(e) => onChange(valueMin, Math.max(Number(e.target.value), valueMin + step))}
          className="dual-range"
          aria-label="Maximum price"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink">
          {valueMin <= PRICE_MIN ? "No min" : formatCompact(valueMin)}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-ink-soft">Price range</span>
        <span className="rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink">
          {valueMax >= PRICE_MAX ? "€40M+" : formatCompact(valueMax)}
        </span>
      </div>
    </div>
  );
}
