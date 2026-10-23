import { profile, hero } from "../data.js";
import { ArrowIcon, DownloadIcon } from "./icons.jsx";
import TestRunner from "./TestRunner.jsx";
import CountUp from "./CountUp.jsx";

// Separa el título para marcar la palabra destacada con el subrayado de "error".
function Title() {
  const [before, after] = hero.title.split(hero.highlight);
  return (
    <h1 className="hero-title">
      {before}
      <span className="bug-word">{hero.highlight}</span>
      {after}
    </h1>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow intro" style={{ "--d": 0 }}>
            <span className="status-dot" aria-hidden="true" />
            {profile.role} · Disponible para nuevos retos
          </p>
          <div className="intro" style={{ "--d": 1 }}>
            <Title />
          </div>
          <p className="lead intro" style={{ "--d": 2 }}>
            {hero.intro}
          </p>

          <div className="hero-actions intro" style={{ "--d": 3 }}>
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos <ArrowIcon />
            </a>
            {profile.cv ? (
              <a href={profile.cv} className="btn btn-ghost" download>
                <DownloadIcon /> Descargar CV
              </a>
            ) : (
              <a href="#contacto" className="btn btn-ghost">
                Hablemos
              </a>
            )}
          </div>

          <dl className="facts intro" style={{ "--d": 4 }}>
            {hero.facts.map((f) => (
              <div key={f.label}>
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
            <kbd>Ctrl</kbd> + <kbd>K</kbd> abre mi consola de QA. Prueba <code>run tests</code>
          </button>
        </div>

        <div className="hero-visual intro" style={{ "--d": 2 }}>
          <div className="portrait">
            <img src={profile.photo} alt={`Retrato de ${profile.name}`} width="560" height="560" />
            <span className="scan" aria-hidden="true" />
          </div>
          <TestRunner />
        </div>
      </div>
    </section>
  );
}
