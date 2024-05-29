import { test as base, expect } from "@playwright/test";
import Translation, { language } from "../common/translation";
import { dirname } from "path";

type TranslationFixture = {
  translation: Translation;
};
export const test = base.extend<TranslationFixture>({
  translation: async ({}, use) => {
    const translation = new Translation(process.env.LNG as language);
    await translation.loadDataSource("fr", "./locale/fr.json");
    await use(translation);
  },
});

test("has title", async ({ page, translation }) => {
  await page.goto("https://playwright.dev/");

  console.log(translation.translate("hello"));
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
