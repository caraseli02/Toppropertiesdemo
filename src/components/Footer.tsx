import { Link } from "react-router-dom";
import { Container } from "@/components/ui";
import { ArrowRightIcon, MailIcon, PhoneIcon } from "@/components/icons";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Buy", to: "/listings?mode=sale" },
      { label: "Rent", to: "/listings?mode=long-rent" },
      { label: "New Developments", to: "/listings?tags=New Development" },
      { label: "All Residences", to: "/listings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/" },
      { label: "Our Experts", to: "/" },
      { label: "Press", to: "/" },
      { label: "Careers", to: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
      { label: "Cookies", to: "/" },
      { label: "Imprint", to: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream-2">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <Link to="/" className="font-serif text-2xl tracking-tight text-ink">
              TOP <span className="text-burgundy">PROPERTIES</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              A private collection of extraordinary residences across the world's finest
              destinations — represented with discretion and care.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-sm items-center gap-2"
            >
              <div className="relative flex-1">
                <MailIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-base text-ink-soft" />
                <input
                  type="email"
                  placeholder="Email for new listings"
                  className="w-full rounded-full border border-line bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-burgundy focus:ring-2 focus:ring-burgundy/15"
                />
              </div>
              <button
                aria-label="Subscribe"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-burgundy text-cream transition hover:bg-burgundy-dark"
              >
                <ArrowRightIcon className="text-lg" />
              </button>
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-soft">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-ink transition hover:text-burgundy">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Top Properties. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <PhoneIcon className="text-base" /> +377 99 00 00 00
            </span>
            <span className="inline-flex items-center gap-2">
              <MailIcon className="text-base" /> private@topproperties.com
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
