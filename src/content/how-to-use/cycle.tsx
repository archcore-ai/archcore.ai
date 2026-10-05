/* Content for /how-to-use: the install line, then one full cycle.
 *
 * Every `prompt` is lifted from the trigger phrases in the plugin's own skills
 * (`plugins/archcore/skills/*\/SKILL.md`, "When to use"), so a reader who
 * copies one gets the stage the card describes. Change a prompt here only
 * against that file, never against another page.
 *
 * The four stages run on one piece of work (rate limiting on a public API) so
 * the page reads as a loop rather than a menu of features. Keep the example
 * consistent across stages when editing.
 */
import { Trans } from "@lingui/react/macro";
import type { CycleStage } from "./types";

/**
 * Literal, never translated. The page renders it after the platform installer,
 * which switches between the curl and irm commands like the home hero.
 */
export const INIT_COMMAND = "archcore init";

export const CYCLE_STAGES: CycleStage[] = [
  {
    id: "init",
    skill: "/archcore:init",
    title: <Trans>Describe the project</Trans>,
    prompt: <Trans>Set up Archcore in this repo.</Trans>,
    result: (
      <Trans>
        Your agent reads the repository and proposes documents describing its
        architecture, rules, and key modules. You review the proposal before
        Archcore saves it in .archcore/.
      </Trans>
    ),
    leaves: (
      <Trans>
        Proposes documents for the architecture, rules, and key modules. You
        approve before anything is saved.
      </Trans>
    ),
  },
  {
    id: "plan",
    skill: "/archcore:plan",
    title: <Trans>Plan the feature</Trans>,
    prompt: <Trans>Plan rate limiting for the public API.</Trans>,
    result: (
      <Trans>
        Your agent reads the repository and the existing documents first, then
        asks you only what it cannot find there. It writes a spec for how rate
        limiting must behave and a plan with tasks mapped to files. A
        user-facing change also gets examples of the cases that matter.
      </Trans>
    ),
    /* The rows are the route table in the plugin's
       skills/_shared/delta-routing.md, one row per route. Re-read that file on
       any release that touches plan. */
    details: (
      <>
        <p>
          <Trans>
            Archcore sizes the change from S to XL and picks the documents. You
            do not choose a template or a size.
          </Trans>
        </p>
        <table>
          <thead>
            <tr>
              <th>
                <Trans>The change</Trans>
              </th>
              <th>
                <Trans>What plan prepares</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Trans>A small fix</Trans>
              </td>
              <td>
                <Trans>No documents</Trans>
              </td>
            </tr>
            <tr>
              <td>
                <Trans>A settled choice</Trans>
              </td>
              <td>
                <Trans>A decision record</Trans>
              </td>
            </tr>
            <tr>
              <td>
                <Trans>A change to existing behavior</Trans>
              </td>
              <td>
                <Trans>
                  A check of the covering spec: update the spec, or fix the code
                </Trans>
              </td>
            </tr>
            <tr>
              <td>
                <Trans>One new capability</Trans>
              </td>
              <td>
                <Trans>A spec and a plan</Trans>
              </td>
            </tr>
            <tr>
              <td>
                <Trans>Several capabilities</Trans>
              </td>
              <td>
                <Trans>A PRD, one spec per capability, and a plan</Trans>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <Trans>
            Risk raises the size. A security requirement adds a formal
            requirements chain, and a data migration adds a migration runbook.
          </Trans>
        </p>
      </>
    ),
    leaves: (
      <Trans>
        Sizes the change first. Here that means a spec for how rate limiting
        must behave and a plan that breaks the work into tasks.
      </Trans>
    ),
  },
  {
    id: "document",
    skill: "/archcore:document",
    title: <Trans>Save the decision</Trans>,
    prompt: <Trans>Record the decision to use a token bucket in Redis.</Trans>,
    altPrompt: <Trans>Document the rate limiting module.</Trans>,
    result: (
      <Trans>
        Your agent saves the choice and its reasoning in an architecture
        decision record (ADR) and links it to the spec. Future tasks can look up
        why you chose Redis for rate limiting. Ask it to document a module
        instead, and it reads the code and writes a spec or a reference
        document.
      </Trans>
    ),
    leaves: (
      <Trans>
        Saves the choice and its reasoning as an architecture decision record.
      </Trans>
    ),
  },
  {
    id: "review",
    skill: "/archcore:review",
    title: <Trans>Review the code</Trans>,
    prompt: <Trans>Review my branch before merge.</Trans>,
    result: (
      <Trans>
        Your agent checks the code changes against the spec from step 2 and the
        decision from step 3. Each finding gets one verdict:{" "}
        <code>code-wrong</code> when the code breaks a requirement,{" "}
        <code>spec-wrong</code> when the document is out of date, and{" "}
        <code>ok</code> when they match. A change with no document still gets
        checked against the project’s decisions and rules.
      </Trans>
    ),
    /* The three tokens are the ones the review skill emits and groups by
       (plugin skills/review/SKILL.md). The home page has to name all three
       (.archcore/messaging-alignment.rule.md), so they live here rather than
       in the page, and a rename in that skill is caught in one file. */
    leaves: (
      <Trans>
        Reads the spec from step 2 and the decision from step 3. Verdict per
        finding: <code className="font-mono text-[0.9em]">spec-wrong</code>,{" "}
        <code className="font-mono text-[0.9em]">code-wrong</code>, or{" "}
        <code className="font-mono text-[0.9em]">ok</code>.
      </Trans>
    ),
  },
];
