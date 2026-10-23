import { skills } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";

export default function Skills() {
  return (
    <section id="habilidades" className="section section-alt">
      <div className="container">
        <SectionHeading index="02" label="Habilidades" title="Herramientas y técnicas con las que trabajo.">
          Desde el diseño del caso de prueba hasta la automatización y el reporte del defecto.
        </SectionHeading>
        <div className="skills-grid">
          {skills.map((group, i) => (
            <article key={group.title} className="card skill-card" data-reveal data-spot style={{ "--d": i }}>
              <h3>{group.title}</h3>
              <ul className="tags">
                {group.items.map((item, j) => (
                  <li key={item} style={{ "--j": j }}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
