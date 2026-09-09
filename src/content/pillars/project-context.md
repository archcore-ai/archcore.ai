---
title: "Project Context for AI Coding Agents — Archcore"
heading: "Project Context for AI Coding Agents"
description: "Give AI coding agents persistent project context that lives in Git: specs, architecture decisions, rules, plans, and project knowledge."
updatedDate: 2026-09-09
related:
  - context-engineering
  - git-native-context
  - mcp
faq:
  - question: "What is project context for an AI coding agent?"
    answer: "Project context is the knowledge about a specific codebase that an agent needs and cannot get from reading the code: the architecture and why it is shaped that way, the decisions already made, the rules the team enforces, the specs its boundaries must hold, and the work in flight."
  - question: "Is project context the same as agent memory?"
    answer: "No. Memory records what happened in previous sessions, which is a property of the conversation. Project context records what the project says is true, which is a property of the repository. One is a log, the other is a source of truth, and they answer different questions."
  - question: "Does project context replace CLAUDE.md or AGENTS.md?"
    answer: "Not necessarily. An instruction file is project context in its simplest form: one flat file for one tool. Structured project context adds types, relations, per-document status, and delivery to every agent instead of one. The two can coexist while durable knowledge moves across."
  - question: "How much project context does a repository need?"
    answer: "Less than teams expect. Coverage is not the goal; the goal is that the agent stops guessing about the things you have already settled. A handful of decisions, a few scoped rules, and specs for the boundaries that break most often outperform a hundred documents nobody maintains."
  - question: "Who maintains project context?"
    answer: "The team, in the same review process as the code. A change to a rule arrives as a diff in a pull request, gets approved or rejected like any other change, and ships on the branch that needed it. Nothing is maintained on the side."
---

**Project context** is the knowledge about a specific codebase that an AI coding agent needs and cannot obtain by reading the code: the architecture and the reasoning behind its shape, the decisions already made, the rules the team enforces, the contracts its boundaries must hold, and the work currently in flight.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

It is the answer to a question every agent session asks implicitly and no repository answers: *what is already true here?*

## The gap project context fills

A coding agent arrives at your repository with a good model of programming in general and no model of this system in particular. It can read every file. It still cannot read:

- **Why** the payments module is split from billing, so it merges them back.
- **What was rejected.** The library you evaluated and dropped looks like a reasonable choice to a model that never saw the evaluation.
- **What is binding.** A convention followed in eleven files and broken in two reads as ambiguous.
- **What is in progress.** A half-finished migration looks like inconsistency to clean up.
- **What has scope.** A rule that applies to `src/api/` and not elsewhere is invisible if it lives in a chat message.

None of this is in the code, because none of it *can* be in the code. It is the layer above: intent, constraint, and rationale.

## What belongs in project context

The useful filter is what a new senior engineer would need in week one and could not get by reading source.

| Kind | What it captures | Example |
| --- | --- | --- |
| **Architecture** | The shape of the system and why | Why reads and writes go through different paths |
| **Decision** | What was chosen, what was rejected, and why | Postgres over DynamoDB, with the constraint that drove it |
| **Rule** | A standard, scoped to where it applies | Handlers under `src/api/` return typed errors |
| **Spec** | A contract a boundary must hold | The session API's status codes and failure behaviour |
| **Plan** | Work in flight, so a session continues | The auth migration, and which step is done |
| **Project knowledge** | Operational reality | Which service owns the cron, what broke last time |

What does not belong: code (the agent reads it), secrets (context is as public as the repository), personal preferences (those are tool settings, not team truth), and anything you will not maintain. Stale context is worse than missing context, because an agent believes it.

## Project context and agent memory are different things

These get conflated constantly, and the distinction decides what you should build.

| | Agent memory | Project context |
| --- | --- | --- |
| **Records** | What happened in a session | What the project says is true |
| **Scope** | A user, a tool, a conversation | A repository, a team |
| **Authority** | Observed | Decided |
| **Lives in** | A vendor's store or a local database | The repository |
| **Reviewed** | No | In pull requests |
| **Answers** | "What did we talk about?" | "What did we decide, and what applies here?" |

Memory is genuinely useful for personal preferences and session continuity. It is the wrong instrument for the engineering record, because the engineering record has to be authoritative, shared, and reviewable, and a log of past conversations is none of those.

The same logic separates project context from retrieval. Searching the codebase surfaces what the code says. It cannot surface a rationale that was never committed.

## Persistence is the hard part

Every team that has tried this arrives at the same problem: the context is easy to write once and hard to keep true.

Three failure modes account for most of it.

**The wall of text.** One instruction file grows past the point where anything can be found in it. It has no types, so nothing distinguishes a binding rule from a stale note; no scope, so everything arrives on every turn; no lifecycle, so a superseded decision sits next to the one that replaced it.

**The parallel copy.** A second agent gets its own file. Now two files disagree and neither is authoritative.

**The document nobody reads.** Context written into a wiki is not delivered to the agent at the moment it matters, so it stops being read and then stops being true.

The fixes are structural, not editorial: typed documents so kind is machine-readable, scope so delivery can be selective, relations so a reader can walk from a file to the rule that governs it, a lifecycle so supersession is visible, and one store that serves every agent.

## Where project context should live

In the repository it describes. That is not a stylistic preference, it follows from what the context has to do.

- It changes when the code changes, so it should travel on the same branch.
- It needs review, and the team already reviews diffs.
- It must survive a change of tools, which rules out a vendor's store.
- It belongs to the team, not to whoever happened to write it in their client.

This is the argument [git-native context](/git-native-context/) makes in full.

## How Archcore stores and delivers it

[Archcore](/) is a git-native context layer for AI coding agents. Project context lives as typed Markdown in a `.archcore/` directory inside your repository.

```
.archcore/
  architecture/
    read-write-split.adr.md        # the decision, with rationale
    session-api.spec.md            # the contract for a boundary
  api/
    typed-errors.rule.md           # scoped to src/api/
  auth/
    migration-q3.plan.md           # work in flight
  run-and-test.guide.md            # how to run this repo
```

Each document carries a type, a status, and named relations (`implements`, `extends`, `depends_on`, `related`), so an agent can walk from the file it is editing to the rule that governs it and the decision that explains why the rule exists.

Delivery is the half that makes it context rather than documentation:

- **Session hooks** inject the applicable documents when the agent edits a file, so guidance arrives at the moment of the edit.
- **[MCP](/mcp/) tools** let the agent search, read, and write documents during real work, pulling what it needs rather than receiving everything at session start.
- **One store, every agent.** The [CLI](/cli/) serves the same directory to eight MCP-aware agents; the [plugin](/plugin/) adds slash commands and guardrails on the four hosts that support plugins.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

`archcore init` scaffolds the directory, detects your agents, wires MCP and hooks, and imports the `CLAUDE.md`, `AGENTS.md`, and `.cursorrules` you already wrote as typed documents.

## Starting small

The instinct is to document the system. Resist it: a large first pass produces documents nobody validated and nobody maintains.

1. **Write the decision you are tired of repeating.** One ADR, with the rejected alternative.
2. **Scope one rule to one directory.** The convention your agent breaks most often.
3. **Spec the boundary that breaks other people's code.**
4. **Record the next decision as it happens**, instead of reconstructing history.
5. **Review it in pull requests** so it stays true.

You will know it is working when the agent stops asking about the things you already settled, and when a teammate's session starts from the same understanding as yours.

Compare [agent memory and project context](/learn/agent-memory-vs-project-context/) before choosing what to store and how the team will review it.
