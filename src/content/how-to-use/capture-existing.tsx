/* Branch 4: Document existing code.
 *
 * Plugin/CLI toggle on every step. PRD: landing/how-to-use-interactive-walkthrough.prd.md §R3.
 * Plugin uses /archcore:capture (heuristic picks the right type); CLI uses
 * natural-language asks with explicit type overrides (spec / doc / guide).
 *
 * Tone rules: landing/messaging-alignment.rule.md. CLI variants carry a one-line
 * "Why CLI here:" blurb; never "fallback" or "alternative".
 */
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import type { Branch } from "./types";

export const captureExistingBranch: Branch = {
  id: "capture-existing",
  label: msg`Document existing code`,
  blurb: msg`Capture what already lives in code so the agent stops re-explaining.`,
  supportsToggle: true,
  steps: [
    {
      id: "pick-module",
      kind: "variant",
      question: <Trans>Pick a module to capture.</Trans>,
      description: (
        <Trans>
          Start with one folder that an agent keeps re-discovering. The output
          is usually a <code className="font-mono">.spec.md</code> — a
          contract describing what the module guarantees.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Run inside your agent:</Trans>,
          command: "/archcore:capture src/notifications/",
          outputLines: [
            <Trans>
                Reads the folder, picks{" "}
                <code className="font-mono">type=spec</code> automatically.
              </Trans>,
            <Trans>
                Drafts{" "}
                <code className="font-mono">notifications.spec.md</code> —
                interfaces, invariants, edge cases.
              </Trans>,
            <Trans>
                Asks for approval before writing — you can override the type or
                edit the draft first.
              </Trans>,
          ],
          note: (
            <Trans>
              The plugin chooses the document type from what it reads. Approve
              and the file lands in <code className="font-mono">.archcore/</code>{" "}
              ready for review.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent in plain English:</Trans>,
          command:
            '"Create a spec for src/notifications/ — read the code, describe the public API and the delivery guarantees."',
          outputLines: [
            <Trans>
                Agent uses MCP{" "}
                <code className="font-mono">create_document(type=spec)</code>.
              </Trans>,
            <Trans>
                Want a different shape? Ask for{" "}
                <code className="font-mono">type=doc</code> (reference
                material) or <code className="font-mono">type=guide</code>{" "}
                (how-to) instead.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — you choose the type explicitly
              instead of accepting the plugin's heuristic. Useful when the
              module fits "doc" or "guide" better than "spec".
            </Trans>
          ),
        },
      },
    },

    {
      id: "cross-cutting",
      kind: "variant",
      question: <Trans>Capture a cross-cutting pipeline.</Trans>,
      description: (
        <Trans>
          Some behavior lives across many folders — webhook delivery, auth
          middleware, queue retry. These are the highest-value specs because
          they're the hardest for an agent to grep for.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Describe the pipeline, not a path:</Trans>,
          command: "/archcore:capture webhook delivery pipeline",
          outputLines: [
            <Trans>
                Agent finds every touched file (sender, retry queue, signing,
                receivers).
              </Trans>,
            <Trans>
                Drafts a spec that describes the contract — not the
                implementation.
              </Trans>,
          ],
          note: (
            <Trans>
              The plugin treats the topic as a search query first, then writes
              the spec. Works just as well for "auth flow", "billing", "the
              report export job".
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent:</Trans>,
          command:
            '"Trace the webhook delivery pipeline across the repo and write a spec for it. Use type=spec explicitly."',
          outputLines: [
            <Trans>
                Agent uses MCP{" "}
                <code className="font-mono">search_documents</code> +{" "}
                <code className="font-mono">create_document(type=spec)</code>.
              </Trans>,
            <Trans>
                Asking for type explicitly skips the agent's heuristic — the
                output type is predictable.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — predictable type means the
              document lands exactly where you want in the category structure
              (knowledge / vision / experience).
            </Trans>
          ),
        },
      },
    },

    {
      id: "write-rule",
      kind: "variant",
      question: <Trans>Turn the spec into a rule + guide.</Trans>,
      description: (
        <Trans>
          Specs describe what the system does. Rules describe what humans (and
          agents) must do when changing it. Guides walk newcomers through it.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Run inside your agent:</Trans>,
          command: "/archcore:decide",
          outputLines: [
            <Trans>
                When triggered after a recent capture, decide offers a{" "}
                <code className="font-mono">spec → rule → guide</code>{" "}
                continuation cascade.
              </Trans>,
            <Trans>
                Drafts a rule that enforces the spec invariants and a guide
                covering common changes.
              </Trans>,
          ],
          note: (
            <Trans>
              Relations are wired automatically — the rule{" "}
              <code className="font-mono">implements</code> the spec, the guide
              is <code className="font-mono">related</code> to the rule.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent:</Trans>,
          command:
            '"Read the notifications spec. Draft a rule that enforces its delivery guarantees, and a how-to guide for adding a new notification channel."',
          outputLines: [
            <Trans>
                Two{" "}
                <code className="font-mono">create_document</code> calls —
                one rule, one guide.
              </Trans>,
            <Trans>
                Then{" "}
                <code className="font-mono">add_relation(rule implements spec)</code>{" "}
                and{" "}
                <code className="font-mono">add_relation(guide related rule)</code>
                .
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — choose your own relation types
              (related vs depends_on, etc.) instead of accepting the plugin's
              defaults.
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
          You've captured one module. The compounding value of Archcore comes
          from capturing the 3-5 modules an agent keeps re-discovering.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Useful follow-ups:</Trans>,
          command:
            "/archcore:capture src/auth/      # next-hottest folder\n/archcore:audit                  # coverage gaps\n/archcore:context src/api/       # use what you captured",
          note: (
            <Trans>
              See the document-types reference in the docs for when to reach
              for spec vs doc vs guide.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Useful follow-up asks:</Trans>,
          command:
            '"Capture src/auth/ as a spec."\n"Audit .archcore/ — what major modules have no captured context?"\n"List all specs and their incoming relations."',
          note: (
            <Trans>
              Why CLI here: finer control — these asks compose into a single
              CI job that audits coverage on every push.
            </Trans>
          ),
        },
      },
    },
  ],
};
