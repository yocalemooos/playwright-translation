import { test as base } from "@playwright/test";
import Translation, { language } from "../common/translation";

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
