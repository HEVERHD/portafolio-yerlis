// Genera el CV en PDF (español e inglés) a partir de src/content.js, para que
// el CV y el sitio nunca se contradigan. Formato pensado para filtros ATS:
// una columna, encabezados estándar, fuente del sistema y texto real.
//   npm run cv   → public/cv/Yerlis-Dimas-CV-ES.pdf y Yerlis-Dimas-CV-EN.pdf
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { content, profile } from "../src/content.js";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

function html(t, lang) {
  const cv = t.cv;
  const av = t.availability;
  const contact = [
    profile.email,
    bare(profile.linkedin),
    bare(profile.github),
    av.location,
    profile.siteUrl && `${cv.portfolio}: ${bare(profile.siteUrl)}`,
  ].filter(Boolean);

  return `<!doctype html>
<html lang="${lang}"><head><meta charset="utf-8">
<title>${esc(profile.name)} — ${esc(profile.role)} — CV</title>
<style>
  @page { size: A4; margin: 12mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, Helvetica, sans-serif; font-size: 10pt; line-height: 1.4; color: #1a1a1a; }
  h1 { margin: 0; font-size: 22pt; letter-spacing: -0.01em; }
  .role { margin: 2px 0 0; font-size: 12.5pt; color: #5b3389; font-weight: bold; }
  .contact { margin: 6px 0 0; font-size: 9.5pt; color: #444; }
  h2 { break-after: avoid; margin: 12px 0 5px; padding-bottom: 3px; border-bottom: 1.2px solid #5b3389; font-size: 11pt;
       text-transform: uppercase; letter-spacing: 0.06em; color: #5b3389; }
  p { margin: 0; }
  .item { margin: 0 0 6px; break-inside: avoid; }
  .item-head { display: flex; justify-content: space-between; gap: 12px; font-weight: bold; }
  .when { font-weight: normal; color: #555; white-space: nowrap; }
  ul { margin: 3px 0 0; padding-left: 16px; }
  li { margin: 1px 0; }
  .muted { color: #555; }
  .skills p { margin: 2px 0; }
</style></head>
<body>
  <h1>${esc(profile.name)}</h1>
  <p class="role">${esc(profile.role)}</p>
  <p class="contact">${contact.map(esc).join(" &nbsp;|&nbsp; ")}</p>

  <h2>${esc(cv.profileTitle)}</h2>
  <p>${esc(cv.profile)}</p>

  <h2>${esc(cv.experienceTitle)}</h2>
  ${cv.experience
    .map(
      (e) => `<div class="item">
    <div class="item-head"><span>${esc(e.title)}</span><span class="when">${esc(e.when)}</span></div>
    <ul>${e.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
  </div>`
    )
    .join("")}

  <h2>${esc(cv.educationTitle)}</h2>
  ${cv.education
    .map((e) => `<div class="item"><div class="item-head"><span>${esc(e.title)}</span></div><p>${esc(e.text)}</p></div>`)
    .join("")}
  ${t.certifications
    .map(
      (c) =>
        `<div class="item"><div class="item-head"><span>${esc(c.name)} — ${esc(c.issuer)}</span><span class="when">${esc(c.year ?? "")}</span></div></div>`
    )
    .join("")}

  <h2>${esc(cv.projectsTitle)}</h2>
  ${t.projects.items
    .filter((p) => !p.inCvExperience)
    .map(
      (p) => `<div class="item">
    <div class="item-head"><span>${esc(p.title)} — ${esc(p.kind)}</span></div>
    <p>${esc(p.summary)}</p>
    <p class="muted">${esc(p.stack.join(", "))}${p.code || p.link ? ` · ${esc(bare(p.code ?? p.link))}` : ""}</p>
  </div>`
    )
    .join("")}

  <h2>${esc(cv.skillsTitle)}</h2>
  <div class="skills">
    ${t.skills.groups.map((g) => `<p><b>${esc(g.title)}:</b> ${esc(g.items.join(", "))}</p>`).join("")}
  </div>

  <h2>${esc(cv.languagesTitle)} / ${esc(cv.availabilityTitle)}</h2>
  <p><b>${esc(cv.languagesTitle)}:</b> ${esc(av.languages.join(" · "))}</p>
  <p><b>${esc(cv.availabilityTitle)}:</b> ${esc(av.modes.join(" · "))} · ${esc(av.location)}</p>
</body></html>`;
}

mkdirSync("public/cv", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
for (const [lang, file] of [
  ["es", "public/cv/Yerlis-Dimas-CV-ES.pdf"],
  ["en", "public/cv/Yerlis-Dimas-CV-EN.pdf"],
]) {
  await page.setContent(html(content[lang], lang), { waitUntil: "load" });
  await page.pdf({ path: file, format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
  console.log(`${file} generado`);
}
await browser.close();
