import { about } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";

export default function About() {
  return (
    <section id="sobre-mi" className="section">
      <div className="container">
        <SectionHeading index="01" label="Sobre mí" title="Calidad como hábito, no como etapa final." />
        <div className="about-grid">
          <div className="about-text" data-reveal>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <blockquote>“{about.motto}”</blockquote>
          </div>
          <ul className="strengths">
            {about.strengths.map((s, i) => (
              <li key={s.title} data-reveal data-spot style={{ "--d": i + 1 }}>
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
