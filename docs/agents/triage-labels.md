# Triage Labels

Use the default Matt Pocock triage label vocabulary.

| Role            | Label             | Meaning                                    |
| --------------- | ----------------- | ------------------------------------------ |
| Needs triage    | `needs-triage`    | Maintainer needs to evaluate the issue.    |
| Needs info      | `needs-info`      | Waiting on reporter/user input.            |
| Ready for agent | `ready-for-agent` | Fully specified and safe for an AFK agent. |
| Ready for human | `ready-for-human` | Needs human implementation or judgement.   |
| Won't fix       | `wontfix`         | Will not be actioned.                      |

## Rules for agents

- Do not invent duplicate labels.
- If labels are missing in GitHub, ask before creating them unless the user explicitly authorizes label creation.
- Use `ready-for-agent` only when the issue has clear acceptance criteria, constraints, and verification steps.
