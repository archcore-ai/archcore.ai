---
title: "Spec-Driven Development & Context for Cursor — Archcore"
heading: "Project Context for Cursor"
description: "Give Cursor structured project context from Git: specs, architecture decisions, rules, and plans, loaded through MCP and session hooks."
updatedDate: 2026-09-09
related:
  - project-context
  - spec-driven-development
  - context-engineering
faq:
  - question: "Cursor removed Memories. What should I use instead?"
    answer: "Memories recorded what happened in your sessions. If what you actually needed was the engineering record, which decisions are binding and which rules apply where, that belongs in the repository rather than in a per-user store. Rules files cover short-lived instructions well; project context in Git covers the durable part and survives the next feature change in any tool."
  - question: "Does Archcore replace .cursor/rules?"
    answer: "Not on day one. Rules files are project context in its simplest form: flat instructions for one tool. Archcore adds types, relations, status, and the same context in every other agent. archcore init imports .cursorrules and .cursor/rules/* as typed documents, so what you wrote carries over."
  - question: "Which Cursor version do I need for the plugin?"
    answer: "Cursor 2.5 or later. On earlier versions, use the CLI directly: it gives Cursor the MCP tools and session hooks without the plugin layer, reading the same .archcore/ directory."
  - question: "Do I need to configure MCP by hand?"
    answer: "Running archcore init wires it for you. If you install the plugin through the marketplace instead, there is a one-time MCP setup: copy the example config into ~/.cursor/mcp.json for all projects, or .cursor/mcp.json for one."
  - question: "Does my code leave my machine?"
    answer: "Archcore reads project documents locally through its stdio MCP server. Document access requires no account or hosted backend. Your coding agent has separate data-handling settings; check those before using it with private code."
---

Archcore gives Cursor structured project context from Git, including specs, architecture decisions, rules, plans, and project knowledge, so the agent can follow how your repository is actually built.

Cursor 2.5 and later is a **plugin host**, so it gets slash commands, skills, gated tracks, and guardrails alongside MCP tools and the hooks supported by Cursor. Hook delivery differs across agents; see the [host matrix](https://docs.archcore.ai/guides/connect-your-agent/#supported-hosts).

*Updated September 9, 2026: Reviewed product behavior and comparisons against the linked sources. Clarified that local document access does not require a hosted backend. Installation and update analytics are described in the [privacy policy](/privacy/).*

## What Archcore adds to Cursor

Cursor reads your codebase well. What it cannot recover from the code is the reasoning behind it: why a boundary falls where it does, which library was evaluated and dropped, which convention is binding and which is an accident.

Archcore supplies that layer and delivers it at the right moment:

- **Before an edit**, the applicable rules and specs for that path.
- **At session start**, a recap of what is decided and in progress.
- **During the work**, MCP tools to search, read, create, and link documents.
- **Before the merge**, a review of the branch against the documents that claim it.

## Installation

The plugin needs the Archcore CLI on your `PATH`, because the CLI serves the MCP server.

```bash
# 1. Install the CLI
curl -fsSL https://archcore.ai/install.sh | bash    # macOS / Linux
# Windows: irm https://archcore.ai/install.ps1 | iex

# 2. Set up the repository
cd your-project && archcore init
```

Then add the plugin in Cursor: open **Plugins**, paste `https://github.com/archcore-ai/plugin` into **Search or paste link**, and click **Add Plugin**.

If you added the plugin through the marketplace without running `archcore init`, there is a one-time MCP setup. Copy [`docs/cursor.mcp.example.json`](https://github.com/archcore-ai/plugin/blob/main/docs/cursor.mcp.example.json) into `~/.cursor/mcp.json` for every project, or `.cursor/mcp.json` for one.

**On Cursor below 2.5**, skip the plugin and use the CLI directly. You still get MCP tools and session hooks against the same directory.

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

Documents carry a type, a status, and named relations (`implements`, `extends`, `depends_on`, `related`). See [project context](/project-context/) for what belongs in each and what does not.

## Spec-driven development

`/archcore:plan` reads the request and existing project documents, then chooses the document package. A small fix can need no new documents. One capability usually needs a spec and a plan; a larger initiative can need an umbrella PRD and a spec per capability. The [planning reference](https://docs.archcore.ai/guides/commands/) describes the routes.

For an explicit SDD path, use:

```
/archcore:plan sdd checkout redesign
```

The spec stays in the repository afterwards, is loaded when the boundary is edited, and is what review measures the diff against. [Spec-driven development](/spec-driven-development/) covers why that afterlife is the part most spec practices get wrong.

## Automatic context and hooks

Cursor gets the full hook set: session start, pre-write, and post-write.

The pre-write hook is the one you notice. A rule scoped to `src/api/` reaches the agent when it edits something under `src/api/`, and stays out of the way otherwise. That is what makes scoped rules usable at a size where a single instruction file has already become a wall of text.

## MCP

The CLI runs a local stdio MCP server as a child process. It exposes document tools: list, search, get, create, update, remove, and relations.

```bash
archcore mcp install --agent cursor
archcore hooks install --agent cursor
```

`archcore init` runs both. The [MCP page](/mcp/) explains why a protocol beats a file for this.

## Compared with Cursor Rules and Memories

Cursor has its own mechanisms. They solve adjacent problems, and the distinction matters.

| | `.cursor/rules` | Cursor Memories | Archcore |
| --- | --- | --- | --- |
| **Holds** | Instructions for Cursor | What happened in sessions | What the project says is true |
| **Structure** | Flat files, optionally path-scoped | Session-derived notes | Typed documents with relations |
| **Lifecycle** | None | Vendor-managed | `draft → accepted → rejected` |
| **Lives in** | Your repository | Cursor's store | Your repository |
| **Other agents** | No | No | Yes, the same directory |

**Rules files are a good starting point** and this is not an argument against them. They stop scaling at the point where you need to say which decision superseded which, why a rule exists, or what a boundary must guarantee. That is where typed documents with relations earn their cost.

**Memories were a different thing entirely.** They recorded the conversation, not the project. When Cursor removed the feature, teams that had been using it as an engineering record discovered they had been storing project truth in a per-user cache. Project context in Git does not have that failure mode: it is reviewed, versioned with the code, and portable to whatever you use next.

`archcore init` imports `.cursorrules` and `.cursor/rules/*` as typed documents. Path-scoped rules keep their scope and gain status, history, and relations.

## Worked example

This is an illustrative scenario. The outcome depends on the agent reading the relevant documents and on review catching violations; it is not a measured comparison.

You ask Cursor to add a new endpoint to the billing service.

**Without project context.** It follows the shape it saw most often in training, puts the handler in a plausible directory, invents an error format, and does not know that billing writes go through an outbox table because of a decision made in March.

**With Archcore.** The pre-write hook delivers the architecture record for the outbox pattern, the rule for handler error shapes, and the spec for the billing API. The endpoint lands where your architecture says, with the error contract your client already expects.

## Next

- [Project context](/project-context/): what belongs in the documents
- [Spec-driven development](/spec-driven-development/): the track behind `/archcore:plan`
- [Plugin](/plugin/): the full command surface and host matrix
