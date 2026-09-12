---
title: "AI Agent Memory vs Project Context"
description: "Agent memory records what happened in your sessions. Project context records what the project has decided. Where the line falls and which one you actually need."
pubDate: 2026-08-10
updatedDate: 2026-09-09
faq:
  - question: "Is agent memory the same as project context?"
    answer: "They overlap in what they can store. Agent memory retains information across sessions; project context is the knowledge needed to work on a codebase. A remembered decision becomes a dependable engineering record when its authority, scope, and maintenance are explicit."
  - question: "Do I need both?"
    answer: "Often yes, for different things. Memory is genuinely useful for personal preferences and picking up where a session left off. Project context is what a new teammate, a new session, or a different agent needs in order to work correctly. Problems start when memory is used as the engineering record."
  - question: "Why not just let the agent remember decisions?"
    answer: "You can let the agent draft and retain a decision. Before the team relies on it, check the rationale, agree on its status, and make it accessible to the people and agents who need it. Automatic capture alone does not establish approval."
  - question: "Where should project context live?"
    answer: "Git is a practical choice when the team already reviews code in pull requests: the record can change on the same branch. An external system can work too if it provides review, history, access, and links to the code revision it describes."
  - question: "What happens to memory when I switch agents?"
    answer: "It depends on storage and integrations. A local MCP memory server can serve several clients; vendor memory may need an export. Check the actual export and access paths before depending on either. Git-backed project documents travel with the repository."
---

**Agent memory** retains information across sessions. **Project context** is the knowledge an agent needs to work on a particular codebase. Both can contain decisions. The useful distinction is whether a remembered statement has become a reviewed part of the engineering record.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

The comparison below uses local or vendor-managed session memory as a starting point. Implementations differ: [Claude Code memory is editable Markdown](https://code.claude.com/docs/en/memory), and the [reference MCP memory server](https://github.com/modelcontextprotocol/servers/blob/main/src/memory/README.md) stores a local graph. Neither category implies a single storage format.

<span id="the-distinction-in-one-table"></span>

## AI agent memory vs project context: what differs?

The table compares a session-memory workflow with an explicitly maintained project record. A memory system can acquire the properties in the right column if your team implements them.

| | Session-memory workflow | Reviewed project context |
| --- | --- | --- |
| **Records** | Useful facts from work and conversations | Knowledge the team relies on |
| **Origin** | Captured by an agent or a person | Drafted by an agent or person, then reviewed |
| **Authority** | Depends on who checked the note | Approval and current status are explicit |
| **Scope** | Depends on the implementation | Project or directory scope is recorded |
| **Lives in** | Files, a local graph, or a service | Git in the workflow described here |
| **Reviewed** | Possible, but must be arranged | Part of the pull request |
| **Survives a tool change** | Depends on export and integrations | Files remain in the repository |
| **Answers** | What information is worth retaining? | What applies here, and why? |

Check authority and review before treating an automatically captured statement as a team decision.

## What memory is genuinely good at

This is not an argument that memory is useless. It solves real problems:

- **Personal preferences.** You prefer explanations before code, or terse commits. Nobody needs to review that.
- **Session continuity.** Picking up a task you were mid-way through, without re-establishing where you were.
- **Local habits.** Which command you use to run the test suite on your machine.

What these have in common: they are about *you*, they are low-stakes if wrong, and nobody else has to agree with them.

## What memory is the wrong instrument for

Memory without an agreed review process is a weak place for binding engineering decisions. Before using a memory store as that record, check four things.

**Review.** Can a teammate inspect the change and approve or reject it? An editable note provides access; approval needs a workflow.

**Scope.** Can a rule name the directory it governs, and will the host deliver it at the right time? Nested instruction files and conditional rules already solve part of this.

**Supersession.** When a decision changes, can a reader find both the new decision and the reason the old one no longer applies?

**Access.** Can another agent or CI read the same revision? A shared MCP service can provide access, while a machine-local cache needs additional setup.

Git plus typed documents is one way to meet these requirements. Other systems should be compared against the same checks.

## The failure that makes this concrete

The pattern is common enough to name: a team uses their agent's memory as the record of how the project works. It functions for a few months, because the same person is in the same tool.

Then one of these happens.

- **A teammate joins**, opens a different agent, and gets none of it.
- **The vendor changes the feature.** Cursor removed Memories; anyone using it as an engineering record found out that they had stored project truth in a per-user cache.
- **A decision is quietly wrong**, and nobody can find where it came from or who agreed to it.
- **CI needs the same rules**, but its job has no access to the storage used by the agent.

These failures arise when the team assumes sharing and approval exist without checking them. They can be addressed in a memory system or in a separate engineering record.

## How to tell which one you are looking at

Two questions settle almost every case.

**Would a teammate need to agree with this?** If yes, it is project context. Team standards, architecture, contracts, and decisions all need agreement. "Explain before you code" does not.

**Would it still be true in a different tool?** If yes, it is project context. That the payments module writes through an outbox is true regardless of which agent is open. A refactoring checkpoint can also be useful across tools, but it is task state rather than an approved engineering decision.

## What project context looks like when it is done properly

The engineering record needs these properties, whichever storage system supplies them:

- **Explicit.** Written down, with the reasoning, rather than inferred from a conversation.
- **Typed.** A decision, a rule, a spec, and a plan are different kinds of document with different obligations.
- **Scoped.** A rule declares the directory it governs, so it is delivered when relevant.
- **Versioned.** It changes on the branch that made the change necessary, and a reviewer approves it.
- **Portable.** It is files, so every agent reads the same thing.

That is [project context](/project-context/), and the practice of building it is [context engineering](/context-engineering/).

## Where Archcore sits

[Archcore](https://archcore.ai/) is a git-native context layer for AI coding agents, and yes, it is our tool. Specs, architecture, decisions, rules, and plans live as typed Markdown in a `.archcore/` directory inside the repository, versioned with the code and reviewed like it.

Archcore serves the documents through MCP. On hosts with pre-write context injection, hooks also deliver applicable rules before an edit. The [host matrix](https://docs.archcore.ai/guides/connect-your-agent/#supported-hosts) describes the delivery available in Claude Code, Cursor, Codex CLI, Copilot, and other agents.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

Keep using memory for what it is good at. Put the record somewhere it can be reviewed.
