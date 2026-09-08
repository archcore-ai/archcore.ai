import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const routes: { path: string; modified?: Date }[] = [
    "/",
    "/plugin/",
    "/cli/",
    "/how-to-use/",
    "/privacy/",
    "/blog/",
    "/learn/",
    "/integrations/",
  ].map((path) => ({ path }));
  for (const collection of [
    "blog",
    "learn",
    "pillars",
    "integrations",
  ] as const) {
    const entries = await getCollection(collection, ({ data }) => !data.draft);
    for (const entry of entries) {
      routes.push({
        path:
          collection === "pillars"
            ? `/${entry.id}/`
            : `/${collection}/${entry.id}/`,
        modified:
          entry.data.updatedDate ??
          ("pubDate" in entry.data ? entry.data.pubDate : undefined),
      });
    }
  }
  const urls = routes
    .sort((a, b) => a.path.localeCompare(b.path))
    .map(
      (route) =>
        `  <url><loc>${new URL(route.path, site).href}</loc>${route.modified ? `<lastmod>${route.modified.toISOString().slice(0, 10)}</lastmod>` : ""}</url>`
    );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    }
  );
};
