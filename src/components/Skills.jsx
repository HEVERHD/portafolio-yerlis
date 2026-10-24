import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Skills() {
  const { t } = useLang();
  const s = t.skills;

  return (
    <section id="habilidades" className="section section-alt">
      <div className="container">
        <SectionHeading index="02" label={s.label} title={s.title}>
          {s.intro}
        </SectionHeading>
        <div className="skills-grid">
          {s.groups.map((group, i) => (
            <article key={i} className="card skill-card" data-reveal data-spot style={{ "--d": i }}>
              <h3>{group.title}</h3>
              <ul className="tags">
                {group.items.map((item, j) => (
                  <li key={j} style={{ "--j": j }}>
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
