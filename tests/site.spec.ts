import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { createHash } from "node:crypto";
import { setupI18n } from "@lingui/core";
import { productCopy } from "../src/data/product-copy";
import { messages as ruMessages } from "../src/locales/ru/messages";

const routes = [
  ...fs
    .readFileSync("dist/sitemap.xml", "utf8")
    .matchAll(/<loc>https:\/\/archcore.ai([^<]+)<\/loc>/g),
].map((match) => match[1]);

test.beforeEach(async ({ page }) => {
  // Exercise local production assets without sending synthetic analytics events.
  await page.route("**/*", (route) => {
    const host = new URL(route.request().url()).hostname;
    return host === "127.0.0.1" || host === "localhost"
      ? route.continue()
      : route.abort();
  });
});

test("shared product descriptions render in English and Russian after hydration", async ({
  page,
}) => {
  const ru = setupI18n({ locale: "ru", messages: { ru: ruMessages } });
  for (const locale of ["en", "ru"] as const) {
    for (const [route, hero, description] of [
      ["/", productCopy.expanded, null],
      ["/cli/", productCopy.cliDescription, productCopy.cliDescription],
      ["/plugin/", productCopy.pluginExpanded, productCopy.pluginDescription],
    ] as const) {
      await page.goto(`${route}?lang=${locale}`);
      const expected = locale === "en" ? hero.message : ru._(hero);
      if (locale === "ru") expect(expected).not.toBe(hero.message);
      await expect(
        page.locator("main").getByText(expected, { exact: true })
      ).toBeVisible();
      if (description) {
        await expect(page.locator('meta[name="description"]')).toHaveAttribute(
          "content",
          locale === "en" ? description.message : ru._(description)
        );
      }
    }
  }
});

for (const route of routes) {
  test(`${route} renders across screen sizes and themes`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        /hydration|hydrating|Minified React error/.test(message.text())
      )
        errors.push(message.text());
    });
    for (const [width, colorScheme] of [
      [320, "light"],
      [390, "light"],
      [768, "dark"],
      [1440, "light"],
    ] as const) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme });
      const response = await page.goto(`${route}?lang=en`);
      expect(response?.status()).toBe(200);
      await page.locator("astro-island[ssr]").evaluateAll(async (elements) => {
        await Promise.all(
          elements.map(
            (element) =>
              new Promise<void>((resolve) => {
                if (!element.hasAttribute("ssr")) return resolve();
                element.addEventListener("astro:hydrate", () => resolve(), {
                  once: true,
                });
              })
          )
        );
      });
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("h1")).toHaveCSS("font-weight", "700");
      expect(
        await page
          .locator("h1")
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize))
      ).toBeGreaterThanOrEqual(30);
      await expect(page.locator(".site-header")).toHaveCount(1);
      await expect(page.locator(".site-footer")).toHaveCount(1);
      // Content titles must share the chrome's left edge, even on narrow screens.
      if (route !== "/") {
        const heading = await page.locator("h1").boundingBox();
        const brand = await page
          .locator(".site-header .site-header__brand")
          .boundingBox();
        expect(
          Math.abs(heading!.x - brand!.x),
          `Grid alignment at ${width}px`
        ).toBeLessThan(1);
      }
      const overflows = await page.evaluate(() =>
        [
          ...document.querySelectorAll<HTMLElement>(
            "main, .site-header, .site-footer, h1, h2, p, .recipe-setup, .post-list"
          ),
        ]
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            return (
              rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1)
            );
          })
          .map((el) => `${el.tagName}.${el.className}`)
      );
      expect(overflows, `Overflow at ${width}px`).toEqual([]);
      expect(await page.locator("html").getAttribute("class")).toContain(
        colorScheme
      );
    }
    expect(errors).toEqual([]);
  });
}

