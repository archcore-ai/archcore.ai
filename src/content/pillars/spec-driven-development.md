---
title: "Spec-Driven Development for AI Coding Agents — Archcore"
heading: "Spec-Driven Development for AI Coding Agents"
description: "Use spec-driven development with AI coding agents while keeping specs connected to architecture, decisions, rules, plans, and implementation context."
updatedDate: 2026-09-09
related:
  - context-engineering
  - project-context
faq:
  - question: "What is spec-driven development?"
    answer: "Spec-driven development is a practice where a written specification defines what should be built before implementation starts, and the implementation is measured against it. With AI coding agents it has become popular again because a spec gives the agent a target that is precise enough to act on and reviewable enough to correct."
  - question: "Does spec-driven development mean generating code from a spec?"
    answer: "Not in the sense the phrase usually implies. A spec is a contract, not a source file that compiles into an application. It states what a boundary must do so that later code can be checked against it. Treating the spec as the source and the code as a side effect is a different bet, and it breaks the moment the generated code needs to be maintained by hand."
  - question: "What happens to a spec after the feature ships?"
    answer: "This is where most spec workflows fail. A spec written as a handoff artifact goes stale the day it is merged, because nothing reads it again. A spec kept as project context stays useful: the agent loads it when editing the boundary it describes, and a review can check a change against the contract it claims to satisfy."
  - question: "Can I use spec-driven development on an existing codebase?"
    answer: "Yes, and it works better there than on a greenfield project. Do not try to specify the whole system. Write a spec for the boundary you are about to change, or for the one that breaks most often, and let coverage follow the work rather than precede it."
  - question: "How is spec-driven development different from context engineering?"
    answer: "Spec-driven development defines intent: what should be built. Context engineering supplies the broader understanding needed to execute that intent correctly: architecture, prior decisions, constraints, and team rules. A spec is one part of context, not the whole of it."
---

**Spec-driven development** is a practice where a written specification defines what should be built before implementation starts, and the result is measured against it. It is an old idea that AI coding agents made urgent again, because an agent will produce something plausible from almost any instruction, and the only way to tell whether the something is right is to have said in advance what right meant.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

The version of the practice that works with coding agents differs from the classic one in a specific way: the spec does not stop being useful when the code lands.

<span id="why-specs-came-back"></span>

## Why use spec-driven development with coding agents?

For most of the last two decades the honest answer to "where is the spec" was that it was in the ticket, or in someone's head, or in a design doc nobody reopened. That was workable while a human wrote every line, because the person writing the code carried the intent in their head as they typed.

An agent does not carry anything between turns. Given a vague instruction it fills the gap with the most statistically ordinary interpretation, which is exactly what you do not want on a system with an existing shape. The specification is how you close that gap before the work starts rather than in review.

The failure that follows is worth naming, because it is the one this page is really about. Teams adopt a spec practice, produce good specs, ship the feature, and then the spec rots. Six weeks later the code and the spec disagree, and nobody knows which one is wrong. The spec became a handoff artifact instead of a durable part of the project.

## What a spec is, and what it is not

A specification is a **normative contract for a boundary that other things depend on**: an API, an interface, a schema, a protocol, a feature others build against.

That framing rules a few things out.

- It is not a plan. A plan says what work happens in which order. A spec says what the result must do.
- It is not a PRD. A PRD states the product requirement and the reason. A spec states the behaviour that satisfies it.
- It is not documentation of everything. Specifying a boundary nobody depends on is cost with no reader.

The practical test: if breaking this behaviour would break someone else's code, it wants a spec. If it would only surprise you, a rule or a decision is the cheaper instrument.

## Writing a spec an agent can act on

Prose specifications fail on agents for the same reason they fail on new engineers: they are ambiguous about who must do what, and when. Two conventions fix most of it.

**EARS clause order** puts the trigger before the obligation, so the condition is unmissable. **BCP 14 keywords** (MUST, SHOULD, MAY) state the strength of the obligation exactly once per requirement.

```markdown
## Normative Behavior

1. WHEN a client sends `POST /sessions` with valid credentials, the API
   MUST return `201` with a `session_id` and an `expires_at` timestamp.
2. WHEN a client sends `POST /sessions` with invalid credentials, the API
   MUST return `401` and MUST NOT reveal whether the account exists.
3. IF the rate limit for the client IP is exceeded, THEN the API MUST
   return `429` with a `Retry-After` header.

## Failure Behavior

4. IF the session store is unavailable, THEN the API MUST return `503`
   and MUST NOT create a partial session record.
```

