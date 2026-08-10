---
title: "AI Agent Memory vs Project Context: What Each One Holds"
description: "Agent memory records what happened in your sessions. Project context records what the project has decided. Where the line falls and which one you actually need."
pubDate: 2026-08-10
faq:
  - question: "Is agent memory the same as project context?"
    answer: "No. Memory records what happened in a session, which is a property of the conversation. Project context records what the project has decided, which is a property of the repository. One is observed, the other is authored and reviewed."
  - question: "Do I need both?"
    answer: "Often yes, for different things. Memory is genuinely useful for personal preferences and picking up where a session left off. Project context is what a new teammate, a new session, or a different agent needs in order to work correctly. Problems start when memory is used as the engineering record."
  - question: "Why not just let the agent remember decisions?"
    answer: "Because a decision the agent inferred from a conversation has no reviewer, no status, and no reason attached. A teammate cannot approve it, disagree with it, or find out why it was made. It also disappears when the vendor changes the feature, which has already happened at least once."
  - question: "Where should project context live?"
    answer: "In the repository it describes. That is what makes it reviewable in pull requests, versioned with the code it constrains, and portable when you switch tools. A store outside the repository loses all three."
  - question: "What happens to memory when I switch agents?"
    answer: "It does not come with you, because it belongs to the tool. This is the practical test that separates the two categories: project context survives a tool change because it was never in the tool."
---

**Agent memory** records what happened in your sessions. **Project context** records what your project has decided. They sound like the same thing, and treating them as the same thing is how teams end up with their engineering record inside a vendor's cache.

This page is about where the line falls and what belongs on each side.

## The distinction in one table

| | Agent memory | Project context |
| --- | --- | --- |
| **Records** | What happened in a session | What the project says is true |
| **Origin** | Observed automatically | Authored and reviewed |
| **Authority** | Inferred | Decided |
| **Scope** | A user, a tool, a conversation | A repository, a team |
| **Lives in** | The vendor's store or a local database | The repository |
| **Reviewed** | No | In pull requests |
| **Survives a tool change** | No | Yes |
| **Answers** | "What did we talk about?" | "What did we decide, and what applies here?" |

The two rows that matter most are **authority** and **reviewed**. A decision that nobody approved is not a team decision, it is a recollection. And a recollection is a fine thing to have, as long as nothing depends on it being correct.

## What memory is genuinely good at

This is not an argument that memory is useless. It solves real problems:

- **Personal preferences.** You prefer explanations before code, or terse commits. Nobody needs to review that.
- **Session continuity.** Picking up a task you were mid-way through, without re-establishing where you were.
- **Local habits.** Which command you use to run the test suite on your machine.

What these have in common: they are about *you*, they are low-stakes if wrong, and nobody else has to agree with them.

## What memory is the wrong instrument for

The engineering record has the opposite properties. It is about the *project*, it is expensive if wrong, and other people have to agree with it.

Concretely, memory cannot do four things the record requires:

**It cannot be reviewed.** There is no diff, so a teammate cannot approve a change to a rule or object to it. The knowledge changes when the tool decides it changed.

**It cannot be scoped.** A rule that applies to `src/api/` and not elsewhere has nowhere to say so.

**It cannot express supersession.** A decision reversed in June sits next to the one that replaced it, with nothing marking which is current.

**It does not travel.** A teammate on a different agent starts from nothing, and so does CI.

## The failure that makes this concrete

The pattern is common enough to name: a team uses their agent's memory as the record of how the project works. It functions for a few months, because the same person is in the same tool.

Then one of these happens.

- **A teammate joins**, opens a different agent, and gets none of it.
- **The vendor changes the feature.** Cursor removed Memories; anyone using it as an engineering record found out that they had stored project truth in a per-user cache.
- **A decision is quietly wrong**, and nobody can find where it came from or who agreed to it.
- **CI needs the same rules** and cannot get them, because CI is not a conversation.

None of these is a bug in memory. They are consequences of using a session log where a source of truth was required.

## How to tell which one you are looking at

Two questions settle almost every case.

**Would a teammate need to agree with this?** If yes, it is project context. Team standards, architecture, contracts, and decisions all need agreement. "Explain before you code" does not.

**Would it still be true in a different tool?** If yes, it is project context. That the payments module writes through an outbox is true regardless of which agent is open. That you were halfway through refactoring it yesterday is not.

## What project context looks like when it is done properly

The five properties, and each one is a thing memory structurally cannot provide:

- **Explicit.** Written down, with the reasoning, rather than inferred from a conversation.
- **Typed.** A decision, a rule, a spec, and a plan are different kinds of document with different obligations.
- **Scoped.** A rule declares the directory it governs, so it is delivered when relevant.
- **Versioned.** It changes on the branch that made the change necessary, and a reviewer approves it.
- **Portable.** It is files, so every agent reads the same thing.

That is [project context](/project-context/), and the practice of building it is [context engineering](/context-engineering/).

## Where Archcore sits

[Archcore](https://archcore.ai/) is a git-native context layer for AI coding agents, and yes, it is our tool. Specs, architecture, decisions, rules, and plans live as typed Markdown in a `.archcore/` directory inside the repository, versioned with the code and reviewed like it.

Delivery is what makes it usable rather than filed away: session hooks inject the applicable rules when the agent edits a file, and MCP tools let the agent search and read documents during the work. The same directory serves Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, and any other MCP-aware agent.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

Keep using memory for what it is good at. Put the record somewhere it can be reviewed.
