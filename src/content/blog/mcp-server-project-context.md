---
title: "MCP Server for Project Context: Setup Guide"
description: "An MCP server for project context lets any agent load your decisions, rules, and specs on demand. Why it beats flat instruction files, and how to set one up."
pubDate: 2026-07-30
updatedDate: 2026-09-09
faq:
  - question: "What is an MCP server for project context?"
    answer: "A local Model Context Protocol server that exposes your project's documents (decisions, rules, specs, plans) to AI coding agents as tools: list, search, read, create, update. The agent pulls context on demand during the session instead of having everything pasted into its prompt up front."
  - question: "Which coding agents can use an MCP context server?"
    answer: "Any MCP-aware agent. For Archcore specifically that means Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, and Cline, all reading the same documents from the same repository."
  - question: "Does serving context over MCP use up the context window?"
    answer: "Yes. Tool definitions, the document index, and retrieved content use context. Selective reads can avoid loading unrelated documents, but savings depend on the task and the host. Measure what actually loads."
  - question: "Can the agent write context back through MCP?"
    answer: "Yes, and it should. Write tools (create, update, link) let the agent record decisions and plans as it works, as normal file diffs you review in git rather than notes lost in chat history."
---

An MCP server for project context exposes your repository's engineering record (decisions, rules, specs, plans) to AI coding agents as callable tools. Instead of pasting instructions into every prompt or maintaining a per-tool file like `CLAUDE.md`, the agent lists, searches, and reads project documents on demand, in any MCP-aware host, from Claude Code to Copilot.

This is a practical guide to that pattern: why it beats flat files, what a good context server exposes, and how to stand one up. The walkthrough uses [Archcore](https://archcore.ai/), which is our tool; the design requirements apply to anything you build or adopt.

*Updated September 9, 2026: Reviewed product behavior and comparisons against the linked sources. Clarified installation and update analytics and the current init-to-review walkthrough.*

<span id="why-serve-context-over-mcp-instead-of-instruction-files"></span>

## Why use an MCP server for project context?

Instruction files have two structural problems that get worse as the project grows.

A root instruction file can load content the current task does not need. But scoped files already address part of that problem: [Cursor Rules](https://cursor.com/docs/rules) support conditional loading, and Claude Code supports path-scoped rules and nested instruction files. The [CLAUDE.md guidance](/blog/claude-code-memory/) recommends concise startup instructions; 200 lines is a recommendation for CLAUDE.md, not its read limit.

Instruction loaders differ across tools. Claude Code [does not load AGENTS.md directly](https://code.claude.com/docs/en/memory#agents-md), but supports an import or symlink; Cursor reads both AGENTS.md and CLAUDE.md. Reusing files is possible. MCP becomes useful when you also need a common API for document search, validation, and relations.

MCP exposes those operations through one server. Archcore can register it with Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, and Cline. Check each host's tool permissions and hook support before relying on automatic delivery.

## What should a project-context server expose?

Four capabilities separate a useful context server from a toy. Here is the concrete tool surface Archcore's server exposes, as one worked example:

| Capability | Tools | Why it matters |
|---|---|---|
| Read | `list_documents`, `search_documents`, `get_document`, `list_relations` | The agent finds the rule for the directory it is editing, not a wall of everything |
| Write | `create_document`, `update_document`, `add_relation`, `remove_relation`, `remove_document` | Decisions get captured during work, as reviewable diffs |
| Bootstrap | `init_project` | Works in an empty repo; the agent can initialize `.archcore/` from inside a session |
| Instructions | Sent automatically on connect | The server teaches the agent which document type fits which situation, so you don't explain conventions in every session |

The full parameter reference lives in the [MCP tools docs](https://docs.archcore.ai/reference/mcp-tools/).

Two design points deserve emphasis. The write path is not optional: context that only humans update goes stale, and the whole point collapses. And the instructions-on-connect matter more than they sound, because an agent that doesn't know when to use `create_document` versus `update_document` will do neither.

Archcore's server used to ship MCP prompts as well: pre-orchestrated document cascades that hosts surfaced as slash commands. They were removed in CLI v0.7.0. Prompt support was uneven across hosts, and the same cascades now live in the plugin's skills, where they can gate on what the repo already contains. If you want a guided flow, reach for the plugin's `/archcore:plan` or `/archcore:document`. The MCP surface stays deliberately tool-only.

## How does the agent get context at the right moment?

Tools alone leave one gap: the agent has to know the documents exist before it thinks to query them. Two mechanisms close it.

Session hooks inject a compact index of available documents at the start of every conversation. The agent starts each session knowing what the project has already decided, at the cost of a few hundred tokens.

On-demand loading lets the agent fetch individual documents. The session index and tool definitions still use context, and retrieval can return material the task does not need. Measure the actual calls and token usage before claiming savings. The [memory guide](/blog/claude-code-memory/) distinguishes startup instructions from the separate MEMORY.md index limit.

## What about generic MCP memory servers?

Memory servers vary in what they store and how they retrieve it. Some use local graphs; others use a database or hosted service. The [reference MCP memory server](https://github.com/modelcontextprotocol/servers/blob/main/src/memory/README.md) is one example of portable, structured memory. Evaluate its review, scoping, and export behavior rather than assuming those features are absent.

Project context is the [engineering record](/learn/repo-memory/): decisions the team accepts, rules with scope, and contracts other code depends on. A memory server can store such information, but storage alone does not establish approval or keep a spec aligned with implementation.

The storage question is where the two diverge hardest. Conversation memory typically lives in a database, local or cloud. Project context belongs in the repository, where it's reviewed in pull requests and survives vendor decisions. Cursor's Memories removal made the case for that [better than we ever could](/blog/cursor-memories-removed/).

## How do you set it up?

With Archcore, the local MCP server ships inside the CLI binary. Three commands:

```bash
curl -fsSL https://archcore.ai/install.sh | bash
archcore init
archcore mcp install
```

`archcore init` scaffolds `.archcore/` (and imports existing `CLAUDE.md`, `AGENTS.md`, or `.cursor/rules/` files as structured documents, so you don't start from scratch). `archcore mcp install` registers the server with your agents; `archcore hooks install` adds the session-start index injection. The server runs locally as a child process. The documents it serves are plain Markdown in your repo. No account or hosted backend is required. Installation and updates send limited analytics, with opt-out options described in the [privacy policy](/privacy/).

From there, ask your agent something that needs project knowledge ("what did we decide about auth?", "which rules apply to src/payments/?") and watch the tool calls. The [MCP server docs](https://docs.archcore.ai/guides/connect-your-agent/#mcp) cover manual configuration, and the [how-to-use walkthrough](https://archcore.ai/how-to-use/) covers the init, plan, document, review loop.
