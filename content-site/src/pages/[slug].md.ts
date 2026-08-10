import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Raw-markdown twin of each pillar page (/<slug>.md) for AI crawlers and
// agents that prefer plain text over rendered HTML. Mirrors the blog and
// learn twins; referenced from PillarLayout as <link rel="alternate">.
export async function getStaticPaths() {
  const pages = await getCollection("pillars", ({ data }) => !data.draft);
  return pages.map((page) => ({
    params: { slug: page.id },
    props: { page },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { page } = props;
  const body = `# ${page.data.heading}\n\n> ${page.data.description}\n\n${page.body ?? ""}`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
