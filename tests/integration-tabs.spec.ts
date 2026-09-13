import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const host = new URL(route.request().url()).hostname;
    return ["127.0.0.1", "localhost"].includes(host)
      ? route.continue()
      : route.abort();
  });
});

for (const [slug, partner] of [
  ["openspec", "OpenSpec"],
  ["spec-kit", "Spec Kit"],
]) {
  test(`${partner} setup uses its own instructions and reports the revision honestly`, async ({
    page,
    context,
    request,
  }) => {
    const source = readFileSync(`src/recipes/${slug}/cooperation.md`, "utf8");
    const digest = createHash("sha256").update(source).digest("hex");
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/integrations/");
    await page
      .getByRole("link", { name: new RegExp(`${partner} \\+ Archcore`) })
      .click();
    await expect(page).toHaveURL(new RegExp(`/integrations/${slug}/$`));
    await expect(page.locator("[data-recipe-root]")).toHaveAttribute(
      "data-digest",
      digest
    );
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.getByRole("button", { name: "Install", exact: true }).click();
      const dialog = page.getByRole("dialog", {
        name: "Connect the two tools",
      });
      await expect(dialog.locator("#install-check blockquote")).toContainText(
        `Confirm you can use Archcore and ${partner}`
      );
      await expect(
        dialog.locator("#install-check blockquote")
      ).not.toContainText("Superpowers");
      expect(await dialog.locator("[data-recipe-text]").textContent()).toBe(
        source
      );
      await dialog.getByRole("button", { name: "Copy instructions" }).click();
      await expect(
        dialog.getByRole("button", { name: "Copied" })
      ).toBeVisible();
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
        source
      );
      const size = await dialog.evaluate((el) => ({
        scroll: el.scrollWidth,
        client: el.clientWidth,
      }));
      expect(size.scroll).toBe(size.client);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    }
    await page.getByRole("tab", { name: "Benefits & limits" }).click();
    await expect(page.locator("#pilot-results")).toContainText(
      "has not had a joint run"
    );
    await page.getByRole("button", { name: "Install", exact: true }).click();
    await page.getByRole("link", { name: "Source & verification" }).click();
    await expect(page.locator("#recipe-details")).toContainText(
      "Landing repository"
    );
    await expect(page.locator("#recipe-details")).toContainText(
      "No joint run has been recorded for this instruction revision."
    );
    const download = await request.get(`/integrations/${slug}/cooperation.md`);
    expect(download.ok()).toBe(true);
    expect(await download.text()).toBe(source);
    const markdown = await request.get(`/integrations/${slug}.md`);
    expect(await markdown.text()).toContain(digest);
  });
}

