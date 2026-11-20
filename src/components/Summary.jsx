import { useEffect, useMemo, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import { profile } from "../content.js";
import { useLang } from "../i18n.jsx";
import { CloseIcon, DownloadIcon, MailIcon, LinkedInIcon, GitHubIcon } from "./icons.jsx";

// Vista compacta para reclutadores con poco tiempo. Se abre con el evento
// "open-summary" (botón del hero). Se puede imprimir: el CSS de impresión
// muestra solo esta tarjeta mientras está abierta.

function QR({ text }) {
  const { size, cells } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    const out = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) out.push(`M${c} ${r}h1v1h-1z`);
    return { size: n, cells: out.join("") };
  }, [text]);
  return (
    <svg className="qr" viewBox={`-2 -2 ${size + 4} ${size + 4}`} role="img" aria-label={text} shapeRendering="crispEdges">
      <rect x="-2" y="-2" width={size + 4} height={size + 4} fill="#fff" />
      <path d={cells} fill="#17141f" />
    </svg>
  );
}

export default function Summary() {
  const { t } = useLang();
  const s = t.summary;
  const av = t.availability;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const qrTarget = profile.siteUrl ?? profile.linkedin;

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-summary", onOpen);
    return () => window.removeEventListener("open-summary", onOpen);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.classList.toggle("summary-open", open);
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="summary-dialog"
      aria-label={s.title}
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === ref.current && setOpen(false)}
    >
      {open && (
        <article className="summary">
          <header className="summary-head">
            <img src={profile.photo} alt="" width="72" height="72" />
            <div>
              <p className="summary-kicker">{s.title}</p>
              <h2>{profile.name}</h2>
              <p className="summary-role">{profile.role}</p>
            </div>
            <button type="button" className="icon-btn no-print" onClick={() => setOpen(false)} aria-label={t.ui.close}>
              <CloseIcon />
            </button>
          </header>

          <ul className="summary-avail">
            <li>{av.location}</li>
            <li>{av.modes.join(" · ")}</li>
            <li>{av.languages.join(" · ")}</li>
          </ul>

          <div className="summary-grid">
            <section>
              <h3>{s.strengthsLabel}</h3>
              <ul className="summary-list">
                {s.strengths.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h3>{s.toolsLabel}</h3>
              <ul className="tags">
                {s.tools.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h3>{s.projectsLabel}</h3>
              <ul className="summary-projects">
                {t.projects.items.map((p) => (
                  <li key={p.id}>
                    <b>{p.title}</b> — {p.kind}
                  </li>
                ))}
              </ul>
            </section>

            <aside className="summary-side">
              <QR text={qrTarget} />
              <p className="summary-qr">{profile.siteUrl ? s.qrSite : s.qrLinkedin}</p>
              <h3>{s.contactLabel}</h3>
              <ul className="summary-contact">
                <li>
                  <MailIcon /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <LinkedInIcon />{" "}
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    linkedin.com/in/yerlis-dimas-puello
                  </a>
                </li>
                <li>
                  <GitHubIcon />{" "}
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    github.com/Yerlis24
                  </a>
                </li>
              </ul>
            </aside>
          </div>

          <footer className="summary-actions no-print">
            <a className="btn btn-primary btn-sm" href={t.cvFile} download>
              <DownloadIcon /> {s.cv}
            </a>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.print()}>
              {s.print}
            </button>
          </footer>
        </article>
      )}
    </dialog>
  );
}