test("language persists across Astro routes and preserves URL hash and attribution", async ({
  page,
}) => {
  await page.goto("/?lang=ru&utm_source=migration-check#install");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.getByRole("combobox", { name: "Language" })).toHaveValue(
    "ru"
  );
  expect(new URL(page.url()).hash).toBe("#install");
  expect(new URL(page.url()).searchParams.get("utm_source")).toBe(
    "migration-check"
  );
  await page.goto("/cli/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    "https://archcore.ai/cli/"
  );
  await page.getByRole("combobox", { name: "Language" }).selectOption("en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page).toHaveTitle("Archcore CLI");
});

test("installation switches platform and copies the selected command", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await expect(page.getByRole("combobox", { name: "Language" })).toBeEnabled();
  await page.getByRole("tab", { name: "Windows", exact: true }).click();
  const panel = page.getByRole("tabpanel", { name: "Windows", exact: true });
  await expect(panel).toContainText(
    "irm https://archcore.ai/install.ps1 | iex"
  );
  await panel.getByRole("button", { name: "Copy command" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "irm https://archcore.ai/install.ps1 | iex"
  );
});

test("plugin installation retains and copies every required host step in both languages", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 320, height: 900 });
  const hostCommands = [
    [
      "Claude Code",
      [
        "/plugin marketplace add archcore-ai/plugin",
        "/plugin install archcore@archcore-plugins",
      ],
    ],
    ["Cursor 2.5+", ["https://github.com/archcore-ai/plugin"]],
    [
      "Codex CLI 0.117+",
      [
        "codex plugin marketplace add archcore-ai/plugin",
        "codex plugin add archcore@archcore-plugins",
      ],
    ],
    [
      "Copilot CLI",
      [
        "copilot plugin install archcore-ai/plugin:plugins/archcore",
        'archcore init --agent copilot --project "$PWD"',
      ],
    ],
  ] as const;
  for (const locale of ["en", "ru"]) {
    await page.goto(`/plugin/?lang=${locale}`);
    await expect(
      page.locator('#install a[href="/cli/#install"]')
    ).toBeVisible();
    for (const tab of await page.getByRole("tab").all()) {
      const bounds = await tab.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    }
    for (const [host, commands] of hostCommands) {
      await page.getByRole("tab", { name: host, exact: true }).click();
      const panel = page.getByRole("tabpanel", { name: host, exact: true });
      await expect(panel.locator("[data-analytics-install]")).toHaveCount(
        commands.length
      );
      for (let index = 0; index < commands.length; index++) {
        const command = panel.locator("[data-analytics-install]").nth(index);
        await expect(command).toContainText(commands[index]);
        await command.getByRole("button").click();
        expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
          commands[index]
        );
      }
      if (host === "Cursor 2.5+") {
        await expect(panel).toContainText(
          "archcore mcp install --agent cursor"
        );
      }
    }
  }
});

test("integration displays, copies and exports the same Markdown", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/integrations/superpowers/");
  await page.getByRole("button", { name: "Install", exact: true }).click();
  await expect(page.locator("#install")).toContainText("AGENTS.md");
  await page
    .getByRole("button", { name: "Copy instructions", exact: true })
    .click();
  const expected = fs.readFileSync(
    "src/recipes/superpowers/cooperation.md",
    "utf8"
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    expected
  );
  expect(
    await page.locator("#install-instructions [data-recipe-text]").textContent()
  ).toBe(expected);
  const markdown = page.locator("#install-instructions [data-recipe-text]");
  expect((await markdown.boundingBox())!.height).toBeLessThanOrEqual(224);
  const expand = page.locator("[data-recipe-expand]");
  await expand.click();
  await expect(expand).toHaveAttribute("aria-expanded", "true");
  expect((await markdown.boundingBox())!.height).toBeGreaterThan(224);
  await page.locator("[data-recipe-copy]").click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    expected
  );
  await expand.click();
  await expect(expand).toHaveAttribute("aria-expanded", "false");
  expect((await markdown.boundingBox())!.height).toBeLessThanOrEqual(224);

  const exported = await page.request.get(
    "/integrations/superpowers/cooperation.md"
  );
  expect(exported.ok()).toBe(true);
  expect(
    createHash("sha256")
      .update(await exported.body())
      .digest("hex")
  ).toBe(createHash("sha256").update(expected).digest("hex"));
});

