import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// Raw-markdown twin of each post (…/blog/<slug>.md) for AI crawlers and
// agents that prefer plain text over rendered HTML.
export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props;
  const body = `# ${post.data.title}\n\n> ${post.data.description}\n\n${post.body ?? ""}`;
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
