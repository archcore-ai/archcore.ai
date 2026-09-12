---
title: "Write an integration page: three registers, prose shape, claim discipline"
status: accepted
tags:
  - "integrations"
  - "web"
---

## What

An integration page is one deliverable written in three different registers. Mixing
them is the most common failure: agent-instruction phrasing leaks into the reader
copy, or marketing phrasing leaks into the recipe file.

| Surface | Register | Source of the style |
| --- | --- | --- |
| Body prose in @src/content/integrations/ | Plain language for a reader | ISO 24495-1-inspired rules in @AGENTS.md, then the `humanizer` skill |
| Structured frontmatter fields | Short declarative statements | The same plain-language rules, one idea per field |
| Recipe file in @src/recipes/ | Controlled instruction language | ASD-STE100-inspired, agent-facing only |

Do not claim formal ISO 24495-1 or ASD-STE100 compliance anywhere. These are
sources of technique, not certifications.

Structural and layout requirements live in @.archcore/landing/integration-page-authoring.rule.md.
The build procedure lives in @.archcore/landing/author-and-check-content-pages.guide.md.
This document covers only how the text is written.

## When to use

- Adding an integration page for a new tool pairing.
- Rewriting an existing page's explanation.
- Importing or updating an upstream instruction file.

## Body prose: three paragraphs

@src/content/integrations/openspec.md and @src/content/integrations/spec-kit.md
are the reference shape. Roughly 60 to 90 words per paragraph.

1. **Joint outcome, then contributions.** Open with what the pairing produces for
   the reader. Then one sentence per tool, naming what each one keeps or supplies.
   Name the tools in the same order every time.
2. **One concrete example.** Start with "For example," and give a single situation
   where the agent's proposed work meets an accepted decision. Show the conflict
   surfacing while the reader can still change the plan.
3. **Scope and links.** State what the current instructions address, link to the
   evidence file, and link to the upstream project for native commands and
   installation.

Present tense throughout. The reader is "you" and acts: approves, resolves,
reviews. The agent is "the agent" and acts: reads, reports, records. Never say
"we" and never address the tool.

## Structured fields

- `heading` — the pairing name, partner tool first: "OpenSpec + Archcore". The
  explanation's own H2 repeats it as "How OpenSpec + Archcore work together".
- `title` — the same order plus the page purpose: "OpenSpec + Archcore Integration | Setup".
- `summary` — two short sentences. The first is the outcome, the second is what
  persists afterwards.
- `description` — one sentence under 160 characters, carrying the target query.
- `tools[].role` — one sentence, verb first, stating this tool's contribution
  only. No comparison with the other tool.
- `workflow.steps[].title` — a verb phrase of three to six words, in execution
  order.
- `workflow.steps[].description` — two or three sentences. Condition before
  action. Name the actor. Define a term inline on first use ("An ADR is an
  architecture decision record").
- `limits[]` — one verifiable fact each: a version, a run count, a named scope
  that was not covered.
- `pilot.findings[]` — `result` is observed behavior, `caveat` is the reason it
  does not generalize. Every finding needs both.

## Recipe file

Imported instruction files are copied verbatim and never edited for style. When
authoring one here, follow the controlled pattern in @src/recipes/openspec/cooperation.md:

- One numbered rule per line, one action per rule.
- "When `<condition>`, `<action>`." or "Before `<event>`, `<action>`." The
  condition comes first.
- Imperative, present tense, active voice.
- One approved term per concept for the whole file. No synonyms for variety.
- No rationale, no examples, no connecting prose.

The recipe file's own heading is part of the pinned bytes. It keeps whatever the
source calls the section, even when the page above it reads the other way round.

## Claim discipline

Publication status is derived from `evidence`, not declared. A page with no
evidence records is experimental, and the schema deliberately has no field that
could say otherwise.

- Separate requested behavior from verified behavior. If a benchmark asked the
  agent to check for conflicts, say so beside the result.
- Name the run count, the host, and the versions. Two runs of one scenario
  establish two runs of one scenario.
- A revised instruction text is untested until that exact text has been run, even
  when the earlier version was measured.
- State what was not covered. Do not hedge a claim you cannot support — cut it.

## Pitfalls

- **A pilot timeline as the main explanation.** The reader wants present-tense
  mechanism. The chronology belongs in the evidence file.
- **Editing imported instructions for readability.** The route validates bytes
  against `digest` at build time and the build fails. Recompute the digest only
  after a genuine upstream update. Renaming a section heading there to match a
  renamed page is the same mistake.
- **Renaming a published page without the baseline.** @scripts/verify-build.mts
  compares `title` and `description` against @scripts/fixtures/seo-baseline.json.
  Update the baseline in the same change or the build fails.
- **Synonym drift.** "Project context", "documents", "decisions", and "records"
  are four different things here. Rule 13 in @AGENTS.md applies across pages, not
  just within one.
- **Controlled style in the reader copy.** Numbered "MUST" phrasing in the body
  prose reads as a specification and removes the voice the page needs.
- **The English tells.** Em dashes holding a second clause, three-item lists where
  the real count is two, uniform sentence length. Run the `humanizer` skill.
- **"Verified" after one run.** `verified: false` on a host stays false until a
  run against that host is recorded.
