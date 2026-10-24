import { test, expect } from "@playwright/test";
import { open } from "./helpers.js";

test.describe("Carga y contenido", () => {
  test("la página carga sin errores de consola", async ({ page }) => {
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await open(page);
    await expect(page).toHaveTitle(/Yerlis Dimas/);
    await expect(page.locator("h1")).toContainText("Encuentro los errores");
    expect(errors).toEqual([]);
  });

  test("todas las secciones están presentes", async ({ page }) => {
    await open(page);
    for (const id of ["inicio", "sobre-mi", "habilidades", "proceso", "demo", "proyectos", "reto", "calidad", "trayectoria", "contacto"]) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
  });

  test("ninguna imagen está rota", async ({ page }) => {
    await open(page);
    const imgs = page.locator("img");
    const n = await imgs.count();
    for (let i = 0; i < n; i++) {
      const img = imgs.nth(i);
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  });

  test("los videos de las demos responden", async ({ page, request }) => {
    await open(page);
    for (const v of ["urban-routes", "urban-grocers"]) {
      for (const f of [`${v}.mp4`, `${v}-preview.mp4`]) {
        const res = await request.get(`/videos/${f}`, { headers: { Range: "bytes=0-1023" } });
        expect(res.status(), f).toBeLessThan(400);
      }
    }
  });

  test("no hay scroll horizontal", async ({ page }) => {
    await open(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
