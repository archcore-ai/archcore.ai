import path from "path";
import fs from "fs";

/**
 * Merges the content-site Astro build (content-site/dist) into the main
 * dist/ produced by Vite, and appends the content routes to the sitemap
 * that scripts/prerender-routes.mts generated.
 *
 * Run after `vite build` (which ends with the prerender plugin writing
 * dist/sitemap.xml) and after `npm --prefix content-site run build`.
 * See .archcore/landing/content-hub-astro-subbuild.adr.md.
 */

const ROOT = process.cwd();
const SRC = path.join(ROOT, "content-site", "dist");
const DEST = path.join(ROOT, "dist");
const SECTIONS = ["blog", "learn", "alternatives"];
/** Astro emits hashed CSS/JS here; no clash with Vite's dist/assets. */
const ASSET_DIR = "_astro";

if (!fs.existsSync(SRC)) {
  console.error(`[merge-content] ${SRC} not found — run the content build first`);
  process.exit(1);
}
if (!fs.existsSync(path.join(DEST, "index.html"))) {
  console.error(`[merge-content] ${DEST} has no index.html — run vite build first`);
  process.exit(1);
}

const copied: string[] = [];
for (const dir of [...SECTIONS, ASSET_DIR]) {
  const from = path.join(SRC, dir);
  if (!fs.existsSync(from)) continue;
  fs.cpSync(from, path.join(DEST, dir), { recursive: true });
  copied.push(dir);
}

/** Collect routes: every index.html under a section dir becomes a URL. */
function collectRoutes(section: string): string[] {
  const base = path.join(SRC, section);
  if (!fs.existsSync(base)) return [];
  const routes: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === "index.html") {
        const rel = path.relative(SRC, dir).split(path.sep).join("/");
        routes.push(`/${rel}/`);
      }
    }
  };
  walk(base);
  return routes.sort();
}

const routes = SECTIONS.flatMap(collectRoutes);
let added = 0;

if (routes.length > 0) {
  const sitemapPath = path.join(DEST, "sitemap.xml");
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const lastmod = new Date().toISOString().slice(0, 10);
  // Appending is only safe once per generated sitemap. Skip routes already
  // present so re-running this script (without a fresh vite build) cannot
  // emit duplicate <loc> entries.
  const fresh = routes.filter(
    (route) => !sitemap.includes(`<loc>https://archcore.ai${route}</loc>`),
  );
  added = fresh.length;
  if (fresh.length < routes.length) {
    console.log(
      `[merge-content] ${routes.length - fresh.length} route(s) already in sitemap — skipped`,
    );
  }
  if (fresh.length > 0) {
    const entries = fresh
      .map(
        (route) => `  <url>
    <loc>https://archcore.ai${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`,
      )
      .join("\n");
    fs.writeFileSync(
      sitemapPath,
      sitemap.replace("</urlset>", `${entries}\n</urlset>`),
      "utf8",
    );
  }
}

console.log(
  `[merge-content] merged ${copied.join(", ") || "nothing"}; ${added} route(s) added to sitemap`,
);
