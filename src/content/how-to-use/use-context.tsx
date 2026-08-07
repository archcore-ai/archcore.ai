/* Branch 5: Solve tasks with existing context.
 *
 * Plugin/CLI toggle on every step. PRD: landing/how-to-use-interactive-walkthrough.prd.md §R3.
 * Plugin: context injection is automatic (hooks, no command since v0.7.0);
 * /archcore:review checks the branch after. CLI: equivalent via MCP
 * search_documents + list_documents, review by hand.
 *
 * Tone rules: landing/messaging-alignment.rule.md. CLI variants carry a one-line
 * "Why CLI here:" blurb; never "fallback" or "alternative".
 */
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import type { Branch } from "./types";

export const useContextBranch: Branch = {
  id: "use-context",
  label: msg`Solve tasks with existing context`,
  blurb: msg`The right rules and ADRs arrive before your edit, then review the branch.`,
  supportsToggle: true,
  steps: [
    {
      id: "load-context",
      kind: "variant",
      question: <Trans>The right context arrives before your edit.</Trans>,
      description: (
        <Trans>
          The point of having decisions, rules, and guides in the repo is that
          they're loaded into the agent's working set automatically, before
          you start changing code, not after.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>No command. Just ask for the change:</Trans>,
          command:
            '"Add a proration path to the invoice builder in src/billing/."',
          outputLines: [
            <Trans>
                Before the edit lands, the hook injects{" "}
                <code className="font-mono">billing-format.spec.md</code>.
              </Trans>,
            <Trans>
                <code className="font-mono">refund-policy.rule.md</code>,
                the constraint your edits must respect.
              </Trans>,
            <Trans>
                <code className="font-mono">use-postgres.adr.md</code>,
                the decision your queries inherit.
              </Trans>,
          ],
          note: (
            <Trans>
              Since v0.7.0 this needs no command at all: the pre-write hook
              matches the file being edited and injects what applies, and the
              session opens with a recap of what's decided and in progress.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent in plain English:</Trans>,
          command:
            '"What rules and decisions apply to src/billing/? Use search_documents and list_documents to find everything related."',
          outputLines: [
            <Trans>
                Agent runs{" "}
                <code className="font-mono">search_documents</code> with the
                folder as the query.
              </Trans>,
            <Trans>
                Then <code className="font-mono">list_documents</code> +{" "}
                <code className="font-mono">list_relations</code> to walk the
                graph.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control. Every related document goes
              through one explicit MCP call. Scriptable to seed any custom
              agent with the right context at session start.
            </Trans>
          ),
        },
      },
    },

    {
      id: "audit",
      kind: "variant",
      question: <Trans>Audit after your change.</Trans>,
      description: (
        <Trans>
          Edits introduce drift: stale docs, broken relations, statuses that
          no longer match reality. The faster you spot drift, the cheaper it
          stays to fix.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Run inside your agent:</Trans>,
          command: "/archcore:review",
          outputLines: [
            <Trans>
                Reviews the branch both ways: code that broke a document, and
                documents the code left behind.
              </Trans>,
            <Trans>
                Add <code className="font-mono">--drift</code> for staleness
                detection, or <code className="font-mono">--deep</code> for a
                full audit with coverage and relation findings.
              </Trans>,
          ],
          note: (
            <Trans>
              Run it before merging anything that touches documented code. On
              the default branch or an empty diff it reports project health
              instead.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent:</Trans>,
          command:
            '"Audit .archcore/ for stale docs and drift. Walk the relation graph and report anything that looks orphaned, mis-statused, or out of date."',
          outputLines: [
            <Trans>
                Agent walks{" "}
                <code className="font-mono">list_documents</code> +{" "}
                <code className="font-mono">list_relations</code> and reports
                findings.
              </Trans>,
            <Trans>
                You decide which findings warrant{" "}
                <code className="font-mono">update_document</code>,{" "}
                <code className="font-mono">remove_relation</code>, or a status
                bump.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control. Wire this into a pre-merge CI step
              so drift can never slip past code review.
            </Trans>
          ),
        },
      },
    },

    {
      id: "what-next",
      kind: "variant",
      question: <Trans>What to try next.</Trans>,
      description: (
        <Trans>
          You've closed the loop: load context, change code, audit. The next
          win is making this automatic in your daily flow.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Useful follow-ups:</Trans>,
          command:
            "/archcore:document src/refunds/   # cover an under-documented module\n/archcore:document               # record the decision behind the change you just made\n/archcore:review --deep          # full documentation audit",
          note: (
            <Trans>
              You never need to remember a "load context" command. The hooks
              do it on every edit, in every new conversation.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Useful follow-up asks:</Trans>,
          command:
            '"Run audit in CI mode and exit non-zero on drift."        # CI integration\n"Capture src/refunds/."                                    # new coverage\n"Read every rule and summarize what changed in the diff."  # PR review',
          note: (
            <Trans>
              Why CLI here: finer control. These asks plug straight into
              GitHub Actions or pre-commit hooks. The audit step becomes a
              real merge gate.
            </Trans>
          ),
        },
      },
    },
  ],
};
