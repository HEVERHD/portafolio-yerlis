import report from "../qa-report.json";
import { profile } from "../content.js";
import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";
import CountUp from "./CountUp.jsx";
import { CheckIcon, ArrowIcon } from "./icons.jsx";

// Los números salen de src/qa-report.json, que genera `npm run test:report`
// a partir de la ejecución real de Playwright. No hay cifras escritas a mano.
export default function Quality() {
  const { t, lang } = useLang();
  const q = t.quality;
  const has = report && report.total > 0;
  const date =
    has && new Date(report.generatedAt).toLocaleDateString(lang === "es" ? "es-CO" : "en-US", { dateStyle: "long" });

  return (
    <section id="calidad" className="section">
      <div className="container">
        <SectionHeading index="07" label={q.label} title={q.title}>
          {q.intro}
        </SectionHeading>

        {!has ? (
          <p className="quality-empty">{q.empty}</p>
        ) : (
          <div className="quality" data-reveal>
            <dl className="quality-stats">
              <div className="card">
                <dt>
                  <CountUp value={String(report.passed)} />/{report.total}
                </dt>
                <dd>{q.tests}</dd>
              </div>
              <div className="card">
                <dt>
                  <CountUp value={String(report.projects.length)} />
                </dt>
                <dd>{q.browsers}</dd>
              </div>
              <div className="card">
                <dt>
                  <CountUp value={String(report.a11yViolations)} />
                </dt>
                <dd>{q.a11y}</dd>
              </div>
              <div className="card">
                <dt>{(report.durationMs / 1000).toFixed(1)}s</dt>
                <dd>{q.duration}</dd>
              </div>
            </dl>

            <div className="quality-suites card">
              <div className="qs-head">
                <h3>{q.suites}</h3>
                <p>{q.updated(date)}</p>
              </div>
              <ul>
                {report.suites.map((s) => (
                  <li key={s.title}>
                    <span className={`qs-mark${s.failed ? " is-fail" : ""}`}>
                      <CheckIcon width={13} height={13} />
                    </span>
                    <span className="qs-title">{s.title}</span>
                    <span className="qs-count">
                      {s.passed}/{s.tests}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="qs-envs">{report.projects.join(" · ")}</p>
              <a className="qs-ci" href={`${profile.repo}/actions`} target="_blank" rel="noreferrer">
                {q.ci} <ArrowIcon />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
