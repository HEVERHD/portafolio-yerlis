import { test, expect } from "@playwright/test";
import { open } from "./helpers.js";

test.describe("Resumen, CV y disponibilidad", () => {
  test("el resumen en 30 segundos muestra datos clave y un QR", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: "Resumen en 30 segundos" }).click();
    const dialog = page.getByRole("dialog", { name: "Resumen en 30 segundos" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Yerlis Dimas");
    await expect(dialog).toContainText("Colombia · GMT-5");
    await expect(dialog).toContainText("yerlismdimas@gmail.com");
    await expect(dialog.locator("svg.qr path")).toHaveAttribute("d", /M\d/);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("los CV en PDF existen en ambos idiomas", async ({ page, request }) => {
    await open(page);
    const href = await page.getByRole("link", { name: "Descargar CV" }).getAttribute("href");
    expect(href).toMatch(/CV-ES\.pdf$/);
    for (const f of ["Yerlis-Dimas-CV-ES.pdf", "Yerlis-Dimas-CV-EN.pdf"]) {
      const res = await request.get(`/cv/${f}`);
      expect(res.status(), f).toBe(200);
      expect((await res.body()).subarray(0, 5).toString(), f).toBe("%PDF-");
    }
  });

  test("RutaLista aparece primero, con su impacto y enlace", async ({ page }) => {
    await open(page);
    const first = page.locator("#proyectos .project").first();
    await expect(first).toContainText("RutaLista");
    await expect(first).toContainText("En producción");
    await expect(first.locator(".impact dt").first()).toHaveText("~90%");
    const link = first.getByRole("link", { name: "Ver plataforma", exact: true });
    await expect(link).toHaveAttribute("href", "https://rutalista-production.up.railway.app/");
    await expect(link).toHaveAttribute("rel", /noreferrer/);

    await first.getByRole("button", { name: "Ver caso completo" }).click();
    const dialog = page.getByRole("dialog", { name: "RutaLista" });
    await expect(dialog).toContainText("Mi rol: idea, requisitos y QA");
    await expect(dialog).toContainText("Qué validé");
  });

  test("la disponibilidad aparece en contacto", async ({ page }) => {
    await open(page);
    const contact = page.locator("#contacto");
    await expect(contact).toContainText("Remoto · Híbrido · Presencial");
    await expect(contact).toContainText("Inglés (básico, A1–A2)");
  });
});
