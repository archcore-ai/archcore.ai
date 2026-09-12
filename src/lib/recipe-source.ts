import { createHash } from "node:crypto";

/**
 * Reads the verbatim instruction file behind an integration recipe and checks
 * it against the digest recorded in the catalog entry.
 *
 * The recipe page shows this text, the copy button copies it, and
 * /integrations/<recipe>/<file> hands it out as a download. All three read this
 * one function, so the three cannot disagree with each other. The digest pins
 * the bytes described by the catalog, whether authored here or imported.
 * An imported recipe must also remain identical to its declared source.
 *
 * Failing the build is the point. The alternative is a page that quietly
 * attributes our wording to the upstream recipe, which is exactly the split
 * ownership the catalog contract forbids.
 *
 * The files are pulled in through import.meta.glob rather than read from disk.
 * Astro bundles this module before running it, so import.meta.url points at a
 * chunk under dist/ and any path derived from it misses src/ entirely. The glob
 * is resolved by the bundler against this file's *source* location, which is
 * the thing that stays true.
 */
const SOURCES = import.meta.glob<string>("../recipes/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface RecipeSource {
  /** The file's exact bytes, decoded as UTF-8. Never reformatted. */
  text: string;
  /** sha256 of the file, verified equal to the entry's recorded digest. */
  digest: string;
  /** Basename, used as the download filename. */
  filename: string;
}

export function readRecipeSource(
  recipe: string,
  instructions: string,
  expectedDigest: string
): RecipeSource {
  const key = `../recipes/${instructions}`;
  const text = SOURCES[key];

  if (text === undefined) {
    const known = Object.keys(SOURCES)
      .map((k) => k.replace("../recipes/", ""))
      .join(", ");
    throw new Error(
      `recipe "${recipe}" names instructions "${instructions}", which does not exist under ` +
        `src/recipes/. Present: ${known || "nothing"}`
    );
  }

  const digest = createHash("sha256").update(text, "utf8").digest("hex");
  if (digest !== expectedDigest) {
    throw new Error(
      `recipe "${recipe}": ${instructions} has digest ${digest}, but the entry records ${expectedDigest}. ` +
        `Check the recipe against its declared source, then update the entry digest for an intentional revision.`
    );
  }

  return {
    text,
    digest,
    filename: instructions.split("/").pop() ?? instructions,
  };
}

/**
 * Evidence recorded against a different instruction revision describes a
 * different recipe, so it is dropped rather than shown with a caveat.
 */
export function evidenceForDigest<T extends { digest: string }>(
  evidence: T[],
  digest: string
): T[] {
  return evidence.filter((record) => record.digest === digest);
}
