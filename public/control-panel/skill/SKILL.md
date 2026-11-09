---
name: control-panel
description: The convention for Linear issues assigned to a human, so Control Panel can show and parse them — Kind and Mode labels, estimates in hours, due dates as the schedule, and the Source / Next step / Done when / Chase lines. Use whenever an agent creates, triages, schedules, closes or edits a Linear issue that belongs to a person, when asked to lint issues against the Control Panel convention, or when migrating a team's labels to it.
---

# Control Panel convention (v1)

Control Panel is a read-only view of everything assigned to one person on Linear. It reads Linear and nothing else. It never writes.

That gives each party one job:

| Party | Job |
|---|---|
| **Linear** | Holds all state. |
| **You, the agent** | Create, schedule, update and close issues. In Linear only. |
| **Control Panel** | Shows a person's open issues as one mosaic and flags issues that break this convention. |

If you want something to appear in Control Panel, write it to Linear in the shape below. There is no other way in.

## One-time setup per team

Ask the human before you do this. It changes labels for the whole team.

1. A **single-select** label group named `Kind` with child labels `to-do` and `check-in`. A team may add more kinds (for example `writing` or `review`). Extra kinds have no field rules.
2. A **single-select** label group named `Mode` with child labels `focus` and `parallel`.
3. The team estimate scale includes 1, 2, 3, 5, 8 and 13. These are **hours**.

Linear label names are unique within a team. If the team already has a `to-do`, `check-in` or `writing` label, move it into the `Kind` group (`save_issue_label` with `parent: "Kind"`). Do not create a duplicate. Moving a label keeps it on every issue. A workspace-level label cannot join a team's group. Linear refuses the move, so create a team label for that kind and relabel its issues.

Pass the group by ID when you move a label. Lookup by name can fail when several teams have a group with the same name.

## The two core kinds

### `to-do`: work the person does, or hands to an agent

| Field | Where | Rule |
|---|---|---|
| Kind | label `to-do` | exactly one Kind label |
| Mode | label `focus` or `parallel` | `parallel` means it can run alongside other work |
| Estimate | native estimate | hours: 1, 2, 3, 5, 8 or 13 |
| Due date | native due date | required in Todo and In Progress. Backlog may have none |
| Source | description line | `Source: <where this came from>` |
| Next step | description line | `Next step: <the very next action>` |
| Done when | description line | `Done when: <the observable end state>` |

### `check-in`: anything waiting on another person

| Field | Where | Rule |
|---|---|---|
| Kind | label `check-in` | exactly one Kind label |
| Due date | native due date | always required: the day to chase next |
| Source | description line | `Source: <where this came from>` |
| Chase | description line | `Chase: <who> — <what you need from them>` |
| Done when | description line | `Done when: <the observable end state>` |

A check-in has no estimate. Control Panel counts it as a 15-minute chase. When work moves to another human, close or convert the to-do and track it as a check-in.

## Writing the description lines

Put each field on its own line, at the start of the line, with the exact key and a colon. Put them near the top of the description. Free text can follow.

```
Source: Pricing sync with Maya, Nov 3 2026 (https://notes.example.com/pricing-sync)
Next step: Draft the tier table in the pricing doc
Done when: Maya signs off on the tiers in the doc

Context, links and anything else go below.
```

```
Source: #eng-api thread, Nov 5 (https://example.slack.com/archives/C0/p1)
Chase: Priya and Sam — cutoff values and the V1 customer dates
Done when: Dates are posted in the Linear project update
```

Rules:

- No markdown around the key. `**Chase:**`, `* Chase:` and `## Done when` are malformed.
- In a Chase line, put a dash between who and what (`—`, `–`, `--` or ` - `). Separate people with commas, `and` or `&`. A leading `@` is fine.
- One line per field. Control Panel reads the first match.

## Scheduling

The due date is the schedule. Control Panel buckets issues by due date into overdue, today, tomorrow, this week (weekend on Thursday and Friday), later and no date. To move work, change the due date. To slip work, change the due date and say why in a comment. Control Panel counts every time a due date moves later.

## What Control Panel derives without you

You do not mark these. Control Panel reads them from Linear history:

- **Slips:** how often the due date moved later.
- **Waiting:** how long a check-in has had the `check-in` label.

## Lint before you save

Run the bundled linter on the issue you are about to save or just saved. It accepts Linear MCP `get_issue` and `list_issues` output and Linear GraphQL issue nodes.

```bash
node scripts/lint.mjs issue.json
node scripts/lint.mjs issue.json --kinds writing,review
cat issues.json | node scripts/lint.mjs --json
```

It exits 0 when the issue conforms, 1 when it has violations, 2 on bad input. Fix every violation it prints. The same rules drive Control Panel's `needs-fields` filter.

| Code | Fix |
|---|---|
| `KIND_MISSING` / `KIND_MULTIPLE` | exactly one Kind label |
| `MODE_MISSING` / `MODE_MULTIPLE` | to-do: exactly one of `focus`, `parallel` |
| `ESTIMATE_MISSING` / `ESTIMATE_OFF_SCALE` | to-do: hours 1, 2, 3, 5, 8 or 13 |
| `DUE_MISSING` | check-in always. to-do in Todo or In Progress |
| `SOURCE_*`, `NEXT_STEP_*`, `DONE_WHEN_*`, `CHASE_*` | `_MISSING`: add the line. `_MALFORMED`: remove the markdown, or add the dash in a Chase line |

Closed issues (Done, Canceled) are never checked.

## Never

- Never track a person's work anywhere except Linear.
- Never put two Kind labels or two Mode labels on one issue.
- Never invent a due date to pass the linter. Leave the issue in Backlog and say what is missing.
- Never ask Control Panel to change anything. It only reads.
