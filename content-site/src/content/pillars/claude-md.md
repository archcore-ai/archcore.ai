---
title: "CLAUDE.md and Structured Project Context — Archcore"
heading: "Beyond CLAUDE.md"
description: "What CLAUDE.md does well, where a flat instruction file stops scaling, and how to move durable project knowledge into typed documents without starting over."
updatedDate: 2026-08-10
related:
  - claude-code
  - project-context
  - agents-md
faq:
  - question: "Should I delete CLAUDE.md?"
    answer: "No. Keep it short and let it point at where the durable knowledge lives. Claude Code reads it by convention, and a brief file that orients the agent is doing its job. What moves out is the part that outgrew a flat file: decisions with rationale, rules scoped to directories, and contracts for boundaries."
  - question: "What is the difference between CLAUDE.md and Claude Code memory?"
    answer: "CLAUDE.md is an instruction file you write and review. Memory is derived from your sessions. One states what you want, the other records what happened. Neither states what the project has decided, which is the third thing and the one that has to outlive both."
  - question: "Does structured context use more of the context window than CLAUDE.md?"
    answer: "Usually less. A flat file is read whole on every session regardless of the task. Typed documents arrive selectively: an index at session start, the rules scoped to the file being edited, and full documents pulled on demand."
  - question: "I have a large CLAUDE.md. Do I rewrite it?"
    answer: "No. archcore init imports it and proposes typed documents in one preview before writing anything. Conventions become rules, the reasoning behind them becomes decision records. You review the result rather than author it, and the original file is not deleted by the import."
  - question: "Will this work if my team also uses Cursor or Codex?"
    answer: "That is one of the main reasons to move. CLAUDE.md is read by Claude Code. Structured context in .archcore/ is read by every MCP-aware agent, so a decision recorded in one tool is available in the next instead of being copied into a second instruction file that drifts."
---

`CLAUDE.md` is the first thing most teams do right, and eventually the thing that quietly stops working. This page is about where the line is and what to do at it.

It is not an argument for deleting the file.

## What CLAUDE.md gets right

- **It lives in the repository.** Versioned, reviewed, cloned with the project. That instinct is correct and it is the same one behind [git-native context](/git-native-context/).
- **Claude Code reads it automatically.** No configuration, no protocol, no server.
- **It costs nothing to start.** A file and five minutes.
- **A human can read it.** New engineers get value from it too, which is rarer than it sounds for agent tooling.

For a small repository with a few conventions, `CLAUDE.md` *is* your project context and nothing more is needed.

## Where it stops scaling

The problem is structural, not a matter of writing more carefully. A flat file cannot express four things:

**Scope.** A rule about API handlers belongs to `src/api/`. In a flat file it applies everywhere, or it says so in prose the agent must interpret correctly every time. Everything arrives on every turn, including the CSS conventions while the agent edits a migration.

**Kind.** Binding rule, past decision, personal preference, or stale note? A reader infers it from tone. An agent guesses, and guesses differently on different days.

**Lifecycle.** A decision reversed in June leaves its line in the file, indistinguishable from the lines still in force. Files accumulate; they do not evolve on their own.

**Rationale linked to the rule.** "Handlers return typed errors" gets followed. The same rule with the incident that produced it gets *understood*, which matters the first time someone hits a case the rule did not anticipate. In a flat file the reasoning either bloats the instruction or is dropped.

Then a teammate starts using Cursor, and a fifth problem appears: a second instruction file, which drifts from the first, and neither is authoritative.

## CLAUDE.md, memory, and project context

Claude Code has two mechanisms of its own. They answer different questions, and conflating the three is where teams get stuck.

| | CLAUDE.md | Claude Code memory | Project context |
| --- | --- | --- | --- |
| **Answers** | What should you do? | What happened before? | What is true here? |
| **Authored by** | You | Derived from sessions | The team, in review |
| **Structure** | One flat file | Session-derived | Typed documents with relations |
| **Scope** | Repository-wide | User or project | Per directory where it applies |
| **Lifecycle** | None | Vendor-managed | `draft → accepted → rejected` |
| **Other agents** | No | No | Yes, the same directory |

The short version: **CLAUDE.md tells Claude Code what you want. Memory records what happened. Archcore records what the project has decided.** The third is the one that has to survive a new session, a new teammate, and a different tool, and it is the one neither of the first two is shaped to hold.

## The three signals

You do not need a line-count rule. Watch for these.

1. **You cannot say which part of the file applies to the code you are editing.** Scope has broken.
2. **You cannot tell whether a line is still true.** Lifecycle has broken.
3. **A second instruction file exists for a second agent.** Portability has broken.

## Keep the file, move the knowledge

**Stays in CLAUDE.md**

- What this repository is, in two sentences.
- How to run and test it.
- A pointer to where the structured context lives.

**Moves out**

- Decisions, with reasoning and the rejected alternative.
- Rules scoped to the directories they govern.
- Contracts for boundaries other code depends on.
- Plans for work in flight.

The result is usually a much shorter `CLAUDE.md` that stays accurate, because it stopped trying to hold the parts that change.

## What delivery looks like afterwards

This is the part that is hard to see from the flat-file side, and it is the actual payoff.

| Moment | What reaches Claude Code |
| --- | --- |
| **Session start** | The document index, plus a recap of what is decided and in progress |
| **Before an edit** | The rules and specs scoped to that path, injected by the hook |
| **During the work** | Whatever the agent searches for or reads over MCP |
| **Before merge** | A review of the branch against the documents that claim it |

Nothing here requires a command. The rule about `src/api/` shows up when the agent edits `src/api/`, which is both more useful and cheaper than putting it at the top of every conversation.

## Migrating without rewriting

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

`archcore init` reads `CLAUDE.md` along with `AGENTS.md`, `.cursorrules`, and `.cursor/rules/*`, and proposes typed documents in one preview before writing anything. Conventions become rules, the reasoning behind them becomes decision records, and path-scoped files keep their scope while gaining status and relations.

A sensible first pass:

1. Import, and keep only what you recognise as still true.
2. Scope the two or three rules Claude Code breaks most often.
3. Write down the decision you are tired of repeating, with its rationale.
4. Leave the rest in `CLAUDE.md` until it earns a move.

## Next

- [Persistent project context for Claude Code](/claude-code/): setup, hooks, and the full command surface
- [Project context](/project-context/): what belongs in the documents
- [Beyond AGENTS.md](/agents-md/): the same argument for the open convention
