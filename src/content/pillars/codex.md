---
title: "Project Context for Codex CLI — Archcore"
heading: "Context Engineering for Codex CLI"
description: "Give Codex CLI structured project context from Git: specs, architecture decisions, rules, and plans, loaded through MCP and session hooks."
updatedDate: 2026-09-09
related:
  - context-engineering
  - project-context
  - mcp
faq:
  - question: "Which Codex CLI version do I need?"
    answer: "Codex CLI 0.117.0 or later for the plugin. On earlier versions, use the Archcore CLI directly: it gives Codex the MCP tools against the same .archcore/ directory, without the plugin layer."
  - question: "How do I enable session hooks on Codex?"
    answer: "Check the hooks feature on your installed Codex version and review the project and hook trust settings. You can enable hooks with codex --enable hooks. MCP tools remain available without hook injection. The Archcore host reference documents the version-specific setup."
  - question: "Does Archcore replace AGENTS.md?"
    answer: "Not on day one. AGENTS.md is project context in its simplest form: one flat file, read by whatever supports the convention. Archcore adds types, per-directory scope, relations, and status, and serves the same knowledge to every other agent. archcore init imports your AGENTS.md as typed documents."
  - question: "Can I use this in CI?"
    answer: "Yes. The CLI is a single binary with no daemon and no account, so it is scriptable. That is also the reason the CLI path exists independently of any plugin: automation does not run inside a coding host."
  - question: "Does anything leave my machine?"
    answer: "Archcore reads project documents locally through its stdio MCP server. Installation and updates send limited analytics unless you opt out, as described in the privacy policy. The coding agent has its own data-handling settings, which are separate from Archcore."
---

Archcore gives Codex CLI structured project context from Git, including specs, architecture decisions, rules, plans, and project knowledge, so the agent can follow how your repository is actually built.

Codex CLI 0.117 and later is a **plugin host**. It also has one host-specific caveat worth knowing before you set it up, covered under hooks below.

*Updated September 9, 2026: Reviewed product behavior and comparisons against the linked sources. Clarified that local document access does not require a hosted backend. Installation and update analytics are described in the [privacy policy](/privacy/).*

## What Archcore adds to Codex CLI

Codex reads code and runs commands. It does not know which decisions your team has already settled, which rules bind which directories, or what a boundary must guarantee, because none of that is in the source.

Archcore supplies that and delivers it:

- **Before an edit**, the rules and specs scoped to that path (when hooks are enabled).
- **At session start**, the document index and a recap of decided and in-progress work.
- **During the work**, MCP tools to search, read, create, and link documents.
- **Before the merge**, a review of the branch against the documents that claim it.

## Installation

The plugin needs the Archcore CLI on your `PATH`.

```bash
# 1. Install the CLI
curl -fsSL https://archcore.ai/install.sh | bash    # macOS / Linux
# Windows: irm https://archcore.ai/install.ps1 | iex

# 2. Set up the repository
cd your-project && archcore init
```

When you select Codex in `archcore init`, Archcore installs the plugin for that host. For a separate manual installation:

```bash
codex plugin marketplace add archcore-ai/plugin
codex
# then run /plugins, open Archcore, select Install plugin
```

If hooks are disabled in your Codex installation, enable them explicitly:

```bash
codex --enable hooks
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

Documents carry a type, a status, and named relations (`implements`, `extends`, `depends_on`, `related`), so the agent can walk from a file to the rule that governs it and the decision that explains it. See [project context](/project-context/).

## Spec-driven development

`/archcore:plan` reads the request and existing project documents, then chooses the document package. A small fix can need no new documents. One capability usually needs a spec and a plan; a larger initiative can need an umbrella PRD and a spec per capability. The [planning reference](https://docs.archcore.ai/guides/commands/) describes the routes.

For an explicit SDD path, use:

```
/archcore:plan sdd payments webhook
```

Two other tracks exist for different requirement sources: a market discovery cascade (MRD → BRD → URD) and the ISO 29148 cascade (BRS → StRS → SyRS → SRS) for regulated work. [Spec-driven development](/spec-driven-development/) covers the practice and why the spec has to survive the merge.

## Automatic context and hooks

This is the host-specific part, and it is worth being precise rather than optimistic.

| | Status on Codex CLI |
| --- | --- |
| **MCP tools** | Always available |
| **Session hooks** | Require the `hooks` feature to be enabled |
| **Project and hook trust** | Review and approve both before expecting project hooks to run |

What that means in practice: **MCP is the reliable path on Codex**, and hooks are an improvement on top when your platform and flags allow. Without hooks the agent still reaches every document, it just has to ask rather than being handed the applicable rules before an edit.

Check the [current host instructions](https://docs.archcore.ai/guides/connect-your-agent/#codex-cli) for your version and platform. Use `/archcore:review` before merge to check the change against the documents, whether or not hooks ran during the edit.

## MCP

The CLI runs a local stdio MCP server as a child process of Codex.

```bash
archcore mcp install --agent codex
archcore hooks install --agent codex
```

`archcore init` runs both. See the [MCP page](/mcp/) for what the tool surface exposes and why a protocol beats a static file.

## Compared with AGENTS.md

Codex reads `AGENTS.md`, and the convention is genuinely useful. It has the limits of any single flat file.

| | AGENTS.md | Archcore |
| --- | --- | --- |
| **Structure** | One file, prose | Typed documents with relations |
| **Scope** | Directory hierarchy through nested AGENTS.md files | Document scope, delivered through supported hooks |
| **Status** | None | `draft → accepted → rejected` |
| **Rationale** | Mixed into instructions | Recorded as decisions, linked to the rules they produced |
| **Delivery** | Read whole | Injected when it applies, pulled on demand |
| **Other agents** | Whatever supports the convention | Every MCP-aware agent |

[AGENTS.md supports nested files](https://agents.md/) with instructions for individual directories. Keep that mechanism when it meets your needs. Typed documents become useful when you need explicit status, links between a decision and a spec, or a shared review workflow beyond instruction-file precedence.

`archcore init` imports `AGENTS.md` as typed documents so you do not start over: conventions become rules, the reasoning behind them becomes decision records.

## Worked example

This is an illustrative scenario. The outcome depends on the agent reading the relevant documents and on review catching violations; it is not a measured comparison.

You ask Codex to add a retry to the webhook consumer.

**Without project context.** It adds a naive retry loop, which is reasonable code and wrong here, because an incident last quarter produced a decision to route retries through the queue's own redelivery rather than in-process.

**With Archcore.** The decision is on record with its rationale, the consumer's spec states the delivery guarantee, and the rule about in-process retries is scoped to that package. The agent implements the redelivery path instead, and if it had implemented the loop, `/archcore:review` would have flagged the conflict before merge.

## Next

- [Context engineering](/context-engineering/): the discipline this page applies
- [MCP](/mcp/): the transport, and why it is the reliable path here
- [CLI](/cli/): the full command surface and agent matrix
