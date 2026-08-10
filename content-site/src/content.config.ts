import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faqEntry = z.object({
  question: z.string(),
  answer: z.string(),
});

const articleSchema = z.object({
  title: z.string().max(70),
  description: z.string().max(170),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  /** Rendered as a FAQPage JSON-LD block and a visible FAQ section. */
  faq: z.array(faqEntry).optional(),
  /** Absolute or site-relative OG image. Defaults to the site-wide card. */
  ogImage: z.string().optional(),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: articleSchema,
});

const learn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/learn" }),
  schema: articleSchema,
});

const alternatives = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/alternatives" }),
  schema: articleSchema,
});

/**
 * Root-level reference pages: the canonical owner of one query cluster each,
 * per product/seo-information-architecture in the shared context. Holds both
 * the category pillars (/context-engineering/, …) and the per-host
 * integration pages (/claude-code/, …), which share the same shape: evergreen
 * reference, no publication event, one owner per query. `updatedDate`
 * replaces `pubDate` and the layout emits WebPage rather than Article.
 *
 * Adding a file here is all it takes to ship a pillar: the route, the raw
 * markdown twin, the sitemap entry, and the dist merge all derive from the
 * collection.
 */
const pillarSchema = z.object({
  title: z.string().max(70),
  /** Visible H1. Differs from `title` where the SERP intent differs. */
  heading: z.string(),
  description: z.string().max(170),
  updatedDate: z.coerce.date(),
  faq: z.array(faqEntry).optional(),
  ogImage: z.string().optional(),
  /** Sibling pillars to link, by slug. Order is preserved. */
  related: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const pillars = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pillars" }),
  schema: pillarSchema,
});

export const collections = { blog, learn, alternatives, pillars };
