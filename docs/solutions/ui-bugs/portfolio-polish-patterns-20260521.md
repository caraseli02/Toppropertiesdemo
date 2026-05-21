# Portfolio polish patterns — 2026-05-21

## Fixed issues

- **Broken collection imagery**
  - Symptom: one collection looked empty/broken while nearby listing images lazy-loaded correctly.
  - Pattern: separate true broken images from lazy loading with `naturalWidth` checks before changing data.
  - Fix: replaced the 404 Mountain Retreats Unsplash URL with a verified loading image.

- **Repeated primary listing images**
  - Symptom: unrelated properties shared the same hero image, reducing catalog credibility.
  - Pattern: audit primary listing images for uniqueness, not just galleries.
  - Fix: reassigned duplicate primary images so each property card has a distinct visual identity.

- **CTA collision at the top of the page**
  - Symptom: header and hero both said `Explore Properties`.
  - Pattern: one primary action per viewport; secondary nav actions should have a different job.
  - Fix: changed the header CTA to `Client Portal` and kept hero exploration as the main discovery CTA.

- **Underpowered map mode**
  - Symptom: map felt decorative because it was short, lacked visible zoom controls, and marker hovers had no property context.
  - Pattern: feature modes need their own usable surface area and persistent selected context.
  - Fix: made map taller, added visible zoom controls, and added a selected-property preview card.

- **Noisy multi-currency comparisons**
  - Symptom: global listings used many currencies with no normalized comparison.
  - Pattern: preserve local pricing, but add a normalized helper line for scanning.
  - Fix: centralized USD conversion in `priceService` and renders `≈ $XM USD` on cards.

- **Mobile menu layering**
  - Symptom: forced mobile menu preview had no obvious close affordance and weak modal semantics.
  - Pattern: overlays need an explicit close control, scroll lock, dialog semantics, and a full-surface layer.
  - Fix: added close button, body scroll lock, and dialog attributes.

- **Portal/detail modal stacking**
  - Symptom: portal and property detail UI could visually coexist during exploratory testing.
  - Pattern: opening a global modal should close competing modal/detail layers first.
  - Fix: centralized client portal opening to clear property/detail/search/filter/legal/about overlays before showing login.

- **Footer trust details**
  - Symptom: Barcelona address paired with demo/US contact data.
  - Pattern: location, phone, and email should tell the same story, even in demos.
  - Fix: changed contact details to Barcelona-aligned phone/email.

## New problem to review next

- **Bundle size warning remains**
  - `vp build` passes, but Vite still warns that the main JS chunk is over 500 kB.
  - Likely cause: map/Leaflet and modal-heavy UI are bundled into the first-load path.
  - Suggested next pattern: lazy-load heavy feature surfaces like map view and property detail/gallery modals with `React.lazy`/dynamic imports so portfolio first load stays lean.
