import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section id="sobre-mi" className="section">
      <div className="container">
        <SectionHeading index="01" label={a.label} title={a.title} />
        <div className="about-grid">
          <div className="about-text" data-reveal>
            {a.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <blockquote>“{a.motto}”</blockquote>
          </div>
          <ul className="strengths">
            {a.strengths.map((s, i) => (
              <li key={i} data-reveal data-spot style={{ "--d": i + 1 }}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
