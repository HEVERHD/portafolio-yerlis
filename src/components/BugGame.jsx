import { useState } from "react";
import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { CheckIcon } from "./icons.jsx";

// Minijuego: un formulario falso con 5 defectos plantados. Cada zona
// clicable es un botón (accesible con teclado); las que no tienen bug
// responden "esto funciona bien".
const BUGS = ["typo", "counter", "phone", "date", "button"];

export default function BugGame() {
  const { t } = useLang();
  const g = t.game;
  const f = g.form;
  const [found, setFound] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [okMsg, setOkMsg] = useState(null);

  const isFound = (id) => revealed || found.includes(id);
  const complete = found.length === BUGS.length;

  function hit(id) {
    if (found.includes(id) || revealed) return;
    setOkMsg(null);
    setFound((x) => [...x, id]);
  }
  function miss(name) {
    setOkMsg(`${name}: ${g.ok}`);
  }
  function reset() {
    setFound([]);
    setRevealed(false);
    setOkMsg(null);
  }

  // Número visible del bug según el orden en que se encontró.
  const badge = (id) => {
    if (!isFound(id)) return null;
    const n = revealed && !found.includes(id) ? BUGS.indexOf(id) + 1 : found.indexOf(id) + 1;
    return <span className="bug-badge">{n}</span>;
  };

  const target = (id, label, children, extra = "") => (
    <button
      type="button"
      className={`gt${isFound(id) ? " is-found" : ""} ${extra}`}
      onClick={() => hit(id)}
      aria-label={g.check(label)}
      aria-pressed={isFound(id)}
    >
      {children}
      {badge(id)}
    </button>
  );
  const safe = (name, children, extra = "") => (
    <button type="button" className={`gt is-safe ${extra}`} onClick={() => miss(name)} aria-label={g.check(name)}>
      {children}
    </button>
  );

  return (
    <section id="reto" className="section section-alt">
      <div className="container">
        <SectionHeading index="06" label={g.label} title={g.title}>
          {g.intro}
        </SectionHeading>

        <div className="game" data-reveal>
          <div className="game-form card">
            {safe(g.fields.title, <span className="gf-title">{f.title}</span>, "is-inline")}

            <div className="gf-field">
              {target("typo", f.name, <span className="gf-label">{f.name}</span>, "is-inline")}
              <div className="gf-input">
                <span>{f.nameValue}</span>
                {target("counter", f.counter, <span className="gf-counter">{f.counter}</span>, "is-inline")}
              </div>
              <p className="gf-help">{f.nameHelp}</p>
            </div>

            <div className="gf-field">
              <span className="gf-label">{f.phone}</span>
              {target(
                "phone",
                f.phone,
                <span className="gf-input is-valid">
                  <span>{f.phoneValue}</span>
                  <CheckIcon width={16} height={16} />
                </span>,
                "is-block"
              )}
            </div>

            <div className="gf-row">
              <div className="gf-field">
                <span className="gf-label">{f.birth}</span>
                {target(
                  "date",
                  f.birth,
                  <span className="gf-input is-valid">
                    <span>{f.birthValue}</span>
                    <CheckIcon width={16} height={16} />
                  </span>,
                  "is-block"
                )}
              </div>
              <div className="gf-field">
                <span className="gf-label">{f.email}</span>
                {safe(
                  g.fields.email,
                  <span className="gf-input">
                    <span>{f.emailValue}</span>
                  </span>,
                  "is-block"
                )}
              </div>
            </div>

            {safe(
              g.fields.terms,
              <span className="gf-check">
                <span className="box">
                  <CheckIcon width={12} height={12} />
                </span>
                {f.terms}
              </span>,
              "is-inline"
            )}

            {target("button", f.submit, <span className="gf-submit">{f.submit}</span>, "is-block is-offset")}

            {safe(g.fields.legal, <span className="gf-legal">{f.legal}</span>, "is-inline")}
          </div>

          <aside className="game-panel card" aria-live="polite">
            <div className="gp-head">
              <p className="gp-count">
                <span className={complete ? "is-done" : undefined}>{g.found(found.length, BUGS.length)}</span>
              </p>
              <div className="gp-meter">
                <span style={{ transform: `scaleX(${(revealed ? BUGS.length : found.length) / BUGS.length})` }} />
              </div>
            </div>

            <ol className="gp-list">
              {(revealed ? BUGS : [...found, ...BUGS.filter((b) => !found.includes(b))]).map((id, i) => {
                const shown = isFound(id);
                const b = g.bugs[id];
                return (
                  <li key={id} className={shown ? "is-shown" : undefined}>
                    <span className="gp-n">{i + 1}</span>
                    {shown ? (
                      <div>
                        <p className="gp-title">
                          {b.title}
                          <span className={`gp-sev sev-${b.sev.toLowerCase()}`}>{b.sev}</span>
                        </p>
                        <p className="gp-text">{b.text}</p>
                      </div>
                    ) : (
                      <p className="gp-hidden">{g.hiddenItem}</p>
                    )}
                  </li>
                );
              })}
            </ol>

            <p className="gp-msg">{complete ? g.done : revealed ? g.doneReveal : okMsg}</p>

            <div className="gp-actions">
              {!complete && !revealed && (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setRevealed(true)}>
                  {g.reveal}
                </button>
              )}
              <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
                {g.reset}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
