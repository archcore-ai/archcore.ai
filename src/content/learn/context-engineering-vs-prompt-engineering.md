---
title: "Context Engineering vs Prompt Engineering"
description: "Compare prompt engineering and context engineering for coding agents: task instructions, context delivery, and a worked example of using both."
pubDate: 2026-08-10
updatedDate: 2026-09-09
faq:
  - question: "What is the difference between prompt engineering and context engineering?"
    answer: "Prompt engineering designs instructions for a request or reusable workflow. Context engineering also manages the surrounding information, including retrieved documents, tool results, and task state. A coding agent needs both throughout a task."
  - question: "Is prompt engineering obsolete?"
    answer: "No. Task, system, and tool instructions still shape an agent throughout its work. Context engineering adds the problem of selecting and maintaining the information those instructions operate on."
  - question: "Does a bigger context window replace context engineering?"
    answer: "No. A larger window changes how much the agent can read, not what is authoritative, current, or relevant. Loading the whole repository still leaves the agent guessing which decision is binding and which rule governs which directory, because that was never in the code."
  - question: "Where does harness engineering fit?"
    answer: "Harness engineering covers the tools, guidance, and checks around a model. Our guide uses Birgitta B\u00f6ckeler's framework to relate those controls to context delivery. The terms overlap, so define the responsibilities rather than assuming a universal hierarchy."
  - question: "What should I do first?"
    answer: "Write down the decision you are tired of re-explaining, with its rationale, and scope one rule to the directory it governs. That is a smaller first step than a prompt library and it compounds, because it applies to every future session instead of one."
---

**Context engineering vs prompt engineering** is a difference in scope. Prompt engineering designs instructions, including reusable system and tool prompts. Context engineering also manages the documents, tool results, and other information available when a model acts.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

A coding agent uses both throughout a task. Improving a recurring instruction can affect many turns; improving retrieval changes which project facts accompany those instructions.

<span id="the-core-difference"></span>

## Context engineering vs prompt engineering: what differs?

Prompt engineering shapes instructions; context engineering manages the larger input around them. [Anthropic's engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) treats prompts, tools, retrieval, and context management as connected concerns.

| | Prompt engineering | Context engineering |
| --- | --- | --- |
| **Designs** | Task, system, and tool instructions | The full information available to the agent |
| **Scope** | One request or a reusable workflow | Retrieval, tools, state, and instructions across a task |
| **Who authors it** | A user or the application team | The team configuring the agent and project |
| **Where it lives** | Messages, configuration, prompt libraries | Repository files, application state, or services |
| **Improves** | How the task and constraints are expressed | Which relevant information reaches each step |
| **Still needs** | Relevant facts and validation | Clear instructions and validation |

For example, an instruction can require the agent to read the API contract before editing. Retrieval and hooks determine how that contract actually reaches it.

## Why prompt engineering felt sufficient, and stopped

In a chat-shaped interaction, the prompt *is* the interface. You ask, it answers, you refine. Improving the ask improves the result almost immediately, which is why prompt engineering became a discipline with real techniques behind it.

Coding agents changed the shape. The agent reads files, runs commands, edits code, reads the result, and continues. Between your message and the finished change there are many decisions you did not phrase. Those decisions are made from whatever the agent knows, and what it knows about your project is whatever reached it.

That is not an argument that prompts stopped mattering. It is an argument that the leverage moved.

## What each one actually fixes

Both address failures, and the failures are different.

**A prompt problem** looks like: the agent misunderstood the task, produced the wrong shape of answer, or went too broad. You rephrase, and it gets better. Signal: rewording fixes it.

**A context problem** looks like: the code is correct in general and wrong for this repository. It uses a library you rejected, puts a handler where your architecture does not, reinvents a pattern that exists, or reopens a settled decision. Signal: rewording does not fix it, and you find yourself explaining the same background again.

If you keep repeating project background, record it and check how the agent retrieves it. Repetition alone does not prove that phrasing is irrelevant; test both the instruction and the delivery path.

## Both, in the right order

The two compose, and there is a sensible sequence.

1. **Frame the task clearly.** Prompt engineering, and it is still the cheapest improvement available.
2. **Make the project's rules available.** Context engineering: the architecture, decisions, rules, and specs the agent needs but cannot derive.
3. **Deliver them selectively.** Not everything on every turn; what applies to the file in front of it.
4. **Check the result.** Review against the documents the change claims to satisfy.

Step 3 is the one people skip, and it is where a lot of context efforts quietly fail. A large instruction file is explicit and versioned and still poor context, because everything in it arrives every time and competes with the task for attention.

## The neighbouring terms

Two more terms circulate, and both get placed wrongly.

**Retrieval is one part of context engineering.** It can retrieve code, decision records, or other documents if they are in its sources. It cannot recover reasoning nobody recorded. [Anthropic's context-engineering guide](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) describes retrieval alongside tool design and context management.

**Harness engineering covers the agent's tools, guidance, and checks.** [Our harness-engineering guide](/learn/harness-engineering/) uses Birgitta Böckeler's framework to explain its relationship to context engineering. Terminology varies between authors; the practical task is to identify which inputs and checks your team controls.

## A worked comparison

The task: add rate limiting to the auth endpoints.

**Prompt-engineered.** "Add rate limiting to the auth endpoints. Use the existing middleware pattern, follow our error conventions, and reuse the Redis client rather than adding a dependency." That is a good prompt, and it works. You will write it again next week, and a teammate who does not know these constraints will not write it at all.

**Context-engineered.** You ask for rate limiting. The agent receives the decision recording Redis token buckets and why, the rule for error shapes under `src/auth/`, and the spec for the session API, because those documents are scoped to the code it is about to touch. The constraints arrive whether or not the person asking knew them.

The second setup moves recurring constraints into maintained documents. That costs time to create and review, and the documents still need updates when the code changes.

## Where to start

Not with a prompt library.

1. **Write the decision you are tired of re-explaining**, with its rationale and the alternative you rejected.
2. **Scope one rule to one directory**, the convention your agent breaks most often.
3. **Let the delivery be automatic**, so it arrives at the edit rather than at the top of a conversation.

[Archcore](https://archcore.ai/) does this part, and yes, it is our tool: typed Markdown documents in a `.archcore/` directory, versioned with the code, injected by session hooks and served to any MCP-aware agent. [Context engineering for AI coding agents](https://archcore.ai/context-engineering/) covers the five properties in full.

Keep writing good prompts. They just stopped being the part that scales.
