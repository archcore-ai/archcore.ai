import type { ReactNode } from "react";

/**
 * One stage of the init → plan → document → review cycle.
 *
 * `skill` and `prompt` sit side by side on purpose: the prompt is what works
 * in any MCP-aware agent, the skill is the shortcut for the same instrument on
 * the four plugin hosts. Showing one without the other misrepresents the
 * product (.archcore/landing/how-to-use-cases.adr.md).
 */
export interface CycleStage {
  id: string;
  /** The slash command. Literal, never translated. */
  skill: string;
  title: ReactNode;
  /** The sentence the reader types. Lifted from the skill's own triggers. */
  prompt: ReactNode;
  /**
   * A second sentence for the same skill in another mode, shown on
   * `/how-to-use` only. Lifted from the skill's own triggers like `prompt`.
   */
  altPrompt?: ReactNode;
  /** What lands, in one sentence. */
  result: ReactNode;
  /** Extra detail under `result`, shown on `/how-to-use` only. */
  details?: ReactNode;
  /**
   * The same outcome compressed for the home page's loop tile, which shows the
   * documents the stage leaves rather than a full sentence. `/how-to-use`
   * renders `result`; both come from this one file so a release cannot update
   * one surface and miss the other.
   */
  leaves: ReactNode;
}
