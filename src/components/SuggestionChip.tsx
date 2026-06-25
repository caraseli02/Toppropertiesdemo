import { cn } from "@/utils/cn";

type SuggestionChipProps = {
  label: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
};

export function SuggestionChip({ label, onClick, active, className }: SuggestionChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-muted",
        className,
      )}
    >
      {label}
    </button>
  );
}
