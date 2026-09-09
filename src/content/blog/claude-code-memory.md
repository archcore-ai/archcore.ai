---
title: "Claude Code Memory: CLAUDE.md and Auto Memory"
description: "How Claude Code memory works: CLAUDE.md, scoped rules, and Auto Memory. Check the 200-line memory index limit, sharing options, and project context."
pubDate: 2026-07-30
updatedDate: 2026-09-09
faq:
  - question: "Where does Claude Code store its memory?"
    answer: "By default, Auto Memory lives in ~/.claude/projects/<project>/memory/ on your machine, outside the repository. The autoMemoryDirectory setting can change that location. CLAUDE.md files live in the repo (project level), your home directory (user level), or a managed policy path."
  - question: "What is the MEMORY.md limit?"
    answer: "Claude Code loads the first 200 lines or the first 25KB of MEMORY.md, whichever comes first, at the start of every conversation. Topic files referenced from the index are read on demand. The limit started out undocumented, and a hard error on overflow instead of silent truncation only shipped in v2.1.210 (July 2026)."
  - question: "Does Claude Code read AGENTS.md?"
    answer: "Claude Code reads CLAUDE.md directly. To share AGENTS.md with it, import @AGENTS.md from CLAUDE.md or use a symlink. The official memory documentation describes both options."
  - question: "How do I share Claude Code memory with my team?"
    answer: "Auto Memory defaults to a machine-local directory. You can configure autoMemoryDirectory, but a shared location still needs an explicit review workflow. Common files teams share through git include: CLAUDE.md, .claude/rules/, skills, and project-scoped subagent memory (.claude/agent-memory/). For decisions, rules, and specs the whole team's agents should follow, keep them as versioned documents in the repository itself."
---

Claude Code assembles context from five layers: a hierarchy of `CLAUDE.md` files, path-scoped rules in `.claude/rules/`, Auto Memory (a `MEMORY.md` index plus topic files), skills, and per-subagent memory. Only the first 200 lines or 25KB of the memory index load at session start. Auto Memory defaults to a directory outside your repository; `autoMemoryDirectory` can change that location.

