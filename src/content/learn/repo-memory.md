---
title: "What Is Repo Memory?"
description: "Repo memory is project context: decisions, rules, specs, and plans versioned in your repository, readable by any AI coding agent. What it is and how it works."
pubDate: 2026-07-30
updatedDate: 2026-09-09
faq:
  - question: "Is repo memory the same as a vector database memory?"
    answer: "Repo memory describes storage and ownership: documents versioned with the project. A vector index describes retrieval and can index those same documents. A memory service can use either or both. Compare authority, review, and access separately from the retrieval method."
  - question: "Does repo memory eat the agent's context window?"
    answer: "Yes. Indexes, tool definitions, and loaded documents consume context. A compact index and on-demand reads can reduce unnecessary loading compared with including every document at session start."
  - question: "Which AI coding agents can use repo memory?"
    answer: "Any agent that can read files in the repository, and any MCP-aware agent if the memory is exposed over MCP: Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, Cline, and others."
  - question: "How is repo memory different from CLAUDE.md?"
    answer: "CLAUDE.md is one way to keep instructions in the repository, with imports and nested files supported by its readers. Structured project documents add explicit types, status, and relations. The approaches can coexist."
---

**Repo memory** is project context (decisions, rules, specs, and plans) stored as versioned files in the repository itself, so AI coding agents can read it in every session. Unlike memory layers that live in a vendor's cloud or a local database, repo memory lives in git: it is reviewed in pull requests, versioned with the code it describes, and available to any agent that can read files or speak [MCP](https://modelcontextprotocol.io/).

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

<span id="why-do-coding-agents-need-memory-at-all"></span>

## Why use repo memory for coding agents?

A fresh agent session needs a way to recover project knowledge. The model may be excellent, but it does not know why your auth module is split the way it is, which migration is halfway done, or that your team banned default exports two quarters ago. So it guesses, and you correct it, again, in every session.

Instruction files such as [`CLAUDE.md`](/blog/claude-code-memory/), `AGENTS.md`, and `.cursor/rules/` already retain project context. Some support nested scope, conditional loading, or multiple agents. Explicit document types and relations help when the team needs a more detailed record of decisions and their dependencies.

The other patch was automatic memory inside the tool, and that path has its own failure mode. Cursor shipped Memories in mid-2025 and [removed the feature six months later](/blog/cursor-memories-removed/) with no changelog entry, leaving users to export what they could. Memory in a vendor's opaque layer sits one product decision away from gone.

## How is repo memory different from agent memory and RAG?

| | Repo memory | Conversation memory service | Vector / RAG memory | Instruction files |
|---|---|---|---|---|
| What is stored | Explicit documents: decisions, rules, specs, plans | Extracted facts from conversations | Embeddings of text or code | Instructions, potentially split and scoped |
| Where it lives | Your git repository | Vendor cloud or local DB | Vector database | Your git repository |
| How it's written | Deliberately during work, by people or agents, reviewed like code | Automatically, in the background | Automatically, by indexing | By people or agents; reviewed like other files |
| Reviewable in PRs | Yes | Requires an export or integration | Review the source documents | Yes |
| Works across agents | Via files or MCP | Depends on integrations | Depends on integrations | Depends on the readers; AGENTS.md and CLAUDE.md overlap |
| Survives vendor decisions | Files remain available | Depends on export and hosting | Depends on source retention | Files remain available |
| Useful for | Reviewed project records | Retaining facts across sessions | Retrieving indexed code or documents | Instructions with host-specific loading |

Storage, retrieval, and approval are separate choices. A vector index can retrieve ADRs if they are among its sources; an MCP memory server can expose a local graph. Project context needs a maintained engineering record, whichever retrieval method you choose. See the [reference MCP memory server](https://github.com/modelcontextprotocol/servers/blob/main/src/memory/README.md) for one implementation.

## What belongs in repo memory?

The same artifacts senior engineers already produce, in a form agents can consume:

- **Decisions (ADRs):** why Postgres, why the queue is Redis-backed, what that decision blocks.
- **Rules:** team standards with scope. Which directories, which exceptions.
- **Specs:** the behavior a module or API promises, with a status field, so a spec that shipped is distinguishable from a draft.
- **Plans:** multi-session work in progress, so the agent picking up tomorrow knows where today stopped.
- **Guides:** how to run, test, and release this particular repo.

What does *not* belong: personal preferences (keep those in your tool's user settings), conversation trivia, and anything secret, because repo memory is as public as the repo itself.

## How do agents actually read it?

Three mechanisms, in increasing order of integration:

1. Plain file reads. The documents are markdown in the repo; any agent can open them. This works with zero setup but relies on the agent noticing the files.
2. Session hooks. A hook injects a compact index of available documents at the start of every conversation, so the agent knows what exists before it starts guessing.
3. MCP tools. The agent lists, searches, reads, and writes documents on demand during the session. Context is pulled when needed instead of loaded wholesale, so the token cost depends on the index, tool definitions, and documents actually loaded.

The write path matters as much as the read path, because the record needs to change when the project does. In practice the agent itself should capture decisions and plans as it works, as reviewable diffs rather than silent background writes.

## Why git specifically?

Five properties fall out of storing memory as files in the repository:

1. Versioned with the code. A decision is tied to the commit range it governed, and `git log` is the memory's audit trail.
2. Reviewable. Context changes go through pull requests like any other change, so a wrong "fact" gets caught in review instead of silently steering agents.
3. Local and offline. No account, no service, no per-retrieval billing.
4. Cross-agent by default. Files and MCP are the two most portable interfaces in the ecosystem, so one memory serves Claude Code, Cursor, Copilot, and whatever ships next year.
5. Durable against product decisions. Nobody can remove a feature and take your project's memory with it.

Individually, none of these is exotic. A vendor memory layer can be reviewable if the vendor builds review into it. What is hard to get elsewhere is all five at once, from storage you already run.

## What does structured repo memory look like?

A worked example, using the `.archcore/` layout from [Archcore](https://archcore.ai/), a git-native context layer for AI coding agents (our tool, and the reason this page exists):

```
.archcore/
  auth/
    jwt-strategy.adr.md          # decision: why JWT, what it blocks
    session-rules.rule.md        # standard: scope, exceptions
  payments/
    stripe-integration.spec.md   # contract the module promises
    migration-q3.plan.md         # multi-session work in progress
  run-and-test.guide.md          # how to run this repo
```

Each document is markdown with typed frontmatter (`adr`, `rule`, `spec`, `plan`, `guide` and more), a status, and named relations to other documents (`implements`, `extends`, `depends_on`, `related`), so an agent can walk from the file it's editing to the rule that governs it and the decision that explains why. The [CLI](https://archcore.ai/cli/) scaffolds the directory and runs a local MCP server; the [plugin](https://archcore.ai/plugin/) adds slash commands for capturing decisions and plans without leaving the session. Details live in the [docs](https://docs.archcore.ai/).

But the pattern is bigger than any one tool: if your project's decisions, rules, and specs live as versioned, typed files that agents load before they edit, then you have repo memory, whatever you build it with.
