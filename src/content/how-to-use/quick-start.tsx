/* Branch 2: Quick start in your project.
 *
 * Plugin/CLI toggle on every step. PRD: landing/how-to-use-interactive-walkthrough.prd.md §R3.
 * Tone rules: landing/messaging-alignment.rule.md — both entry points are equals;
 * frame the choice by the user's agent (Plugin: Claude Code / Cursor / Codex CLI;
 * CLI: any MCP-aware agent). Never frame CLI as a fallback. CLI variants must
 * include a one-line "Why CLI here:" blurb (PRD §R2, acceptance criteria).
 */
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import type { Branch } from "./types";

export const quickStartBranch: Branch = {
  id: "quick-start",
  label: msg`Quick start in your project`,
  blurb: msg`Your first useful command after install, on a fresh repo.`,
  supportsToggle: true,
  steps: [
    {
      id: "bootstrap",
      kind: "variant",
      question: <Trans>What's the fastest first action?</Trans>,
      description: (
        <Trans>
          Land your first piece of structured context — a stack rule, a run
          guide, or your first decision — so the agent has something to read.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Run inside your agent:</Trans>,
          command: "/archcore:init",
          outputLines: [
            <Trans>Detects your stack and proposes a stack rule.</Trans>,
            <Trans>
                Drafts a <code className="font-mono">how-to-run.guide.md</code>{" "}
                from your scripts.
              </Trans>,
            <Trans>Surfaces 2-3 hotspot modules worth capturing next.</Trans>,
          ],
          note: (
            <Trans>
              Everything writes to{" "}
              <code className="font-mono">.archcore/</code> as plain markdown —
              you review the diff like any other commit.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent in plain English:</Trans>,
          command:
            '"Create an ADR titled \'Use PostgreSQL as the primary database\' — pick a sensible status and write the rationale."',
          outputLines: [
            <Trans>
                Agent calls{" "}
                <code className="font-mono">create_document</code> via MCP with{" "}
                <code className="font-mono">type=adr</code>.
              </Trans>,
            <Trans>
                The new file lands in{" "}
                <code className="font-mono">.archcore/</code> with frontmatter
                already filled.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — you choose the document type, the
              path, and exactly when the agent writes. Works with any
              MCP-aware agent (Copilot, Gemini CLI, OpenCode, Cline).
            </Trans>
          ),
        },
      },
    },

    {
      id: "decide",
      kind: "variant",
      question: <Trans>Record a real decision.</Trans>,
      description: (
        <Trans>
          ADRs are the smallest useful unit of repo context. Cascade one into a
          rule and a migration guide so the agent enforces it, not just
          remembers it.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Run inside your agent:</Trans>,
          command: "/archcore:decide use PostgreSQL as the primary database",
          outputLines: [
            <Trans>
                Drafts <code className="font-mono">use-postgres.adr.md</code>{" "}
                with status, context, decision, consequences.
              </Trans>,
            <Trans>
                Offers an <code className="font-mono">adr → rule → guide</code>{" "}
                cascade — accept to also generate the team rule and a
                migration guide.
              </Trans>,
          ],
          note: (
            <Trans>
              You get the full chain of decisions, rules, and guides in one
              pass — relations are wired automatically.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent in plain English:</Trans>,
          command:
            '"Create an ADR for choosing PostgreSQL, then propose a team rule that enforces it, and a migration guide for moving off the dev SQLite."',
          outputLines: [
            <Trans>
                Three <code className="font-mono">create_document</code> calls
                via MCP — one ADR, one rule, one guide.
              </Trans>,
            <Trans>
                Then ask the agent to link them:{" "}
                <code className="font-mono">add_relation(rule implements adr)</code>
                ,{" "}
                <code className="font-mono">add_relation(guide related rule)</code>
                .
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — you pick the cascade shape and the
              relation types by hand instead of accepting the plugin's default.
              Scriptable in CI for batch operations.
            </Trans>
          ),
        },
      },
    },

    {
      id: "verify",
      kind: "variant",
      question: <Trans>Check what was created.</Trans>,
      description: (
        <Trans>
          Confirm the context layer holds what you expect before you start
          editing real code with it loaded.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Ask your agent:</Trans>,
          command: '"List the Archcore documents and show their relations."',
          outputLines: [
            <Trans>
                You should see{" "}
                <code className="font-mono">use-postgres.adr.md</code>,{" "}
                <code className="font-mono">postgres-only.rule.md</code>, and{" "}
                <code className="font-mono">postgres-migration.guide.md</code>.
              </Trans>,
            <Trans>The relation graph already wires them together.</Trans>,
          ],
          note: (
            <Trans>
              The plugin's session hook will now auto-inject these documents
              the next time you edit anything they apply to.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Run on the shell, then ask:</Trans>,
          command:
            "archcore status\n# then in your agent:\n\"List documents and call list_relations to show the graph.\"",
          outputLines: [
            <Trans>
                <code className="font-mono">archcore status</code> prints the
                full document tree with statuses.
              </Trans>,
            <Trans>
                The agent's <code className="font-mono">list_relations</code>{" "}
                call returns the explicit edges you wired.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: status is one shell command — no agent round-trip.
              Useful in pre-commit hooks or PR checks.
            </Trans>
          ),
        },
      },
    },

    {
      id: "next",
      kind: "variant",
      question: <Trans>What to try next.</Trans>,
      description: (
        <Trans>
          You've landed a decision, a rule, and a guide in under five minutes.
          Pick one of these to keep the loop going.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Suggested next commands:</Trans>,
          command:
            "/archcore:capture src/api/      # document an existing module\n/archcore:plan refunds          # turn an idea into a PRD + plan\n/archcore:audit                  # spot drift before it grows",
          note: (
            <Trans>
              Every command writes to{" "}
              <code className="font-mono">.archcore/</code> — review in
              the PR, accept what fits, edit the rest.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Suggested next asks:</Trans>,
          command:
            '"Capture a spec for src/api/."\n"Draft a PRD for a refunds feature, link the existing payments ADR."\n"Audit .archcore/ for stale documents."',
          note: (
            <Trans>
              Why CLI here: finer control — every action is a named MCP call
              you can replay, version, or run in CI.
            </Trans>
          ),
        },
      },
    },
  ],
};
