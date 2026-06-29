# TopProperties Pencil Rule Template

Use this template when creating a TopProperties-specific Pencil design/code rule document.

## Pencil MCP Flow

1. Confirm the active `.pen` file and schema with `get_editor_state(include_schema: true)`.
2. Read top-level document structure with `batch_get`.
3. Discover reusable components with `batch_get({ patterns: [{ reusable: true }], readDepth: 2 })`.
4. Read design variables with `get_variables`.
5. Load relevant guidelines with `get_guidelines`; use code and Tailwind guidance for implementation work.
6. For screen work, build section by section with `batch_design`.
7. Validate each completed section with `snapshot_layout(problemsOnly: true)` and `get_screenshot`.
8. For code translation, optionally run `export_html` and compare against React/Tailwind conventions.

## Codebase Conventions

- React 19 + TypeScript.
- Tailwind CSS v4 via CSS `@theme` in `src/index.css`.
- Existing UI components live in `src/components/`.
- Static Mallorca brief data lives in `src/app-data.tsx`.
- Utility class merging uses `src/utils/cn.ts`.
- Icons come from `lucide-react`.
- Motion uses Framer Motion only where it improves the generated-brief feel.

## Token Rules

- Use semantic utilities such as `bg-primary`, `text-muted-foreground`, `border-border`, `rounded-md`, and `font-serif`.
- Do not use arbitrary Tailwind values for colors, radii, or type when an existing token exists.
- Keep Pencil variables aligned with `src/index.css` token names when updating design or code.

## Product Rules

- V1 is Mallorca luxury homes only.
- The primary persona is a luxury buyer/investor planning a move or second home.
- The hero output is a Generated Property Brief, not a generic search results page.
- Include curated properties, reasoned curation, tradeoff/story panels, and map/neighborhood intelligence when in scope.
- Do not add accounts, booking/contact flows, mortgage calculators, CRM, real ingestion, or broad agent infrastructure.

## Acceptance Rules

- No Pencil design work is accepted without screenshot and layout-problem evidence.
- No code translation is accepted without `vp test`, `vp check`, and `vp build`.
- UI work also needs runtime/browser evidence at desktop and 375px mobile.
