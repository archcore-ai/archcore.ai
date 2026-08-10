---
title: "Context Engineering for AI Coding Agents — Archcore"
heading: "Context Engineering for AI Coding Agents"
description: "Learn how context engineering gives AI coding agents structured, relevant project knowledge: specs, architecture, decisions, rules, plans, and more."
updatedDate: 2026-08-10
related:
  - spec-driven-development
  - project-context
  - git-native-context
faq:
  - question: "What is context engineering?"
    answer: "Context engineering is the practice of deciding what an AI model sees before it acts, and building the system that delivers it. For coding agents it means making project knowledge explicit, structured, selective, versioned, and portable, instead of hoping a longer prompt or a bigger context window covers the gap."
  - question: "How is context engineering different from prompt engineering?"
    answer: "Prompt engineering optimizes the instruction for one turn. Context engineering designs what the agent knows across every turn and every session. A better prompt improves one response; better context improves the responses you never read, which on a coding agent is most of them."
  - question: "Does a bigger context window remove the need for context engineering?"
    answer: "No. A larger window changes how much the agent can read, not what is authoritative, current, or relevant. Loading an entire repository tells the agent what the code says and still leaves it guessing which decision is binding, which rule governs which directory, and what was already rejected."
  - question: "What belongs in an AI coding agent's context?"
    answer: "The knowledge that is not recoverable from the code: architecture and why it is shaped that way, decisions with their rationale, constraints, team rules with the scope they apply to, specs for boundaries others depend on, and plans in flight. Code, secrets, and personal preferences do not belong."
  - question: "How does context engineering relate to harness engineering?"
    answer: "They nest. A harness is everything in an agent except the model: its tools, the guides it gets before acting, and the sensors that check it after. Building that harness is a specific form of context engineering, per the canonical source. It is not a successor to it."
---

**Context engineering** is the practice of deciding what an AI model sees before it acts, and building the system that delivers it. For AI coding agents it means turning project knowledge into something explicit, structured, selective, versioned, and portable, rather than hoping a longer prompt covers the gap.

The reason it exists as a discipline is narrow and practical. You cannot retrain the model. You can change almost everything about what it knows when it starts working, and on real codebases that is what separates an agent that fits your system from one that writes plausible code in the wrong place.

## Why coding agents need engineered context

An agent reads your code. It cannot read the reasoning behind your code.

That gap is not a model weakness, it is an information problem. Nothing in the repository states why the auth module is split the way it is, which migration is half-finished, that the team banned default exports two quarters ago, or that the retry logic in one service exists because of an incident. A model with a perfect understanding of every file still has to guess at all of it.

The observable failures are consistent:

- The agent picks a library you already rejected, because the rejection lives in a closed pull request.
- It puts a new endpoint where its training data says endpoints go, not where yours do.
- It reopens a decision every few sessions, because nothing durable records that it was made.
- It follows a convention correctly on Monday and not on Thursday, because the convention was in a chat message.

Each of these is a context failure with a different shape, and none of them is fixed by a better prompt.

## The five properties of engineered context

Context that holds up is not just more text. It has five properties, and dropping any one of them is where most setups fail.

| Property | What it means | What breaks without it |
| --- | --- | --- |
| **Explicit** | Decisions and constraints are written down, not inferred | The agent reconstructs intent from code and gets it wrong |
| **Structured** | Typed documents with relations, not one growing file | Nothing says which rule governs which directory |
| **Selective** | The agent loads what applies to the work in front of it | The window fills with irrelevant material |
| **Versioned** | Context changes ship in the same pull request as the code | Context and code drift apart silently |
| **Portable** | One setup serves every agent | Each tool gets its own divergent copy |

**Selective** is the property teams skip most often, and it is the one that decides whether the rest is usable. A single instruction file that has grown to a few hundred lines is explicit and versioned and portable, and it is still poor context, because everything in it arrives on every turn whether it applies or not. The agent pays attention budget for the rules about your CSS while it edits a database migration.

## Context engineering compared with the neighbours

These terms get used interchangeably and describe different scopes.

