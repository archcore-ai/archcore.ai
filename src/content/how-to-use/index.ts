/* Branch registry for the /how-to-use wizard.
 *
 * Each branch is one path through the wizard. Branches 2-5 carry a per-step
 * Plugin/CLI toggle. Branch 1 (install) is the only branch without a toggle,
 * because the plugin-vs-cli choice IS that branch.
 *
 * Order here is the order shown on the branch picker.
 */
import { installBranch } from "./install";
import { quickStartBranch } from "./quick-start";
import { ideaNoContextBranch } from "./idea-no-context";
import { captureExistingBranch } from "./capture-existing";
import { useContextBranch } from "./use-context";
import type { Branch } from "./types";

export const BRANCHES: Branch[] = [
  installBranch,
  quickStartBranch,
  ideaNoContextBranch,
  captureExistingBranch,
  useContextBranch,
];

export type { Branch, Choice, ExampleVariant, Step, Surface } from "./types";
