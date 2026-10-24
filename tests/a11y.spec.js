import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { open } from "./helpers.js";

// Auditoría WCAG 2.1 A/AA con axe en ambos temas e idiomas. El número de
// violaciones se guarda como anotación para el reporte del sitio.
for (const [theme, lang] of [
  ["light", "es"],
  ["dark", "en"],
]) {
  test.describe("Accesibilidad (axe)", () => {
    test(`sin violaciones WCAG A/AA · tema ${theme} · ${lang}`, async ({ page }, testInfo) => {
      await page.emulateMedia({ colorScheme: theme });
      await open(page, lang);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      testInfo.annotations.push({ type: "a11y-violations", description: String(results.violations.length) });
      const summary = results.violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target.join(" ")}`);
      expect(summary).toEqual([]);
    });
  });
}
