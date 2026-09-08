---
title: "AGENTS.md and Structured Project Context — Archcore"
heading: "Beyond AGENTS.md"
description: "What AGENTS.md does well, where a single instruction file stops scaling, and how to move durable project knowledge into typed documents without starting over."
updatedDate: 2026-08-10
related:
  - project-context
  - context-engineering
  - codex
faq:
  - question: "Should I delete AGENTS.md?"
    answer: "No. Keep it as the entry point. It is the file agents look for by convention, and a short one that points at where the real context lives is doing its job. What moves out is the durable knowledge that outgrew a flat file: decisions with rationale, rules that apply to specific directories, and contracts for boundaries."
  - question: "When does AGENTS.md stop being enough?"
    answer: "Three signals, and any one of them is sufficient. You cannot tell which line binds which directory. You cannot tell whether a line is current or a leftover from a decision that was reversed. Or you have started maintaining a second file for a second agent, and the two disagree."
  - question: "Does moving to typed documents mean rewriting everything?"
    answer: "No. archcore init reads your AGENTS.md and imports it: conventions become rules, the reasoning behind them becomes decision records, and prose already sitting in docs/ becomes guides and specs. You review the result rather than author it."
  - question: "Is AGENTS.md the same as CLAUDE.md?"
    answer: "They serve the same purpose for different audiences. AGENTS.md is an open convention read by several agents; CLAUDE.md is Claude Code's file. Teams running both usually end up maintaining two copies that drift, which is one of the reasons to move durable knowledge somewhere both can read."
  - question: "Can I keep AGENTS.md in sync automatically?"
    answer: "The better goal is not to need synchronization. If the durable knowledge lives in typed documents that every agent reads through MCP and hooks, AGENTS.md stops being a copy of anything and goes back to being a short pointer."
---

`AGENTS.md` is a good idea that works until it does not, and the point where it stops working is predictable. This page is about recognising that point and what to do at it.

It is not an argument against the file. Every repository should have one.

## What AGENTS.md gets right

The convention succeeded for real reasons, and they are worth stating before the criticism.

- **It is in the repository.** Versioned with the code, reviewed in pull requests, cloned with the project. That is the correct instinct, and it is the same one behind [git-native context](/git-native-context/).
- **It is open.** Several agents read the same file, which is a genuine improvement over one instruction file per vendor.
- **It costs nothing to start.** One file, plain Markdown, no tooling.
- **It is legible to humans.** A new engineer can read it top to bottom.

For a small repository with a handful of conventions, that is the whole job. The file *is* your project context, and nothing here suggests otherwise.

## Where a single file stops scaling

The failure is structural rather than editorial. It is not that people write bad `AGENTS.md` files; it is that a flat file has no way to express four things a growing codebase needs.

**Scope.** A rule about API handlers applies to `src/api/`. In a flat file it applies to the whole repository, or it says so in prose that the agent has to interpret correctly on every turn. There is no mechanism that delivers it only when relevant, so everything arrives every time and competes for attention.

**Kind.** Is this line a binding rule, a decision, a preference, or a note someone left? A reader infers it from tone. An agent guesses.

**Lifecycle.** A decision was reversed in June. The line describing the old behaviour is still in the file, indistinguishable from the lines that are still true. Nothing marks supersession, so the file accumulates rather than evolves.

**Rationale and its link to the rule.** "Do not use default exports" is followed. "Do not use default exports, because the bundler configuration cannot tree-shake them and we hit this in the payments build" is understood, and the difference shows up the first time someone hits an edge the rule did not anticipate. In a flat file, the reasoning either bloats the instruction or is missing.

Add the second agent and a fifth problem appears: a parallel file, which drifts, and now neither is authoritative.

## The three signals

You do not need a rule about file length. Watch for these instead.

1. **You cannot answer "which part of this applies to the code I am editing".** Scope has broken.
2. **You cannot tell whether a line is still true.** Lifecycle has broken.
3. **You are maintaining a second file for a second agent.** Portability has broken.

Any one of them means the flat file has outgrown its shape. All three usually arrive within a month of each other.

## What structured project context adds

| | AGENTS.md | Typed project context |
| --- | --- | --- |
| **Kind** | Inferred from prose | Explicit type: decision, rule, spec, plan |
| **Scope** | Whole repository | Per directory where it applies |
| **Lifecycle** | None | `draft → accepted → rejected` |
| **Rationale** | Mixed in or missing | A decision record, linked to the rule it produced |
| **Delivery** | Read whole, at the start | Injected when it applies, pulled on demand |
| **Second agent** | A second file | The same directory |

The mechanism that makes scope real is worth being concrete about. A rule document declares the path it governs, and a pre-write hook delivers it when the agent edits something under that path. The agent does not have to decide whether the rule is relevant, because it only arrives when it is.

## Keep the file, move the knowledge

The end state is not "no `AGENTS.md`". It is a short one that stops trying to hold everything.

**Stays in AGENTS.md**

- What this repository is, in two sentences.
- How to run and test it.
- A pointer to where the structured context lives.

**Moves out**

- Decisions, with the reasoning and the rejected alternative.
- Rules that apply to specific directories.
- Contracts for boundaries other code depends on.
- Plans for work in flight.

## Migrating without rewriting

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

`archcore init` reads your existing instruction files, including `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, and `.cursor/rules/*`, and proposes typed documents from them in a single preview before writing anything. Conventions become rules, the reasoning behind them becomes decision records, and path-scoped instruction files keep their scope while gaining status, history, and relations.

You review the result. Nothing is deleted from the original file by the import.

A sensible first pass is smaller than most teams expect:

1. Import, and keep only what you recognise as still true.
2. Scope the two or three rules that your agent breaks most often.
3. Write the decision you are tired of re-explaining, with its rationale.
4. Leave the rest in `AGENTS.md` until it earns a move.

## Which agents read what

`AGENTS.md` is read by the agents that adopted the convention. Structured context is read by any MCP-aware agent, which today includes Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, OpenCode, Roo Code, and Cline through the [CLI](/cli/).

That difference is the one that decides it for teams running more than one agent. See [Codex CLI](/codex/), which reads `AGENTS.md` natively, for what the combination looks like on a single host.

## Next

- [Project context](/project-context/): what belongs in the documents once they leave the flat file
- [Context engineering](/context-engineering/): why selective delivery is the property that matters most
- [Beyond CLAUDE.md](/claude-md/): the same argument for Claude Code's instruction file
