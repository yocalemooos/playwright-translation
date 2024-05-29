import { expect } from "@playwright/test";
import { test } from "../fixtures/translation";

test("has title", async ({ page, translation }) => {
  await page.goto("https://playwright.dev/");

  console.log(translation.translate("hello"));
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
