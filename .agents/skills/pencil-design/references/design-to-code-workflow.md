# Design-to-Code Workflow

## Overview

Pencil enables a two-way sync between design and code. This reference covers the complete workflow for generating clean, production-ready React + Tailwind v4 code from Pencil designs.

**Target stack**: React, TypeScript, Tailwind CSS v4, existing project primitives, Lucide icons, and Framer Motion when useful.

## Step 1: Read Local Product and Design Context

**MANDATORY.** Before any design or code generation work, read the repo's local product/design context. This provides:

- Aesthetic direction: bold, intentional design choices, not generic AI output
- Typography guidelines: distinctive font pairings, not overused defaults
- Color and theme guidelines: cohesive palettes with dominant colors and sharp accents
- Motion and animation: purposeful transitions and micro-interactions
- Spatial composition: unexpected layouts, asymmetry, generous negative space

Read at minimum `CONTEXT.md`, `src/index.css`, and the relevant files in `src/components/`. Apply this context both when designing in Pencil and when translating the design to code. The generated code should feel designed, not just mechanically translated from a node tree.

## Step 2: Read Design Guidelines

Before generating any code, call the relevant Pencil guidelines:

```
pencil_get_guidelines({ topic: "code" })
pencil_get_guidelines({ topic: "tailwind" })
```

These return the specific rules for translating .pen design properties into code.

## Step 3: Read Design Tokens

```
pencil_get_variables({ filePath: "path/to/file.pen" })
```

Map every Pencil variable to its Tailwind v4 `@theme` declaration and utility class. See [variables-and-tokens.md](variables-and-tokens.md) for the full mapping table.

Key principle: **Pencil variable names map 1:1 to Tailwind semantic utilities.** No arbitrary values.

| Pencil Variable | `@theme` Declaration | Utility Class |
|----------------|---------------------|---------------|
| `primary` | `--color-primary` | `bg-primary` / `text-primary` |
| `primary-foreground` | `--color-primary-foreground` | `text-primary-foreground` |
| `background` | `--color-background` | `bg-background` |
| `foreground` | `--color-foreground` | `text-foreground` |
| `border` | `--color-border` | `border-border` |
| `radius-md` | `--radius-md` | `rounded-md` |
| `muted` | `--color-muted` | `bg-muted` |
| `muted-foreground` | `--color-muted-foreground` | `text-muted-foreground` |

## Step 4: Read the Design Tree

```
pencil_batch_get({
  filePath: "path/to/file.pen",
  nodeIds: ["screenId"],
  readDepth: 5
})
```

Use sufficient `readDepth` to see the full structure. For complex screens, you may need to read specific subtrees separately.

## Step 5: Map Design Components to Project React Primitives

Identify reusable components (`reusable: true` nodes) and map them to existing project React primitives:

```
pencil_batch_get({
  filePath: "path/to/file.pen",
  patterns: [{ reusable: true }],
  readDepth: 3
})
```

### Pencil-to-React Component Mapping

| Pencil Component Name | Project component strategy | Import |
|----------------------|--------------------|----|
| Button / Btn | Existing button markup or a new local primitive only when repeated | `src/components/*` |
| Card / Tile / Panel | Existing card-like primitives | `@/components/PropertyCard`, `@/components/TradeoffCard` |
| Input / TextField | Existing prompt/composer primitive | `@/components/BriefComposer` |
| Badge / Tag / Chip | Existing badge/chip primitives | `@/components/BrandBadge`, `@/components/SuggestionChip` |
| Dialog / Modal / Tabs / Table | Add a local component only if the feature needs it | `src/components/*` |

If a Pencil component has no project equivalent, create a small custom component following local conventions: TypeScript props, `className` composition, `cn()` where useful, semantic Tailwind classes, and React 19 style. Do not install shadcn/ui unless the user explicitly asks for that dependency and a durable decision is recorded.

Instances (`ref` nodes) become usages of these components with their overridden props.

## Step 6: Generate Code

### CSS Setup (app.css / globals.css)

Generate the `@theme` block from Pencil design tokens. Use the `--color-*` namespace for colors and `--radius-*` for border radii so Tailwind auto-generates semantic utilities:

