---
title: "How to Serve Project Context to AI Coding Agents over MCP"
description: "An MCP server for project context lets any agent load your decisions, rules, and specs on demand. Why it beats flat instruction files, and how to set one up."
pubDate: 2026-07-30
faq:
  - question: "What is an MCP server for project context?"
    answer: "A local Model Context Protocol server that exposes your project's documents (decisions, rules, specs, plans) to AI coding agents as tools: list, search, read, create, update. The agent pulls context on demand during the session instead of having everything pasted into its prompt up front."
  - question: "Which coding agents can use an MCP context server?"
    answer: "Any MCP-aware agent. For Archcore specifically that means Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, and Cline, all reading the same documents from the same repository."
  - question: "Does serving context over MCP use up the context window?"
    answer: "Far less than instruction files do. The agent gets a compact index at session start; full documents load only when a tool call actually requests one. A document that is never needed costs nothing."
  - question: "Can the agent write context back through MCP?"
    answer: "Yes, and it should. Write tools (create, update, link) let the agent record decisions and plans as it works, as normal file diffs you review in git rather than notes lost in chat history."
---

An MCP server for project context exposes your repository's engineering record (decisions, rules, specs, plans) to AI coding agents as callable tools. Instead of pasting instructions into every prompt or maintaining a per-tool file like `CLAUDE.md`, the agent lists, searches, and reads project documents on demand, in any MCP-aware host, from Claude Code to Copilot.

This is a practical guide to that pattern: why it beats flat files, what a good context server exposes, and how to stand one up. The walkthrough uses [Archcore](https://archcore.ai/), which is our tool; the design requirements apply to anything you build or adopt.

## Why serve context over MCP instead of instruction files?

Instruction files have two structural problems that get worse as the project grows.

First, they load wholesale. Every line of `CLAUDE.md` or `.cursor/rules/` occupies context in every session, whether the session touches that area or not. The official guidance for Claude Code is to keep `CLAUDE.md` [under 200 lines](/blog/claude-code-memory/) precisely because adherence drops as the file grows. A real project's decisions and specs don't fit in 200 lines.

Second, they are per-tool. Claude Code reads `CLAUDE.md` and [does not read AGENTS.md](https://code.claude.com/docs/en/memory#agents-md). Cursor has its own rules format. Copilot has another. The same knowledge gets duplicated and drifts.

MCP flips both properties. Context lives in one place, the agent queries it when a task actually needs it, and every MCP-aware host speaks the same protocol. One integration covers Claude Code, Cursor, GitHub Copilot, Gemini CLI, Codex CLI, OpenCode, Roo Code, and Cline.

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

Archcore's server also ships 5 MCP prompts (`product_track`, `architecture_track`, `standard_track`, `sources_track`, `iso_track`): pre-orchestrated document cascades that most hosts surface as slash commands. Running `/product_track feature_name="user notifications"` drafts a PRD, waits for your confirmation, then derives a plan and links it back. Useful, but secondary to the tool surface.

## How does the agent get context at the right moment?

Tools alone leave one gap: the agent has to know the documents exist before it thinks to query them. Two mechanisms close it.

Session hooks inject a compact index of available documents at the start of every conversation. The agent starts each session knowing what the project has already decided, at the cost of a few hundred tokens.

On-demand loading does the rest. Full documents only enter the context window when a tool call requests one. A spec the session never touches costs zero tokens. This is the property flat files can't have, and it's why the approach scales past the point where `CLAUDE.md` files [start being truncated or ignored](/blog/claude-code-memory/).

## What about generic MCP memory servers?

Servers like OpenMemory or Cipher also serve "memory" over MCP, and they solve a different problem: recalling facts from past conversations ("the user prefers pnpm"). That layer is personal and automatic.

Project context is a different layer: the [engineering record](/learn/repo-memory/), written deliberately, versioned in git, shared by the whole team. A conversation-memory server can't tell you which ADR blocks a refactor, and a document server shouldn't be storing your personal preferences. Plenty of teams run both.

The storage question is where the two diverge hardest. Conversation memory typically lives in a database, local or cloud. Project context belongs in the repository, where it's reviewed in pull requests and survives vendor decisions. Cursor's Memories removal made the case for that [better than we ever could](/blog/cursor-memories-removed/).

## How do you set it up?

With Archcore, the local MCP server ships inside the CLI binary. Three commands:

```bash
curl -fsSL https://archcore.ai/install.sh | bash
archcore init
archcore mcp install
```

`archcore init` scaffolds `.archcore/` (and imports existing `CLAUDE.md`, `AGENTS.md`, or `.cursor/rules/` files as structured documents, so you don't start from scratch). `archcore mcp install` registers the server with your agents; `archcore hooks install` adds the session-start index injection. The server runs locally as a child process. No accounts, no telemetry, no external services, and the documents it serves are plain markdown in your repo.

From there, ask your agent something that needs project knowledge ("what did we decide about auth?", "which rules apply to src/payments/?") and watch the tool calls. The [MCP server docs](https://docs.archcore.ai/cli/mcp-server/) cover manual configuration, and the [how-to-use walkthrough](https://archcore.ai/how-to-use/) covers the day-to-day workflows.
