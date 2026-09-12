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

/** Literal, never translated. Same pair the home hero shows. */
export const INSTALL_COMMANDS = [
  "curl -fsSL https://archcore.ai/install.sh | bash",
  "archcore init",
];

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
        Your agent uses the project context to define how rate limiting should
        work in a spec and break the implementation into tasks. You can then use
        that plan to guide the coding work.
      </Trans>
    ),
    leaves: (
      <Trans>
        Writes the spec that defines how rate limiting must behave, and a plan
        that breaks the work into tasks.
      </Trans>
    ),
  },
  {
    id: "document",
    skill: "/archcore:document",
    title: <Trans>Save the decision</Trans>,
    prompt: <Trans>Record the decision to use a token bucket in Redis.</Trans>,
    result: (
      <Trans>
        Your agent saves the choice and its reasoning in an architecture
        decision record (ADR). Future tasks can look up why you chose Redis for
        rate limiting.
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
        decision from step 3. It flags code that breaks a requirement and
        documents that no longer match the code.
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
