import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { load } from "cheerio";

const root = path.resolve("dist");
const baseline = JSON.parse(
  fs.readFileSync("scripts/fixtures/seo-baseline.json", "utf8")
);
const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
const readPage = (route: string) =>
  load(fs.readFileSync(path.join(root, route, "index.html"), "utf8"));
const sitemap = load(fs.readFileSync(path.join(root, "sitemap.xml"), "utf8"), {
  xmlMode: true,
});
const urls = sitemap("loc")
  .map((_, el) => sitemap(el).text())
  .get();
assert.equal(new Set(urls).size, urls.length, "Sitemap URLs must be unique");
const routes = urls.map((url) => new URL(url).pathname);
const errors: string[] = [];
function check(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}
const pages = new Map(routes.map((route) => [route, readPage(route)]));
for (const [route, $] of pages) {
  check($("h1").length === 1, `${route}: exactly one H1`);
  check(
    $("main#main-content").length === 1,
    `${route}: one accessible main landmark`
  );
  check(
    $(".site-header").length === 1 && $(".site-footer").length === 1,
    `${route}: shared site shell`
  );
  check(
    $("link[rel=canonical]").length === 1,
    `${route}: exactly one canonical`
  );
  check(
    $("link[rel=canonical]").attr("href") === `https://archcore.ai${route}`,
    `${route}: self canonical`
  );
  check(
    !$("meta[name=robots]").attr("content")?.includes("noindex"),
    `${route}: must be indexable`
  );
  check(
    normalize($("main").text()).length > 100,
    `${route}: content must exist before JavaScript`
  );
  const ids = $("[id]")
    .map((_, e) => $(e).attr("id")!)
    .get();
  check(new Set(ids).size === ids.length, `${route}: unique IDs`);
  for (const script of $('script[type="application/ld+json"]')) {
    const schema = JSON.parse($(script).text());
    if (schema["@type"] === "FAQPage") {
      for (const question of schema.mainEntity) {
        check(
          normalize($("main").text()).includes(normalize(question.name)),
          `${route}: FAQ question visible: ${question.name}`
        );
        check(
          normalize($("main").text()).includes(
            normalize(question.acceptedAnswer.text)
          ),
          `${route}: FAQ answer visible: ${question.name}`
        );
      }
    }
  }
  for (const el of $(
    "[href], img[src], script[src], video[src], source[src]"
  )) {
    const attr = $(el).attr("href") ?? $(el).attr("src");
    if (!attr || (!attr.startsWith("/") && !attr.startsWith("#"))) continue;
    const target = new URL(attr, `https://archcore.ai${route}`);
    const file = path.join(root, decodeURIComponent(target.pathname));
    const resolved =
      fs.existsSync(file) && fs.statSync(file).isDirectory()
        ? path.join(file, "index.html")
        : file;
    check(
      fs.existsSync(resolved),
      `${route}: missing local asset/link ${attr}`
    );
    if (
      target.hash &&
      target.pathname !== "/install/" &&
      fs.existsSync(resolved) &&
      resolved.endsWith(".html")
    ) {
      const destination = load(fs.readFileSync(resolved, "utf8"));
      check(
        destination("[id]")
          .toArray()
          .some(
            (node) =>
              destination(node).attr("id") ===
              decodeURIComponent(target.hash.slice(1))
          ),
        `${route}: missing anchor ${attr}`
      );
    }
  }
}
for (const old of baseline) {
  const $ = pages.get(old.route);
  check(!!$, `${old.route}: published route retained`);
  if (!$) continue;
  for (const [label, value, previous] of [
    ["title", $("title").text(), old.title],
    [
      "description",
      $("meta[name=description]").attr("content"),
      old.description,
    ],
    ["canonical", $("link[rel=canonical]").attr("href"), old.canonical],
    ["OG image", $('meta[property="og:image"]').attr("content"), old.ogImage],
  ])
    check(value === previous, `${old.route}: preserved ${label}`);
  if (old.articleBlocks) {
    // Compare meaningful text blocks; formatting can add whitespace between adjacent list items.
    const blocks = $("article.article")
      .find("h1,h2,h3,h4,h5,h6,p,li,th,td,pre,dt,dd,figcaption")
      .map((_, el) => normalize($(el).text()))
      .get();
    check(
      JSON.stringify(blocks) === JSON.stringify(old.articleBlocks),
      `${old.route}: article text preserved`
    );
    const schemas = $('script[type="application/ld+json"]')
      .map((_, e) => JSON.parse($(e).text()))
      .get()
      .filter((s) => s["@type"] !== "FAQPage");
    check(
      JSON.stringify(schemas) === JSON.stringify(old.schemas),
      `${old.route}: article schemas/dates preserved`
    );
  }
}
for (const name of [
  "install.sh",
  "install.ps1",
  "robots.txt",
  "llms.txt",
  "install/index.html",
]) {
  check(
    fs
      .readFileSync(path.join(root, name))
      .equals(fs.readFileSync(path.join("public", name))),
    `${name}: exact public file preserved`
  );
}
const instructions = "integrations/superpowers/cooperation.md";
const expected = fs.readFileSync("src/recipes/superpowers/cooperation.md");
check(
  fs.readFileSync(path.join(root, instructions)).equals(expected),
  "Recipe download must be byte-identical"
);
console.log(
  `Recipe SHA256: ${createHash("sha256").update(expected).digest("hex")}`
);
const missing = load(fs.readFileSync(path.join(root, "404.html"), "utf8"));
check(
  missing("meta[name=robots]").attr("content")?.includes("noindex"),
  "404 must be noindex"
);
check(
  missing("link[rel=canonical]").length === 0,
  "404 must not canonicalize to home"
);
check(
  routes.includes("/teams/getting-started/"),
  "Team setup must be a real indexed route"
);
if (errors.length)
  throw new Error(`Build verification failed:\n${errors.join("\n")}`);
console.log(
  `Verified ${routes.length} indexable pages, ${baseline.length} preserved routes, local links/assets, FAQ parity, installer and recipe bytes, and the 404 page.`
);