The limits and configuration below follow the [official docs](https://code.claude.com/docs/en/memory). The release history is dated separately from the current setup guidance.

*Updated September 9, 2026: Reviewed product behavior and comparisons against the linked sources. Clarified that Archcore stores project context, distinct from agent memory.*

<span id="what-are-the-layers"></span>

## What are the layers of Claude Code memory?

| Layer | Where it lives | When it loads | Shared via git? |
|---|---|---|---|
| Managed policy CLAUDE.md | `/Library/Application Support/ClaudeCode/` (or OS equivalent) | Every session, cannot be excluded | No |
| User CLAUDE.md | `~/.claude/CLAUDE.md` | Every session | No |
| Project CLAUDE.md | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Every session; subdirectory files load on demand | Yes |
| Rules | `.claude/rules/*.md` (+ `~/.claude/rules/`) | At start, or on demand with `paths:` globs | Yes |
| Auto Memory | `~/.claude/projects/<project>/memory/` by default; configurable | First 200 lines / 25KB of `MEMORY.md` per session | Not by default |
| Skills | `.claude/skills/*/SKILL.md` | Listing at start; body on invocation | Yes |
| Subagent memory | `.claude/agent-memory/<name>/` (project scope) | Injected into that subagent | Yes |

## How does CLAUDE.md actually load?

The four levels concatenate from broad to specific: managed policy, then user, then project, then `CLAUDE.local.md`. Nothing overrides anything; it all lands in context together. Two details worth knowing:

- CLAUDE.md is advice, not law. It is injected as a user message, not a system prompt, and the docs call it ["context, not enforced configuration"](https://code.claude.com/docs/en/memory). If you need a guarantee, that's what hooks are for.
- Imports don't save context. `@path/to/file` imports (max 4 hops deep) load at startup along with everything else. They organize your files; they don't shrink the token bill.

The official size guidance is blunt: [target under 200 lines per CLAUDE.md](https://code.claude.com/docs/en/memory), because "longer files consume more context and reduce adherence." The [best-practices docs](https://code.claude.com/docs/en/best-practices) give a one-line test for every entry: would removing this cause Claude to make mistakes? If not, cut it. Bloated files cause Claude to ignore the instructions that matter.

## How does Auto Memory work?

Auto Memory shipped in v2.1.32 (February 5, 2026) and is on by default. As Claude works, it decides what's worth remembering and writes markdown into `~/.claude/projects/<project>/memory/`: a `MEMORY.md` index plus topic files (`debugging.md`, `api-conventions.md`, and so on). At session start only the index loads, and only its first 200 lines or 25KB, whichever comes first. Topic files are read on demand. You manage all of it with `/memory`, and `/context` shows what actually loaded.

The limit has a telling history. It began as an undocumented 200-line cutoff that users discovered the hard way ([#25006](https://github.com/anthropics/claude-code/issues/25006)). A 25KB cap was added in v2.1.83 after reports of the index [silently losing recent entries](https://github.com/anthropics/claude-code/issues/57574). A visible error on overflow, instead of silent truncation, only arrived in v2.1.210 in July 2026. Within a day of the feature's release, the top requests were [how to turn it off](https://github.com/anthropics/claude-code/issues/23544), and early users hit [index corruption cascading into bad answers](https://github.com/anthropics/claude-code/issues/23769). It has improved steadily since then, but silent background memory earned its skeptics early.

Auto Memory is stored locally by default. Its files are editable Markdown, and current Claude Code versions use memory types in frontmatter. Those categories differ from engineering-document types such as ADRs and specs; see the [current memory reference](https://code.claude.com/docs/en/memory#auto-memory).

## What about rules, skills, and subagent memory?

- **Rules** (`.claude/rules/`, since v2.0.64) are CLAUDE.md split into files, with one genuinely useful property: a `paths:` frontmatter glob loads a rule only when Claude touches matching files. This is the right tool for directory-scoped standards.
- **Skills** load as a listing at startup (descriptions capped at 1,536 characters) and pull their body on invocation. They're portable procedures: how to do things, not what this project decided.
- **Subagent memory** (`memory: project` in an agent's frontmatter) writes to `.claude/agent-memory/<name>/`, which is committable and can be reviewed with the code. It feeds that one subagent, not the main session.

## What can none of these layers hold?

The built-in layers can hold engineering knowledge. The question is which knowledge your team has approved and how other agents find it.

1. Default Auto Memory is outside the repository. A normal clone does not share those notes with teammates. An export and review workflow makes the difference; [Cursor's Memories removal](/blog/cursor-memories-removed/) shows why that needs planning.
2. Instruction formats overlap. Claude Code [does not load AGENTS.md directly](https://code.claude.com/docs/en/memory#agents-md), but an import or symlink works. The [native-support request](https://github.com/anthropics/claude-code/issues/6235) tracks that distinction. [Cursor reads CLAUDE.md](https://cursor.com/help/customization/rules), so two agents do not inherently need two copies.
3. Memory types do not establish team approval. Add explicit status and review if other people depend on a decision. Archcore provides types and relations for that engineering record.
4. Instructions remain advisory. Hooks can enforce specific checks, but delivering a document does not prove that generated code follows it.

## How do you give Claude Code durable project memory?

Use the official layers for what they're good at: a lean CLAUDE.md for session-critical facts, `paths:`-scoped rules for directory standards, skills for procedures, hooks for explicit checks that must run at supported lifecycle events.

For the engineering record (decisions with reasons, rules with scope, specs with status), keep [project context](https://archcore.ai/project-context/): typed, versioned documents in the repository itself, reviewed like code. That's what we build [Archcore](https://archcore.ai/) for; disclosure, it's our tool. Documents live in `.archcore/` with types and relations, load into Claude Code through MCP and session hooks, and the same files serve Cursor, Copilot, Gemini CLI, and any MCP-aware agent. The project context belongs to the repository and is available across agents. `archcore init` [imports your existing CLAUDE.md](https://archcore.ai/how-to-use/) and instruction files, so the 200 lines you've already written carry over.
