# TopProperties — The Collection

Separate Sites version of the current three-page property discovery demo. The root app remains the baseline.

Run `vp install`, `vp dev`, and `npm run verify` in this directory. The Sites manifest serves the generated `build/` directory. Home, Listings and Property Detail use hash routes for portable static hosting.

Inventory, prices and photographs are illustrative. Enquiries are simulated and do not send or store details. Saved properties use device-local browser storage. External Pexels photography and Google Fonts require network access; system font fallbacks remain available.

Sites identity is in `.openai/hosting.json`. Use the Sites skill's publishing workflow to update the same private Site.
