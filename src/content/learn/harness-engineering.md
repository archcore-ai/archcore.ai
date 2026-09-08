---
title: "What Is Harness Engineering? Guides, Sensors, Project Context"
description: "Harness engineering designs the guides and sensors around an AI coding agent. What a harness is, how it relates to context engineering, and which parts are yours."
pubDate: 2026-08-10
faq:
  - question: "What is the difference between harness engineering and prompt engineering?"
    answer: "Prompt engineering optimizes the instruction you hand a model for one turn. Harness engineering designs everything around the model: the tools it can call, the constraints it is given before it acts, and the checks that run after it acts. A better prompt improves one response; a better harness improves every response, including the ones you never read."
  - question: "Is harness engineering replacing context engineering?"
    answer: "No, and the canonical source says the opposite. Birgitta Böckeler, writing on martinfowler.com, states that context engineering provides the means to make guides and sensors available to the agent, and that engineering a harness for a coding agent is a specific form of context engineering. Several vendor posts present a prompt to context to harness progression; that framing is not in the source it cites."
  - question: "What is the difference between a harness and an agent loop?"
    answer: "The loop is the reason, act, observe, repeat cycle that drives the agent. The harness is everything the loop runs against: the tools, the guides given before each action, and the sensors that check the result. Loop engineering designs the cycle; harness engineering designs what the cycle works with."
  - question: "Which parts of the harness do I build, and which come with my agent?"
    answer: "Your coding agent ships a default harness: a loop, file and shell tools, permissions, and a sandbox. What it cannot ship is anything specific to your project, because it has never seen your repository. The architecture your code follows, the decisions already settled, the rules your team enforces, and the specs your boundaries must hold are the half of the harness only you can build."
  - question: "Where should the project half of a harness live?"
    answer: "In the repository it describes. A guide that lives in a vendor's cloud cannot be reviewed in a pull request, cannot be versioned with the code it constrains, and does not travel when you switch agents. Keeping it in git makes the harness reviewable, portable, and owned by the team."
---

**Harness engineering** is the practice of designing everything around an AI coding agent except the model itself: the tools it can call, the guidance it receives before it acts, and the checks that verify what it produced. The term was named and systematized in early 2026, and the shorthand that made it stick is Mitchell Hashimoto's formula, **Agent = Model + Harness**.

The point of the discipline is simple. You cannot retrain the model, but you can change almost everything else about the conditions it works under, and those conditions decide whether an agent is useful on real work or merely impressive in a demo.

## What is in a harness?

The clearest taxonomy comes from Birgitta Böckeler, writing on [martinfowler.com](https://martinfowler.com/articles/harness-engineering.html). It splits the harness into two kinds of control:

- **Guides** are feedforward controls. They steer the agent *before* it acts: the instructions it starts with, the constraints it is told to respect, the documents describing how this system is built.
- **Sensors** are feedback controls. They observe *after* the agent acts, so problems get caught before a human sees them.

Each kind works in two modes. **Computational** controls are deterministic: linters, type checkers, tests, schema validation. **Inferential** controls are semantic: an LLM reviewing a diff, a judge scoring an output, a check on whether a change matches the decision it claims to implement.

A useful way to read your own setup is to sort it into that grid. Most teams discover they have plenty of computational sensors (CI has run tests for years) and almost no guides beyond a single instruction file.

## How does harness engineering relate to prompt engineering and context engineering?

These three are often presented as a progression, where each supersedes the last. That is not what the source material says, and the distinction matters if you are deciding where to spend effort.

| | What it designs | Scope | What it cannot do |
|---|---|---|---|
| **Prompt engineering** | The instruction for one turn | A single request | Survive the end of the conversation |
| **Context engineering** | What knowledge the agent has, and when | Every turn, every session | Verify what the agent produced |
| **Harness engineering** | The guides and sensors around the model | The whole agent, including its tools and checks | Change the model |

Böckeler is explicit that context engineering provides the means to make guides and sensors available to the agent, and that engineering a harness for a coding agent is a specific form of context engineering. The two are nested, not sequential. Prompt engineering is the narrowest of the three: still useful, but it operates on one turn while the other two operate on the system.

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

**It has to live in the repository.** A guide stored in a vendor's cloud cannot be reviewed in a pull request, cannot be versioned alongside the code it constrains, and does not travel when your team switches agents. Keeping the harness in git makes it reviewable, portable, and owned by the team rather than by whichever tool happened to write it.

This is what [Archcore](https://archcore.ai/) is built for, and yes, it is our tool. Specs, architecture, decisions, rules, and plans live as typed Markdown in a `.archcore/` directory, versioned with the code. Session hooks inject the applicable guides when the agent edits a file, so guidance arrives at the moment of the edit rather than at the top of a long prompt. The [CLI](https://archcore.ai/cli/) serves them to any [MCP](https://modelcontextprotocol.io/) aware agent, and the [plugin](https://archcore.ai/plugin/) adds review that checks a branch against the decisions it claims to follow, which is the inferential sensor half of the same taxonomy.

The model is not yours to change. The project half of the harness is, and it is the half that knows what your system is.