The clauses name the trigger, the API response, and the error paths. In a full contract, split compound obligations into separately numbered requirements. Use [BCP 14](https://www.rfc-editor.org/rfc/rfc8174) to distinguish normative keywords from ordinary prose.


## How can you check a spec against code?

Turn a contract clause into an executable check, then prove the check catches a violation. The [session contract example](/examples/session-contract.test.mjs) contains a small in-memory implementation and two Node.js tests for the rate-limit clause above.

The task prompt is: "When a client IP is rate limited, return 429 with a Retry-After header. Preserve session creation below the limit." The implementation returns a response object; it does not run a server, authenticate clients, or calculate rate limits.

Download the source and run it with Node.js 22 or later:

```bash
curl -fsSL https://archcore.ai/examples/session-contract.test.mjs -o session-contract.test.mjs
node --test session-contract.test.mjs
```

Both checks pass. To remove the required header deliberately, run this in a POSIX shell:

```bash
SESSION_DEMO_OMIT_RETRY_AFTER=1 node --test session-contract.test.mjs
```

The rate-limit check fails because `Retry-After` is missing; the below-limit check still passes. We ran both commands with Node.js v25.2.0 on September 9, 2026. The downloadable file includes the implementation and assertions so you can inspect the result.

This demonstrates a contract check and a failing mutation. It is not an agent benchmark or a claim that Archcore guarantees compliance. A full API needs additional tests for authentication, storage failures, concurrency, and the actual HTTP response.

## The spec-driven track

Archcore computes the document package from the requested change and the existing project record.

| Change | Typical documents |
| --- | --- |
| Small fix within existing decisions | No new documents |
| One capability or API boundary | A spec and an implementation plan |
| Initiative spanning capabilities | An umbrella PRD, specs for the capabilities, and a plan |

Ask the agent to plan the work in plain language. It checks what is already recorded before deciding which documents are missing. For an explicit SDD path:

```bash
/archcore:plan sdd auth redesign
```

The expert paths are `sdd`, `sources`, `iso`, and `research`. Use `sources` for market discovery, `iso` for the ISO requirements workflow, and `research` for an investigation. See the [planning reference](https://docs.archcore.ai/guides/commands/) for their scope.

## Keeping specs connected after the merge

This is the part that separates a spec practice that survives from one that becomes archaeology.

**The spec lives in the repository**, next to the code it constrains, so a change to the contract is a diff in the same pull request as the change to the behaviour. A reviewer still needs to check that the document and implementation agree; sharing a commit makes that review possible.

**The spec is loaded when the boundary is edited.** On hosts with pre-write context injection, hooks deliver the applicable spec before an edit, so the contract arrives when it is relevant rather than at the top of a long prompt.

**The spec is checked against the diff.** Before merge, `/archcore:review` compares the branch against the documents that claim it, and `--drift` looks for the case where the code moved and the spec did not.

**The spec is one document among several.** It sits beside the architecture the boundary belongs to, the decisions that shaped it, and the rules the implementation must follow. That relation is the whole argument of the next section.

## Specs are part of context, not a replacement for it

A spec tells the agent what to build. It does not tell the agent:

- where in this repository that kind of code lives
- which library the team already chose, and which one it rejected
- what conventions the surrounding module follows
- which decision would be violated by the obvious implementation
- what is already half-built on another branch

That is [context engineering](/context-engineering/), and it is the broader discipline. **Spec-driven development defines intent. Context engineering supplies the understanding required to execute that intent correctly.**

Getting this relation wrong produces a predictable outcome: a precise spec, implemented in a way that fits no part of the existing system. The code satisfies the contract and still has to be rewritten.

## Where Archcore fits

[Archcore](/) keeps specs and the rest of the context in the same place, in Git.

- **19 typed document types**, including `spec` for boundary contracts, `prd` for requirements, `plan` for implementation, and `adr` for the decisions behind them.
- **Named relations** (`implements`, `extends`, `depends_on`, `related`) so a plan points at the PRD it fulfils and a spec points at the decision that shaped it.
- **A lifecycle** (`draft → accepted → rejected`) so a superseded spec is visibly superseded rather than quietly wrong.
- **Automatic delivery**: the applicable spec reaches the agent when it edits the boundary, without a command.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

Then describe the work. The [plugin](/plugin/) routes it to the right track; the [CLI](/cli/) serves the documents to any MCP-aware agent.

## Starting on an existing codebase

Do not specify the system. Specify the next boundary you touch.

1. **Pick the boundary that breaks most often.** The one where a change keeps surprising another team.
2. **Write its current behaviour as a spec**, not its ideal behaviour. A spec that describes what is true is immediately useful; one that describes an aspiration is a plan in disguise.
3. **Link it to the decision that explains it**, so the next reader gets the reasoning with the contract.
4. **Let coverage follow the work.** Every boundary you change gets a spec on the way past. After a quarter, the parts of the system that change most are the parts that are specified, which is the correct distribution.

Read [spec-driven development vs context engineering](/learn/spec-driven-development-vs-context-engineering/) for how contracts and broader project knowledge work together.
