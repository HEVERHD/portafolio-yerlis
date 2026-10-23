import { useEffect, useRef, useState } from "react";
import { profile, projects, moreProjects } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import { PlayIcon, CloseIcon, GitHubIcon, ArrowIcon } from "./icons.jsx";

function VideoDialog({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      className="video-dialog"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={project ? `Demo de ${project.title}` : undefined}
    >
      {project && (
        <div className="video-frame">
          <div className="video-bar">
            <p>{project.title} · demo</p>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar video">
              <CloseIcon />
            </button>
          </div>
          <video src={project.video} poster={project.image} controls autoPlay playsInline />
        </div>
      )}
    </dialog>
  );
}

export default function Projects() {
  const [playing, setPlaying] = useState(null);

  return (
    <section id="proyectos" className="section section-alt">
      <div className="container">
        <SectionHeading index="04" label="Proyectos" title="Casos de estudio de QA.">
          Proyectos donde apliqué metodologías de testing, análisis funcional y aseguramiento de calidad.
        </SectionHeading>

        <div className="projects">
          {projects.map((p, i) => (
            <article key={p.id} className={`card project${i % 2 ? " is-flipped" : ""}`} data-reveal data-spot>
              <button
                type="button"
                className="project-media"
                onClick={() => setPlaying(p)}
                aria-label={`Ver demo en video de ${p.title}`}
              >
                <img src={p.image} alt="" loading="lazy" />
                <span className="inspect" aria-hidden="true" />
                <span className="play">
                  <PlayIcon /> Ver demo
                </span>
              </button>
              <div className="project-body">
                <p className="project-kind">{p.kind}</p>
                <h3>{p.title}</h3>
                <p className="project-summary">{p.summary}</p>
                <ul className="project-work">
                  {p.work.map((w, j) => (
                    <li key={w} style={{ "--j": j }}>
                      {w}
                    </li>
                  ))}
                </ul>
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="more-projects">
          {moreProjects.map((p, i) => (
            <article key={p.title} className="card mini-project" data-reveal data-spot style={{ "--d": i }}>
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
            style={{ "--d": moreProjects.length }}
          >
            <GitHubIcon width={26} height={26} />
            <h3>Más en GitHub</h3>
            <p>Repositorios, colecciones y scripts de prueba.</p>
            <span className="link">
              github.com/Yerlis24 <ArrowIcon />
            </span>
          </a>
        </div>
      </div>

      <VideoDialog project={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
