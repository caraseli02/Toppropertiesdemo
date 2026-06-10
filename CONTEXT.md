# Top Properties — Domain Glossary

Implementation-free: terms, meanings, and relationships only.

## Property Types

- **Villa** — Standalone luxury residence, typically with private grounds, pool, and outdoor living spaces. The primary listing type.
- **Penthouse** — Top-floor apartment in a premium building, usually featuring panoramic views, terraces, and high-end finishes.
- **Estate** — Large landholding with a main residence, often including guest houses, gardens, or agricultural land. Broader than villa.
- **Apartment** — High-end residential unit within a building. Differentiated from penthouse by floor position and scale.

## Locations

- **Mallorca** — Primary showcase market. Mediterranean island off Spain. Focus area for the demo.
- **Premium locations** — The demo showcases properties across multiple global destinations (coastal, urban, alpine). Location is a first-class filter axis.

## UI Primitives

- **Property Card** — The atomic browsing unit. Shows image, title, location, price, and key metadata. Supports featured badge and favorite toggle.
- **Hero Section** — Magazine-spread top banner with crossfading property photography, editorial heading, and CTA.
- **Filter Modal** — Full-screen overlay for search refinement: location, price range, type, bedrooms, amenities.
- **Property Detail** — Overlay showing full listing: image gallery, description, amenities, location, price, contact CTA.
- **Contact Modal** — Form for expressing interest in a property. Includes message field.
- **Map View** — Leaflet-based interactive map with clustered markers. Toggle with grid view.
- **Search Bar** — Inline search for text queries. Visible in the main browse view.
- **Featured Badge** — Burgundy pill (`bg-[#b10832]`) on property cards highlighting curated picks.
- **Curated Collections** — Grouped property presentations organized by theme or location.
- **Testimonials** — Customer quote section. Social proof element.
- **Final CTA** — Bottom call-to-action driving contact or inquiry.
- **Agency Spotlight** — Modal showcasing agent/agency details.

## Design System Concepts

- **Editorial luxury** — The creative north star. Magazine-spread aesthetics, not listing-site utility. Restrained palette, confident typography, generous whitespace.
- **Brand register** — Brand burgundy (#b10832) as the singular accent. Design IS the product.
- **Curated, not listed** — Properties feel hand-selected, not dumped from a database. Visual hierarchy reinforces this.
- **Mobile-first confidence** — Primary audience browses on phones between meetings. Desktop is secondary.
- **Emotional arc** — Journey from browsing → exploring → contacting should build desire at every step.
- **Fluid typography** — Hero heading uses `clamp()` for responsive editorial scale without breakpoints.
- **Blur-up loading** — Images load with blur filter, transition to sharp over 700ms.
- **Crossfade hero** — Hero background images cycle with 1000ms opacity transitions.

## Currency & Pricing

- **Multi-currency** — Prices displayed in EUR, GBP, CHF, USD, JPY, AED, AUD, CAD, SGD, ZAR.
- **USD normalization** — Internal base currency is USD; `priceService.ts` handles conversion and formatting.
- **Price band** — Range filter concept. Properties bucketed into price ranges for browsing.

## Map & Geolocation

- **Clustered markers** — Leaflet marker clusters to prevent visual overload at low zoom levels.
- **Custom popup** — Map marker popups showing property preview (image, title, price).
- **Map toggle** — Users switch between grid and map views. State persists during session.

## Filtering

- **Amenity** — Feature tag on a property (pool, garden, sea view, etc.). Typed as union literal, not enum.
- **Property type filter** — Filter by Villa / Penthouse / Estate / Apartment.
- **Bedroom count** — Numeric filter axis.
- **Location filter** — Geographic area or named destination.

## GenUI Concepts

- **Overlay navigation** — Property detail and contact open as overlays, not routes. Single-page pattern.
- **Sheet** — shadcn/ui slide-in panel used for mobile filter and navigation.
- **Dialog** — shadcn/ui modal primitive for contact form and confirmations.
- **Skeleton** — Loading state placeholder matching final layout structure.
