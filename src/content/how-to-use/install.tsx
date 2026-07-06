/* Branch 1: How to install Archcore.
 *
 * No plugin/cli toggle — the plugin-vs-cli choice IS the branch itself
 * (see PRD landing/how-to-use-interactive-walkthrough.prd.md §R2).
 *
 * Install commands here mirror what lives on `/plugin` (plugin-hero-section.tsx)
 * and `/cli` (cli-hero-section.tsx + install-command.tsx). If you change install
 * commands on those pages, update them here too — and vice versa. The canonical
 * tone/copy rule is messaging-alignment.rule.md.
 */
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import type { Branch } from "./types";

export const installBranch: Branch = {
  id: "install",
  label: msg`How to install Archcore`,
  blurb: msg`Pick the right entry point and walk through install + verification.`,
  supportsToggle: false,
  steps: [
    {
      id: "choose-path",
      kind: "choice",
      question: <Trans>Plugin or CLI?</Trans>,
      description: (
        <Trans>
          Both paths use the same{" "}
          <code className="font-mono text-[0.95em]">.archcore/</code>{" "}
          directory. The difference is the experience layer.
        </Trans>
      ),
      next: (answer) => (answer === "plugin" ? "plugin-host" : "cli-os"),
      choices: [
        {
          id: "plugin",
          label: <Trans>Plugin</Trans>,
          blurb: (
            <Trans>
              The most polished experience for Claude Code, Cursor, and Codex
              CLI. Seven slash commands, automatic context injection,
              guardrails.
            </Trans>
          ),
          example: {
            caption: <Trans>What you get inside the agent:</Trans>,
            command:
              "/archcore:init\n/archcore:context\n/archcore:capture\n/archcore:plan\n/archcore:decide\n/archcore:audit\n/archcore:help",
            note: (
              <Trans>
                The CLI installs as a prerequisite — the plugin invokes{" "}
                <code className="font-mono">archcore</code> from your PATH.
              </Trans>
            ),
          },
        },
        {
          id: "cli",
          label: <Trans>CLI</Trans>,
          blurb: (
            <Trans>
              The core context layer for any MCP-aware agent — Copilot, Gemini
              CLI, OpenCode, Cline. One binary, scriptable in CI.
            </Trans>
          ),
          example: {
            caption: <Trans>What you get on the shell:</Trans>,
            command: "archcore init\narchcore status\narchcore mcp",
            note: (
              <Trans>
                MCP exposes 10 tools and 5 prompt cascades. Use this for
                Copilot, Gemini CLI, OpenCode, Cline, or pipelines.
              </Trans>
            ),
          },
        },
      ],
    },

    /* ---- Plugin path: pick a host, then verify ---- */
    {
      id: "plugin-host",
      kind: "choice",
      question: <Trans>Which host are you using?</Trans>,
      description: (
        <Trans>
          Each host installs the plugin a little differently. We'll show the
          one-line install for yours.
        </Trans>
      ),
      next: () => "plugin-verify",
      choices: [
        {
          id: "claude",
          label: <Trans>Claude Code</Trans>,
          blurb: <Trans>Anthropic's terminal coding agent.</Trans>,
          example: {
            caption: <Trans>Run inside Claude Code:</Trans>,
            command:
              "/plugin marketplace add archcore-ai/plugin\n/plugin install archcore@archcore-plugins",
            note: (
              <Trans>
                MCP is auto-registered. The CLI is auto-installed on first use
                if it's not already on PATH.
              </Trans>
            ),
          },
        },
        {
          id: "cursor",
          label: <Trans>Cursor 2.5+</Trans>,
          blurb: <Trans>Plugins panel → paste URL.</Trans>,
          example: {
            caption: <Trans>Open Cursor → Plugins → paste this URL:</Trans>,
            command: "https://github.com/archcore-ai/plugin",
            note: (
              <Trans>
                Then copy <code className="font-mono">cursor.mcp.json</code>{" "}
                from the installed plugin root into{" "}
                <code className="font-mono">~/.cursor/mcp.json</code>. Cursor
                doesn't auto-register plugin MCP.
              </Trans>
            ),
          },
        },
        {
          id: "codex",
          label: <Trans>Codex CLI 0.117+</Trans>,
          blurb: <Trans>One marketplace command.</Trans>,
          example: {
            caption: <Trans>Run in your shell:</Trans>,
            command:
              "codex plugin marketplace add archcore-ai/plugin\ncodex features enable plugin_hooks",
            note: (
              <Trans>
                MCP is auto-registered.{" "}
                <code className="font-mono">plugin_hooks</code> is a feature
                flag (default off) — enable it for validation, cascade, and
                pre-edit injection.
              </Trans>
            ),
          },
        },
      ],
    },
    {
      id: "plugin-verify",
      kind: "info",
      terminal: true, // don't fall through to cli-os
      question: <Trans>Verify the install</Trans>,
      description: (
        <Trans>
          Restart the host so the session-start hook can run, then check that
          the slash commands are wired up.
        </Trans>
      ),
      example: {
        caption: <Trans>In a fresh conversation, run:</Trans>,
        command: "/archcore:help",
        outputLines: [
          <Trans>You should see the seven /archcore:* commands.</Trans>,
        ],
        note: (
          <Trans>
            Nothing listed? See plugin troubleshooting in the docs. Usually
            it's the CLI not on PATH, or Codex's{" "}
            <code className="font-mono">plugin_hooks</code> flag is off.
          </Trans>
        ),
      },
    },

    /* ---- CLI path: pick OS, install, then verify ---- */
    {
      id: "cli-os",
      kind: "choice",
      question: <Trans>Which platform?</Trans>,
      description: (
        <Trans>
          One binary, no daemon, no account. After install,{" "}
          <code className="font-mono">archcore init</code> wires{" "}
          <code className="font-mono">.archcore/</code>, registers MCP, and
          installs session hooks for every coding agent it finds.
        </Trans>
      ),
      next: () => "cli-verify",
      choices: [
        {
          id: "unix",
          label: <Trans>macOS / Linux</Trans>,
          blurb: <Trans>Bash — single curl line.</Trans>,
          example: {
            caption: <Trans>Run in your terminal:</Trans>,
            command:
              "curl -fsSL https://archcore.ai/install.sh | bash\narchcore init",
            note: (
              <Trans>
                <code className="font-mono">init</code> auto-detects installed
                agents (Claude Code, Cursor, Copilot, Gemini CLI…) and writes
                MCP + hooks for each. Idempotent — safe to re-run.
              </Trans>
            ),
          },
        },
        {
          id: "windows",
          label: <Trans>Windows</Trans>,
          blurb: <Trans>PowerShell — single irm line.</Trans>,
          example: {
            caption: <Trans>Run in PowerShell:</Trans>,
            command:
              "irm https://archcore.ai/install.ps1 | iex\narchcore init",
            note: (
              <Trans>
                Open a new PowerShell window after install so the PATH change
                is picked up. Then <code className="font-mono">archcore init</code>{" "}
                from your repo root.
              </Trans>
            ),
          },
        },
      ],
    },
    {
      id: "cli-verify",
      kind: "info",
      question: <Trans>Verify the install</Trans>,
      description: (
        <Trans>
          Open your coding agent in the project root and ask a question that
          requires MCP. If the agent can answer, MCP is wired up.
        </Trans>
      ),
      example: {
        caption: <Trans>Ask in your agent:</Trans>,
        command: '"What Archcore documents exist in this project?"',
        outputLines: [
          <Trans>
              You should get a "none yet" answer (or a list, if you've already
              created docs).
            </Trans>,
        ],
        note: (
          <Trans>
            Agent didn't recognize the question? Run{" "}
            <code className="font-mono">archcore doctor</code> — it reports
            MCP registration, hook installation, and tag hygiene in one shot.
          </Trans>
        ),
      },
    },
  ],
};
