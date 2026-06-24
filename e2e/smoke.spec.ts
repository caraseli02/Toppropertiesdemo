import { test, expect } from "@playwright/test";

test("app loads and shows the TopProperties title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/TopProperties/i);
});

test("prompt composer is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("textarea").or(page.locator("input[type='text']"))).toBeVisible();
});
