import { expect } from "@playwright/test";

// Abre el sitio con un idioma inicial fijo. Solo se aplica si aún no hay uno
// guardado, para que las pruebas de "recordar al recargar" sean válidas.
export async function open(page, lang = "es") {
  await page.addInitScript((l) => {
    try {
      if (!localStorage.getItem("lang")) localStorage.setItem("lang", l);
      localStorage.setItem("boot-seen", "1");
    } catch {}
  }, lang);
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
}

export const isMobile = (testInfo) => testInfo.project.name.startsWith("mobile");
