# Lecture Readiness Check

This check maps the Learn Harness Engineering lecture recommendations to the current TopProperties repo. It is intentionally concrete: each row names the local artifact that satisfies the lecture and the automated or manual check that keeps it from drifting.

Sources:

- https://walkinglabs.github.io/learn-harness-engineering/en/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-01-why-capable-agents-still-fail/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-02-what-a-harness-actually-is/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-03-why-the-repository-must-become-the-system-of-record/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-04-why-one-giant-instruction-file-fails/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-05-why-long-running-tasks-lose-continuity/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-06-why-initialization-needs-its-own-phase/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-07-why-agents-overreach-and-under-finish/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-08-why-feature-lists-are-harness-primitives/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-09-why-agents-declare-victory-too-early/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-10-why-end-to-end-testing-changes-results/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-11-why-observability-belongs-inside-the-harness/
- https://walkinglabs.github.io/learn-harness-engineering/en/lectures/lecture-12-why-every-session-must-leave-a-clean-state/

## Automated Entry Point

Run:

```bash
./init.sh
```

`./init.sh` runs `scripts/check-harness-readiness.mjs`, which validates that the repo still has the required harness files, feature-list rules, startup commands, state artifacts, and lecture coverage markers.

## Lecture Matrix

| Lecture    | Recommendation applied                                                                                       | Local evidence                                                                                                                                                                                                                          | Guard                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Lecture 01 | Define a verifiable Definition of Done instead of trusting agent confidence.                                 | `AGENTS.md`, `CLAUDE.md`, `docs/harness/sprint-contract.md`, `docs/harness/clean-state-checklist.md`                                                                                                                                    | `./init.sh`, `vp test`, `vp check`, `vp build` are required before completion.                        |
| Lecture 02 | Keep all five-subsystem harness parts present: instructions, tools, environment, state, feedback.            | Instructions: `AGENTS.md` and `CLAUDE.md`; tools/environment: `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `vite.config.js`; state: `PROGRESS.md`, `feature_list.json`, `DECISIONS.md`; feedback: tests, rubric, checklist. | `scripts/check-harness-readiness.mjs` checks required files and commands.                             |
| Lecture 03 | Treat the repo as the system of record for product direction, decisions, progress, and verification.         | `CONTEXT.md`, `docs/architecture.md`, `DECISIONS.md`, `PROGRESS.md`, `feature_list.json`, `tasks.md`                                                                                                                                    | Required clock-in reads and completion updates are in `AGENTS.md` and `CLAUDE.md`.                    |
| Lecture 04 | Keep the entry instruction file as a router and move topic detail into focused docs.                         | `AGENTS.md` routes to topic docs; `docs/agents/`, `docs/harness/`, `CONTEXT.md`, and `docs/architecture.md` hold detail.                                                                                                                | Readiness script flags `AGENTS.md` if it grows beyond a router-sized threshold.                       |
| Lecture 05 | Keep state persistence across sessions through progress, decisions, verification records, and handoff notes. | `PROGRESS.md`, `DECISIONS.md`, `docs/harness/session-handoff.md`, feature evidence in `feature_list.json`, git commits.                                                                                                                 | Clock-out protocol requires state updates before completion.                                          |
| Lecture 06 | Separate initialization from implementation and prove startup readiness first.                               | `init.sh`, locked dependencies, one Vitest smoke test, task breakdown in `tasks.md`.                                                                                                                                                    | `./init.sh` validates baseline files and now runs the harness readiness check.                        |
| Lecture 07 | Enforce WIP=1 and require completion evidence for the active work item.                                      | `feature_list.json` has `single_active_feature: true`, feature statuses, dependencies, verification, and evidence arrays.                                                                                                               | Script enforces at most one `in_progress` feature and passing evidence.                               |
| Lecture 08 | Make the feature list a primitive, not an informal note.                                                     | `feature_list.json` records behavior, verification, current state, dependencies, and evidence.                                                                                                                                          | Script checks required feature fields, allowed states, verification, and passing evidence.            |
| Lecture 09 | Use external termination criteria: static checks, runtime checks, and system-level confirmation.             | Sprint contract, evaluator rubric, clean-state checklist, and feature verification commands.                                                                                                                                            | Product/UI work must run browser/runtime checks in addition to `vp test`, `vp check`, and `vp build`. |
| Lecture 10 | Include end-to-end validation when changes cross component or UI boundaries.                                 | `docs/harness/sprint-contract.md` and `docs/harness/clean-state-checklist.md` require `vp dev`, browser primary-flow verification, and 375px mobile checks for UI work.                                                                 | UI features cannot be marked passing without recorded runtime/browser evidence.                       |
| Lecture 11 | Add runtime and process observability through startup signals, sprint contracts, rubrics, and evidence.      | Runtime: `init.sh`, `vp dev`, `vp test`, `vp check`, `vp build`; process: sprint contract, evaluator rubric, feature evidence, session handoff.                                                                                         | Readiness script checks those observability artifacts exist and contain required sections.            |
| Lecture 12 | Make clean state part of completion: build, tests, progress, artifacts, startup.                             | `docs/harness/clean-state-checklist.md`, `docs/QUALITY.md`, `PROGRESS.md`, `feature_list.json`.                                                                                                                                         | `./init.sh` checks startup/readiness; session exit requires verification and clean-state checklist.   |

## Sample Recommendation Coverage

The course examples and exercises are represented as local, repeatable checks where they are actionable for this repo:

- Five-tuple harness audit: this document and `scripts/check-harness-readiness.mjs`.
- Fresh session test: `AGENTS.md`, `PROGRESS.md`, `DECISIONS.md`, `feature_list.json`, and `docs/QUALITY.md` answer what this project is, how to run it, what is next, what changed, and what is weak.
- Startup readiness checklist: `init.sh`.
- Task atomization and WIP=1: `feature_list.json` and `tasks.md`.
- Completion evidence audit: passing feature states require evidence in `feature_list.json`.
- Termination validation: sprint contract plus clean-state checklist.
- End-to-end layer: browser/runtime verification required for UI work.
- Observability gap analysis: sprint contract, evaluator rubric, session handoff, and quality tracker.
- Clean-state checklist: `docs/harness/clean-state-checklist.md`.
- Harness simplification practice: `docs/QUALITY.md` records next improvements and should be reviewed during periodic cleanup.

## Current Verdict

Status: applied for the current reset baseline.

Known limitation: runtime browser/mobile checks are required only for UI/product work. This harness pass changed process artifacts and startup checks, so command verification is sufficient for this session.
