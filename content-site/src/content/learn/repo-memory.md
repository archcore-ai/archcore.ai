---
title: "What Is Repo Memory? Project Context That Lives in Git"
description: "Repo memory is project context — decisions, rules, specs, and plans versioned in your repository, readable by any AI coding agent. What it is and how it works."
pubDate: 2026-07-30
faq:
  - question: "Is repo memory the same as a vector database memory?"
    answer: "No. Vector memory stores embeddings of past conversations or code in a database and retrieves them by similarity. Repo memory stores explicit, human-written documents as files in the repository. Vector memory answers 'what did we talk about before'; repo memory answers 'what did we decide, and what are the rules here'."
  - question: "Does repo memory eat the agent's context window?"
    answer: "Not if it's served properly. The agent should get a compact index of available documents at session start and pull full documents on demand — through MCP tools or file reads — instead of loading everything wholesale."
  - question: "Which AI coding agents can use repo memory?"
    answer: "Any agent that can read files in the repository, and any MCP-aware agent if the memory is exposed over MCP: Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, Cline, and others."
  - question: "How is repo memory different from CLAUDE.md?"
    answer: "CLAUDE.md is repo memory in its simplest form: one flat instruction file for one tool. Structured repo memory adds types (decision, rule, spec, plan), relations between documents, per-document status and history, and works across agents instead of being tied to one."
---

**Repo memory** is project context — decisions, rules, specs, and plans — stored as versioned files in the repository itself, so AI coding agents can read it in every session. Unlike memory layers that live in a vendor's cloud or a local database, repo memory lives in git: it is reviewed in pull requests, versioned with the code it describes, and available to any agent that can read files or speak [MCP](https://modelcontextprotocol.io/).

## Why do coding agents need memory at all?

Every agent session starts from zero. The model may be excellent, but it does not know why your auth module is split the way it is, which migration is halfway done, or that your team banned default exports two quarters ago. So it guesses — and you correct it, again, in every session.

Teams first patched this with instruction files: [`CLAUDE.md`](/blog/claude-code-memory/), `AGENTS.md`, `.cursor/rules/`. These work, and they are the simplest form of repo memory. But they are flat text for one tool at a time, and as the codebase grows they turn into unstructured dumps: no way to tell a binding decision from a stale note, no way to find which rule applies to which directory, no history of what superseded what.

The other patch was automatic memory inside the tool — and that path has its own failure mode. Cursor shipped Memories in mid-2025 and [removed it six months later](/blog/cursor-memories-removed/) with no changelog entry, leaving users to export what they could. Memory stored in a vendor's opaque layer is one product decision away from gone.

## How is repo memory different from agent memory and RAG?

| | Repo memory | Cloud agent memory (mem0, Zep style) | Vector / RAG memory | Instruction files |
|---|---|---|---|---|
| What is stored | Explicit documents: decisions, rules, specs, plans | Extracted facts from conversations | Embeddings of text or code | Flat instructions |
| Where it lives | Your git repository | Vendor cloud or local DB | Vector database | Your git repository |
| How it's written | Deliberately, during work — by people or agents, reviewed like code | Automatically, in the background | Automatically, by indexing | Manually, occasionally |
| Reviewable in PRs | Yes | No | No | Yes |
| Works across agents | Yes — files + MCP | Depends on integrations | Depends on integrations | Mostly one tool per file |
| Survives vendor decisions | Yes | No | Partially | Yes |
| Best at | "What did we decide and why" | "What did the user say before" | "What code looks similar" | Short-lived small projects |

These are complements, not rivals. Conversation-fact memory is genuinely useful for personal preferences; retrieval over code is useful for navigation. Repo memory covers the layer neither of them holds: the **engineering record** — decisions with reasons, rules with scope, specs with status.

## What belongs in repo memory?

The same artifacts senior engineers already produce, in a form agents can consume:

- **Decisions (ADRs)** — why Postgres, why the queue is Redis-backed, what that decision blocks.
- **Rules** — team standards with scope: which directories, which exceptions.
- **Specs** — the behavior a module or API promises, with a status field, so a spec that shipped is distinguishable from a draft.
- **Plans** — multi-session work in progress, so the agent picking up tomorrow knows where today stopped.
- **Guides** — how to run, test, and release this particular repo.

What does *not* belong: personal preferences (keep those in your tool's user settings), conversation trivia, and anything secret — repo memory is as public as the repo itself.

## How do agents actually read it?

Three mechanisms, in increasing order of integration:

1. **Plain file reads.** The documents are markdown in the repo; any agent can open them. This works with zero setup but relies on the agent noticing the files.
2. **Session hooks.** A hook injects a compact index of available documents at the start of every conversation, so the agent knows what exists before it starts guessing.
3. **MCP tools.** The agent lists, searches, reads, and writes documents on demand during the session. Context is pulled when needed instead of loaded wholesale, which keeps the context window cost near zero until a document is actually used.

The write path matters as much as the read path: memory that only humans update goes stale. In practice the agent itself should capture decisions and plans as it works — as reviewable diffs, not silent background writes.

## Why git specifically?

Five properties fall out of storing memory as files in the repository, and none of them are available together in any other storage:

1. **Versioned with the code.** A decision is tied to the commit range it governed. `git log` is the memory's audit trail.
2. **Reviewable.** Context changes go through pull requests like any other change — a wrong "fact" gets caught in review instead of silently steering agents.
3. **Local and offline.** No account, no service, no per-retrieval billing.
4. **Cross-agent by default.** Files and MCP are the two most portable interfaces in the ecosystem; one memory serves Claude Code, Cursor, Copilot, and whatever ships next year.
5. **Vendor-proof.** Nobody can remove a feature and take your project's memory with it.

## What does structured repo memory look like?

A worked example — the `.archcore/` layout [Archcore](https://archcore.ai/) uses (disclosure: our tool, and the reason this page exists):

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

Each document is markdown with typed frontmatter (`adr`, `rule`, `spec`, `plan`, `guide`…), a status, and named relations to other documents — `informs`, `blocks`, `refines`, `supersedes` — so an agent can walk from a file it's editing to the rule that governs it and the decision that explains why. The [CLI](https://archcore.ai/cli/) scaffolds the directory and runs a local MCP server; the [plugin](https://archcore.ai/plugin/) adds slash commands for capturing decisions and plans without leaving the session. Details live in the [docs](https://docs.archcore.ai/).

But the pattern is bigger than any one tool: if your project's decisions, rules, and specs live as versioned, typed files that agents load before they edit — you have repo memory, whatever you build it with.
