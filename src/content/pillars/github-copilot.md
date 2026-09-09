---
title: "Project Context for GitHub Copilot — Archcore"
heading: "Context Engineering for GitHub Copilot"
description: "Give GitHub Copilot CLI structured project context from Git: specs, architecture decisions, rules, and plans, served over a local MCP server."
updatedDate: 2026-09-09
related:
  - context-engineering
  - project-context
  - mcp
faq:
  - question: "Why does Copilot need two install steps?"
    answer: "Copilot launches a plugin's MCP server in the plugin install directory with no project path (github/copilot-cli#4234), so a plugin-provided server would serve the plugin cache instead of your repository. The plugin therefore ships no MCP server to Copilot at all, and the project-level one written by archcore init is the only source of document tools."
  - question: "What happens if I skip the second step?"
    answer: "You get a plugin with no document tools. Archcore CLI v0.6.7 and later refuses to serve from a plugin cache, so the failure is loud rather than silent, but the fix is the same either way: run archcore init --agent copilot --project \"$PWD\" once per repository and commit the result."
  - question: "Does this work in VS Code or on cloud agents?"
    answer: "Copilot CLI only. VS Code agent mode has no self-serve plugin install, and cloud-agent sandboxes do not load plugin hooks."
  - question: "Does Copilot get pre-write context injection?"
    answer: "No. Copilot has session hooks but no pre-write context injection today, so the applicable rules are not pushed to the agent immediately before an edit. MCP tools work fully, so the agent can pull any document it needs, and /archcore:review remains the checkpoint before merge."
  - question: "Does Archcore replace Copilot custom instructions?"
    answer: "Not on day one. Custom instructions are a flat set of preferences for one tool. Archcore adds typed documents with per-directory scope, relations, status, and the same knowledge served to every other agent."
---

Archcore gives GitHub Copilot CLI structured project context from Git, including specs, architecture decisions, rules, plans, and project knowledge, so the agent can follow how your repository is actually built.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

Copilot CLI is a **plugin host** with two host-specific constraints that shape how you set it up. Both are covered below rather than buried, because getting either wrong produces an agent with no document tools.

## What Archcore adds to GitHub Copilot

Copilot writes code fluently and knows nothing about your project's history. Archcore supplies the layer that is not in the source: which decisions are settled, which rules bind which directories, what your boundaries must guarantee, and what is currently half-built.

- **At session start**, the document index and a recap of decided and in-progress work.
- **During the work**, MCP tools to search, read, create, and link documents.
- **Before the merge**, a review of the branch against the documents that claim it.

## Installation

**Two steps, and both are required.** This is the part to get right.

```bash
# 0. Install the Archcore CLI first (it serves the MCP server)
curl -fsSL https://archcore.ai/install.sh | bash    # macOS / Linux
# Windows: irm https://archcore.ai/install.ps1 | iex

# 1. Install the plugin from this repository's plugin subdirectory
copilot plugin install archcore-ai/plugin:plugins/archcore

# 2. Wire your project. Run once per repository, and commit the result.
archcore init --agent copilot --project "$PWD"
```

Step 2 is not optional, and the reason is specific. Copilot launches a plugin's MCP server **in the plugin install directory with no project path** ([github/copilot-cli#4234](https://github.com/github/copilot-cli/issues/4234)), so a server shipped by the plugin would read the plugin cache rather than your repository. Archcore therefore declares an empty `mcpServers` for Copilot on purpose, and the project-level entry written in step 2 is the only source of document tools.

Archcore CLI v0.6.7 and later refuses to serve from a plugin cache, so a missed step 2 fails loudly instead of quietly serving the wrong directory.

**Copilot CLI only.** VS Code agent mode has no self-serve plugin install, and cloud-agent sandboxes do not load plugin hooks.

## Project context

Context lives as typed Markdown in `.archcore/` inside your repository:

```
.archcore/
  architecture/
    read-write-split.adr.md      # a decision, with rationale
    session-api.spec.md          # a contract for a boundary
  api/
    typed-errors.rule.md         # scoped to src/api/
  auth/
    migration-q3.plan.md         # work in flight
```

Each document carries a type, a status, and named relations (`implements`, `extends`, `depends_on`, `related`). See [project context](/project-context/) for what belongs in each.

## Spec-driven development

`/archcore:plan` reads the request and existing project documents, then chooses the document package. A small fix can need no new documents. One capability usually needs a spec and a plan; a larger initiative can need an umbrella PRD and a spec per capability. The [planning reference](https://docs.archcore.ai/plugin/skills/) describes the routes.

For an explicit SDD path, use:

```
/archcore:plan sdd billing webhooks
```

The spec stays in the repository, so it can be loaded later and checked against a diff rather than filed away. [Spec-driven development](/spec-driven-development/) covers that in full.

## Automatic context and hooks

The second host-specific constraint, stated plainly:

| | Status on Copilot CLI |
| --- | --- |
| **MCP tools** | Full, once step 2 is done |
| **Session hooks** | Yes |
| **Pre-write context injection** | Not available today |

On Claude Code and Cursor, the applicable rules are pushed to the agent immediately before it edits a file. Copilot does not offer that hook point yet, so on this host **context is pulled rather than pushed** at the moment of the edit.

That changes the working pattern in one way worth planning around. Ask the agent what applies before a substantial change, and treat `/archcore:review` before merge as the checkpoint that continuous injection would otherwise cover. The documents themselves are identical; only the delivery moment differs.

## MCP

The project-level MCP server is what makes everything else work here.

```bash
archcore init --agent copilot --project "$PWD"
```

That writes the project-scoped configuration pointing at your repository. The server reads documents locally over stdio as a child process. Document access requires no hosted backend; the [privacy policy](/privacy/) covers installation and update analytics. See the [MCP page](/mcp/) for the tool surface.

## Compared with Copilot custom instructions

| | Custom instructions | Archcore |
| --- | --- | --- |
| **Holds** | Preferences for this tool | What the project says is true |
| **Structure** | Flat text | Typed documents with relations |
| **Scope** | Repository instructions or path-specific instruction files | Per-document scope |
| **Status** | None | `draft → accepted → rejected` |
| **Rationale** | Can be written in the instructions | Decisions linked to the rules they produced |
| **Other agents** | No | Yes, the same directory |

[Copilot custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot) can describe project knowledge and use path-specific files where supported. Archcore adds explicit document types, status, and relations. Choose that structure when the team needs to trace a rule back to the decision that produced it.

## Worked example

This is an illustrative scenario. The outcome depends on the agent reading the relevant documents and on review catching violations; it is not a measured comparison.

You ask Copilot to add a new column to the orders table and expose it through the API.

**Without project context.** It writes a migration in whatever style it saw most, exposes the field directly, and does not know that the API layer maps database names to a stable external contract deliberately, because leaking column names was a documented incident.

**With Archcore.** You ask what applies before starting; the agent pulls the spec for the orders API, the rule about field mapping under `src/api/`, and the decision that explains why. The migration and the mapping both land correctly, and review confirms the change against the spec it claims to satisfy.

## Next

- [Project context](/project-context/): what belongs in the documents
- [MCP](/mcp/): the transport this host depends on entirely
- [Plugin](/plugin/): the full command surface and host matrix
