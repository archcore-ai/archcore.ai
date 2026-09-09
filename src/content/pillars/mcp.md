---
title: "MCP Server for AI Coding Agent Context — Archcore"
heading: "MCP for AI Coding Agent Context"
description: "Expose structured project context to AI coding agents through MCP, including specs, ADRs, rules, plans, and project knowledge."
updatedDate: 2026-09-09
related:
  - project-context
  - context-engineering
faq:
  - question: "What is MCP?"
    answer: "The Model Context Protocol is an open standard for connecting AI agents to external tools and data. An MCP server exposes a set of tools; any MCP-aware agent can call them. It removes the need for a separate integration per agent, because the agent speaks the protocol rather than your API."
  - question: "Why serve project context over MCP instead of a file the agent reads?"
    answer: "Both file tools and MCP can read and write project documents. MCP gives agents a common API for filtering by type or status, searching, validating writes, and managing relations. Whether that saves context depends on which documents the agent loads."
  - question: "Does an MCP context server fill the context window?"
    answer: "Not if it is built for retrieval rather than dumping. The session opens with a compact index of available documents, and full documents are fetched on demand through search, relations, and single reads. The alternative, pasting everything at session start, is what actually fills the window."
  - question: "Does the MCP server need to run remotely?"
    answer: "No. Archcore's server runs locally over stdio as a child process of your agent, reading a directory in your repository. Document access requires no account or hosted backend. Local stdio is also what makes it usable in CI and on private code."
  - question: "Which agents can use an MCP context server?"
    answer: "Any MCP-aware agent. Archcore's CLI is wired for eight today: Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, OpenCode, Roo Code, and Cline. Anything else that speaks the protocol works the same way, because the server is not an integration per vendor."
---

The **Model Context Protocol** is an open standard for connecting AI agents to tools and data. An MCP server exposes a set of tools; any MCP-aware agent can call them without a bespoke integration.

For project context that matters more than it first appears, because it changes context from something an agent *is given* into something an agent can *use*.

*Updated September 9, 2026: Reviewed product behavior and comparisons against the linked sources. Clarified that local document access does not require a hosted backend. Installation and update analytics are described in the [privacy policy](/privacy/).*

## Why a protocol and not a file

An agent with file tools can read selected files, search text, and write a decision back to Markdown. Nested instruction files and scoped rules can also limit what loads. These are useful starting points.

MCP adds a shared interface for operations that would otherwise depend on each agent's scripts and conventions. Archcore tools expose document types, status filters, validated writes, and relations. The agent can follow a link from a spec to its supporting decision without inventing that operation anew.

The [MCP tools specification](https://modelcontextprotocol.io/specification/latest/server/tools) defines how servers expose callable operations. It does not guarantee that an agent chooses the right documents or that retrieval uses fewer tokens in every task. Those properties depend on the server, host, and workflow.

## What a context server should expose

A context server is not a file browser with extra steps. The tool surface decides whether an agent uses it well.

| Capability | Why it matters |
| --- | --- |
| **List with filters** | The agent needs an index before it needs content: what exists, of what type, at what status |
| **Search over bodies** | Finding by topic is how an agent locates the rule that applies to the work |
| **Read one document** | Full content on demand, rather than everything up front |
| **Create and update** | So a decision made during the session is recorded, not lost |
| **Relations** | So the agent can walk from a spec to the decision that shaped it |

Two design points are worth stating because they are where these servers usually go wrong.

**The index comes first.** Opening a session with a compact list of what exists, rather than the content of everything, is what keeps the context window free. The agent then pulls the two documents it actually needs.

**Writes must validate.** A tool that accepts any Markdown produces a store that degrades. Rejecting a document with missing or malformed frontmatter is what keeps the corpus machine-readable a year later.

## Local stdio, and why it matters

Archcore's MCP server runs **locally, over stdio**, as a child process of your agent. It reads a directory inside your repository. Document access requires no account or hosted backend.

That is not only a privacy position, though it is that too. It is what makes the server usable at all in the places project context is needed: on private code, inside CI, on a machine with no outbound access, and in a repository whose contents cannot leave the building.

It also removes a class of failure. A hosted context service is one more thing that can be down, rate-limited, or slow while an agent waits on it.

## Wiring it up

The CLI writes the MCP config for each agent it supports, so you do not hand-edit JSON per host:

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

`archcore init` detects the agents present, registers the local MCP server for each, and installs session hooks where the host supports them. To wire a single agent afterwards:

```bash
archcore mcp install --agent cursor
archcore hooks install --agent cursor
```

To run the server directly, which is what the host does under the hood:

```bash
archcore mcp
```

**Coverage today:** eight agents over MCP (Claude Code, Cursor, Codex CLI, GitHub Copilot, Gemini CLI, OpenCode, Roo Code, Cline), with session hooks on five of them. Anything else that speaks MCP works the same way, because the server is a protocol implementation rather than a per-vendor integration.

## MCP and hooks do different jobs

This distinction is easy to miss and decides how much the setup does for you.

**MCP is pull.** The agent asks: search, read, create, link. It happens because the agent decided it needed something.

**Hooks provide context at host events.** Session-start hooks deliver a recap. On hosts that support pre-write context injection, rules and specs can arrive before an edit. See the [host matrix](https://docs.archcore.ai/plugin/supported-hosts/) for the differences.

Pull alone means the agent has to know that context exists before it can use it, which is exactly the thing a fresh session does not know. Push alone cannot answer a question that arises mid-task. Both together are what makes the everyday case require no command at all.

## MCP is the transport, not the strategy

A server is a delivery mechanism. It does not decide what is worth delivering.

If the underlying documents are a wall of untyped text, exposing them over MCP gives the agent a fast way to retrieve unstructured material. The value comes from the layer below: typed documents, scoped rules, explicit relations, a visible lifecycle. That is [context engineering](/context-engineering/), and MCP is how the result reaches the agent.

Put the other way round: MCP solves the distribution problem, and only the distribution problem. It is worth solving, because distribution is what makes one setup serve every agent instead of one file per tool.

## Where to go next

- [Set up an MCP server for project context](/blog/mcp-server-project-context/) gives a worked installation and verification procedure.
- [Project context](/project-context/) covers what belongs in the documents this server exposes.
- [Git-native context](/git-native-context/) covers why they live in the repository rather than a database.
- The [CLI](/cli/) page has the full command surface and the agent support matrix.
