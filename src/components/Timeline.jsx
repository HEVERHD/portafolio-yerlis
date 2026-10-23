import { timeline } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Timeline() {
  return (
    <section id="trayectoria" className="section">
      <div className="container">
        <SectionHeading index="05" label="Trayectoria" title="Experiencia y formación." />
        <ol className="timeline">
          {timeline.map((t, i) => (
            <li key={t.title} data-reveal style={{ "--d": i }}>
              <p className="timeline-when">{t.when}</p>
              <div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