| | Designs | Scope | Cannot |
| --- | --- | --- | --- |
| **Prompt engineering** | The instruction for one turn | A single request | Survive the end of the conversation |
| **Context engineering** | What the agent knows, and when | Every turn, every session | Verify what the agent produced |
| **Harness engineering** | The guides and sensors around the model | The whole agent, including tools and checks | Change the model |
| **RAG** | Retrieval of similar passages | Whatever is indexed | Surface intent, rationale, or what was rejected |

Two of these are worth being precise about, because the confusion is expensive.

**RAG is not context engineering.** Retrieval over a codebase answers "where is this mentioned". It cannot answer "what did we decide and why", because that information was never in the code to retrieve. Similarity search over documents you have not written returns nothing.

**Harness engineering nests inside context engineering.** A harness is everything in an agent except the model itself. [Building one is a specific form of context engineering](/learn/harness-engineering/), which is what the canonical source says, not a discipline that replaces it.

## What belongs in project context

A working rule: include what a new senior engineer would need on their first week and could not get by reading the code.

**Include**

- **Architecture**, and the reasoning behind its shape. Not a diagram of what the directories are, an explanation of why the boundaries fall where they do.
- **Decisions with rationale.** What was chosen, what was rejected, and what would have to change for the decision to be revisited.
- **Rules with scope.** "Handlers return typed errors" is useful. "Handlers under `src/api/` return typed errors, and here is the shape" is applicable.
- **Specs for boundaries.** The contracts other code depends on, stated so a change can be measured against them.
- **Plans in flight.** What is half-done, so a new session continues instead of restarting.

**Exclude**

- Code. The agent can read it.
- Anything secret. Project context is as public as the repository.
- Personal preferences. Those belong in your own tool settings, not in the team's shared truth.
- Anything you will not maintain. Stale context is worse than absent context, because the agent believes it.

## What it looks like in practice

Engineered context is a set of typed documents that the agent loads selectively. Here is a rule scoped to a directory:

```markdown
---
title: "API handlers return typed errors"
status: accepted
---

## Rule

1. WHEN a handler under `src/api/` fails, the handler MUST return an
   `APIError` with a stable `code` field.
2. The handler MUST NOT return a bare string or a raw driver error.

## Rationale

The client maps `code` to user-facing copy and to retry behaviour. A raw
driver error leaks schema details and has no stable identity to map.
```

Two things make that usable as context rather than as documentation. It is scoped, so it is delivered when the agent edits something under `src/api/` and not otherwise. And it is typed, so the agent knows this is a binding rule rather than a suggestion or a historical note.

## How Archcore implements it

[Archcore](/) is a git-native context layer for AI coding agents, and it is built directly on the five properties above.

- **Explicit and structured.** Project knowledge lives as typed Markdown documents in a `.archcore/` directory: specs, architecture decisions, rules, plans, and project knowledge, with named relations between them and a `draft → accepted → rejected` lifecycle.
- **Selective.** Session hooks inject the documents that apply to the file being edited, at the moment of the edit. Agents pull full documents on demand through MCP rather than receiving everything at session start.
- **Versioned.** The directory sits in your repository, so a change to a rule is a diff in a pull request and travels on the same branch as the code it governs.
- **Portable.** The [CLI](/cli/) serves the same directory to every MCP-aware agent, and the [plugin](/plugin/) adds skills, slash commands, and guardrails on the hosts that support them.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

`archcore init` scaffolds the directory, detects your agents, wires MCP and hooks, and imports the instruction files you already wrote.

## Where to start

You do not need a complete map of your system before this pays off. Start with the smallest useful thing and let it accumulate.

1. **Write down the decision you are tired of re-explaining.** One ADR, with the rationale and the rejected alternative.
2. **Scope one rule to one directory.** Pick the convention your agent breaks most often.
3. **Record the next decision when it happens**, rather than reconstructing history.
4. **Review context in pull requests**, so it stays true as the code moves.

The measure of success is not how many documents exist. It is whether the agent stops guessing about the things you have already settled.
