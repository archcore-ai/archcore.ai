# Repository Agent Instructions

## Purpose

This repository builds the Archcore marketing site (`archcore.ai`) and the content hub under `/blog/` and `/learn/`.

The texts here do a different job from the texts in the CLI and plugin repositories. Those explain a product to someone who already has it. These have to reach a reader who does not know the product yet, hold their attention, and survive a search engine on the way. Write so the reader can find what they need, understand it the first time, and act on it.

Use:

- ISO 24495-1-inspired plain-language principles for every reader-facing surface: landing copy, blog and learn articles, FAQ answers, meta descriptions, prerendered crawler bodies, OG text, and Archcore documents in this repository;
- an ASD-STE100-inspired controlled style only for agent-facing text (see Scope). Never apply the controlled style to marketing copy or articles. It strips the voice those texts need.

This policy is an internal writing profile. It is not a claim of compliance, certification, or approval by ISO, ASD, or any standards organization.

## Scope

| Surface | Files | Profile |
| --- | --- | --- |
| Landing copy | `src/components/**`, `src/pages/**`, `src/content/how-to-use/**` | Plain language + humanizer |
| Articles | `content-site/src/content/**` | Plain language + humanizer + SEO |
| Crawler and social copy | `index.html`, `scripts/prerender-routes.mts`, `scripts/generate-og-image.mts` | Plain language + SEO |
| Russian translations | `src/locales/ru/messages.po` | Plain language + humanizer-ru |
| Archcore documents | `.archcore/**/*.md` | Controlled style |
| Agent instructions | `AGENTS.md`, `CLAUDE.md`, `.claude/skills/**`, `.claude/agents/**` | Controlled style |

Do not rewrite or translate:

- commands, flags, paths, and configuration keys;
- MCP tool names and document type names;
- component, prop, and identifier names;
- Lingui message IDs and `<0>`-style placeholders;
- URLs, slugs, and anchor fragments;
- literal values and exact quotations from external sources.

## Precedence

Apply instructions in this order:

1. Explicit user requirements.
2. `.archcore/messaging-alignment.rule.md`.
3. The SEO invariants in this file.
4. The plain-language rules in this file.
5. The humanizer pass.
6. General stylistic preferences.

`messaging-alignment.rule.md` sits above every style rule because it pins positioning, not prose. The hero H1, the meta title, the tagline, and the works-with strip are decisions about what the product claims to be. Editing one of them for readability changes the positioning without anyone deciding to. If a pinned phrase reads badly, say so and propose a replacement — do not quietly improve it.

The SEO invariants sit above the plain-language rules for the same reason in reverse: a shorter, cleaner sentence that drops the target keyword out of the first paragraph costs traffic that the clarity gain does not repay.

## Plain-language rules

Apply to every reader-facing surface.

### Orientation

1. State the point, result, or answer before the supporting detail.
2. Answer the question in the heading in the first sentence under it.
3. Order sections by what the reader needs next, not by what is easiest to explain.
4. Give one topic to each paragraph.
5. Keep the first sentence of a section short enough to read in one pass.

### Sentences

6. Express one primary idea in each sentence.
7. Put the condition before the action or result that depends on it.
8. Name the actor when responsibility or behavior matters.
9. Prefer active voice when it identifies who acts.
10. Split a sentence that needs an em dash to hold a second clause. The dash is usually hiding a sentence boundary.
11. Vary sentence length. Uniform length reads as generated text.

### Words

12. Use one term for one concept, and keep it stable across the page and across related pages.
13. Do not swap in a synonym for variety. In this repository, "repo memory", "context layer", and "documents" are not interchangeable.
14. Define a term before relying on it, unless it is the term the reader searched for.
15. Prefer the concrete noun over the abstraction: "an ADR" beats "an artifact".
16. Replace a qualitative claim with a fact, a version, a number, or an observable outcome.
17. Cut a word that adds no information the reader can act on.

### Evidence

18. Do not invent behavior, guarantees, benchmarks, compatibility, or adoption.
19. Distinguish what ships today from what is planned. Name the version when behavior changed.
20. Attribute an external claim to its source, with a link where one exists.
21. When a claim cannot be supported, cut it rather than hedge it.

## SEO invariants

These survive every rewrite. Breaking one is a regression even when the prose improves.

1. Keep `<title>` at 60 characters or fewer, and the meta description at 160 or fewer.
2. Keep one `<h1>` per page.
3. Keep the target query in the title, the H1, the first 100 words, and at least one H2.
4. Phrase article H2s as the question the reader typed, when the article targets a question query. These headings feed featured snippets.
5. Open an article with a direct definition or answer in the first paragraph. Do not open with background.
6. Never change a published slug, filename, or URL. A rename needs a redirect and is a separate decision.
7. Preserve every internal link when shortening a passage. Internal links are the hub structure, not decoration.
8. Preserve outbound links to primary sources. They support the claims and the page.
9. Keep `faq` frontmatter mirroring the visible FAQ, per `messaging-alignment.rule.md`.
10. Keep `pubDate` unchanged on an edit. Add a visible note when a revision changes the substance.
11. Keep tables and lists that answer comparison queries. They win snippets that prose does not.
12. Do not thin a page below the depth its query needs to satisfy the reader.

