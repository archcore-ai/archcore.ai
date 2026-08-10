---
title: "Context Engineering for Claude Code — Archcore"
heading: "Persistent Project Context for Claude Code"
description: "Give Claude Code structured project context from Git: specs, architecture decisions, rules, and plans, loaded through MCP and session hooks."
updatedDate: 2026-08-10
related:
  - context-engineering
  - project-context
  - mcp
faq:
  - question: "Does Archcore replace CLAUDE.md?"
    answer: "Not on day one. CLAUDE.md is project context in its simplest form: one flat file for one tool. Archcore adds types, per-directory scope, relations, status, and delivery to every agent instead of one. The two coexist while durable knowledge moves across, and archcore init imports what you already wrote."
  - question: "Does this fill up Claude Code's context window?"
    answer: "No. The session opens with a compact index of available documents rather than their contents. Full documents are pulled on demand over MCP through search, relations, and single reads, and the pre-write hook injects only the rules and specs that apply to the file being edited."
  - question: "Do I need the plugin, or is the CLI enough?"
    answer: "Either works, and both read the same .archcore/ directory. The plugin adds slash commands, skills, gated tracks, and guardrails inside Claude Code. The CLI gives you the MCP tools and session hooks directly, which is what you want for scripting or CI."
  - question: "Does anything leave my machine?"
    answer: "No. The MCP server runs locally as a child process of Claude Code and reads a directory in your repository. There is no account, no hosted component, and no network call."
  - question: "What happens in a fresh session?"
    answer: "The session-start hook gives Claude Code a recap of what is decided and what is in progress, plus the document index. You do not re-explain the architecture, and you do not run a command to load context."
---

Archcore gives Claude Code structured project context from Git, including specs, architecture decisions, rules, plans, and project knowledge, so the agent can follow how your repository is actually built.

Claude Code is Archcore's **production plugin host**. It gets the full surface: slash commands, skills, gated tracks, guardrails, MCP tools, and session hooks.

## What Archcore adds to Claude Code

Claude Code already reads your files, runs commands, and edits code. What it cannot do is know why your system is shaped the way it is, because that was never written into the code.

Archcore closes that specific gap:

- **Before an edit**, the pre-write hook injects the rules and specs that apply to the file being changed.
- **At session start**, a recap of what is decided and what is in progress, instead of a cold start.
- **During the work**, MCP tools to search, read, create, and link documents.
- **Before the merge**, a review that checks the branch against the decisions it claims to follow.

## Installation

Archcore's plugin needs the CLI on your `PATH`, because the CLI is what serves the MCP server the plugin talks to.

```bash
# 1. Install the CLI
curl -fsSL https://archcore.ai/install.sh | bash    # macOS / Linux
# Windows: irm https://archcore.ai/install.ps1 | iex

# 2. Set up the repository
cd your-project && archcore init
```

Then add the plugin from inside Claude Code:

```
/plugin marketplace add archcore-ai/plugin
/plugin install archcore@archcore-plugins
```

`archcore init` scaffolds `.archcore/`, registers the MCP server, installs the session hooks, and imports the `CLAUDE.md` you already wrote.

Prefer no plugin? The CLI alone gives Claude Code MCP tools and hooks. Both paths read the same directory.

## Project context

Context lives as typed Markdown in a `.archcore/` directory inside your repository:

```
.archcore/
  architecture/
    read-write-split.adr.md      # a decision, with its rationale
    session-api.spec.md          # a contract for a boundary
  api/
    typed-errors.rule.md         # scoped to src/api/
  auth/
    migration-q3.plan.md         # work in flight
```

Each document has a type, a status, and named relations (`implements`, `extends`, `depends_on`, `related`), so Claude Code can walk from the file it is editing to the rule that governs it and the decision that explains why the rule exists. See [project context](/project-context/) for what belongs in each.

## Spec-driven development

For work that needs a specification before implementation, `/archcore:plan` runs a gated track: idea → PRD → spec → plan. Each gate skips itself when a document already covers it, so a well-specified request runs without questions.

```
/archcore:plan sdd auth redesign
```

The spec does not stop being useful when the code lands. It stays in the repository, gets loaded when the boundary is edited, and is what `/archcore:review` measures the diff against. [Spec-driven development](/spec-driven-development/) covers the practice in full.

## Automatic context and hooks

This is the part that needs no command.

| Hook | When it fires | What it does |
| --- | --- | --- |
| **Session start** | New conversation | Injects the document index and a recap of decided and in-progress work |
| **Pre-write** | Before the agent edits a file | Injects the rules and specs scoped to that path |
| **Post-write** | After a document changes | Validates frontmatter and flags stale related documents |

The pre-write hook is the one that changes day-to-day behaviour. The rule about `src/api/` arrives when Claude Code touches `src/api/`, not at the top of a long prompt where it competes with everything else.

## MCP

The CLI runs a local stdio MCP server as a child process of Claude Code. It exposes document tools: list, search, get, create, update, remove, and relation management.

```bash
archcore mcp install --agent claude-code
```

`archcore init` does this for you. The [MCP page](/mcp/) covers why a protocol beats a file, and what a context server should expose.

## The four commands

Everyday work needs none of them. They exist for the explicit cases.

| Command | Use it when |
| --- | --- |
| `/archcore:init` | First-time setup on a repository |
| `/archcore:plan` | An idea needs to become a scoped plan |
| `/archcore:document` | A decision was made, or a module has no doc |
| `/archcore:review` | Before merge, to check changes against the docs |

## Compared with CLAUDE.md and Claude Code memory

Claude Code has its own instruction and memory features. They solve adjacent problems.

| | CLAUDE.md | Claude Code memory | Archcore |
| --- | --- | --- | --- |
| **Holds** | Instructions for this tool | What happened in past sessions | What the project says is true |
| **Structure** | One flat file | Session log | Typed documents with relations |
| **Scope** | Whole repository | User or project | Per-directory where it matters |
| **Delivery** | Read at start | Recalled | Injected when it applies, pulled on demand |
| **Review** | A diff, unstructured | None | A diff, per document, with status |
| **Other agents** | No | No | Yes, the same directory |

A useful way to hold it: **CLAUDE.md tells Claude Code what you want. Archcore tells it how your system works.** The first is a preference, the second is a fact about the repository, and the second is the one that has to survive a new session, a new teammate, and a different agent.

You do not have to choose immediately. `archcore init` imports your existing `CLAUDE.md` as typed documents: conventions become rules, the reasoning behind them becomes decision records, and path-scoped instruction files keep their scope while gaining status and history.

## Worked example

You ask Claude Code to add rate limiting to the auth endpoints.

**Without project context.** It picks a library it knows, ignores the Redis store you already run, invents an error shape, and puts the middleware somewhere reasonable but wrong for this repository.

**With Archcore.** The pre-write hook delivers the ADR recording that rate limiting goes through a Redis token bucket, the rule for error shapes under `src/auth/`, and the spec for the session API. The agent reuses the existing middleware pattern, returns the error shape your client already maps, and writes the new decision back as a document your team reviews in the pull request.

Same prompt. The difference is what the agent could see first.

## Next

- [Context engineering](/context-engineering/): the discipline this page applies
- [Project context](/project-context/): what belongs in the documents
- [Plugin](/plugin/): the full command surface and host matrix
