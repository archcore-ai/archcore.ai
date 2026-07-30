---
title: "How Claude Code Memory Works: CLAUDE.md, Auto Memory, MEMORY.md"
description: "Claude Code stacks CLAUDE.md, path-scoped rules, and Auto Memory — but the memory index loads only 200 lines and lives outside your repo. Every layer and its limits."
pubDate: 2026-07-30
faq:
  - question: "Where does Claude Code store its memory?"
    answer: "Auto Memory lives in ~/.claude/projects/<project>/memory/ on your machine — per repository, but outside the repository and not synced anywhere. CLAUDE.md files live in the repo (project level), your home directory (user level), or a managed policy path."
  - question: "What is the MEMORY.md limit?"
    answer: "Claude Code loads the first 200 lines or the first 25KB of MEMORY.md, whichever comes first, at the start of every conversation. Topic files referenced from the index are read on demand. The limit started out undocumented; a hard error on overflow instead of silent truncation only shipped in v2.1.210 (July 2026)."
  - question: "Does Claude Code read AGENTS.md?"
    answer: "No. The docs state it plainly: Claude Code reads CLAUDE.md, not AGENTS.md. The official workarounds are an @AGENTS.md import inside CLAUDE.md or a symlink. The feature request (#6235) has been open since August 2025 and is the most-upvoted issue in the repository."
  - question: "How do I share Claude Code memory with my team?"
    answer: "Auto Memory is machine-local by design — there is no documented team sharing. What ships through git today: CLAUDE.md, .claude/rules/, skills, and project-scoped subagent memory (.claude/agent-memory/). For decisions, rules, and specs the whole team's agents should follow, keep them as versioned documents in the repository itself."
---

Claude Code assembles context from five layers: a hierarchy of `CLAUDE.md` files, path-scoped rules in `.claude/rules/`, Auto Memory (a `MEMORY.md` index plus topic files), skills, and per-subagent memory. The two facts that surprise most teams: only the **first 200 lines or 25KB** of the memory index are loaded per session, and the memory itself lives **outside your repository** — per machine, per user, invisible to your teammates.