test("integration tabs and install dialog support keyboard, mobile and deep links", async ({
  page,
}) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/integrations/superpowers/");
    const overview = page.getByRole("tab", { name: "How it works" });
    const examples = page.getByRole("tab", { name: "Examples" });
    const benefits = page.getByRole("tab", { name: "Benefits & limits" });
    const install = page.getByRole("button", { name: "Install", exact: true });
    const dialog = page.getByRole("dialog", { name: "Connect the two tools" });
    await expect(page.getByRole("tab")).toHaveCount(3);
    await expect(overview).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#install")).toBeHidden();
    await expect(install).toBeInViewport();
    await overview.focus();
    await page.keyboard.press("ArrowRight");
    await expect(examples).toBeFocused();
    await expect(page.locator("#examples")).toBeVisible();
    await expect(page.locator("#pilot-results")).toBeHidden();
    await page.keyboard.press("ArrowRight");
    await expect(benefits).toBeFocused();
    await expect(page.locator("#pilot-results")).toBeVisible();
    await install.click();
    await expect(dialog).toBeVisible();
    const offset = await dialog.evaluate((el) => {
      // A modal centres inside the viewport box, which is narrower than
      // innerWidth wherever scrollbars take layout space (`scrollbar-gutter:
      // stable` on Linux CI). Probe that box instead of assuming its size.
      const probe = document.createElement("div");
      probe.style.cssText =
        "position:fixed;inset:0;visibility:hidden;pointer-events:none";
      document.body.append(probe);
      const box = probe.getBoundingClientRect();
      probe.remove();
      const r = el.getBoundingClientRect();
      return {
        x: r.x + r.width / 2 - (box.x + box.width / 2),
        y: r.y + r.height / 2 - (box.y + box.height / 2),
        box: { width: box.width, height: box.height },
        innerWidth: window.innerWidth,
      };
    });
    const where = `Dialog centring at ${width}px (viewport box ${offset.box.width}x${offset.box.height}, innerWidth ${offset.innerWidth})`;
    expect(Math.abs(offset.x), where).toBeLessThan(1);
    expect(Math.abs(offset.y), where).toBeLessThan(1);
    await expect(
      page.getByRole("button", { name: "Close installation" })
    ).toBeFocused();
    await expect(dialog.locator(".recipe-install-guide h3")).toHaveText([
      "1. Install Archcore and Superpowers",
      "2. Add instructions",
      "3. Check in a new session",
    ]);
    await expect(
      dialog.getByRole("button", { name: "Copy instructions" })
    ).toBeVisible();
    const size = await dialog.evaluate((el) => ({
      scroll: el.scrollWidth,
      client: el.clientWidth,
    }));
    expect(size.scroll).toBe(size.client);
    await page.keyboard.press("Tab");
    expect(
      await page
        .locator("#install")
        .evaluate((el) => el.contains(document.activeElement))
    ).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(install).toBeFocused();
    await expect(benefits).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/#pilot-results$/);
    await install.click();
    await page.getByRole("button", { name: "Close installation" }).click();
    await expect(dialog).toBeHidden();
    await install.click();
    await page.mouse.click(1, 1);
    await expect(dialog).toBeHidden();
    // Overflow means the scrollable area is wider than the box, so compare with
    // <=. The two are not equal on every platform: where a scrollbar takes
    // layout space, the root scroller accounts for the gutter on one side only
    // and scrollWidth comes out narrower.
    const root = await page
      .locator("html")
      .evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth }));
    expect(
      root.scroll,
      `Horizontal overflow at ${width}px (scrollWidth ${root.scroll}, clientWidth ${root.client})`
    ).toBeLessThanOrEqual(root.client);
    await overview.click();
    await page.getByRole("link", { name: "See an example" }).click();
    await expect(examples).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/#examples$/);
    await overview.click();
    await page.getByRole("link", { name: "See benefits and limits" }).click();
    await expect(benefits).toHaveAttribute("aria-selected", "true");
  }
  for (const hash of [
    "connect",
    "install",
    "install-instructions",
    "install-check",
  ]) {
    await page.goto(`/integrations/superpowers/#${hash}`);
    await expect(
      page.getByRole("dialog", { name: "Connect the two tools" })
    ).toBeVisible();
    if (hash.startsWith("install-"))
      await expect(page.locator(`#${hash}`)).toBeInViewport();
    await page.keyboard.press("Escape");
    await expect(page.locator("#install")).toBeHidden();
  }
});

test("integration example shows one request, its steps and the caveat", async ({
  page,
  request,
}) => {
  await page.goto("/integrations/serena/#examples");
  const panel = page.locator("#examples");
  await expect(page.getByRole("tab", { name: "Examples" })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect(panel.locator(".recipe-example-request q")).toContainText(
    "Introduce coupon discounts"
  );
  // Every step is attributed to one of the two tools or to the agent, and a
  // step never names a third tool.
  await expect(panel.locator(".recipe-example-tool")).toHaveText([
    "Archcore:",
    "Serena:",
    "Serena:",
    "Archcore:",
    "Agent:",
  ]);
  await expect(panel.locator(".recipe-example-note")).toContainText(
    "not a recorded run"
  );
  const markdown = await request.get("/integrations/serena.md");
  expect(await markdown.text()).toContain("## Example");
  expect(await markdown.text()).toContain("**Serena:** ");
});

test("integration Markdown remains readable without JavaScript", async ({
  page,
}) => {
  const context = await page
    .context()
    .browser()!
    .newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("http://127.0.0.1:4322/integrations/superpowers/");
  await expect(staticPage.locator("#how-it-works")).toBeVisible();
  await expect(staticPage.locator("#examples")).toBeVisible();
  await expect(staticPage.locator("#install")).toBeVisible();
  await expect(staticPage.locator("#pilot-results")).toBeVisible();
  await expect(
    staticPage.locator("#install-instructions [data-recipe-text]")
  ).toBeVisible();
  await expect(staticPage.locator("[data-recipe-text]")).toContainText(
    "### Archcore + Superpowers"
  );
  await expect(staticPage.locator("[data-recipe-copy]")).toBeHidden();
  await context.close();
});