test("native navigation and FAQ work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4322/");
  await expect(page.locator("h1")).toContainText("Spec-Driven Development");
  await page.locator(".site-header__mobile summary").click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" })
  ).toBeVisible();
  const faq = page.locator(".faq-disclosure").first();
  await faq.locator("summary").click();
  await expect(faq.locator("p")).toBeVisible();
  await context.close();
});

test("legacy install URL retains query/hash and unknown URLs return a real 404", async ({
  page,
}) => {
  await page.goto("/install/?utm_source=legacy#install");
  await expect(page).toHaveURL(/\/cli\/?\?utm_source=legacy#install$/);
  const missing = await page.goto("/__missing_migration_route__/");
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found", exact: true })
  ).toBeVisible();
});

test("integration details stay usable when clipboard access fails", async ({
  page,
}) => {
  await page.goto("/integrations/superpowers/");
  await page.getByRole("button", { name: "Install", exact: true }).click();
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: () => Promise.reject(new Error("Permission denied")),
      },
      configurable: true,
    })
  );
  await page
    .getByRole("button", { name: "Copy instructions", exact: true })
    .click();
  await expect(page.locator("[data-copy-status]")).toContainText("manually");
  await expect(page.locator("[data-recipe-text]")).toBeFocused();
  expect(
    await page.evaluate(
      () => window.getSelection()?.getRangeAt(0).cloneContents().textContent
    )
  ).toBe(fs.readFileSync("src/recipes/superpowers/cooperation.md", "utf8"));
  await expect(page.locator("#recipe-details")).not.toBeVisible();
  await page.locator("[data-recipe-details]").click();
  await expect(page.locator("#recipe-details")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#recipe-details")).not.toBeVisible();
});

test("Russian chrome fits a narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/?lang=ru");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator(".site-footer")).toContainText(
    "Git-нативный контекст"
  );
  const edge = await page
    .locator(".site-header__actions")
    .evaluate((el) => el.getBoundingClientRect().right);
  expect(edge).toBeLessThanOrEqual(320);
});

test("hub headings and collections stay aligned between pages", async ({
  page,
}) => {
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const positions = [];
    for (const route of ["/blog/", "/learn/", "/integrations/"]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      positions.push(
        await page.evaluate(() => {
          const rect = (selector: string) => {
            const { x, y, width } = document
              .querySelector(selector)!
              .getBoundingClientRect();
            return { x, y, width };
          };
          return {
            title: rect("h1"),
            intro: rect(".page-intro__description"),
            collection: rect(".post-list, .catalog-grid"),
          };
        })
      );
    }
    for (const position of positions.slice(1)) {
      expect(position.title).toEqual(positions[0].title);
      expect(position.intro.x).toBe(positions[0].intro.x);
      expect(position.intro.y).toBe(positions[0].intro.y);
      expect(position.collection.x).toBe(positions[0].collection.x);
      expect(position.collection.width).toBe(positions[0].collection.width);
    }
  }
});

test("desktop navigation stays in place across page types", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  let reference;
  for (const route of ["/", "/blog/", "/integrations/", "/how-to-use/"]) {
    await page.goto(route + "?lang=en");
    await page.evaluate(() => document.fonts.ready);
    const box = await page.locator(".site-header__inner > nav").boundingBox();
    if (reference) expect(box).toEqual(reference);
    else reference = box;
  }
});