```css
@import "tailwindcss";

@theme {
  /* Colors from Pencil variables */
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(14.5% 0.025 264);
  --color-primary: oklch(14.5% 0.025 264);
  --color-primary-foreground: oklch(98% 0.01 264);
  --color-secondary: oklch(96% 0.01 264);
  --color-secondary-foreground: oklch(14.5% 0.025 264);
  --color-muted: oklch(96% 0.01 264);
  --color-muted-foreground: oklch(46% 0.02 264);
  --color-accent: oklch(96% 0.01 264);
  --color-accent-foreground: oklch(14.5% 0.025 264);
  --color-destructive: oklch(53% 0.22 27);
  --color-destructive-foreground: oklch(98% 0.01 264);
  --color-card: oklch(100% 0 0);
  --color-card-foreground: oklch(14.5% 0.025 264);
  --color-border: oklch(91% 0.01 264);
  --color-ring: oklch(14.5% 0.025 264);

  /* Radius from Pencil variables */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
}

/* Dark mode */
@custom-variant dark (&:where(.dark, .dark *));

.dark {
  --color-background: oklch(14.5% 0.025 264);
  --color-foreground: oklch(98% 0.01 264);
  /* ... other dark overrides from Pencil theme variables */
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

**Key rules for `@theme` block:**
- Colors MUST use the `--color-*` prefix so Tailwind generates `bg-*`, `text-*`, `border-*` utilities
- Radius MUST use the `--radius-*` prefix so Tailwind generates `rounded-*` utilities
- Prefer OKLCH color format for better perceptual uniformity
- If the Pencil file has hex values, convert them to OKLCH

### Component Code

For repeated reusable Pencil components, generate a typed local component using semantic Tailwind classes and `cn()` when class merging is needed:

```tsx
// components/ui/status-badge.tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
  {
    variants: {
      status: {
        active: "bg-primary text-primary-foreground",
        inactive: "bg-muted text-muted-foreground",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      status: "active",
    },
  }
)

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status, className }))} {...props} />
  )
}
```

Notice:
- All colors use semantic Tailwind classes (`bg-primary`, `text-muted-foreground`)
- All radii use semantic classes (`rounded-md`)
- No arbitrary values anywhere
- Uses `cn()` from `@/lib/utils` for class merging
- React 19 style

### Page/Screen Code

For the screen layout, generate a page component that:
- Imports project components matching the Pencil design system components
- Uses semantic Tailwind classes for all style values
- Matches the Pencil node tree structure (vertical/horizontal → flex-col/flex-row)

```tsx
// app/dashboard/page.tsx
import { ArrowRight } from "lucide-react"
import { BriefComposer } from "@/components/BriefComposer"
import { PropertyCard } from "@/components/PropertyCard"
import { TradeoffCard } from "@/components/TradeoffCard"
import { buildBrief } from "@/app-data"

