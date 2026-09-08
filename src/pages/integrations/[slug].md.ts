import type { APIRoute, InferGetStaticPropsType } from "astro";
import { getCollection } from "astro:content";

// Raw-markdown twin of each recipe page (/integrations/<recipe>.md), mirroring
// the blog, learn and pillar twins and linked from RecipeLayout as
// <link rel="alternate">.
//
// This one earns its keep more than the others: the audience for a recipe page
// is largely agents, and an agent asked to "set up Archcore with Superpowers"
// should be able to read the whole page as text. It carries the presentation
// copy only — the instruction text itself is served verbatim next door at
// /integrations/<recipe>/<file>, and duplicating it here would create a second
// copy that can drift from the digest-checked one.
export async function getStaticPaths() {
  const recipes = await getCollection(
    "integrations",
    ({ data }) => !data.draft
  );
  return recipes.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

export const GET: APIRoute<InferGetStaticPropsType<typeof getStaticPaths>> = ({
  props,
}) => {
  const { entry } = props;
  const { data } = entry;
  const tools = data.tools
    .map((t: { name: string; role: string }) => `- ${t.name} — ${t.role}`)
    .join("\n");
  const limits = data.limits.map((l: string) => `- ${l}`).join("\n");
  const instructions = `/integrations/${entry.id}/${data.instructions.split("/").pop()}`;

  const body = `# ${data.heading}

> ${data.description}

Instruction revision: ${data.digest}
Instruction text: https://archcore.ai${instructions}
Source: ${data.source.repo} — ${data.source.path}${
    data.source.revision ? ` at ${data.source.revision}` : " (unpublished)"
  }

## Tools

${tools}

${entry.body ?? ""}

## Known limits

${limits}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
