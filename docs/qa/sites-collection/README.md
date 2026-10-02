# Sites collection verification — 2026-10-02

Feature `tp-005`, issue #79. Local preview: `http://127.0.0.1:3010/`. Desktop 1440×1000; mobile 375×812.

- Home: images loaded, no error overlay or horizontal overflow; search, destination links and saved homes exposed.
- Listings: Cap d’Antibes search returns Villa Azure; no-match state exercised with Tuscany while private-price homes are excluded. Destination links explicitly include private-price homes to agree with their counts.
- Detail: primary flow navigates to Villa Azure; next-photo control and saved-home panel work.
- Mobile: search navigates with query intact, matching results render; map view selects the home and opens its detail; no overflow on Home, Listings, Detail or map view.
- Browser runtime error list empty.
- Site `npm run verify`: 3 test files, 7 tests; check and production build passed. Root `npm run verify`: 2 test files, 4 tests; check and build passed.
- Inherited toolchain deprecation warnings are non-blocking. External photography and Google Fonts remain network-dependent. Map coordinates are illustrative, not geographical.

Screenshots: `desktop-home.png`, `desktop-listings.png`, `desktop-detail.png`, `mobile-home.png`, `mobile-listings.png`, `mobile-detail.png`.

The Sites publishing checkout is prepared separately from repository source to keep Git metadata independent. Source SHA: `346e5d8c01937ed08f0f80cc867aaa4bfd2566d2`.

Private publication succeeded: https://topproperties-collection-next.caraseli.chatgpt.site.
