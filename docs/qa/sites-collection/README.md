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

## Search alignment follow-up

User screenshot identified a taller price field and displaced buttons. Location, price slider, property type, Search and Filters now have identical 48px height and 12px corner radius. At 1440px all five control tops measure 757.546875px. Price endpoints are secondary text beneath the slider; the filter-drawer slider retains its existing summary. At 375px all control heights remain 48px, no horizontal overflow, and search navigates to the matching Cap d’Antibes result. Browser errors empty. Screenshots: `search-aligned-desktop.png`, `search-aligned-mobile.png`. Root and Site `npm run verify` passed (4 and 7 tests). Private republication succeeded; source SHA `a9734d6c81ade261b6feb8b6f54bf442fbd36833`.

## Three.js villa concept (`tp-006`, issue #81)

Screenshots: `villa-desktop.png`, `villa-aerial.png`, `villa-mobile.png`, `villa-fallback.png`. Procedural villa is a labeled architectural concept. Terrace/garden/aerial views, camera pause and keyboard daylight adjustment verified. At 375px active preview is 464px high with a 328px canvas, no horizontal overflow. A conflicting mobile photo-height rule was caught and corrected. Reduced-motion starts static with motion disabled. Forced WebGL context loss returns to the photo; returning to Photo removes the canvas. Instrumented requestAnimationFrame count grew to 54 in view, then settled at 66 and stayed at 66 after scrolling offscreen. Browser errors empty on normal flow.

Root verification: 4 tests; Site verification: 11 tests, format/lint/types and build passed. Build: 915.63 KB / 247.94 KB gzip. Source SHA `883fbf562559735fbab90bc5505c3287d815bf5a`; private deployment succeeded. Review PR #80.

Final compatibility pass uses supported PCFShadowMap directly, matching the renderer’s earlier fallback. Site verification rerun: 11 tests, check and build passed; final private republication succeeded.
