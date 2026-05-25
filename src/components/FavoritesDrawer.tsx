import { ChevronRight, Heart, MapPin, Trash2, Building2 } from "lucide-react";
import type { Property } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FavoritesDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  properties: readonly Property[];
  onSelectProperty: (property: Property) => void;
  onRemoveProperty: (propertyId: string) => void;
  onRequestViewing: () => void;
}

export function FavoritesDrawer({
  open,
  onOpenChange,
  properties,
  onSelectProperty,
  onRemoveProperty,
  onRequestViewing,
}: FavoritesDrawerProps) {
  const hasFavorites = properties.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex h-full w-full flex-col gap-0 overflow-hidden bg-white p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-[var(--border-default)] px-5 py-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-subtle)] text-[var(--brand)]">
                <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                  Saved portfolio
                </p>
                <SheetTitle className="font-display text-2xl text-charcoal">
                  Your shortlist
                </SheetTitle>
              </div>
            </div>
            <SheetClose
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full text-charcoal/70 hover:bg-[var(--brand-subtle)] hover:text-[var(--brand)]"
                />
              }
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close saved portfolio</span>
            </SheetClose>
          </div>
          <SheetDescription className="max-w-sm text-sm text-warm-gray">
            {hasFavorites
              ? `${properties.length} curated homes saved locally on this device.`
              : "Save homes you want to revisit. Your shortlist stays on this device until you clear it."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {hasFavorites ? (
            <div className="space-y-3">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="grid grid-cols-[88px_1fr_auto] gap-3 rounded-2xl border border-[var(--border-default)] bg-white p-3 shadow-sm transition-colors hover:border-[var(--brand)]/20"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProperty(property);
                      onOpenChange(false);
                    }}
                    className="relative overflow-hidden rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30"
                    aria-label={`View details for ${property.title}`}
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectProperty(property);
                      onOpenChange(false);
                    }}
                    className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/30 rounded-xl"
                  >
                    <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-warm-gray">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      Saved from the collection
                    </p>
                    <h3 className="line-clamp-2 font-display text-[17px] leading-tight text-charcoal">
                      {property.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-sm text-warm-gray">{property.location}</p>
                    <div className="mt-3 flex flex-wrap items-end justify-between gap-2">
                      <div>
                        <p className="text-[18px] font-semibold leading-none text-[var(--brand)]">
                          {property.price}
                        </p>
                        <p className="mt-1 text-xs text-warm-gray">
                          {property.beds} bd · {property.baths} ba · {property.sqft}
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveProperty(property.id)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] text-warm-gray transition-colors hover:border-[var(--brand)]/20 hover:bg-[var(--brand-subtle)] hover:text-[var(--brand)]",
                    )}
                    aria-label={`Remove ${property.title} from shortlist`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-full flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--border-default)] bg-[var(--muted)]/40 px-6 py-14 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--brand)] shadow-sm">
                <Building2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl text-charcoal">Nothing saved yet</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-warm-gray">
                Tap the heart on any property card or detail view to curate your private shortlist.
              </p>
              <Button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  document
                    .getElementById("properties-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-6 h-11 rounded-full bg-[var(--brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
              >
                Browse properties
              </Button>
            </div>
          )}
        </div>

        {hasFavorites && (
          <>
            <Separator />
            <SheetFooter className="border-t border-[var(--border-default)] bg-white px-5 py-5">
              <Button
                type="button"
                onClick={() => {
                  onRequestViewing();
                  onOpenChange(false);
                }}
                className="h-11 rounded-full bg-[var(--brand)] px-5 text-sm font-semibold text-white hover:bg-[var(--brand-dark)]"
              >
                Request private viewing
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                  document
                    .getElementById("properties-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-11 rounded-full border-[var(--border-default)] px-5 text-sm font-medium text-charcoal hover:bg-[var(--brand-subtle)]"
              >
                Back to listings
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
