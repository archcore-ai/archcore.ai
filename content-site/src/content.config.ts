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

export const collections = { blog, learn, alternatives };
