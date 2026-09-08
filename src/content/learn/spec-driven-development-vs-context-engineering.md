---
title: "Spec-Driven Development vs Context Engineering"
description: "Spec-driven development defines intent. Context engineering supplies the understanding needed to execute it. Why a spec is one part of context, not the whole."
pubDate: 2026-08-10
faq:
  - question: "Is spec-driven development a kind of context engineering?"
    answer: "A spec is one artifact within project context, so in that sense yes. But the practices differ in what they optimize. Spec-driven development is about defining intent precisely before implementation. Context engineering is about what the agent knows while implementing, of which the spec is one piece among architecture, decisions, rules, and plans."
  - question: "Can I do spec-driven development without context engineering?"
    answer: "You can, and the result is a common failure: a precise spec implemented in a way that fits no part of the existing system. The contract is satisfied and the code still has to be rewritten, because nothing told the agent where this kind of code lives here or which decision the obvious implementation violates."
  - question: "Can I do context engineering without specs?"
    answer: "Yes, and for many teams that is the right starting point. Architecture, decisions, and scoped rules deliver value immediately. Specs earn their cost at boundaries other code depends on, which is a subset of the system rather than all of it."
  - question: "Which should I start with?"
    answer: "Context, unless you are about to change a boundary other teams depend on. Writing down the decision you keep re-explaining pays off on the next session. Specifying a boundary nobody depends on is cost with no reader."
  - question: "What happens to a spec after the feature ships?"
    answer: "This is where the two practices meet. A spec treated as a handoff artifact goes stale the day it merges. A spec kept as project context stays useful: it is loaded when the boundary is edited and it is what a review measures the diff against."
---

**Spec-driven development defines intent. Context engineering supplies the broader understanding required to execute that intent correctly.**

That single sentence is most of the answer. The rest of this page is why the distinction is worth holding onto, and what goes wrong when it collapses in either direction.

## What each practice optimizes

| | Spec-driven development | Context engineering |
| --- | --- | --- |
| **Question** | What should be built? | What does the agent need to know while building? |
| **Artifact** | A specification, upstream of the code | Architecture, decisions, rules, plans, and specs |
| **Timing** | Before implementation | During every turn of every session |
| **Success** | The result matches the contract | The result fits the system |
| **Fails as** | Code that satisfies the spec and fits nothing | Code that fits the system and does the wrong thing |

Note the two failure modes at the bottom. They are opposite, and each practice is the fix for the other's failure.

## What a spec cannot tell the agent

A specification for a session API can be precise, testable, and complete about behaviour. It still does not say:

- where in this repository that kind of code lives
- which library the team already chose, and which it rejected last quarter
- what conventions the surrounding module follows
- which prior decision the obvious implementation would violate
- what is already half-built on another branch

None of that belongs in the spec. Putting it there would make the contract unreadable and would duplicate knowledge that applies to far more than one boundary. It belongs in [project context](https://archcore.ai/project-context/), which is the broader set.

## What context cannot tell the agent

The reverse gap is just as real, and it is the one teams hit after their context practice matures.

Architecture, decisions, and rules describe how the system *is*. They say nothing about what a new feature is supposed to *do*. An agent that knows your conventions perfectly will still build the wrong thing if nobody stated what "right" meant. Context makes an implementation fit; a spec makes it correct.

## The collapse in both directions

**Collapsing context into specs.** The team writes excellent specifications and treats them as the whole context. Every spec has to restate the architecture and the conventions to be useful, so specs grow, duplicate each other, and drift apart. The first sign is copy-pasted background sections.

**Collapsing specs into context.** The team documents architecture, decisions, and rules well, and never states what a change is supposed to achieve. The agent produces code that fits the system beautifully and solves an adjacent problem. The first sign is review comments about scope rather than style.

## The relation that keeps them straight

A spec is one **type** of document inside project context, with a specific job: the normative contract for a boundary other things depend on.

That framing gives you a usable test for what to write.

| If the knowledge is | Write |
| --- | --- |
| What a boundary must guarantee to others | A spec |
| A choice that was made, and why | A decision |
| A standard that binds code in a directory | A rule |
| The shape of the system and why | Architecture |
| Work in progress and its next step | A plan |

Only the first row is a specification. The other four are context, and they are what most repositories are missing more of.

## Where the two meet: after the merge

The practices converge at exactly the point where spec practices usually fail.

A spec written as a handoff artifact stops being read the day the feature ships. Six weeks later the code and the spec disagree and nobody knows which is wrong.

A spec kept as project context does not have that problem, because it is subject to the same mechanisms as everything else in the repository:

- It lives next to the code it constrains, so it changes on the same branch.
- It is loaded when the agent edits the boundary it describes.
- It is what a review measures the diff against.
- It has a status, so a superseded spec is visibly superseded.

**Context engineering is what gives a spec an afterlife.** Without it, spec-driven development produces good documents that rot on a schedule.

## Practical sequencing

For most teams on an existing codebase:

1. **Write the decisions you keep re-explaining.** Immediate payoff, no ceremony.
2. **Scope the rules your agent breaks most often** to the directories they govern.
3. **Spec the boundary that breaks other people's code**, not the whole system.
4. **Add a spec each time you change a boundary**, so coverage follows the work.

The distribution this produces is the correct one: the parts of the system that change most are the parts that are specified.

## Reading further

- [Spec-driven development for AI coding agents](https://archcore.ai/spec-driven-development/): what a spec is and is not, EARS clause form, and the gated track
- [Context engineering for AI coding agents](https://archcore.ai/context-engineering/): the five properties and why selective delivery matters most
- [Project context](https://archcore.ai/project-context/): what belongs in each document type

[Archcore](https://archcore.ai/) keeps both in the same place, and yes, it is our tool: specs, architecture, decisions, rules, and plans as typed Markdown in a `.archcore/` directory, linked to each other and served to any MCP-aware agent.
