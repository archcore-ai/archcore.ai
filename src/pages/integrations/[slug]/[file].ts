import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";
import { readRecipeSource } from "../../../lib/recipe-source.ts";

/**
 * The recipe's instruction text as a downloadable file, at
 * /integrations/<recipe>/<filename> — the target of the Download action on the
 * recipe page.
 *
 * It goes through readRecipeSource for the same reason the page does: this and
 * the visible <pre> must be the same bytes, and the only way to guarantee that
 * is to have one function produce both. The digest check runs here too, so the
 * file route cannot succeed while the page route fails.
 */
export async function getStaticPaths() {
  const recipes = await getCollection(
    "integrations",
    ({ data }) => !data.draft
  );

  return recipes.map((entry) => {
    const source = readRecipeSource(
      entry.data.recipe,
      entry.data.instructions,
      entry.data.digest
    );
    return {
      params: { slug: entry.id, file: source.filename },
      props: { source },
    };
  });
}

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = ({
  props,
}) =>
  new Response(props.source.text, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
