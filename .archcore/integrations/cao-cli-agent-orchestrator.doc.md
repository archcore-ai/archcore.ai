---
title: "CAO (CLI Agent Orchestrator): Archcore touch points and the unpublished pairing"
status: draft
tags:
  - "integrations"
---

## Overview

CAO (CLI Agent Orchestrator, https://github.com/awslabs/cli-agent-orchestrator, Apache-2.0, AWS Labs) runs a supervisor agent that delegates work to worker agents. Each worker is a separate provider CLI process in its own tmux session. CAO exposes the delegation and memory tools to the agents through its own MCP server, `cao-mcp-server`.

Status of the Archcore pairing:

- A draft integration page and a 29-item cooperation recipe were written on 2026-09-27 against CAO commit `7833115` (2026-09-26).
- No joint run exists. integration-bench has no CAO pairing, task, or experiment. The page carried `evidence: []`.
- On 2026-10-22 the owner removed CAO from the landing integration catalog because the value of the pair is unclear. The page, its Russian body, and the recipe are archived outside this repository in `integration-bench/docs/cao-2026-09/landing-draft/`.

## Content

### Facts the pairing depends on (checked against CAO v2.5.3, 2026-10-08)

Commit `7833115` is an ancestor of v2.5.3, 50 commits behind. Paths are under `src/cli_agent_orchestrator/` at v2.5.3. The check read the source through the GitHub API and ran nothing.

| Topic | Fact at v2.5.3 | Evidence |
|---|---|---|
| Delegation tools | `handoff` (blocking) and `assign` (async) exist. Also `assign_elastic`, `send_message`, `complete_assignment`, `get_handoff_result`. `create_ephemeral_agent` is opt-in. | `mcp_server/server.py:279`, `:568`, `:689`, `:828`, `:1541` |
| CAO memory | `memory_store`, `memory_recall`, `memory_forget`. Markdown files in `CAO_HOME_DIR/memory`, indexed in SQLite. `CAO_HOME_DIR` defaults to `~/.aws/cli-agent-orchestrator`. Memory is per machine, not in Git. | `server.py:1720`, `:1804`; `constants.py:102-106`, `:751` |
| MCP servers per agent | A profile lists servers in the `mcpServers` frontmatter field. A profile with an explicit `allowedTools` list needs `@archcore` added to that list. | `models/agent_profile.py:70`; `utils/tool_mapping.py:178-186` |
| Claude Code provider | CAO passes `--strict-mcp-config` when the profile defines `mcpServers`. Built-in profiles do, so a project `.mcp.json` is not loaded. Archcore must be in each profile. | `providers/claude_code.py:481-511` |
| Working directory | Workers share the supervisor's directory by default. `use_worktree` on handoff and assign isolates a worker. Concurrent record writes in a shared directory can collide. | `server.py:299`, `:324`, `:406` |
| Providers | Default is Kiro CLI. Others: claude_code, codex, kimi_cli, copilot_cli, opencode_cli, hermes, cursor_cli, antigravity_cli, omp, grok_cli, mcode. | `constants.py:63`; `models/provider.py` |
| Instruction files | CAO appends the profile prompt and does not replace the host prompt. Claude Code still reads CLAUDE.md. Codex places the profile prompt before AGENTS.md. Kiro reading of AGENTS.md is unverified. | `providers/claude_code.py:473`; `providers/codex.py:1103-1104` |

v2.5.2 enforces each profile's tool allowlist on delegation. v2.5.3 stops passing `--legacy-ui` to Kiro, which had disabled every MCP tool for Kiro agents before that release.

### The drafted pairing

The recipe asked:

- every agent to search Archcore for project decisions instead of `memory_recall`, and to record decisions in Archcore instead of `memory_store`;
- the supervisor to search Archcore before the first `handoff` or `assign`, to stop on a conflict with an accepted record, and to list the constraining record paths in each delegation message;
- each worker to read the listed records, to search Archcore before its first edit, to write no `.archcore/` records, and to list the decisions its work settled;
- the delegating agent alone to write those decisions as draft records, which avoids write collisions in the shared directory.

The claimed outcome was that all agents of one run check the same decisions, with conflicts caught before work is split. The claim is not measured.

## Examples

### What a first measurement would need

These are the preconditions found on 2026-10-22, not a plan.

- Runtime: tmux 3.3 or later, Python 3.10 or later, uv, and a long-running `cao-server` on `127.0.0.1:9889`. Launch with `cao launch --headless --async`. Status is read by scraping the tmux screen [assumption: expect flaky runs].
- Sandbox: allow local TCP and named pipes, and set `CAO_HOME_DIR` inside the attempt when the sandbox blocks `~/.aws`.
- Task: one supervisor, two workers, and an accepted ADR that conflicts with the request, such as the integer-cents decision in the integration-bench coupon scenario.
- Arms: both tools with the recipe against both tools without it, on the Claude Code provider only.
- Cost: an orchestrated run starts several Claude Code processes [assumption: about 3 to 6 times a single-agent run].
