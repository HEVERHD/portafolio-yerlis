import { profile } from "../content.js";
import { useLang } from "../i18n.jsx";
import { ArrowIcon, DownloadIcon } from "./icons.jsx";
import TestRunner from "./TestRunner.jsx";
import CountUp from "./CountUp.jsx";

// Separa el título para marcar la palabra destacada con el subrayado de "error".
function Title({ title, highlight }) {
  const [before, after] = title.split(highlight);
  return (
    <h1 className="hero-title">
      {before}
      <span className="bug-word">{highlight}</span>
      {after}
    </h1>
  );
}

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow intro" style={{ "--d": 0 }}>
            <span className="status-dot" aria-hidden="true" />
            {profile.role} · {h.eyebrow}
          </p>
          <div className="intro" style={{ "--d": 1 }}>
            <Title title={h.title} highlight={h.highlight} />
          </div>
          <p className="lead intro" style={{ "--d": 2 }}>
            {h.intro}
          </p>

          <div className="hero-actions intro" style={{ "--d": 3 }}>
            <a href="#proyectos" className="btn btn-primary">
              {h.primary} <ArrowIcon />
            </a>
            {profile.cv ? (
              <a href={profile.cv} className="btn btn-ghost" download>
                <DownloadIcon /> {h.cv}
              </a>
            ) : (
              <a href="#contacto" className="btn btn-ghost">
                {h.secondary}
              </a>
            )}
          </div>

          <dl className="facts intro" style={{ "--d": 4 }}>
            {h.facts.map((f, i) => (
              <div key={i}>
                <dt>
                  <CountUp value={f.value} />
                </dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            className="cli-hint intro"
            style={{ "--d": 5 }}
            onClick={() => window.dispatchEvent(new Event("open-console"))}
          >
            <kbd>Ctrl</kbd> + <kbd>K</kbd> {h.hint[0]} <code>{h.hint[1]}</code>
          </button>
        </div>

        <div className="hero-visual intro" style={{ "--d": 2 }}>
          <div className="portrait">
            <img src={profile.photo} alt={profile.name} width="560" height="560" />
            <span className="scan" aria-hidden="true" />
          </div>
          <TestRunner />
        </div>
      </div>
    </section>
  );
}
