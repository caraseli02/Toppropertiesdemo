type BrandBadgeProps = {
  label: string;
  className?: string;
};

export function BrandBadge({ label }: BrandBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-foreground">
      {label}
    </span>
  );
}
