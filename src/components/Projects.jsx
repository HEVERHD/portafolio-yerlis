import { useEffect, useRef, useState } from "react";
import { profile, apiCases } from "../content.js";
import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { PlayIcon, CloseIcon, GitHubIcon, ArrowIcon, ExpandIcon, CodeIcon } from "./icons.jsx";

// <dialog> nativo: trae foco atrapado, Escape para cerrar y fondo modal.
function Modal({ open, onClose, label, className, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={className}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={label}
    >
      {open && children}
    </dialog>
  );
}

function CaseStudy({ project, labels, onClose, closeLabel }) {
  const s = project.study;
  return (
    <div className="study">
      <header className="study-head">
        <div>
          <p className="project-kind">{project.kind}</p>
          <h2>{project.title}</h2>
        </div>
        <button type="button" className="icon-btn" onClick={onClose} aria-label={closeLabel}>
          <CloseIcon />
        </button>
      </header>
      <div className="study-body">
        <p className="study-context">{s.context}</p>

        <h3>{s.scopeTitle}</h3>
        {s.scope && (
          <ul className="project-work is-static">
            {s.scope.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        )}
        {s.table && (
          <table className="study-table">
            <thead>
              <tr>
                {s.table.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.table.rows.map(([m, name]) => (
                <tr key={m + name}>
                  <td>
                    <span className={`method m-${m.toLowerCase()}`}>{m}</span>
                  </td>
                  <td>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {s.cases && (
          <div className="table-scroll">
            <table className="study-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{labels.input}</th>
                  <th>{labels.expected}</th>
                </tr>
              </thead>
              <tbody>
                {apiCases.map((c, i) => (
                  <tr key={c.fn}>
                    <td className="mono">{String(i + 1).padStart(2, "0")}</td>
                    <td className="mono">{c.input ?? labels.none}</td>
                    <td>
                      <span className={`status s-${c.status}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h3>{s.approachTitle}</h3>
        <p>{s.approach}</p>

        <ul className="tags">
          {project.stack.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Miniatura del proyecto de código: un extracto real de la suite.
function CodeThumb() {
  const sample = [
    ["tk-kw", "def "],
    ["tk-fn", "test_create_user_1_letter_in_first_name"],
    ["", "():\n    "],
    ["tk-fn", "negative_assert_symbol"],
    ["", "("],
    ["tk-str", '"Y"'],
    ["", ")\n\n"],
    ["tk-kw", "def "],
    ["tk-fn", "test_create_user_15_letter_in_first_name"],
    ["", "():\n    "],
    ["tk-fn", "positive_assert"],
    ["", "("],
    ["tk-str", '"Aaaaaaaaaaaaaaa"'],
    ["", ")\n\n"],
    ["tk-kw", "def "],
    ["tk-fn", "test_create_user_no_first_name"],
    ["", "():\n    user_body = data.user_body.copy()\n    user_body.pop("],
    ["tk-str", '"firstName"'],
    ["", ")\n    "],
    ["tk-fn", "negative_assert_no_firstname"],
    ["", "(user_body)"],
  ];
  return (
    <pre className="code-thumb" aria-hidden="true">
      {sample.map(([cls, txt], i) => (
        <span key={i} className={cls || undefined}>
          {txt}
        </span>
      ))}
      <span className="code-thumb-pass">10 passed</span>
    </pre>
  );
}

function Media({ p, t, onPlay }) {
  const vid = useRef(null);
  if (!p.image) {
    return (
      <a className="project-media is-code" href={p.code} target="_blank" rel="noreferrer" aria-label={`${t.code}: ${p.title}`}>
        <CodeThumb />
        <span className="inspect" aria-hidden="true" />
        <span className="play">
          <CodeIcon /> {t.code}
        </span>
      </a>
    );
  }
  const start = () => {
    const v = vid.current;
    if (!v || !window.matchMedia("(hover: hover)").matches) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };
  const stop = () => vid.current?.pause();
  return (
    <button
      type="button"
      className="project-media"
      onClick={() => onPlay(p)}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      aria-label={t.demoOf(p.title)}
    >
      <img src={p.image} alt="" loading="lazy" />
      {p.preview && <video ref={vid} className="preview" src={p.preview} muted loop playsInline preload="none" aria-hidden="true" />}
      <span className="inspect" aria-hidden="true" />
      <span className="play">
        <PlayIcon /> {t.demo}
      </span>
    </button>
  );
}

export default function Projects() {
  const { t } = useLang();
  const pr = t.projects;
  const [playing, setPlaying] = useState(null);
  const [study, setStudy] = useState(null);

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <SectionHeading index="05" label={pr.label} title={pr.title}>
          {pr.intro}
        </SectionHeading>

        <div className="projects">
          {pr.items.map((p, i) => (
            <article key={p.id} className={`card project${i % 2 ? " is-flipped" : ""}`} data-reveal data-spot>
              <Media p={p} t={pr} onPlay={setPlaying} />
              <div className="project-body">
                <p className="project-kind">{p.kind}</p>
                <h3>{p.title}</h3>
                <p className="project-summary">{p.summary}</p>
                <ul className="project-work">
                  {p.work.map((w, j) => (
                    <li key={j} style={{ "--j": j }}>
                      {w}
                    </li>
                  ))}
                </ul>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="project-actions">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStudy(p)}>
                    <ExpandIcon /> {pr.caseStudy}
                  </button>
                  {p.code && (
                    <a className="btn btn-ghost btn-sm" href={p.code} target="_blank" rel="noreferrer">
                      <GitHubIcon /> {pr.code}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="more-projects">
          {pr.others.map((p, i) => (
            <article key={i} className="card mini-project" data-reveal data-spot style={{ "--d": i }}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="card mini-project github-card"
            data-reveal
            data-spot
            style={{ "--d": pr.others.length }}
          >
            <GitHubIcon width={26} height={26} />
            <h3>{pr.more}</h3>
            <p>{pr.moreText}</p>
            <span className="link">
              github.com/Yerlis24 <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      <Modal open={!!playing} onClose={() => setPlaying(null)} className="video-dialog" label={playing?.title}>
        {playing && (
          <div className="video-frame">
            <div className="video-bar">
              <p>{playing.title} · demo</p>
              <button type="button" className="icon-btn" onClick={() => setPlaying(null)} aria-label={t.ui.close}>
                <CloseIcon />
              </button>
            </div>
            <video src={playing.video} poster={playing.image} controls autoPlay playsInline />
          </div>
        )}
      </Modal>

      <Modal open={!!study} onClose={() => setStudy(null)} className="study-dialog" label={study?.title}>
        {study && <CaseStudy project={study} labels={pr.studyLabels} onClose={() => setStudy(null)} closeLabel={t.ui.close} />}
      </Modal>
    </section>
  );
}
