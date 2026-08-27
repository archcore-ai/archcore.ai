/* Content registry for /how-to-use.
 *
 * The page was a five-branch wizard with a per-step Plugin / CLI toggle, then
 * a catalog of six jobs. It is now one init → plan → document → review cycle:
 * see .archcore/landing/how-to-use-cases.adr.md.
 */
export { CYCLE_STAGES, INSTALL_COMMANDS } from "./cycle";
export type { CycleStage } from "./types";
