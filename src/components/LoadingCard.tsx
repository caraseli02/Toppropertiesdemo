import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LoadingCard() {
  return (
    <Card
      className={cn(
        "bg-white rounded-[8px] overflow-hidden border border-[var(--border-default)]"
      )}
    >
      <Skeleton className="h-[200px] rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-3 py-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </Card>
  );
}
