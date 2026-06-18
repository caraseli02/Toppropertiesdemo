# TopProperties Context

## Glossary

### Agentic-native property webapp

A portfolio-grade property discovery demo that explores how a premium real-estate browsing experience could feel in the agentic-native era: generative UI, conversational guidance, dynamic comparison/exploration flows, and MCP-style app integrations.

This does **not** mean building a deep production marketplace backend or a broad agent platform. The refactor should stay mostly visual/product-led, with a small number of polished agentic moments that make the demo feel 2026-native.

V1 exclusions: booking/contact workflows, mortgage/financing calculators, user accounts/saved searches, real CRM, and real listing ingestion. The demo should spend complexity on the agentic Mallorca discovery moment, not production marketplace plumbing.

### Hero agentic moment

The primary demo moment is a Mallorca homes prompt such as: “find best options for home in Mallorca.” The app responds by generating dynamic UI sections — for example curated options, neighborhood/context cards, comparison panels, map/story views, and recommendation reasoning — instead of only returning a static filter result list.

The v1 demo scope is **only Mallorca luxury homes**. Other locations should not be part of the shipped v1 experience, except as optional future-expansion implication.

Primary user/persona: a luxury buyer/investor planning a move or second home in Mallorca. This persona justifies premium editorial UI, tradeoff comparison, neighborhood reasoning, and concierge-like agent behavior.

Primary MCP-style integration for v1: map/neighborhood intelligence. The agentic UI should bring Mallorca location context into generated views: areas, lifestyle fit, airport distance, schools/marinas/beaches, and investment/rental vibe. Calendar or messaging handoff can be secondary/future, not the core v1 integration.

Visual direction for the agentic UI should be resolved through a dedicated pencil/design pass before implementation. Current guardrail: the experience should not drift into a technical AI dashboard unless the design pass explicitly chooses that direction. Design pass card: `t_47af33ed`.

### Generated Property Brief

A generated-feeling editorial response to a buyer prompt that combines curated Mallorca property recommendations, recommendation reasoning, and a comparison or story panel. It is the canonical outcome of the hero agentic moment for v1.

_Avoid_: search results page, listing grid, filter results

### Next Best Question

A concise follow-up prompt suggestion that helps the buyer refine the Generated Property Brief without introducing filters or a separate search workflow. It should feel like a continuation of the agentic conversation.

_Avoid_: filter chip, search suggestion, marketing CTA

### Reasoned Curation

The agentic quality of explaining why specific Mallorca homes fit the buyer prompt, including inferred intent, recommendation rationale, and tradeoffs between options. It distinguishes a Generated Property Brief from a filtered listing grid.

_Avoid_: matching, filtering, ranking

### Buyer Tradeoff Panel

An editorial comparison section inside a Generated Property Brief that explains how shortlisted homes differ across buyer-relevant dimensions such as privacy, sea access, Palma convenience, and investment confidence. It uses qualitative judgments rather than numeric scores.

_Avoid_: comparison table, ranking table, scorecard

### Editorial Prompt Workspace

The focused pre-submit state for the hero agentic moment, centered on one buyer prompt and a clear compose action. It should establish TopProperties and Mallorca context without becoming a full marketplace homepage.

_Avoid_: landing page, search homepage, marketplace chrome

### Persistent Brief Composer

The bottom-centered prompt control that remains available before and after a Generated Property Brief is composed. It lets the buyer edit the original prompt or ask a follow-up without treating the brief as a dead-end result page.

_Avoid_: search bar, chat box, filter input

### Mobile Brief Flow

The 375px version of the hero agentic moment where the Generated Property Brief stacks vertically and keeps the Persistent Brief Composer available without covering the content. It must preserve summary confirmation, recommendation scanning, and follow-up entry.

_Avoid_: squeezed desktop layout, hidden composer, covered content

### Generative UI model

The app should start from a constrained set of polished UI primitives/components, similar in spirit to shadcn primitives, and give the AI/agent layer the ability to compose those primitives into generated views on the fly. The goal is not arbitrary code generation in the browser; it is controlled component composition that feels generative while staying visually coherent and safe.

Target implementation stack is not fixed. Use whichever stack best supports the generative UI goal. Nuxt/Vue remains an option, but should not be treated as settled if React/shadcn or another approach is materially better for AI-composed UI.

Existing React/shadcn PR work should be preserved as reference only, not as the implementation baseline. Review it for visual ideas, component anatomy, accessibility fixes, and interaction patterns worth carrying into the new component grammar.

Open decision: whether the first shipped demo requires true runtime AI composition, a scripted flow that behaves like runtime generation, or a hybrid with optional live AI mode. This is a deep design/architecture question to clarify later before implementation microtasks. It has a dedicated spike card: `t_c45c9064`.