## Humanizer pass

Run this after the plain-language pass, on every reader-facing text, in the language the text ships in.

Use the `humanizer` skill for English and the `humanizer-ru` skill for Russian. The patterns those skills catch are the deliverable; the notes below are the ones this repository produces most.

### English

- Em dashes. This site overuses them. Most become a period or a comma. Rule 10 above is the same rule.
- Rule of three. Three-item lists appear where the real count is two or five.
- Promotional phrasing. "Powerful", "seamless", "robust", "game-changing" carry no information.
- Negative parallelism. "It is not X, but Y" and "This is not just X — it is Y".
- Signposting. "In this article we will explore", "Let us dive in".
- Generic closing paragraphs that restate the piece without adding anything.
- Filler openers: "It is worth noting that", "It is important to understand".
- Uniform paragraph length and uniform sentence rhythm.

### Russian

- Use the formal «вы» throughout. Never «ты».
- Translate the claim, not the English sentence structure. A Russian sentence that mirrors English word order reads as machine output.
- Do not carry English em-dash habits into Russian. Russian uses the dash differently, and the imported pattern is a strong AI tell.
- Keep product names, commands, flags, and paths in Latin script and unchanged.
- Keep the same claims as the English source. A translation that softens or strengthens a claim creates two different positionings.

### What not to strip

Voice is not an AI pattern. Keep the specific, the concrete, and the opinionated. "Decisions stop dying in chat scrollback" is doing work that "decisions are preserved" does not. Do not flatten a text into neutral prose and call it humanized — that produces exactly the soulless register the humanizer skills warn about.

## Archcore documents and agent instructions

Apply the controlled style to `.archcore/**`, this file, `CLAUDE.md`, and the files under `.claude/`.

1. Write instructions as direct actions.
2. Put the routing condition before the routed action.
3. Keep one required action in each numbered instruction.
4. Name the file, component, script, or surface explicitly.
5. Separate mandatory behavior from rationale.
6. State an exception immediately after the rule it modifies.
7. Use `MUST`, `MUST NOT`, `SHOULD`, and `MAY` in uppercase for normative meaning.
8. Put one requirement in each numbered item, with one modal.
9. Make each requirement objectively verifiable.
10. Do not hide a requirement in rationale, an example, or a note.
11. Reference a source file with `@path/to/file` instead of reproducing its contents.
12. Preserve the mandatory sections of the relevant Archcore document type.

Use `create_document`, `update_document`, and `remove_document` for `.archcore/` documents. A `PreToolUse` guard blocks direct writes to them.

## Copy lives in more than one file

A claim on this site appears in up to six places. Changing one and not the others ships a contradiction that no build step catches.

Before finishing a copy change, update every layer that applies:

1. The component string, in `<Trans>` or `` msg`…` ``.
2. `index.html` — title, description, OG, Twitter, JSON-LD, and the static fallback body.
3. `scripts/prerender-routes.mts` — `ROUTES[]` title, description, `body.paragraphs`, and `faq[]`.
4. `scripts/generate-og-image.mts` — the matching `VARIANTS[]` entry.
5. `content-site/src/content/**` when an article states the same fact.
6. The Russian catalog.

`messaging-alignment.rule.md` §Enforcement holds the full list and the failure history.

## Workflow

1. Read `.archcore/messaging-alignment.rule.md` before changing any user-facing copy.
2. Apply the plain-language rules.
3. Apply the humanizer pass in the shipping language.
4. Check the SEO invariants.
5. Run `npm run i18n:extract`, translate new Russian strings, then `npm run i18n:compile`.
6. Run `npm run build`.
7. Inspect the built output under `dist/`, not the dev server. Prerendered bodies, per-route JSON-LD, and the content-hub pages exist only after a build.

## Review checklist

Before returning a reader-facing text, silently verify:

- The reader and the job the text does are clear.
- The point appears before the supporting detail.
- Each heading is answered in the first sentence below it.
- Each sentence carries one primary idea.
- Conditions precede the actions they control.
- Terminology is consistent, and no synonym was introduced for variety.
- Every claim has evidence, a version, or a number, or it was cut.
- No pinned phrase from `messaging-alignment.rule.md` was edited for style.
- Every SEO invariant holds.
- Em dash count dropped, and the remaining ones earn their place.
- Sentence and paragraph length vary.
- Internal and outbound links survived.
- Identifiers, commands, paths, and placeholders are unchanged.
- The Russian text makes the same claims as the English, in «вы», without English sentence shapes.

Revise violations before returning the text. Do not include the checklist or a writing-quality score unless the user asks for a review report.
