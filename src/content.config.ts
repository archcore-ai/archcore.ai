import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faqEntry = z.object({
  question: z.string(),
  answer: z.string(),
});

const articleSchema = z.object({
  title: z.string().max(49),
  description: z.string().max(160),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  /** Rendered as a FAQPage JSON-LD block and a visible FAQ section. */
  faq: z.array(faqEntry).optional(),
  /** Absolute or site-relative OG image. Defaults to a generated card using the article title and description. */
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
  title: z.string().max(60),
  /** Visible H1. Differs from `title` where the SERP intent differs. */
  heading: z.string(),
  description: z.string().max(160),
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

/**
 * Integration recipes: /integrations/ and /integrations/<recipe>/, per
 * product/integration-catalog-on-main-site in the shared context.
 *
 * A recipe entry holds three things with three different owners, and the
 * split is the point of this schema:
 *
 *   - The body is ours. Presentation copy about the problem, the two tools'
 *     contributions, artifact ownership, and the limits.
 *   - `instructions` names a file that is NOT ours: a verbatim copy of the
 *     recipe source authored in the plugin repo. Nothing in this project may
 *     edit it. `digest` pins which revision this page is showing, and the
 *     route checks the file against it at build time, so a page whose visible
 *     instructions disagree with the file it hands out cannot be built.
 *   - The rest is the binding between them: where the source lives, which
 *     hosts have written setup steps, and what has actually been observed.
 *
 * There is deliberately no `status` field. Publication status is derived from
 * `evidence`: a recipe with no evidence records is experimental, and a field
 * that can be edited to say otherwise is a field that will eventually lie.
 */
const recipeToolSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  /** One line: what this tool contributes to the pair. */
  role: z.string(),
  /**
   * Site-absolute icon path. Every catalog in this genre leads with a logo,
   * and a card without one reads as a placeholder. Archcore supplies its own;
   * a partner without a usable mark falls back to a monogram tile, which keeps
   * the card composed without putting someone else's branding on our site
   * before we have decided to.
   */
  icon: z.string().optional(),
  /** Light-on-dark variant, when the icon needs one. */
  iconDark: z.string().optional(),
});

const recipeHostSchema = z.object({
  /** Stable id — also the analytics `host` property. */
  id: z.string(),
  label: z.string(),
  /** The project instruction file this host reads. */
  instructionFile: z.string(),
  /** A step this host needs beyond the generic ones, when it has one. */
  note: z.string().nullable().default(null),
  /**
   * Whether the path was exercised, not whether it is written. Guidance for
   * an unchecked host is still useful; claiming it was tested is not.
   */
  verified: z.boolean().default(false),
});

const recipeEvidenceSchema = z.object({
  /**
   * The instruction digest this run used. A record whose digest does not
   * match the recipe's current `digest` describes a different revision and
   * cannot be shown as evidence for this one.
   */
  digest: z.string().regex(/^[0-9a-f]{64}$/),
  date: z.coerce.date(),
  host: z.string(),
  model: z.string(),
  scenario: z.string(),
  outcome: z.enum(["passed", "failed", "unexecuted"]),
  notes: z.string().optional(),
});

const integrationSchema = z.object({
  title: z.string().max(60),
  /** Visible H1. Differs from `title` where the SERP intent differs. */
  heading: z.string(),
  description: z.string().max(160),
  updatedDate: z.coerce.date(),
  /** Recipe id. Matches the entry filename and the URL slug. */
  recipe: z.string(),
  /**
   * What the partner tool is, in two or three words — the tag on the catalog
   * card. It groups recipes long before there are enough of them to filter.
   */
  category: z.string(),
  /** Card line. Shorter than `description`, which has SEO length to serve. */
  summary: z.string().max(110),
  /** Path under src/recipes/, relative to that directory. */
  instructions: z.string(),
  /** sha256 of the file named by `instructions`. Verified during the build. */
  digest: z.string().regex(/^[0-9a-f]{64}$/),
  source: z.object({
    repo: z.string().url(),
    path: z.string(),
    /**
     * The immutable upstream revision. Null while the recipe source is still
     * unpublished — the page then says so rather than linking a moving target.
     */
    revision: z.string().nullable().default(null),
  }),
  tools: z.array(recipeToolSchema).min(2),
  hosts: z.array(recipeHostSchema).default([]),
  /** Empty until a joint run is recorded. Empty means experimental. */
  evidence: z.array(recipeEvidenceSchema).default([]),
  workflow: z
    .object({
      heading: z.string(),
      steps: z.array(z.object({ title: z.string(), description: z.string() })),
      note: z.string(),
    })
    .optional(),
  pilot: z
    .object({
      heading: z.string(),
      summary: z.string(),
      limitation: z.string(),
      findings: z
        .array(
          z.object({
            scenario: z.string(),
            result: z.string(),
            caveat: z.string(),
          })
        )
        .default([]),
    })
    .optional(),
  limits: z.array(z.string()).default([]),
  maintainer: z.string(),
  draft: z.boolean().default(false),
});

const integrations = defineCollection({
  // Top-level only: src/recipes/ holds the imported instruction files, and a
  // recursive pattern here would try to load them as catalog entries.
  loader: glob({ pattern: "*.md", base: "./src/content/integrations" }),
  schema: integrationSchema,
});

export const collections = { blog, learn, alternatives, pillars, integrations };
