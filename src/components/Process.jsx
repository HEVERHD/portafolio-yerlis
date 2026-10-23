import { useEffect, useRef, useState } from "react";
import { process } from "../data.js";
import SectionHeading from "./SectionHeading.jsx";
import BugTicket from "./BugTicket.jsx";

// El avance del pipeline sigue al scroll: cada paso se "enciende" cuando la
// línea de lectura (55 % de la pantalla) lo alcanza.
export default function Process() {
  const list = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = list.current.getBoundingClientRect();
      const v = (window.innerHeight * 0.55 - r.top) / r.height;
      setP(Math.min(1, Math.max(0, v)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const n = process.length;
  const active = p <= 0 ? -1 : Math.min(n - 1, Math.floor(p * n));

  return (
    <section id="proceso" className="section">
      <div className="container">
        <SectionHeading index="03" label="Proceso" title="Cómo trabajo, de requisito a release.">
          Un ciclo de QA completo: así llega un defecto desde que lo detecto hasta que queda cerrado.
        </SectionHeading>

        <div className="process-grid">
          <ol className="pipeline" ref={list} style={{ "--p": p }}>
            {process.map((s, i) => (
              <li
                key={s.title}
                className={i < active ? "is-done" : i === active ? "is-active" : undefined}
              >
                <span className="node" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="step-tag">{s.tag}</p>
                  <h3>{s.title}</h3>
                  <p className="step-text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="ticket-wrap">
            <BugTicket stage={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
