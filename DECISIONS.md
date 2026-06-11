# Decisions

Record durable decisions here with the reason and the main alternatives considered.

## 2026-06-11 — Keep the current app stack

Decision: keep the repo on React 18 + TypeScript 6 + Vite+ (`vp`) + Tailwind v4 + shadcn/ui + Leaflet.

Reason: the existing app already boots, tests, and builds on this stack, and the harness docs need a stable baseline rather than a mid-stream rewrite.

Rejected alternatives:

- Replacing the app with a plain HTML/CSS/JS scaffold.
- Swapping the build tool away from Vite+/`vp`.
- Introducing a new framework before the current startup/readiness pass is complete.

## 2026-06-11 — State belongs in repo docs, not tribal knowledge

Decision: use `PROGRESS.md` for session state, `DECISIONS.md` for durable choices, and `tasks.md` for the ordered implementation queue.

Reason: the next agent should be able to pick up the repo without reading prior chat history.

Rejected alternatives:

- Keeping the task breakdown only in kanban cards.
- Relying on memory or chat transcripts for operating instructions.

## 2026-06-11 — Small-session task slicing

Decision: keep the next implementation steps split into small, reviewable slices with explicit acceptance criteria.

Reason: the team wants short, handoff-friendly sessions instead of one long ambiguous build.

Rejected alternatives:

- One large “finish the demo” task.
- Mixing infra cleanup, UX polish, and feature work in a single card.
