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