export default function MallorcaBriefPreview() {
  const brief = buildBrief()

  return (
    <div className="min-h-screen bg-background px-6 py-12 text-foreground">
      <main className="mx-auto max-w-6xl">
        <section className="rounded-lg border border-border bg-card/60 p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Generated property brief
          </p>
          <h1 className="mt-3 font-serif text-4xl">Your Mallorca brief</h1>
          <p className="mt-4 text-muted-foreground">{brief.summary}</p>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {brief.properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {brief.tradeoffs.map((tradeoff) => (
            <TradeoffCard key={tradeoff.label} tradeoff={tradeoff} />
          ))}
        </div>

        <BriefComposer
          value={brief.nextQuestion}
          onChange={() => undefined}
          onSubmit={() => undefined}
          submitted
        />
      </main>
    </div>
  )
}
```

## Step 7: Sync Variables Back (Optional)

If the design tokens were updated in code, sync them back:

```
pencil_set_variables({
  filePath: "path/to/file.pen",
  variables: { ... }
})
```

## Responsive Code from Multi-Artboard Designs

If the Pencil file has artboards at multiple widths (e.g., 375px mobile, 768px tablet, 1280px desktop):

1. Read all artboards and compare their structures
2. Generate mobile-first code (base styles match the smallest artboard)
3. Add Tailwind breakpoint prefixes (`md:`, `lg:`, `xl:`) for larger layouts
4. Never hardcode artboard pixel widths — use `w-full`, `max-w-7xl`, responsive grid columns

See [responsive-breakpoints.md](responsive-breakpoints.md) for the complete artboard-to-breakpoint mapping, responsive patterns, and anti-patterns.

## Code Generation Rules

### Layout Mapping (Pencil -> Tailwind)

| Pencil Property | Tailwind Class |
|----------------|----------------|
| `layout: "vertical"` | `flex flex-col` |
| `layout: "horizontal"` | `flex flex-row` or `flex` |
| `gap: 4` | `gap-1` |
| `gap: 8` | `gap-2` |
| `gap: 12` | `gap-3` |
| `gap: 16` | `gap-4` |
| `gap: 20` | `gap-5` |
| `gap: 24` | `gap-6` |
| `gap: 32` | `gap-8` |
| `padding: 8` | `p-2` |
| `padding: 12` | `p-3` |
| `padding: 16` | `p-4` |
| `padding: 20` | `p-5` |
| `padding: 24` | `p-6` |
| `padding: 32` | `p-8` |
| `paddingLeft: 16, paddingRight: 16` | `px-4` |
| `paddingTop: 24, paddingBottom: 24` | `py-6` |
| `width: "fill_container"` | `w-full` or `flex-1` |
| `height: "fill_container"` | `h-full` or `flex-1` |
| `cornerRadius` (via `radius-md` var) | `rounded-md` |
| `alignItems: "center"` | `items-center` |
| `alignItems: "start"` | `items-start` |
| `alignItems: "end"` | `items-end` |
| `justifyContent: "center"` | `justify-center` |
| `justifyContent: "space-between"` | `justify-between` |
| `justifyContent: "end"` | `justify-end` |

### Typography Mapping (Pencil -> Tailwind)

| Pencil Property | Tailwind Class |
|----------------|----------------|
| `fontSize: 12` | `text-xs` |
| `fontSize: 14` | `text-sm` |
| `fontSize: 16` | `text-base` |
| `fontSize: 18` | `text-lg` |
| `fontSize: 20` | `text-xl` |
| `fontSize: 24` | `text-2xl` |
| `fontSize: 30` | `text-3xl` |
| `fontSize: 36` | `text-4xl` |
| `fontSize: 48` | `text-5xl` |
| `fontWeight: "400"` | `font-normal` |
| `fontWeight: "500"` | `font-medium` |
| `fontWeight: "600"` | `font-semibold` |
| `fontWeight: "700"` | `font-bold` |

See [tailwind-shadcn-mapping.md](tailwind-shadcn-mapping.md) for the legacy quick-reference table including layout, color, radius, typography, and icon mappings.

### Color Mapping (Pencil -> Tailwind)

| Pencil Style | Tailwind Class |
|-------------|----------------|
| `fill` bound to `primary` | `bg-primary` |
| `fill` bound to `background` | `bg-background` |
| `fill` bound to `card` | `bg-card` |
| `textColor` bound to `foreground` | `text-foreground` |
| `textColor` bound to `muted-foreground` | `text-muted-foreground` |
| `textColor` bound to `primary-foreground` | `text-primary-foreground` |
| `strokeColor` bound to `border` | `border-border` |

### Always Do

- Read local product/design context and apply it to the generated code
- Use semantic Tailwind utilities (`bg-primary`, `text-foreground`, `rounded-lg`)
- Map Pencil reusable components to local React primitives where a match exists
- Create small typed custom components only when repetition justifies it
- Use `cn()` from `@/lib/utils` for conditional class merging
- Use Lucide icons instead of Pencil's Material Icons (see icon mapping below)
- Use `@theme { --color-* }` for color tokens, `@theme { --radius-* }` for radii
- Map `ref` instances to component usages with the appropriate variant/size props
- Generate TypeScript (not JavaScript)
- Use React 19 patterns

### Never Do

- Use arbitrary value syntax: `bg-[#3b82f6]`, `text-[var(--primary)]`, `rounded-[6px]`
- Use `var(--primary)` in className strings
- Hardcode hex colors or pixel radii in class names
- Inline all styles when a project component exists
- Ignore the component hierarchy from the design tree
- Generate a single monolithic file for a multi-component screen
- Use `tailwind.config.ts` (Tailwind v4 uses CSS `@theme`)
- Use `@tailwind base/components/utilities` (v4 uses `@import "tailwindcss"`)
- Skip local product/design context; it is mandatory for both design and code generation
- Produce generic AI aesthetics (overused fonts, cliched color schemes, predictable layouts)

## Icon Library Mapping

Pencil uses Material Icons by default. Map them to Lucide icons:

| Pencil Icon (Material) | Lucide Import | Component |
|------------------------|---------------|-----------|
| `search` | `lucide-react` | `<Search />` |
| `close` | `lucide-react` | `<X />` |
| `menu` | `lucide-react` | `<Menu />` |
| `arrow_forward` | `lucide-react` | `<ArrowRight />` |
| `arrow_back` | `lucide-react` | `<ArrowLeft />` |
| `person` | `lucide-react` | `<User />` |
| `settings` | `lucide-react` | `<Settings />` |
| `home` | `lucide-react` | `<Home />` |
| `notifications` | `lucide-react` | `<Bell />` |
| `edit` | `lucide-react` | `<Pencil />` |
| `delete` | `lucide-react` | `<Trash2 />` |
| `add` | `lucide-react` | `<Plus />` |
| `check` | `lucide-react` | `<Check />` |
| `visibility` | `lucide-react` | `<Eye />` |
| `visibility_off` | `lucide-react` | `<EyeOff />` |
| `chevron_right` | `lucide-react` | `<ChevronRight />` |
| `chevron_down` | `lucide-react` | `<ChevronDown />` |
| `more_vert` | `lucide-react` | `<MoreVertical />` |
| `more_horiz` | `lucide-react` | `<MoreHorizontal />` |
| `mail` | `lucide-react` | `<Mail />` |
| `calendar_today` | `lucide-react` | `<Calendar />` |
| `favorite` | `lucide-react` | `<Heart />` |
| `star` | `lucide-react` | `<Star />` |
| `download` | `lucide-react` | `<Download />` |
| `upload` | `lucide-react` | `<Upload />` |
| `filter_list` | `lucide-react` | `<Filter />` |
| `sort` | `lucide-react` | `<ArrowUpDown />` |
| `logout` | `lucide-react` | `<LogOut />` |

All Lucide icons accept a `className` prop for sizing: `<Search className="size-4" />`.

## Utility Setup

Ensure `lib/utils.ts` exists:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
