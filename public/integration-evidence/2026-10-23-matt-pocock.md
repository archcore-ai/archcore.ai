# Matt Pocock Skills and Archcore integration benchmark

Reviewed on October 23, 2026. This note supports the
[Matt Pocock Skills integration](/integrations/matt-pocock/). It covers the
instruction text with SHA-256
`984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d`.

## What was tested

Matt Pocock Skills changed after the September pilot. `domain-modeling` now
writes ADRs to `docs/adr/` and a `GLOSSARY.md`, and the `grilling` skill asks
its questions in rounds. The instructions were rewritten for that version, and
the runs check whether they keep the two tools from writing the same decision
twice.

Each task had two arms in one experiment, in shuffled order: both tools with
the instructions, and both tools without them.

## Setup

Host: Claude Code 2.1.308. Archcore CLI and plugin v0.13.1. Matt Pocock Skills
at commit `5beb35b` (October 19, 2026). Model `claude-sonnet-5` at medium
effort.

The project is a small synthetic Python quotation library with one accepted
decision: money in integer cents. In three tasks the setup changed the project
before the run:

- The ADR task removed the sentences in `AGENTS.md` that say decisions live in
  `.archcore/` and start as drafts, so only the instructions spoke about where
  an ADR goes.
- The grilling and ADR tasks narrowed the accepted ADR to money representation,
  so rounding and delivery were open questions.
- The duplicate task kept the ADR whole. It already says that coupon discounts
  exclude the delivery fee.

## Results

| Task | With the instructions | Both tools, no instructions |
| --- | --- | --- |
| Five-turn coupon feature, independent oracle | 3 of 3 | 3 of 3 |
| A decision the accepted ADR already records | 5 of 5 | 0 of 5 |
| Grilling round on a plan the ADR partly answers | 5 of 5 | 2 of 5 |
| Record a new decision when `AGENTS.md` names no location | 2 of 5 | 0 of 5 |
| A fully specified one-line change | 5 of 5 | 5 of 5 |

Only the duplicate task shows a significant difference (two-sided Fisher exact
test, p = 0.008). Five runs per arm show only large differences.

**Coupon feature.** The agent reported the conflict between the float request
and the accepted ADR, saved the design as
`.archcore/shop/coupon-discounts.spec.md`, kept new ADRs as drafts, implemented
the coupon test-first and passed the independent oracle in all three runs. The
accepted ADR was unchanged. A run cost $2.12 to $2.42 with the instructions and
$1.80 to $1.85 without them.

An earlier revision of the instructions failed this task in all three runs. Its
rule against records for a fully specified change also stopped the agent from
saving the design the owner asked for. The published text limits that rule to
requests that ask for no saved document.

**Already recorded decision.** Without the instructions, every run wrote a
second ADR about delivery and marked it accepted. With them, every run named
`integer-money.adr.md` and created no second ADR.

**Grilling.** All ten runs used the `grilling` skill. With the instructions,
every round treated money as settled by the ADR and asked about rounding and
delivery. Without them, two rounds skipped those questions and one asked the
owner again how to represent money.

**New decision, no location in `AGENTS.md`.** No run in either arm wrote to
`docs/adr/`. Every failure was the status: the agent read "The owner has
decided" as acceptance and created the ADR as accepted. That happened in 3 of 5
runs with the instructions and 5 of 5 without them. An earlier revision with the
same status rules kept all five drafts, so this result varies between series.

**One-line change.** No run in either arm stopped to agree test seams or
created a record.

The single-turn tasks cost $8.52 for 40 runs.

## How the runs were graded

The grilling answers were graded by `claude-haiku-4-5-20251001`. It saw only the
answer text and labelled whether money was treated as settled and whether the
round asked about rounding and delivery. The judge was not calibrated against a
labelled set.

The other tasks were graded from the final files, the test suite and, for the
coupon feature, a separate oracle the agent could not read.

## What these results do not establish

- One small synthetic project, one host and one model.
- Three runs per arm for the coupon feature and five for each single-turn task.
- The issue-tracker flow (`/to-spec`, `/to-tickets`, `/implement`) and the
  instructions for `code-review` were not run.
- Projects that already keep ADRs in `docs/adr/` were not tested.

## Traceability

The identifiers refer to retained local artifacts in the maintainers'
`integration-bench` repository. Raw agent sessions are not published with this
note.

| Artifact | Identifier |
| --- | --- |
| Coupon feature, with the instructions | `20261023T062510Z-5030174dc1` |
| Coupon feature, no instructions | `20261023T060524Z-bb094def4e` |
| Already recorded decision | `20261023T075218Z-a3c9f4ab8c` |
| Grilling round | `20261023T073144Z-441a18db60` |
| New decision, no location | `20261023T074344Z-2801b3ca8e` |
| One-line change | `20261023T072453Z-9dc7a9d384` |
| Input revision | `a53eae5a2003944362dceea8dd6918646e429338` |
| Grilling judge prompt SHA-256 | `d1becd13d67a3ef91b67fa1c273b70564a86e674c4cc17918c9eb8a6ae8c2f91` |