test("shared header retains language across static and translated pages", async ({
  page,
}) => {
  await page.goto(
    "/integrations/?lang=ru&utm_source=header-check#main-content"
  );
  for (const route of [
    null,
    "/blog/",
    "/learn/",
    "/blog/claude-code-memory/",
    "/privacy/",
  ]) {
    if (route) await page.goto(route);
    await expect(page.getByRole("combobox", { name: "Language" })).toHaveValue(
      "ru"
    );
    await expect(page.locator(".site-header")).toHaveAttribute("lang", "ru");
    await expect(page.locator(".site-header .nav-cta")).toHaveText(
      "Установить"
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  }
  await page.getByRole("combobox", { name: "Language" }).selectOption("en");
  await page.goto("/cli/");
  await expect(page.getByRole("combobox", { name: "Language" })).toHaveValue(
    "en"
  );
  await page.getByRole("combobox", { name: "Language" }).selectOption("ru");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await page.goto("/integrations/");
  await expect(page.locator(".site-header .nav-cta")).toHaveText("Установить");
});

test("header Star, Install, language and menu fit; Docs opens a new tab", async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/blog/?lang=ru");
    await expect(
      page.getByRole("combobox", { name: "Language" })
    ).toBeEnabled();
    const star = page.locator(".nav-star");
    await expect(star).toBeVisible();
    await expect(star).toHaveAttribute(
      "href",
      "https://github.com/archcore-ai/plugin"
    );
    await expect(star).toHaveAttribute("target", "_blank");
    for (const docs of await page
      .locator('.site-header a[href="https://docs.archcore.ai/"]')
      .all()) {
      await expect(docs).toHaveAttribute("target", "_blank");
      await expect(docs).toHaveAttribute("rel", "noopener noreferrer");
    }
    const boxes = await page
      .locator(
        ".site-header__brand, .site-header__inner > nav, .site-header__actions > *"
      )
      .evaluateAll((elements) =>
        elements
          .filter(
            (el) =>
              el.closest(".site-header") && el.getBoundingClientRect().width > 0
          )
          .map((el) => {
            const { x, right } = el.getBoundingClientRect();
            return { x, right };
          })
          .sort((a, b) => a.x - b.x)
      );
    for (let i = 0; i < boxes.length; i++) {
      expect(boxes[i].x).toBeGreaterThanOrEqual(0);
      expect(boxes[i].right).toBeLessThanOrEqual(width);
      if (i) expect(boxes[i].x).toBeGreaterThanOrEqual(boxes[i - 1].right);
    }
  }
});

test("collections fill the outer grid and articles use the right rail", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of ["/blog/", "/learn/", "/integrations/"]) {
    await page.goto(route);
    const collection = await page
      .locator(".post-list, .catalog-grid")
      .boundingBox();
    const footer = await page.locator(".site-header .nav-cta").boundingBox();
    expect(collection!.x + collection!.width).toBeCloseTo(
      footer!.x + footer!.width,
      0
    );
    if (route !== "/integrations/") {
      const items = page.locator(".post-list > li");
      const first = await items.nth(0).boundingBox();
      const second = await items.nth(1).boundingBox();
      expect(first!.y).toBe(second!.y);
      expect(second!.x).toBeGreaterThan(first!.x + first!.width);
    }
  }
  for (const route of ["/blog/claude-code-memory/", "/context-engineering/"]) {
    await page.goto(route);
    const toc = page.getByRole("navigation", { name: "On this page" });
    await expect(toc).toBeVisible();
    const heading = await page.locator("h1").boundingBox();
    const sidebar = await toc.boundingBox();
    expect(sidebar!.x).toBeGreaterThan(heading!.x + heading!.width);
    await toc.locator("a").first().click();
    expect(new URL(page.url()).hash).not.toBe("");
  }
});

