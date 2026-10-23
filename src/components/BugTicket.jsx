import { useState } from "react";
import { bugExample as bug } from "../data.js";
import { CheckIcon } from "./icons.jsx";

const workflow = ["Nuevo", "En progreso", "Resuelto", "Verificado", "Cerrado"];
const tabs = [
  { id: "pasos", label: "Pasos" },
  { id: "resultado", label: "Esperado vs. actual" },
  { id: "evidencia", label: "Evidencia" },
];

// El ticket avanza con el pipeline de Process:
// pasos 0-2 → aún se está ejecutando; 3 → se reporta; 4 → resuelto; 5 → cerrado.
function statusFor(stage) {
  if (stage < 3) return -1;
  if (stage === 3) return 0;
  if (stage === 4) return 2;
  return 4;
}

export default function BugTicket({ stage }) {
  const [tab, setTab] = useState("pasos");
  const status = statusFor(stage);
  const drafting = status < 0;
  const closed = status === workflow.length - 1;

  function onKey(e) {
    const i = tabs.findIndex((t) => t.id === tab);
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length].id;
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <article data-spot className={`ticket${drafting ? " is-drafting" : ""}${closed ? " is-closed" : ""}`}>
      <header className="ticket-head">
        <p className="ticket-meta">
          <span className="ticket-id">{bug.id}</span>
          <span>{bug.project}</span>
          <span className="ticket-example">ejemplo de formato</span>
        </p>
        <h3>{bug.title}</h3>
        <ol className="workflow" aria-label="Estado del ticket">
          {workflow.map((w, i) => (
            <li
              key={w}
              className={i < status ? "is-past" : i === status ? "is-current" : undefined}
              aria-current={i === status ? "step" : undefined}
            >
              {i < status && <CheckIcon width={11} height={11} />}
              {w}
            </li>
          ))}
        </ol>
      </header>

      <dl className="ticket-fields">
        <div>
          <dt>Severidad</dt>
          <dd>
            <span className="sev">{bug.severity}</span>
          </dd>
        </div>
        <div>
          <dt>Prioridad</dt>
          <dd>{bug.priority}</dd>
        </div>
        <div className="wide">
          <dt>Entorno</dt>
          <dd>{bug.env}</dd>
        </div>
      </dl>

      <div className="ticket-tabs" role="tablist" aria-label="Detalle del defecto" onKeyDown={onKey}>
        {tabs.map((t) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ticket-panel" id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === "pasos" && (
          <ol className="steps">
            {bug.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        )}
        {tab === "resultado" && (
          <div className="compare">
            <div className="is-expected">
              <p>Esperado</p>
              <span>{bug.expected}</span>
            </div>
            <div className="is-actual">
              <p>Actual</p>
              <span>{bug.actual}</span>
            </div>
          </div>
        )}
        {tab === "evidencia" && (
          <ul className="evidence">
            {bug.evidence.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="ticket-overlay" aria-hidden="true">
        <span className="spin" /> Ejecutando suite…
      </div>
      <footer className="ticket-foot">
        {closed ? (
          <p className="ticket-stamp">
            <CheckIcon width={14} height={14} /> Verificado en regresión
          </p>
        ) : (
          <p className="ticket-pending">Pendiente de verificación</p>
        )}
      </footer>
    </article>
  );
}