Here is how each layer actually works as of Claude Code v2.1.220 (July 2026), with the limits from the [official docs](https://code.claude.com/docs/en/memory) and changelog — and what none of the layers cover.

## What are the layers?

| Layer | Where it lives | When it loads | Shared via git? |
|---|---|---|---|
| Managed policy CLAUDE.md | `/Library/Application Support/ClaudeCode/` (or OS equivalent) | Every session, cannot be excluded | No |
| User CLAUDE.md | `~/.claude/CLAUDE.md` | Every session | No |
| Project CLAUDE.md | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Every session; subdirectory files load on demand | Yes |
| Rules | `.claude/rules/*.md` (+ `~/.claude/rules/`) | At start, or on demand with `paths:` globs | Yes |
| Auto Memory | `~/.claude/projects/<project>/memory/` | First 200 lines / 25KB of `MEMORY.md` per session | **No** |
| Skills | `.claude/skills/*/SKILL.md` | Listing at start; body on invocation | Yes |
| Subagent memory | `.claude/agent-memory/<name>/` (project scope) | Injected into that subagent | Yes — the only *memory* layer that is |

## How does CLAUDE.md actually load?

The four levels concatenate from broad to specific — managed policy, then user, then project, then `CLAUDE.local.md`. Nothing overrides anything; it all lands in context together. Two details worth knowing:

- **It's advice, not law.** CLAUDE.md is injected as a user message, not a system prompt. The docs call it ["context, not enforced configuration"](https://code.claude.com/docs/en/memory) — if you need a guarantee, that's what hooks are for.
- **Imports don't save context.** `@path/to/file` imports (max 4 hops deep) load at startup along with everything else. They organize your files; they don't shrink the token bill.

The official size guidance is blunt: [target under 200 lines per CLAUDE.md](https://code.claude.com/docs/en/memory), because "longer files consume more context and reduce adherence." The [best-practices docs](https://code.claude.com/docs/en/best-practices) give a one-line test for every entry: *would removing this cause Claude to make mistakes?* If not, cut it — bloated files cause Claude to ignore the instructions that matter.

## How does Auto Memory work?

Auto Memory shipped in v2.1.32 (February 5, 2026) and is on by default. As Claude works, it decides what's worth remembering and writes markdown into `~/.claude/projects/<project>/memory/`: a `MEMORY.md` index plus topic files (`debugging.md`, `api-conventions.md`, …). At session start only the index loads — **the first 200 lines or 25KB, whichever comes first**; topic files are read on demand. You manage all of it with `/memory`, and `/context` shows what actually loaded.

The limit has a telling history. It began as an undocumented 200-line cutoff that users discovered the hard way ([#25006](https://github.com/anthropics/claude-code/issues/25006)); a 25KB cap was added in v2.1.83 after reports of the index [silently losing recent entries](https://github.com/anthropics/claude-code/issues/57574); and a visible error on overflow — instead of silent truncation — only arrived in v2.1.210, July 2026. Within a day of the feature's release, the top requests were [how to turn it off](https://github.com/anthropics/claude-code/issues/23544), and early users hit [index corruption cascading into bad answers](https://github.com/anthropics/claude-code/issues/23769). It has improved steadily since — but "silent background memory" earned its skeptics.

Two design facts matter more than any bug, though. Auto Memory is **per repository but machine-local**: the docs say directly that files "are not shared across machines or cloud environments." And it is **unstructured**: an index plus free-form topic files, no types, no relations, no search — Claude reads the index linearly and opens topic files by name.

## What about rules, skills, and subagent memory?

- **Rules** (`.claude/rules/`, since v2.0.64) are CLAUDE.md split into files, with one real superpower: a `paths:` frontmatter glob loads a rule only when Claude touches matching files. This is the right tool for directory-scoped standards.
- **Skills** load as a listing at startup (descriptions capped at 1,536 characters) and pull their body on invocation. They're portable procedures — how to do things, not what this project decided.
- **Subagent memory** (`memory: project` in an agent's frontmatter) writes to `.claude/agent-memory/<name>/` — which is committable, making it the only official *memory* layer your team can share through git. It feeds that one subagent, not the main session.

## What can none of these layers hold?

Look at the table above through one question: *where does the project's engineering record live?* The answer is: nowhere in particular.

1. **The memory isn't in your repo.** Auto Memory accumulates on each developer's machine separately. Your teammate's Claude learns the same lessons yours did — from scratch. Nothing goes through a pull request, so a wrong "memory" never gets caught in review. (We wrote about [where this road ends for vendor-side memory](/blog/cursor-memories-removed/) when Cursor removed its Memories feature.)
2. **It's single-tool.** Claude Code [explicitly does not read AGENTS.md](https://code.claude.com/docs/en/memory#agents-md) — the request is the [most-upvoted open issue in the repository](https://github.com/anthropics/claude-code/issues/6235) (4,475 👍 as of July 2026). Your CLAUDE.md means nothing to Cursor or Copilot, and their files mean nothing to Claude Code.
3. **It's untyped and unlinked.** A decision, a team rule, and a debugging note all look identical in free-form markdown. Nothing marks what's binding, what's stale, or which rule governs which directory — precisely the structure that keeps instruction files useful past the 200-line mark.
4. **None of it is enforced.** Every layer is advisory context. Only hooks are deterministic.

## How do you give Claude Code durable project memory?

Use the official layers for what they're good at: a lean CLAUDE.md for session-critical facts, `paths:`-scoped rules for directory standards, skills for procedures, hooks for anything that must always happen.

For the engineering record — decisions with reasons, rules with scope, specs with status — keep [repo memory](/learn/repo-memory/): typed, versioned documents in the repository itself, reviewed like code. That's what we build [Archcore](https://archcore.ai/) for (disclosure: our tool): documents live in `.archcore/` with types and relations, load into Claude Code through MCP and session hooks, and the same files serve Cursor, Copilot, Gemini CLI, and any MCP-aware agent — so the memory belongs to the project, not to one tool on one laptop. `archcore init` [imports your existing CLAUDE.md](https://archcore.ai/how-to-use/) and instruction files, so the 200 lines you've already written carry over.
