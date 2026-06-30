import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProperty, getRelated } from "@/data/properties";
import { formatPrice, modeLabel } from "@/lib/filters";
import { PropertyCard } from "@/components/PropertyCard";
import {
  Badge,
  Container,
  Eyebrow,
  FavoriteButton,
  SectionHeading,
  buttonClasses,
} from "@/components/ui";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BathIcon,
  BedIcon,
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  KeyIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RulerIcon,
} from "@/components/icons";
import { cn } from "@/utils/cn";

const AGENTS: Record<string, { name: string; title: string; phone: string }> = {
  default: {
    name: "Isabella Moreau",
    title: "Private Client Advisor",
    phone: "+377 99 12 34 56",
  },
};

function ContactModal({
  open,
  onClose,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cream shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink transition hover:bg-white"
        >
          <CloseIcon className="text-lg" />
        </button>
        {submitted ? (
          <div className="px-7 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-burgundy-soft text-2xl text-burgundy">
              <CheckIcon />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-ink">Request received</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-ink-soft">
              Thank you. A private client advisor will be in touch within 24 hours to arrange a
              confidential conversation about this residence.
            </p>
            <button onClick={onClose} className={buttonClasses("primary", "md") + " mt-7"}>
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="px-7 py-7"
          >
            <Eyebrow>Private Enquiry</Eyebrow>
            <h3 className="mt-3 font-serif text-2xl text-ink">{title}</h3>
            <div className="mt-5 space-y-3">
              <input
                required
                placeholder="Full name"
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                />
                <input
                  placeholder="Phone"
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                />
              </div>
              <textarea
                rows={3}
                placeholder="I'd like to learn more about this residence…"
                className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
              />
            </div>
            <button type="submit" className={buttonClasses("primary", "lg") + " mt-5 w-full"}>
              Send private enquiry
            </button>
            <p className="mt-3 text-center text-[11px] text-ink-soft">
              Your details are handled with full discretion.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Fact({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy-soft text-lg text-burgundy">
        {icon}
      </span>
      <div>
        <p className="font-serif text-lg leading-none text-ink">{value}</p>
        <p className="mt-1 text-xs text-ink-soft">{label}</p>
      </div>
    </div>
  );
}

export function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const property = slug ? getProperty(slug) : undefined;
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!property) {
    return (
      <div className="pt-32">
        <Container className="py-24 text-center">
          <h1 className="font-serif text-4xl text-ink">Residence not found</h1>
          <p className="mt-3 text-ink-soft">This property may no longer be available.</p>
          <Link to="/listings" className={buttonClasses("primary", "md") + " mt-7"}>
            Browse residences
          </Link>
        </Container>
      </div>
    );
  }

  const related = getRelated(property, 3);
  const agent = AGENTS.default;
  const gallery = property.gallery;

  return (
    <div className="pt-20">
      <Container className="py-6">
        <nav className="flex items-center gap-1.5 text-sm text-ink-soft">
          <Link to="/" className="transition hover:text-burgundy">
            Home
          </Link>
          <ChevronRightIcon className="text-[13px]" />
          <Link to="/listings" className="transition hover:text-burgundy">
            Residences
          </Link>
          <ChevronRightIcon className="text-[13px]" />
          <span className="truncate text-ink">{property.title}</span>
        </nav>
      </Container>

      {/* Gallery */}
      <Container>
        <div className="overflow-hidden rounded-3xl border border-line bg-white">
          <div className="relative aspect-[16/11] sm:aspect-[21/9]">
            <img
              src={gallery[active]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <div className="flex flex-wrap gap-1.5">
                {property.featured && <Badge tone="gold">Featured</Badge>}
                {property.reserved && (
                  <Badge tone="reserved">
                    <KeyIcon className="text-[11px]" /> Trattativa Riservata
                  </Badge>
                )}
              </div>
              <FavoriteButton id={property.id} />
            </div>
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActive((a) => (a - 1 + gallery.length) % gallery.length)}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-ink backdrop-blur-sm transition hover:bg-cream"
                >
                  <ArrowLeftIcon className="text-lg" />
                </button>
                <button
                  onClick={() => setActive((a) => (a + 1) % gallery.length)}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/85 text-ink backdrop-blur-sm transition hover:bg-cream"
                >
                  <ArrowRightIcon className="text-lg" />
                </button>
              </>
            )}
            <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
              {active + 1} / {gallery.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 border-t border-line sm:grid-cols-6">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "relative aspect-[4/3] overflow-hidden transition",
                  active === i ? "ring-2 ring-inset ring-burgundy" : "opacity-70 hover:opacity-100",
                )}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Container>

      {/* Title + details */}
      <Container className="mt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <Eyebrow>
              {property.type} · {modeLabel(property.mode)}
            </Eyebrow>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
                  {property.title}
                </h1>
                <p className="mt-3 flex items-center gap-1.5 text-ink-soft">
                  <MapPinIcon className="text-base" /> {property.location}, {property.region},{" "}
                  {property.country}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-serif text-3xl text-burgundy sm:text-4xl">
                  {formatPrice(property)}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-ink-soft">
                  {modeLabel(property.mode)}
                </p>
              </div>
            </div>

            {/* Facts */}
            <div className="mt-8 grid grid-cols-2 gap-5 rounded-2xl border border-line bg-white p-6 sm:grid-cols-4">
              <Fact icon={<BedIcon />} value={String(property.beds)} label="Bedrooms" />
              <Fact icon={<BathIcon />} value={String(property.baths)} label="Bathrooms" />
              <Fact icon={<RulerIcon />} value={`${property.sqm} m²`} label="Interior" />
              <Fact icon={<KeyIcon />} value={String(property.year)} label="Year" />
            </div>

            {/* Overview */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl text-ink">Overview</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink">{property.overview}</p>
              <p className="mt-4 leading-relaxed text-ink-soft">{property.description}</p>
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {property.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-ink-soft"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Amenities */}
            <div className="mt-10">
              <h2 className="font-serif text-2xl text-ink">Amenities & Features</h2>
              <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-3 text-sm text-ink">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-burgundy-soft text-xs text-burgundy">
                      <CheckIcon />
                    </span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact card */}
          <aside className="lg:relative">
            <div className="lg:sticky lg:top-24 rounded-3xl border border-line bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy font-serif text-lg text-cream">
                  IM
                </span>
                <div>
                  <p className="font-medium text-ink">{agent.name}</p>
                  <p className="text-xs text-ink-soft">{agent.title}</p>
                </div>
              </div>

              <div className="my-5 h-px bg-line" />

              <p className="text-xs uppercase tracking-wider text-ink-soft">Guide price</p>
              <p className="mt-1 font-serif text-3xl text-ink">{formatPrice(property)}</p>
              <p className="mt-1 text-xs text-ink-soft">{modeLabel(property.mode)}</p>

              <div className="my-5 h-px bg-line" />

              <div className="space-y-2.5 text-sm">
                <Row label="Type" value={property.type} />
                <Row label="Bedrooms" value={String(property.beds)} />
                <Row label="Bathrooms" value={String(property.baths)} />
                <Row label="Interior" value={`${property.sqm} m²`} />
                <Row label="Location" value={property.location} />
              </div>

              <div className="mt-6 space-y-2.5">
                <button
                  onClick={() => setModalOpen(true)}
                  className={buttonClasses("primary", "lg") + " w-full"}
                >
                  <PhoneIcon className="text-base" /> Contact Agent
                </button>
                <button
                  onClick={() => setModalOpen(true)}
                  className={buttonClasses("outline", "lg") + " w-full"}
                >
                  Request Details
                </button>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                <a
                  href={`tel:${agent.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-ink-soft transition hover:text-burgundy"
                >
                  <PhoneIcon className="text-base" /> {agent.phone}
                </a>
                <a
                  href="mailto:private@topproperties.com"
                  className="inline-flex items-center gap-2 text-ink-soft transition hover:text-burgundy"
                >
                  <MailIcon className="text-base" /> Email
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Container className="mt-24">
          <SectionHeading eyebrow="Continue Exploring" title="You may also like" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Container>
      )}

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Enquire: ${property.title}`}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-ink-soft">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}

export default PropertyDetail;
