/* Branch 3: I have an idea, no context yet.
 *
 * Plugin/CLI toggle on every step. PRD: landing/how-to-use-interactive-walkthrough.prd.md §R3.
 * Demonstrates the requirements cascade: idea → PRD → spec → plan. Plugin uses
 * the /archcore:plan command with --track flags; CLI uses the MCP product_track
 * prompt and explicit create_document calls.
 *
 * Tone rules: landing/messaging-alignment.rule.md. CLI variants carry a one-line
 * "Why CLI here:" blurb; never "fallback" or "alternative".
 */
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import type { Branch } from "./types";

export const ideaNoContextBranch: Branch = {
  id: "idea-no-context",
  label: msg`I have an idea, no context yet`,
  blurb: msg`Turn a plain-English idea into PRD → spec → plan.`,
  supportsToggle: true,
  steps: [
    {
      id: "capture-idea",
      kind: "variant",
      question: <Trans>Capture the raw idea first.</Trans>,
      description: (
        <Trans>
          The cheapest unit of vision context is an{" "}
          <code className="font-mono">.idea.md</code> — one paragraph of intent,
          no commitment yet. Land that before you reach for PRD or plan.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Run inside your agent:</Trans>,
          command: "/archcore:plan auth redesign",
          outputLines: [
            <Trans>
                Starts the <code className="font-mono">product</code> track
                cascade — first stop is an{" "}
                <code className="font-mono">.idea.md</code>.
              </Trans>,
            <Trans>
                Each step is a gate: review the draft, edit, then accept to
                move on.
              </Trans>,
          ],
          note: (
            <Trans>
              Default <code className="font-mono">product</code> track means
              idea → PRD → plan. Swap to{" "}
              <code className="font-mono">--track feature</code> when you need a
              spec layer too.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent in plain English:</Trans>,
          command:
            '"Draft an idea document for an auth redesign — the current session-token approach is hitting compliance issues."',
          outputLines: [
            <Trans>
                Agent calls{" "}
                <code className="font-mono">create_document(type=idea)</code>{" "}
                via MCP.
              </Trans>,
            <Trans>
                Or invoke the MCP{" "}
                <code className="font-mono">product_track</code> prompt
                directly for the full cascade.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — you decide when (and whether) to
              advance to PRD. Useful when the idea may still die in
              discussion.
            </Trans>
          ),
        },
      },
    },

    {
      id: "to-prd",
      kind: "variant",
      question: <Trans>Move from idea to PRD.</Trans>,
      description: (
        <Trans>
          PRDs answer the "why now, and how do we know it worked" questions an
          idea deliberately skips. The agent reads the idea and asks you only
          what's still missing.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Continue the cascade:</Trans>,
          command:
            "# inside the same /archcore:plan session,\n# accept the gate to advance from idea to PRD.",
          outputLines: [
            <Trans>
                Drafts{" "}
                <code className="font-mono">auth-redesign.prd.md</code> with
                goals, non-goals, stakeholders, and success metrics.
              </Trans>,
            <Trans>
                Wires{" "}
                <code className="font-mono">add_relation(prd implements idea)</code>{" "}
                automatically.
              </Trans>,
          ],
          note: (
            <Trans>
              The cascade pauses at each gate — you can edit the draft in your
              editor before accepting and moving on.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent:</Trans>,
          command:
            '"Read the auth-redesign idea and draft a PRD that implements it. Then call add_relation to link the PRD to the idea."',
          outputLines: [
            <Trans>
                Agent reads via{" "}
                <code className="font-mono">get_document</code>, writes via{" "}
                <code className="font-mono">create_document(type=prd)</code>.
              </Trans>,
            <Trans>
                The <code className="font-mono">implements</code> relation is
                an explicit MCP call — review and approve.
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — relations are explicit, reviewable,
              and replayable. Good for compliance-sensitive work like this auth
              example.
            </Trans>
          ),
        },
      },
    },

    {
      id: "to-spec",
      kind: "variant",
      question: <Trans>Formalize the contract with a spec.</Trans>,
      description: (
        <Trans>
          Specs describe what the system must do — interfaces, invariants,
          edge cases. They sit between PRDs (the "why") and plans (the "how").
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Switch the cascade track:</Trans>,
          command:
            "/archcore:plan auth redesign --track feature",
          outputLines: [
            <Trans>
                The <code className="font-mono">feature</code> track inserts a{" "}
                <code className="font-mono">.spec.md</code> stop between PRD
                and plan.
              </Trans>,
            <Trans>
                Drafts the spec from the PRD; you accept and move to the plan
                step.
              </Trans>,
          ],
          note: (
            <Trans>
              The feature track is the right tool when there's a real API or
              schema to lock down. Skip it for ideation-stage work.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent:</Trans>,
          command:
            '"Draft an auth-redesign spec covering the new token-storage API. Link it: spec implements PRD."',
          outputLines: [
            <Trans>
                Agent calls{" "}
                <code className="font-mono">create_document(type=spec)</code>{" "}
                with the contract details inline.
              </Trans>,
            <Trans>
                Then{" "}
                <code className="font-mono">add_relation(spec implements prd)</code>
                .
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — you pick the spec's scope and
              exclusions yourself, instead of accepting the default the plugin
              would generate.
            </Trans>
          ),
        },
      },
    },

    {
      id: "to-plan",
      kind: "variant",
      question: <Trans>Land on a plan.</Trans>,
      description: (
        <Trans>
          Plans break a spec into named, ordered tasks. This is the document
          the implementing agent reads at the start of every session.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Last gate of the cascade:</Trans>,
          command:
            "# accept the plan-step gate inside the same /archcore:plan session.",
          outputLines: [
            <Trans>
                Drafts{" "}
                <code className="font-mono">auth-redesign.plan.md</code> with
                phases, acceptance criteria, dependencies.
              </Trans>,
            <Trans>
                Wires{" "}
                <code className="font-mono">add_relation(plan implements spec)</code>
                .
              </Trans>,
          ],
          note: (
            <Trans>
              You now have the full chain — idea, PRD, spec, plan — wired
              together. The next session that opens any of them auto-loads the
              rest.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Ask your agent:</Trans>,
          command:
            '"Draft an implementation plan from the auth-redesign spec — 3 phases. Link plan implements spec."',
          outputLines: [
            <Trans>
                <code className="font-mono">create_document(type=plan)</code>{" "}
                with phases, acceptance criteria, dependencies.
              </Trans>,
            <Trans>
                Final relation:{" "}
                <code className="font-mono">add_relation(plan implements spec)</code>
                .
              </Trans>,
          ],
          note: (
            <Trans>
              Why CLI here: finer control — you decide phase granularity and
              the relations explicitly. Scriptable to generate plans from a
              batch of specs.
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
          The cascade gave you four linked documents. Here's how to put them
          to work in your next coding session.
        </Trans>
      ),
      variants: {
        plugin: {
          caption: <Trans>Useful follow-ups:</Trans>,
          command:
            "/archcore:context             # before editing any auth code\n/archcore:audit               # check drift as you build\n/archcore:capture src/auth/   # document existing pieces you're keeping",
          note: (
            <Trans>
              The plan you just created is now the agent's source of truth for
              this work.
            </Trans>
          ),
        },
        cli: {
          caption: <Trans>Useful follow-up asks:</Trans>,
          command:
            '"What docs apply to src/auth/?"          # → search_documents\n"Audit .archcore/ for drift."             # → walk relations\n"Capture src/auth/middleware/ as a spec." # → create_document',
          note: (
            <Trans>
              Why CLI here: finer control — every action is a named MCP call
              you can reuse, version, or run in CI.
            </Trans>
          ),
        },
      },
    },
  ],
};
