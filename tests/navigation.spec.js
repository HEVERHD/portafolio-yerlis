import { test, expect } from "@playwright/test";
import { open, isMobile } from "./helpers.js";

test.describe("Navegación, idioma y tema", () => {
  test("el menú lleva a cada sección", async ({ page }, testInfo) => {
    await open(page);
    const nav = page.getByRole("navigation", { name: "Principal" });
    for (const [label, id] of [
      ["Proceso", "proceso"],
      ["Proyectos", "proyectos"],
      ["Reto", "reto"],
    ]) {
      if (isMobile(testInfo)) await page.getByRole("button", { name: "Abrir menú" }).click();
      await nav.getByRole("link", { name: label }).click();
      await expect(page.locator(`section#${id}`)).toBeInViewport();
    }
  });

  test("cambia a inglés y lo recuerda al recargar", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(page.locator("h1")).toContainText("I find the bugs");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.reload();
    await expect(page.locator("h1")).toContainText("I find the bugs");
  });

  test("cambia el tema y lo recuerda al recargar", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await open(page);
    await page.getByRole("button", { name: "Cambiar a tema oscuro" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
