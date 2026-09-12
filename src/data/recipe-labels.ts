import { msg } from "@lingui/core/macro";
import { label, labelWith } from "./navigation";

/**
 * Chrome of the integration pages: everything the layout writes itself, as
 * opposed to the copy that comes from the recipe entry. Each value is an
 * `{ en, ru }` pair, resolved from the Lingui catalogs at build time and
 * swapped client-side by src/lib/site-locale.ts.
 */
export const recipeLabels = {
  allIntegrations: label(msg`← All integrations`),
  statusVerified: label(msg`Verified in part`),
  statusExperimental: label(msg`Experimental`),
  install: label(msg`Install`),
  tabOverview: label(msg`How it works`),
  tabBenefits: label(msg`Benefits & limits`),
  aboutIntegration: label(msg`About this integration`),
  integrationGuide: label(msg`Integration guide`),
  workflowIntro: label(msg`The instructions ask your agent to:`),
  seeBenefits: label(msg`See benefits and limits →`),
  limits: label(msg`Limits`),
  sourceAndVerification: label(msg`Source & verification`),
  closeDetails: label(msg`Close details`),
  factCategory: label(msg`Category`),
  factRevision: label(msg`Instruction revision`),
  factSource: label(msg`Source`),
  factMaintainer: label(msg`Maintainer`),
  factUpdated: label(msg`Page updated`),
  revisionUnpublished: label(msg`This revision is not published yet.`),
  verification: label(msg`Verification`),
  verificationRecords: label(msg`Verification records`),
  noRuns: label(
    msg`No joint run has been recorded for this instruction revision.`
  ),
  colDate: label(msg`Date`),
  colAgent: label(msg`Agent`),
  colModel: label(msg`Model`),
  colScenario: label(msg`Scenario`),
  colOutcome: label(msg`Outcome`),
  outcomePassed: label(msg`passed`),
  outcomeFailed: label(msg`failed`),
  outcomeUnexecuted: label(msg`unexecuted`),
  updateHeading: label(msg`Update or disconnect`),
  updateBody: label(
    msg`To update, review changes to the instructions before replacing your copy. To disconnect, remove the added instructions from your project file. Both tools and their documents stay in place.`
  ),
};

/** The catalog page at /integrations/. */
export const catalogLabels = {
  heading: label(msg`Integrations`),
  intro: label(
    msg`Use Archcore with the tools you already run, or make it part of your own agent setup.`
  ),
  footHeading: label(msg`Or make Archcore part of your own setup`),
  footNote: label(
    msg`Experimental integrations have setup instructions available. Joint runs have not been verified yet.`
  ),
};

/** The install dialog, including the strings its script writes at runtime. */
export const setupLabels = {
  connect: label(msg`Connect the two tools`),
  closeInstall: label(msg`Close installation`),
  addInstructions: label(msg`2. Add instructions`),
  instructionsAria: label(msg`Integration instructions`),
  copy: label(msg`Copy instructions`),
  copied: label(msg`Copied ✓`),
  copyHint: label(
    msg`Paste into your project instruction file, then start a new session.`
  ),
  copyManual: label(msg`Copy the selected instruction text manually.`),
  showFull: label(msg`Show full instructions ↓`),
  collapse: label(msg`Collapse instructions ↑`),
  checkHeading: label(msg`3. Check in a new session`),
  checkIntro: label(
    msg`Start a new session in this project and ask your agent:`
  ),
  checkOutro: label(
    msg`If the agent reports a missing tool or instruction file, finish that setup before starting work.`
  ),
  sourceLink: label(msg`Source & verification ↗`),
  verifiedNote: label(msg`Verification covers recorded runs only`),
  experimentalNote: label(msg`Experimental · Not yet verified`),
};

/** Strings the install script writes, keyed by locale for the runtime. */
export const setupRuntimeLabels = {
  en: {
    copy: setupLabels.copy.en,
    copied: setupLabels.copied.en,
    copyHint: setupLabels.copyHint.en,
    copyManual: setupLabels.copyManual.en,
    showFull: setupLabels.showFull.en,
    collapse: setupLabels.collapse.en,
  },
  ru: {
    copy: setupLabels.copy.ru,
    copied: setupLabels.copied.ru,
    copyHint: setupLabels.copyHint.ru,
    copyManual: setupLabels.copyManual.ru,
    showFull: setupLabels.showFull.ru,
    collapse: setupLabels.collapse.ru,
  },
};

/** `1. Install Archcore and Serena` — the tool names come from the entry. */
export const installStepLabel = (tools: { en: string; ru: string }) =>
  labelWith((names) => msg`1. Install ${names}`, tools);

/** The check prompt, which names the two tools inside the sentence. */
export const checkPromptLabel = (tools: { en: string; ru: string }) =>
  labelWith(
    (names) =>
      msg`Confirm you can use ${names}, and have read this project’s cooperation instructions.`,
    tools
  );
