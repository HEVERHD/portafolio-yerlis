// Genera public/og.png (1200×630), la tarjeta que aparece al compartir el
// enlace en LinkedIn, WhatsApp, Slack, etc. Usa el Chromium de Playwright.
//   npm run og
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";

const photo = readFileSync("public/img/yerlis.png").toString("base64");

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Inter+Tight:wght@700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; background: #121019; color: #f2f0f6; font-family: Inter, sans-serif;
         display: flex; align-items: center; gap: 64px; padding: 0 80px; position: relative; overflow: hidden; }
  body::before { content: ""; position: absolute; inset: 0;
    background-image: linear-gradient(#2c2838 1px, transparent 1px), linear-gradient(90deg, #2c2838 1px, transparent 1px);
    background-size: 48px 48px; opacity: .5;
    mask-image: radial-gradient(ellipse 60% 70% at 75% 50%, #000 20%, transparent 75%); }
  .copy { position: relative; flex: 1; }
  .tag { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border: 1px solid #2c2838;
         border-radius: 999px; font-size: 22px; color: #c9c4d4; background: #1c1926; }
  .dot { width: 12px; height: 12px; border-radius: 50%; background: #4cc18c; }
  h1 { margin-top: 28px; font-family: "Inter Tight", sans-serif; font-size: 76px; line-height: 1.02; letter-spacing: -0.035em; }
  h1 u { text-decoration: none; box-shadow: inset 0 -10px 0 #4cc18c55; }
  .name { margin-top: 30px; font-size: 30px; color: #c4a3ef; }
  .cmd { margin-top: 26px; font-family: "JetBrains Mono", monospace; font-size: 22px; color: #9a94a8; }
  .cmd b { color: #4cc18c; font-weight: 500; }
  .photo { position: relative; width: 330px; height: 330px; border-radius: 50%; overflow: hidden; background: #8848aa;
           outline: 10px solid #1c1926; flex: none; }
  .photo img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.06); }
</style></head>
<body>
  <div class="copy">
    <span class="tag"><span class="dot"></span>QA Engineer · Manual & Automation</span>
    <h1>Encuentro los <u>errores</u> antes que tus usuarios.</h1>
    <p class="name">Yerlis Dimas</p>
    <p class="cmd">$ pytest · <b>10 passed</b></p>
  </div>
  <div class="photo"><img src="data:image/png;base64,${photo}" alt=""></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("public/og.png generado");
