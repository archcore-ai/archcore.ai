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
              The most polished experience for Claude Code, Cursor, Codex CLI,
              and GitHub Copilot CLI. Four slash commands, automatic context
              injection, guardrails.
            </Trans>
          ),
          example: {
            caption: <Trans>What you get inside the agent:</Trans>,
            command:
              "/archcore:init\n/archcore:plan\n/archcore:document\n/archcore:review",
            note: (
              <Trans>
                Everyday context needs no command. Hooks inject the applicable
                rules as the agent edits. The CLI installs as a prerequisite:
                the plugin invokes{" "}
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
              The core context layer for any MCP-aware agent: Gemini CLI,
              OpenCode, Roo Code, Cline. One binary, scriptable in CI.
            </Trans>
          ),
          example: {
            caption: <Trans>What you get on the shell:</Trans>,
            command: "archcore init\narchcore status\narchcore mcp",
            note: (
              <Trans>
                MCP exposes 10 document tools. Use this for Gemini CLI,
                OpenCode, Roo Code, Cline, or pipelines.
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
            caption: <Trans>Run in your shell, then install from /plugins:</Trans>,
            command: "codex plugin marketplace add archcore-ai/plugin\ncodex",
            note: (
              <Trans>
                In Codex, run <code className="font-mono">/plugins</code>, open
                Archcore, select Install plugin. MCP is auto-registered. Hooks
                are experimental on Codex. Turn them on with{" "}
                <code className="font-mono">codex --enable hooks</code>, and
                note they don't run on Windows.
              </Trans>
            ),
          },
        },
        {
          id: "copilot",
          label: <Trans>GitHub Copilot CLI</Trans>,
          blurb: <Trans>Two steps, both required.</Trans>,
          example: {
            caption: <Trans>Run in your shell:</Trans>,
            command:
              'copilot plugin install archcore-ai/plugin:plugins/archcore\narchcore init --agent copilot --project "$PWD"',
            note: (
              <Trans>
                On Copilot the plugin ships no MCP server, so step 2 registers
                a project-level one. Skip it and you get no document tools at
                all. Run it once per repo and commit the result. Copilot CLI
                only: VS Code agent mode has no self-serve plugin install.
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
        caption: <Trans>In a fresh conversation, type:</Trans>,
        command: "/archcore:",
        outputLines: [
          <Trans>
            You should see four commands: init, plan, document, review.
          </Trans>,
        ],
        note: (
          <Trans>
            Nothing listed? Usually it's the CLI not on PATH. Check{" "}
            <code className="font-mono">archcore --version</code>. On Copilot,
            missing document tools mean step 2 (
            <code className="font-mono">archcore init --agent copilot</code>)
            was skipped.
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
          blurb: <Trans>Bash: single curl line.</Trans>,
          example: {
            caption: <Trans>Run in your terminal:</Trans>,
            command:
              "curl -fsSL https://archcore.ai/install.sh | bash\narchcore init",
            note: (
              <Trans>
                <code className="font-mono">init</code> auto-detects installed
                agents (Claude Code, Cursor, Copilot, Gemini CLI…) and writes
                MCP + hooks for each. Idempotent, safe to re-run.
              </Trans>
            ),
          },
        },
        {
          id: "windows",
          label: <Trans>Windows</Trans>,
          blurb: <Trans>PowerShell: single irm line.</Trans>,
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
            <code className="font-mono">archcore doctor</code>. It reports
            MCP registration, hook installation, and tag hygiene in one shot.
          </Trans>
        ),
      },
    },
  ],
};
