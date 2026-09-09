import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/*", (route) => {
    const host = new URL(route.request().url()).hostname;
    return ["127.0.0.1", "localhost"].includes(host)
      ? route.continue()
      : route.abort();
  });
});

test("integration tabs and install dialog support keyboard, mobile and deep links", async ({
  page,
}) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/integrations/superpowers/");
    const overview = page.getByRole("tab", { name: "How it works" });
    const benefits = page.getByRole("tab", { name: "Benefits & limits" });
    const install = page.getByRole("button", { name: "Install", exact: true });
    const dialog = page.getByRole("dialog", { name: "Connect the two tools" });
    await expect(page.getByRole("tab")).toHaveCount(2);
    await expect(overview).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#install")).toBeHidden();
    await expect(install).toBeInViewport();
    await overview.focus();
    await page.keyboard.press("ArrowRight");
    await expect(benefits).toBeFocused();
    await expect(page.locator("#pilot-results")).toBeVisible();
    await install.click();
    await expect(dialog).toBeVisible();
    const offset = await dialog.evaluate((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.x + r.width / 2 - innerWidth / 2,
        y: r.y + r.height / 2 - innerHeight / 2,
      };
    });
    expect(Math.abs(offset.x)).toBeLessThan(1);
    expect(Math.abs(offset.y)).toBeLessThan(1);
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
    await expect(page.locator("html")).toHaveJSProperty("scrollWidth", width);
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
