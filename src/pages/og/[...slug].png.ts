import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage, type OgVariant } from "../../lib/og-image";

export const getStaticPaths: GetStaticPaths = async () => {
  const sections = ["blog", "learn", "alternatives"] as const;
  const entries = await Promise.all(
    sections.map(async (section) => {
      const pages = await getCollection(section, ({ data }) => !data.draft);
      return pages.map(({ id, data }) => ({
        params: { slug: `${section}/${id}` },
        props: {
          headline: [data.title],
          subtitle: data.description,
          bottomLabel:
            section === "blog"
              ? "Archcore Blog"
              : section === "learn"
                ? "Learn with Archcore"
                : "Archcore comparisons",
        },
      }));
    })
  );
  return entries.flat();
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as OgVariant);
  return new Response(png.buffer as ArrayBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