test("product guides share the walkthrough article layout and a working localized outline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const locale of ["en", "ru"]) {
    for (const route of ["/how-to-use/", "/cli/", "/plugin/"]) {
      await page.goto(`${route}?lang=${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      const article = page.locator("main > article.article");
      const outline = page.locator("main > .article-toc");
      await expect(article).toBeVisible();
      await expect(page.locator(".hero-section")).toHaveCount(0);
      await expect(outline).toBeVisible();
      expect((await outline.boundingBox())!.x).toBeGreaterThan(
        (await article.boundingBox())!.x + (await article.boundingBox())!.width
      );
      for (const link of await outline.getByRole("link").all()) {
        const hash = await link.getAttribute("href");
        await expect(article.locator(hash!)).toHaveCount(1);
      }
      const lastLink = outline.getByRole("link").last();
      const hash = await lastLink.getAttribute("href");
      await lastLink.click();
      expect(new URL(page.url()).hash).toBe(hash);
      if (route !== "/how-to-use/") {
        await expect(page.locator("main > .recipe-cta h2")).toHaveText(
          locale === "en" ? "Start with Archcore." : "Начните с Archcore."
        );
      }
    }
  }
});

test("how-to guide keeps its article layout, install actions and translated outline", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/how-to-use/?lang=en");
  await expect(page.locator("main > article.article")).toBeVisible();
  await expect(page.locator(".hero-section")).toHaveCount(0);
  await expect(page.locator("#cycle h3")).toHaveCount(4);
  expect(
    await page
      .locator("#cycle section")
      .evaluateAll((nodes) => nodes.map((node) => node.id))
  ).toEqual(["init", "plan", "document", "review"]);
  const copy = page
    .locator("#install")
    .getByRole("button", { name: "Copy command" });
  await copy.nth(0).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "curl -fsSL https://archcore.ai/install.sh | bash"
  );
  await copy.nth(1).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "archcore init"
  );
  await page
    .getByRole("navigation", { name: "On this page" })
    .locator('a[href="#review"]')
    .click();
  expect(new URL(page.url()).hash).toBe("#review");
  await page.getByRole("combobox", { name: "Language" }).selectOption("ru");
  await expect(
    page.getByRole("navigation", { name: "На этой странице" })
  ).toBeVisible();
  await expect(page.locator("h1")).toHaveText("Как пользоваться Archcore");
  await expect(page.locator("#plan blockquote")).toContainText("Спланируйте");
  const closing = page.locator('[data-analytics-cta="how_to_use_github"]');
  await expect(closing.getByRole("link")).toHaveCount(1);
  await expect(closing.getByRole("link")).toHaveText("Открыть на GitHub →");
  await expect(closing.getByRole("link")).toHaveAttribute(
    "href",
    "https://github.com/archcore-ai"
  );
  await expect(closing.getByRole("link")).toHaveAttribute("target", "_blank");
});

test("editorial closing CTAs fit the full page grid and keep navigation in the same tab", async ({
  page,
}) => {
  for (const route of routes.filter((route) =>
    /^\/(blog|learn|cli|plugin)\//.test(route)
  )) {
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const cta = page.locator("main > .recipe-cta");
      await cta.scrollIntoViewIfNeeded();
      const main = await page.locator("main").evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return {
          left: rect.left + parseFloat(style.paddingLeft),
          right: rect.right - parseFloat(style.paddingRight),
        };
      });
      const bounds = await cta.boundingBox();
      expect(bounds!.x).toBeCloseTo(main.left, 0);
      expect(bounds!.x + bounds!.width).toBeCloseTo(main.right, 0);
      for (const link of await cta.getByRole("link").all()) {
        await expect(link).toBeVisible();
        const rect = await link.boundingBox();
        expect(rect!.x).toBeGreaterThanOrEqual(main.left);
        expect(rect!.x + rect!.width).toBeLessThanOrEqual(main.right + 1);
      }
    }
  }
  const cta = page.locator("main > .recipe-cta");
  await cta.getByRole("link", { name: "Install Archcore →" }).click();
  await expect(page).toHaveURL(/\/how-to-use\/$/);
});
