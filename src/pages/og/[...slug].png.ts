import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderOgImage, type OgVariant } from "../../lib/og-image";

/**
 * Build-time social cards for everything that is not a marketing route.
 *
 * Marketing pages keep their hand-tuned PNGs in `public/`, written by
 * `scripts/generate-og-image.mts`. Everything published from a content
 * collection gets its card here instead, from the entry's own copy, so a new
 * article, pillar, or integration ships with a preview without anyone
 * registering a variant. The hubs are listed explicitly below because they
 * have no collection entry of their own.
 */
const ARTICLE_SECTIONS = ["blog", "learn", "alternatives"] as const;

const sectionLabel: Record<string, string> = {
  blog: "Archcore Blog",
  learn: "Learn with Archcore",
  alternatives: "Archcore comparisons",
};

/**
 * Hubs: one card each, since no collection entry describes them. Subtitles are
 * the pages' own meta descriptions, word for word, so the card and the SERP
 * snippet cannot say different things.
 */
const HUBS: { slug: string; variant: OgVariant }[] = [
  {
    slug: "blog",
    variant: {
      headline: ["Archcore Blog"],
      subtitle:
        "Guides and comparisons on context engineering, spec-driven development, project context, and agent tooling from the team behind Archcore.",
      bottomLabel: "Archcore Blog",
    },
  },
  {
    slug: "learn",
    variant: {
      headline: ["Learn with Archcore"],
      subtitle:
        "Learn how project context, context engineering, and harness engineering fit together, with comparisons and examples for AI coding agents.",
      bottomLabel: "Learn with Archcore",
    },
  },
  {
    slug: "integrations",
    variant: {
      headline: ["Archcore Integrations"],
      subtitle:
        "Use Archcore with the tools your agent already runs, or make it part of your own setup over MCP. Copy the setup instructions for your project.",
      bottomLabel: "Integration recipes",
    },
  },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await Promise.all(
    ARTICLE_SECTIONS.map(async (section) => {
      const pages = await getCollection(section, ({ data }) => !data.draft);
      return pages.map(({ id, data }) => ({
        params: { slug: `${section}/${id}` },
        props: {
          headline: [data.title],
          subtitle: data.description,
          bottomLabel: sectionLabel[section],
        },
      }));
    })
  );

  // Pillars live at the site root, so their cards are namespaced here to keep
  // `/og/<slug>.png` free for the hubs.
  const pillars = (
    await getCollection("pillars", ({ data }) => !data.draft)
  ).map(({ id, data }) => ({
    params: { slug: `pillars/${id}` },
    props: {
      headline: [data.heading],
      subtitle: data.description,
      bottomLabel: "Archcore reference",
    },
  }));

  // The card leads with the pair, not the SERP title: a recipe page is about
  // two named tools, and the heading is the only place both appear together.
  const integrations = (
    await getCollection("integrations", ({ data }) => !data.draft)
  ).map(({ id, data }) => ({
    params: { slug: `integrations/${id}` },
    props: {
      headline: [data.heading],
      subtitle: data.summary,
      bottomLabel: `${data.category}  ·  Integration recipe`,
    },
  }));

  const hubs = HUBS.map(({ slug, variant }) => ({
    params: { slug },
    props: variant,
  }));

  return [...articles.flat(), ...pillars, ...integrations, ...hubs];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props as OgVariant);
  return new Response(png.buffer as ArrayBuffer, {
    headers: { "Content-Type": "image/png" },
  });
};
