import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { ArrowIcon } from "./icons.jsx";

export default function Timeline() {
  const { t } = useLang();
  const tl = t.timeline;

  return (
    <section id="trayectoria" className="section section-alt">
      <div className="container">
        <SectionHeading index="08" label={tl.label} title={tl.title} />
        <ol className="timeline">
          {tl.items.map((x, i) => (
            <li key={i} data-reveal style={{ "--d": i }}>
              <p className="timeline-when">{x.when}</p>
              <div>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            </li>
          ))}
        </ol>

        {t.certifications.length > 0 && (
          <div className="certs" data-reveal>
            <h3>{tl.certTitle}</h3>
            <ul>
              {t.certifications.map((c) => (
                <li key={c.name + c.issuer} className="card cert" data-spot>
                  <span className="cert-seal" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <p className="cert-name">{c.name}</p>
                    <p className="cert-meta">
                      {c.issuer}
                      {c.year && ` · ${c.year}`}
                    </p>
                  </div>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noreferrer" className="cert-link">
                      {tl.verify} <ArrowIcon />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
