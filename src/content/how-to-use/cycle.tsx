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
    title: <Trans>Make the repo legible</Trans>,
    prompt: <Trans>Set up Archcore in this repo.</Trans>,
    result: (
      <Trans>
        Your agent reads the project and proposes a stack rule, a run guide, an
        architecture overview, and a spec for each module that changes most. One
        preview, and nothing is written until you confirm.
      </Trans>
    ),
  },
  {
    id: "plan",
    skill: "/archcore:plan",
    title: <Trans>Scope the work before writing it</Trans>,
    prompt: <Trans>Plan rate limiting for the public API.</Trans>,
    result: (
      <Trans>
        A spec and a plan, sized from what the change actually touches. A layout
        fix would produce no documents at all.
      </Trans>
    ),
  },
  {
    id: "document",
    skill: "/archcore:document",
    title: <Trans>Record what you settled on</Trans>,
    prompt: <Trans>Record the decision to use a token bucket in Redis.</Trans>,
    result: (
      <Trans>
        An ADR holding the reasoning as well as the verdict, and an offer to
        write the team rule that follows from it.
      </Trans>
    ),
  },
  {
    id: "review",
    skill: "/archcore:review",
    title: <Trans>Check it before merge</Trans>,
    prompt: <Trans>Review my branch before merge.</Trans>,
    result: (
      <Trans>
        Your diff read against the spec from step 2 and the ADR from step 3, in
        both directions: code that drifted, and documents the change made wrong.
      </Trans>
    ),
  },
];
