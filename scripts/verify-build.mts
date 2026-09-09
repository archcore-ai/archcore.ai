import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { load } from "cheerio";
import { productCopy } from "../src/data/product-copy";
import marketingMeta from "../src/data/marketing-meta.json";
import { LINKS } from "../src/lib/links";

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
const retiredClaims = [
  "a memory that lives next to the code",
  "captures every new decision back into Git",
  "all eight supported agents over MCP and session hooks",
  "any MCP agent before they edit",
  "See what a week with it looks like",
];
for (const [page, meta] of Object.entries(marketingMeta)) {
  const route = page === "home" ? "/" : `/${page}/`;
  const $ = pages.get(route)!;
  const description =
    productCopy[meta.descriptionKey as keyof typeof productCopy].message;
  check(description.length <= 160, `${route}: description length`);
  check(
    $("meta[name=description]").attr("content") === description,
    `${route}: shared description`
  );
  check(
    $('meta[property="og:description"]').attr("content") === description,
    `${route}: shared OG description`
  );
  check(
    $('meta[name="twitter:description"]').attr("content") === description,
    `${route}: shared Twitter description`
  );
}
const llms = fs.readFileSync("public/llms.txt", "utf8");
for (const key of ["definition", "expanded", "delivery"] as const) {
  check(llms.includes(productCopy[key].message), `llms.txt: shared ${key}`);
}
for (const [route, $] of pages) {
  const prose = normalize(
    $("main").clone().find("script, style").remove().end().text()
  );
  for (const claim of retiredClaims) {
    check(!prose.includes(claim), `${route}: retired claim: ${claim}`);
  }
  check(
    !/\bno telemetry(?:[.,;]|$)/i.test(prose),
    `${route}: unqualified telemetry claim`
  );
  for (const cta of $('[data-analytics-cta="pillar_install"]')) {
    check(
      normalize($(cta).find("p").text()) === productCopy.expanded.message,
      `${route}: shared product CTA`
    );
  }
  if (
    /^\/(blog|learn|cli|plugin)\//.test(route) ||
    (route.startsWith("/integrations/") && route !== "/integrations/")
  ) {
    const cta = $("main > .recipe-cta");
    const integration = route.startsWith("/integrations/");
    const listing = route === "/blog/" || route === "/learn/";
    check(cta.length === 1, `${route}: one shared closing CTA`);
    check(
      normalize(cta.find("h2").text()) === "Start with Archcore.",
      `${route}: closing CTA heading`
    );
    check(
      normalize(cta.find("p").text()) ===
        "Keep your project decisions ready for the next task.",
      `${route}: closing CTA description`
    );
    check(
      cta.attr("data-analytics-cta") ===
        (route === "/cli/"
          ? "cli_install"
          : route === "/plugin/"
            ? "plugin_install"
            : integration
              ? "recipe_install"
              : listing
                ? "listing_install"
                : "article_install"),
      `${route}: closing CTA analytics`
    );
    const links = cta.find("a");
    check(
      links.length === 2 && cta.find(".btn--primary").length === 1,
      `${route}: closing CTA action hierarchy`
    );
    check(
      normalize(links.eq(0).text()) === "Install Archcore →" &&
        normalize(links.eq(1).text()) === "See how it works",
      `${route}: closing CTA labels`
    );
    for (const link of links) {
      check(
        $(link).attr("href") === "/how-to-use/",
        `${route}: closing CTA destination`
      );
      check(
        $(link).attr("target") === (integration ? "_blank" : undefined),
        `${route}: closing CTA tab behavior`
      );
      if (integration)
        check(
          $(link).attr("rel") === "noopener noreferrer",
          `${route}: closing CTA rel`
        );
    }
    if (!integration) {
      check(
        $("main > :last-child").is(cta),
        `${route}: CTA follows content and FAQ`
      );
      check($("article .cta").length === 0, `${route}: no legacy article CTA`);
    }
  }
  check($("h1").length === 1, `${route}: exactly one H1`);
  check(
    $("main#main-content").length === 1,
    `${route}: one accessible main landmark`
  );
  check(
    $(".site-header").length === 1 && $(".site-footer").length === 1,
    `${route}: shared site shell`
  );
  const navigationOrder = [
    "/how-to-use/",
    "/integrations/",
    LINKS.docs,
    "/blog/",
    "/learn/",
  ];
  for (const selector of [
    ".site-header__inner > nav",
    ".site-header__mobile nav",
  ]) {
    check(
      JSON.stringify(
        $(selector)
          .find("a")
          .slice(0, 5)
          .map((_, a) => $(a).attr("href"))
          .get()
      ) === JSON.stringify(navigationOrder),
      `${route}: header navigation order`
    );
  }
  check(
    $(".site-footer__reference").length === 0,
    `${route}: no footer reference navigation`
  );
  for (const href of [
    "/context-engineering/",
    "/spec-driven-development/",
    "/project-context/",
    "/git-native-context/",
    "/mcp/",
  ]) {
    check(
      $(`.site-footer a[href="${href}"]`).length === 0,
      `${route}: removed footer reference link ${href}`
    );
  }
  for (const surface of [".site-header", ".site-footer"]) {
    const brand = $(`${surface} .site-header__brand`);
    check(
      brand.length === 1 &&
        brand.attr("href") === "/" &&
        normalize(brand.find("span").text()) === "archcore",
      `${route}: shared ${surface} wordmark`
    );
    check(
      brand.find('img.logo-light[src="/logo.png"]').length === 1 &&
        brand.find('img.logo-dark[src="/logo-dark.png"]').length === 1,
      `${route}: shared ${surface} logo variants`
    );
  }
  if (route === "/how-to-use/") {
    const cta = $('[data-analytics-cta="how_to_use_github"]');
    check(
      cta.length === 1 && cta.find("a").length === 1,
      `${route}: one GitHub closing action`
    );
    const link = cta.find("a");
    check(
      link.attr("href") === LINKS.org &&
        link.attr("target") === "_blank" &&
        link.attr("rel") === "noopener noreferrer",
      `${route}: GitHub closing destination`
    );
    check(
      normalize(link.text()) === "View on GitHub →",
      `${route}: GitHub closing label`
    );
    check(
      $('[data-analytics-cta="back_to_install"]').length === 0,
      `${route}: no closing installation CTA`
    );
  }
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
  !routes.includes("/teams/getting-started/") &&
    !fs.existsSync(path.join(root, "teams/getting-started/index.html")),
  "Removed team setup route must not be published"
);
if (errors.length)
  throw new Error(`Build verification failed:\n${errors.join("\n")}`);
console.log(
  `Verified ${routes.length} indexable pages, ${baseline.length} preserved routes, local links/assets, FAQ parity, installer and recipe bytes, and the 404 page.`
);
