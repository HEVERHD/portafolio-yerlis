import { test, expect } from "@playwright/test";
import { open, isMobile } from "./helpers.js";

test.describe("Consola qa-cli", () => {
  test("se abre y ejecuta comandos", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: /Abrir consola qa-cli/ }).click();
    const cli = page.getByRole("dialog", { name: "qa-cli" });
    await expect(cli).toBeVisible();
    const input = cli.getByRole("textbox", { name: "Comando" });

    await input.fill("whoami");
    await input.press("Enter");
    await expect(cli).toContainText("Yerlis Dimas — QA Engineer");

    await input.fill("run tests");
    await input.press("Enter");
    await expect(cli).toContainText("10 passed");

    await input.fill("comando-inexistente");
    await input.press("Enter");
    await expect(cli).toContainText("Comando no encontrado");

    await page.keyboard.press("Escape");
    await expect(cli).toBeHidden();
  });

  test("se abre con Ctrl + K", async ({ page }, testInfo) => {
    test.skip(isMobile(testInfo), "atajo de teclado solo en escritorio");
    await open(page);
    await page.keyboard.press("Control+k");
    await expect(page.getByRole("dialog", { name: "qa-cli" })).toBeVisible();
  });
});

test.describe("Demo de automatización", () => {
  test("muestra la petición, la respuesta y el resultado", async ({ page }) => {
    await open(page);
    const demo = page.locator("#demo");
    await demo.scrollIntoViewIfNeeded();
    await expect(demo).toContainText("POST /api/v1/users/");
    await expect(demo).toContainText("201");
    await expect(demo).toContainText("PASSED");

    await demo.getByRole("button", { name: "Siguiente caso" }).click();
    await expect(demo).toContainText("400");
    await expect(demo).toContainText("Has introducido un nombre de usuario no válido");
  });
});

test.describe("Reto: encuentra el bug", () => {
  test("encontrar los 5 bugs completa el reto", async ({ page }) => {
    await open(page);
    const game = page.locator("#reto");
    await game.scrollIntoViewIfNeeded();

    await game.getByRole("button", { name: "Revisar: Campo de correo" }).click();
    await expect(game).toContainText("Esto funciona bien");
    await expect(game).toContainText("0/5 encontrados");

    for (const name of ["Nonbre", "6/16", "Teléfono", "Fecha de nacimiento", "Crear cuenta"]) {
      await game.getByRole("button", { name: `Revisar: ${name}`, exact: true }).click();
    }
    await expect(game).toContainText("5/5 encontrados");
    await expect(game).toContainText("Encontraste todos los bugs");

    await game.getByRole("button", { name: "Reiniciar" }).click();
    await expect(game).toContainText("0/5 encontrados");
  });
});

test.describe("Proyectos", () => {
  test("el caso de estudio se abre con sus casos de prueba", async ({ page }) => {
    await open(page);
    const card = page.locator(".project").filter({ hasText: "API Stand" });
    await card.getByRole("button", { name: "Ver caso completo" }).click();
    const dialog = page.getByRole("dialog", { name: /API Stand/ });
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("tbody tr")).toHaveCount(10);
    await dialog.getByRole("button", { name: "Cerrar" }).click();
    await expect(dialog).toBeHidden();
  });

  test("la demo en video se abre y se cierra", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: "Ver demo en video de Urban Routes" }).click();
    const dialog = page.getByRole("dialog", { name: "Urban Routes" });
    await expect(dialog.locator("video")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});
