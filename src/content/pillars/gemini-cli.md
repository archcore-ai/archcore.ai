---
title: "Project Context for Gemini CLI — Archcore"
heading: "Context Engineering for Gemini CLI"
description: "Give Gemini CLI structured project context from Git: specs, architecture decisions, rules, and plans, over a local MCP server and session hooks."
updatedDate: 2026-09-09
related:
  - context-engineering
  - project-context
  - mcp
faq:
  - question: "Is there an Archcore plugin for Gemini CLI?"
    answer: "No, and you do not need one. The plugin is a command surface for hosts with a plugin runtime; the context layer itself is the CLI. On Gemini CLI you install the CLI, which gives you the MCP tools and session hooks against the same .archcore/ directory every other agent reads."
  - question: "Is the CLI path worse than the plugin path?"
    answer: "Archcore uses the CLI to serve documents over MCP and configure hooks on Gemini CLI. The plugin adds skills on hosts with a supported plugin runtime. The documents and MCP tools are shared; the available command and hook surfaces depend on the host."
  - question: "Does Archcore replace GEMINI.md?"
    answer: "Not on day one. A flat instruction file is project context in its simplest form. Archcore adds types, per-directory scope, relations, and status, and serves the same knowledge to every other agent you use. archcore init imports the instruction files you already wrote."
  - question: "Which hooks work on Gemini CLI?"
    answer: "The full set. Gemini CLI is one of the five agents with session hooks wired, so the applicable rules and specs are injected before an edit rather than only on request."
  - question: "Does anything leave my machine?"
    answer: "Archcore reads project documents locally through its stdio MCP server. Installation and updates send limited analytics unless you opt out, as described in the privacy policy. The coding agent has its own data-handling settings, which are separate from Archcore."
---

Archcore gives Gemini CLI structured project context from Git: specs, architecture decisions, rules, plans, and project knowledge. Documents are read locally. The [privacy policy](/privacy/) explains installation and update analytics.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

Gemini CLI runs the **CLI path**: MCP tools plus the full session hook set. There is no plugin for this host, and on the part that matters, delivering context, that changes nothing.

## What Archcore adds to Gemini CLI

Gemini CLI can read every file in your repository and still not know why the system is shaped this way. Nothing in the code records which library was rejected, which decision blocks a refactor, or which convention is binding rather than incidental.

Archcore supplies that and delivers it:

- **Before an edit**, the rules and specs scoped to the path being changed.
- **At session start**, the document index and a recap of decided and in-progress work.
- **During the work**, MCP tools to search, read, create, and link documents.
- **In CI**, the same binary, since nothing depends on a coding host.

## Installation

One install, no plugin step.

```bash
curl -fsSL https://archcore.ai/install.sh | bash    # macOS / Linux
# Windows: irm https://archcore.ai/install.ps1 | iex

cd your-project && archcore init
```

`archcore init` scaffolds `.archcore/`, detects Gemini CLI, registers the local MCP server, installs the session hooks, and imports the instruction files you already wrote.

To wire it explicitly, or to add it to a repository set up earlier:

```bash
archcore mcp install --agent gemini
archcore hooks install --agent gemini
```

Check the result at any time:

```bash
archcore doctor
```

## Project context

Context lives as typed Markdown in `.archcore/` inside your repository:

```
.archcore/
  architecture/
    read-write-split.adr.md      # a decision, with rationale
    session-api.spec.md          # a contract for a boundary
  api/
    typed-errors.rule.md         # scoped to src/api/
  auth/
    migration-q3.plan.md         # work in flight
```

Documents carry a type, a status, and named relations (`implements`, `extends`, `depends_on`, `related`), so the agent can walk from a file to the rule that governs it and the decision behind it. See [project context](/project-context/).

## Spec-driven development

On Gemini CLI, ask for the documents the task needs through MCP and plain language. A change to an API contract may need a spec and a plan. A small correction may need neither. Link any new spec to the decisions and architecture it depends on.

Ask for them directly:

> "Create a spec for the session API based on how it currently behaves, and link it to the decision about token expiry."

[Spec-driven development](/spec-driven-development/) covers what a spec should contain and why it has to stay connected after the merge.

## Automatic context and hooks

Gemini CLI is one of the five agents with the full hook set wired.

| Hook | When it fires | What it does |
| --- | --- | --- |
| **Session start** | New session | Injects the document index and a recap |
| **Pre-write** | Before an edit | Injects the rules and specs scoped to that path |
| **Post-write** | After a document changes | Validates frontmatter, flags stale relations |

Pre-write injection is what makes the everyday case need no command. The rule about `src/api/` arrives when Gemini CLI edits `src/api/`.

## MCP

The CLI runs a local stdio MCP server as a child process, exposing document tools: list, search, get, create, update, remove, and relation management.

```bash
archcore mcp install --agent gemini
```

Because it is a protocol implementation rather than a per-vendor integration, the same server serves every other agent you run. The [MCP page](/mcp/) covers the tool surface and why a protocol beats a static file.

## Compared with a flat instruction file

| | Instruction file | Archcore |
| --- | --- | --- |
| **Structure** | One file, prose | Typed documents with relations |
| **Scope** | Depends on the host and its nested-file support | Per-document scope |
| **Status** | None | `draft → accepted → rejected` |
| **Rationale** | Mixed into instructions | Decisions, linked to the rules they produced |
| **Delivery** | Read whole | Injected when it applies, pulled on demand |
| **Other agents** | Its own copy per tool | One directory, every agent |

The last row is the one that usually decides it. A team running Gemini CLI alongside another agent ends up maintaining two instruction files that disagree, and neither is authoritative. One `.archcore/` directory removes the question.

## One context, several agents

This is the case the CLI path is built for. If your team runs Gemini CLI, and someone else runs Claude Code, and CI runs neither:

- All of them read the same `.archcore/` directory.
- A decision recorded in one session is available in the next, in any agent.
- Nothing has to be re-explained per tool, because the context was never stored in a tool.

The CLI supports **eight agents over MCP** today: Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, OpenCode, Roo Code, and Cline. Anything else that speaks MCP works the same way.

## Next

- [Context engineering](/context-engineering/): the discipline this page applies
- [Project context](/project-context/): what belongs in the documents
- [CLI](/cli/): the full command surface and agent matrix
