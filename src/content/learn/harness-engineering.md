---
title: "What Is Harness Engineering?"
description: "Harness engineering designs the tools, guidance, and checks around an AI coding agent. See how it relates to context engineering and what your team controls."
pubDate: 2026-08-10
updatedDate: 2026-09-09
faq:
  - question: "What is the difference between harness engineering and prompt engineering?"
    answer: "Prompt engineering designs task, system, and tool instructions, which can be reused across turns. Harness engineering also covers tool access, execution controls, and checks on the output. Prompt quality is one part of that surrounding system."
  - question: "Is harness engineering replacing context engineering?"
    answer: "No, and the canonical source says the opposite. Birgitta Böckeler, writing on martinfowler.com, states that context engineering provides the means to make guides and sensors available to the agent, and that engineering a harness for a coding agent is a specific form of context engineering. Several vendor posts present a prompt to context to harness progression; that framing is not in the source it cites."
  - question: "What is the difference between a harness and an agent loop?"
    answer: "The loop is the reason, act, observe, repeat cycle that drives the agent. The harness is everything the loop runs against: the tools, the guides given before each action, and the sensors that check the result. Loop engineering designs the cycle; harness engineering designs what the cycle works with."
  - question: "Which parts of the harness do I build, and which come with my agent?"
    answer: "Your coding agent ships a default harness: a loop, file and shell tools, permissions, and a sandbox. What it cannot ship is anything specific to your project, because it has never seen your repository. The architecture your code follows, the decisions already settled, the rules your team enforces, and the specs your boundaries must hold are the half of the harness only you can build."
  - question: "Where should the project half of a harness live?"
    answer: "Git is a practical place for project guidance when the team already reviews code there. Hosted storage can also work if it provides review, revision history, and links to the code version. The requirement is a maintained, accessible record."
---

**Harness engineering** means designing the tools, guidance, and checks around an AI coding model. [Birgitta Böckeler's account](https://martinfowler.com/articles/harness-engineering.html) describes guidance before the agent acts and checks on its output.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

The point of the discipline is simple. You cannot retrain the model, but you can change almost everything else about the conditions it works under, and those conditions decide whether an agent is useful on real work or merely impressive in a demo.

<span id="what-is-in-a-harness"></span>

## What does harness engineering cover?

The clearest taxonomy comes from Birgitta Böckeler, writing on [martinfowler.com](https://martinfowler.com/articles/harness-engineering.html). It splits the harness into two kinds of control:

- **Guides** are feedforward controls. They steer the agent *before* it acts: the instructions it starts with, the constraints it is told to respect, the documents describing how this system is built.
- **Sensors** are feedback controls. They observe *after* the agent acts, so problems get caught before a human sees them.

Each kind works in two modes. **Computational** controls are deterministic: linters, type checkers, tests, schema validation. **Inferential** controls are semantic: an LLM reviewing a diff, a judge scoring an output, a check on whether a change matches the decision it claims to implement.

A useful way to read your own setup is to sort it into that grid. Most teams discover they have plenty of computational sensors (CI has run tests for years) and almost no guides beyond a single instruction file.

## How does harness engineering relate to prompt engineering and context engineering?

These three are often presented as a progression, where each supersedes the last. That is not what the source material says, and the distinction matters if you are deciding where to spend effort.

| | What it designs | Scope | What it cannot do |
|---|---|---|---|
| **Prompt engineering** | Task, system, and tool instructions | A request or reusable workflow | Supply facts that were never recorded |
| **Context engineering** | What information the agent has, and when | Retrieval, tools, and state across a task | Establish correctness without checks |
| **Harness engineering** | The guides and sensors around the model | The whole agent, including its tools and checks | Change the model |

Böckeler is explicit that context engineering provides the means to make guides and sensors available to the agent, and that engineering a harness for a coding agent is a specific form of context engineering. The two are nested, not sequential. Prompt design also includes reusable system and tool instructions, so it can affect many turns. Define which controls you mean when comparing these terms.

## What about loop engineering?

**Loop engineering** is the design of the agent's cycle itself: reason, act, observe, repeat, until a goal is met or a budget runs out. It covers how many iterations to allow, when to stop, when to escalate to a human, and how cost is bounded.

It is a neighbouring discipline, not the same one. The loop is the engine; the harness is what the engine runs against. In practice you rarely build the loop yourself, because Claude Code, Codex CLI, Cursor and the others ship one. What you do build is what each turn of that loop reads before acting and writes back after.

## Which half of the harness is actually yours?

Your coding agent already ships a harness. Claude Code has file and shell tools, a multi step loop, and permission prompts before risky actions. That default is what makes it an agent rather than a chatbot, and you did not have to build any of it.

What it cannot ship is anything about *your* project, because it has never seen your repository. That leaves a specific, bounded list on your side:

- **The architecture your code actually follows**, as opposed to the one the model infers from file names.
- **The decisions already settled**, so the agent stops reopening them.
- **The rules your team enforces**, scoped to the directories where they apply.
- **The specs your boundaries must hold**, so a change to an API is measured against a contract instead of a guess.
- **The plans in flight**, so a new session can continue work instead of restarting it.

Those are guides in Böckeler's sense: feedforward controls, delivered before the agent edits. The same documents double as sensor criteria, because "does this change respect the decisions on record" is only answerable if the decisions are on record.

## How do you build the project half?

Two properties decide whether the project half of a harness holds up over time.

**It has to be structured.** A single instruction file is a guide, technically, and it works until it becomes a wall of text with no way to say which rule governs which directory or which decision superseded which. Typed documents with relations, status, and history scale where flat files stop. This is the same argument as [structured project context versus flat instruction files](/learn/repo-memory/).

**Keep the review process close to the code.** Git lets a guide change in the same pull request as the implementation. A hosted system can also provide review and versioning, but needs an explicit association with the code revision it describes.

This is what [Archcore](https://archcore.ai/) is built for, and yes, it is our tool. Specs, architecture, decisions, rules, and plans live as typed Markdown in a `.archcore/` directory, versioned with the code. On hosts with pre-write context injection, hooks deliver applicable guides before an edit, so guidance arrives at the moment of the edit rather than at the top of a long prompt. The [CLI](https://archcore.ai/cli/) serves them to any [MCP](https://modelcontextprotocol.io/) aware agent, and the [plugin](https://archcore.ai/plugin/) adds review that checks a branch against the decisions it claims to follow, which is the inferential sensor half of the same taxonomy.

The model is not yours to change. The project half of the harness is, and it is the half that knows what your system is.
