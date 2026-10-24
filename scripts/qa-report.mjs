// Ejecuta la suite de Playwright y resume su resultado real en
// src/qa-report.json, que la sección "Calidad" del sitio muestra.
//   node scripts/qa-report.mjs          → ejecuta las pruebas y genera el reporte
//   node scripts/qa-report.mjs --only   → solo resume test-results/results.json
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const RESULTS = "test-results/results.json";
const OUT = "src/qa-report.json";

let exitCode = 0;
if (!process.argv.includes("--only")) {
  const run = spawnSync("npx", ["playwright", "test"], { stdio: "inherit", shell: true });
  exitCode = run.status ?? 1;
}

const data = JSON.parse(readFileSync(RESULTS, "utf8"));
const suites = new Map();
let total = 0;
let passed = 0;
let a11yViolations = 0;

// Recorre el árbol de suites: archivo → describe → tests → resultados por proyecto.
function walk(suite, describe) {
  const title = describe ?? (suite.title && !suite.title.endsWith(".js") ? suite.title : null);
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests ?? []) {
      const last = t.results.at(-1);
      if (!last || t.status === "skipped") continue;
      const ok = t.status === "expected" || t.status === "flaky";
      total++;
      if (ok) passed++;
      const key = title ?? spec.title;
      const s = suites.get(key) ?? { title: key, tests: 0, passed: 0, failed: 0 };
      s.tests++;
      ok ? s.passed++ : s.failed++;
      suites.set(key, s);
      for (const a of t.annotations ?? []) {
        if (a.type === "a11y-violations") a11yViolations += Number(a.description) || 0;
      }
    }
  }
  for (const child of suite.suites ?? []) walk(child, title ?? (child.title.endsWith(".js") ? null : child.title));
}
for (const s of data.suites) walk(s, null);

const report = {
  generatedAt: new Date().toISOString(),
  total,
  passed,
  failed: total - passed,
  durationMs: Math.round(data.stats?.duration ?? 0),
  projects: data.config.projects.map((p) => p.name),
  a11yViolations,
  suites: [...suites.values()],
};

writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n");
console.log(`\nqa-report: ${passed}/${total} pasando · ${a11yViolations} violaciones a11y → ${OUT}`);
process.exit(exitCode);
