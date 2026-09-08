import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { createHash } from "node:crypto";

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
      if (!["/", "/cli/", "/plugin/", "/how-to-use/"].includes(route)) {
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
  await expect(page).toHaveTitle(
    "Archcore CLI — Git-Native Context for AI Coding Agents"
  );
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

test("integration setup changes destination, copies and downloads the same instructions", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/integrations/superpowers/");
  await page.locator("#recipe-agent").selectOption("cursor");
  await expect(page.locator(".recipe-setup")).toContainText("AGENTS.md");
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
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("link", { name: /Download/ }).click();
  const downloaded = await downloadEvent;
  const downloadedPath = await downloaded.path();
  expect(
    createHash("sha256").update(fs.readFileSync(downloadedPath!)).digest("hex")
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
  await expect(page.locator("[data-copy-status]")).toContainText("download");
  await expect(page.locator("#recipe-details")).toBeVisible();
  await page.keyboard.press("Escape");
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
      if (width >= 768)
        expect(position.collection.y).toBe(positions[0].collection.y);
    }
  }
});

test("desktop navigation stays in place with and without the locale selector", async ({
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
