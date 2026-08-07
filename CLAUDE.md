# CLAUDE.md

Read and follow `AGENTS.md` before writing or editing any text that a reader or a crawler will see: landing copy, blog and learn articles, FAQ answers, meta descriptions, prerendered bodies, OG text, Russian translations, Archcore documents, and agent instructions.

The writing policy in `AGENTS.md` uses:

- ISO 24495-1-inspired plain-language principles for every reader-facing surface;
- an ASD-STE100-inspired controlled style only for agent-facing text (`.archcore/**`, `AGENTS.md`, `CLAUDE.md`, `.claude/**`);
- a humanizer pass in the shipping language, through the `humanizer` and `humanizer-ru` skills.

Do not claim formal ISO 24495-1 or ASD-STE100 compliance.

Do not apply the controlled style to marketing copy or articles. Those texts need a voice, and the controlled style removes it.

## Positioning comes first

`.archcore/messaging-alignment.rule.md` outranks every style rule in `AGENTS.md`.

It pins the hero H1, the meta title, the tagline, the works-with strip, the command and host matrix, and the entry-point framing. Those are positioning decisions. Do not edit one for readability. If a pinned phrase reads badly, propose a replacement and let the user decide.

## Search Priority

When researching conventions, decisions, or prior copy in this project, search `.archcore/` documents first (`list_documents` → `search_documents` → `get_document`) before grepping the codebase.

Read `messaging-alignment.rule.md` before any copy change. It is the canonical source for what the site claims, and it records the claims that have gone stale before.

## Archcore Operations

Use Archcore MCP tools for all `.archcore/` document operations.

- Create documents with `create_document`.
- Update documents with `update_document`.
- Remove documents with `remove_document`.
- Read documents with `list_documents`, `search_documents`, and `get_document`.
- Manage document relations with `add_relation`, `remove_relation`, and `list_relations`.

Do not use direct file-writing tools to modify `.archcore/` documents. A `PreToolUse` guard blocks those writes.

## Managed Blocks

Do not edit content inside an Archcore-managed block. Archcore delimits a managed block with a start marker and an end marker, each an HTML comment that names the block (`archcore:start`, `archcore:end`).

Keep repository-specific instructions outside the managed block.

## Build and Test Commands

```bash
# Type check and lint
npm run check

# Development server
npm run dev

# Extract new strings, then compile catalogs
npm run i18n:extract
npm run i18n:compile

# Full production build (runs check, i18n:compile, OG generation, content sub-build)
npm run build
```

Inspect the built output under `dist/`, not the dev server. Prerendered route bodies, per-route JSON-LD, and the content-hub pages exist only after a build.

## Architecture

A Vite and React single-page app for the marketing site, plus an Astro sub-build for the content hub. The two are built separately and merged into one `dist/`.

- `src/pages/` — SPA routes: home, `/plugin`, `/cli`, `/how-to-use`, `/teams/getting-started`, `/privacy`.
- `src/components/sections/` — page sections. Most user-facing copy lives here.
- `src/content/how-to-use/` — the five branches of the interactive walkthrough.
- `src/locales/` — Lingui catalogs for English and Russian.
- `content-site/` — the Astro sub-build for `/blog/`, `/learn/`, and `/alternatives/`.
- `scripts/prerender-routes.mts` — rewrites per-route static HTML for crawlers.
- `scripts/generate-og-image.mts` — renders OG images at build time.
- `.archcore/` — this repository's decisions, rules, and plans.

### Copy is duplicated by design

The same claim appears in the component, `index.html`, the prerender route body, the OG variant, and sometimes an article. Crawlers without JavaScript read the prerendered body, and social scrapers read the meta tags, so each layer has to carry the claim on its own.

Nothing in the build detects a contradiction between layers. `AGENTS.md` §"Copy lives in more than one file" and `messaging-alignment.rule.md` §Enforcement list every layer to update together.

### Internationalization

User-facing strings use Lingui: `<Trans>` for JSX and `` msg`…` `` for string props. After editing strings, run `npm run i18n:extract`, fill the empty `msgstr` entries in `src/locales/ru/messages.po`, then run `npm run i18n:compile`.

Russian uses the formal «вы» throughout. See `AGENTS.md` §"Humanizer pass" for the Russian rules and `.archcore/i18n-workflow.guide.md` for the full procedure.

<!-- archcore:start --> managed by `archcore init` — edit outside these markers
## Archcore — project context for this repo

This repo's architecture, decisions, rules, specs and patterns live in `.archcore/`,
reachable through the Archcore MCP tools. Consult them even on code you think you
know — a decision or rule may already constrain it.

- Touching this repo's real code or behavior → search first; read only what matches.
- A decision was made ("we'll use X", "from now on Y") → record it.
- A module / API / system has no doc — or a search comes back empty → capture it.
- Planning a feature or refactor → scope it against what's already decided.

A `.archcore/` may also mount read-only **global sources** — shared, org-wide
context not shown in the session-start list. `list_documents` / `search_documents`
surface them alongside local docs, tagged `source_kind: "global"`. When present,
treat them as defaults a local doc can override — never edit or relate to one.

The search is cheap — lean on it. Skip it only for turns this repo would have no
opinion on: syntax trivia, throwaway snippets, pure mechanics.
<!-- archcore:end -->
