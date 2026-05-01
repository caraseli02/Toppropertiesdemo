# Top Properties

Luxury real estate browser with interactive maps, multi-currency pricing, and advanced filtering. Built with React 18, TypeScript, and Leaflet.

![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)

## Features

- **Interactive map** — Leaflet-powered map with clustered property markers and custom popups
- **Advanced filtering** — search by location, price range, property type, bedrooms, and amenities
- **Multi-currency support** — prices in EUR, GBP, CHF, USD, JPY, AED, AUD, CAD, SGD, ZAR with USD normalization
- **Property detail view** — image gallery, amenity tags, and full descriptions
- **Responsive design** — mobile-first layout with map/list view toggle

## Tech Stack

| Layer | Tech |
|---|---|
| UI | React 18, Lucide Icons, shadcn/ui components |
| Maps | Leaflet, react-leaflet |
| Styling | CSS modules, Tailwind utilities |
| Build | Vite 6, SWC |
| Types | TypeScript (union types for domain safety) |

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/           # shadcn/ui primitives
│   ├── figma/        # Figma-to-code utilities
│   ├── MapView.tsx   # Interactive Leaflet map
│   ├── PropertyCard.tsx
│   ├── PropertyDetail.tsx
│   ├── FilterModal.tsx
│   └── HeroSection.tsx
├── services/         # Pure business logic
│   ├── priceService.ts    # Multi-currency parsing & formatting
│   ├── filterService.ts   # Property filtering (pure functions)
│   └── xssService.ts      # HTML sanitization
├── data/             # Property dataset (30+ listings)
├── types/            # TypeScript domain types
└── hooks/            # Custom React hooks
```

## Key Design Decisions

- **Union types over enums** — `PropertyType` and `Amenity` use string literal unions for compile-time safety without runtime overhead
- **Pure filter functions** — `filterService.ts` exports stateless pure functions, separated from React for testability
- **DOM-based XSS escaping** — `xssService.ts` uses `textContent`/`innerHTML` roundtrip for safe rendering
- **`readonly` data** — property data uses `readonly` arrays to enforce immutability at the type level
