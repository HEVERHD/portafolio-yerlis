import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { CheckIcon } from "./icons.jsx";

const tabIds = ["steps", "result", "evidence"];

// El ticket avanza con el pipeline de Process:
// pasos 0-2 → aún se está ejecutando; 3 → se reporta; 4 → resuelto; 5 → cerrado.
function statusFor(stage) {
  if (stage < 3) return -1;
  if (stage === 3) return 0;
  if (stage === 4) return 2;
  return 4;
}

export default function BugTicket({ stage }) {
  const { t } = useLang();
  const bug = t.ticket;
  const [tab, setTab] = useState("steps");
  const status = statusFor(stage);
  const drafting = status < 0;
  const closed = status === bug.workflow.length - 1;

  function onKey(e) {
    const i = tabIds.indexOf(tab);
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    const next = tabIds[(i + d + tabIds.length) % tabIds.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <article data-spot className={`ticket${drafting ? " is-drafting" : ""}${closed ? " is-closed" : ""}`}>
      <header className="ticket-head">
        <p className="ticket-meta">
          <span className="ticket-id">{bug.id}</span>
          <span>{bug.project}</span>
          <span className="ticket-example">{bug.example}</span>
        </p>
        <h3>{bug.title}</h3>
        <ol className="workflow" aria-label={bug.status}>
          {bug.workflow.map((w, i) => (
            <li
              key={i}
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
          <dt>{bug.severityLabel}</dt>
          <dd>
            <span className="sev">{bug.severity}</span>
          </dd>
        </div>
        <div>
          <dt>{bug.priorityLabel}</dt>
          <dd>{bug.priority}</dd>
        </div>
        <div className="wide">
          <dt>{bug.envLabel}</dt>
          <dd>{bug.env}</dd>
        </div>
      </dl>

      <div className="ticket-tabs" role="tablist" aria-label={bug.details} onKeyDown={onKey}>
        {tabIds.map((id) => (
          <button
            key={id}
            id={`tab-${id}`}
            type="button"
            role="tab"
            aria-selected={tab === id}
            aria-controls={`panel-${id}`}
            tabIndex={tab === id ? 0 : -1}
            onClick={() => setTab(id)}
          >
            {bug.tabs[id]}
          </button>
        ))}
      </div>

      <div className="ticket-panel" id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`}>
        {tab === "steps" && (
          <ol className="steps">
            {bug.steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        )}
        {tab === "result" && (
          <div className="compare">
            <div className="is-expected">
              <p>{bug.expectedLabel}</p>
              <span>{bug.expected}</span>
            </div>
            <div className="is-actual">
              <p>{bug.actualLabel}</p>
              <span>{bug.actual}</span>
            </div>
          </div>
        )}
        {tab === "evidence" && (
          <ul className="evidence">
            {bug.evidence.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="ticket-overlay" aria-hidden="true">
        <span className="spin" /> {bug.running}
      </div>
      <footer className="ticket-foot">
        {closed ? (
          <p className="ticket-stamp">
            <CheckIcon width={14} height={14} /> {bug.verified}
          </p>
        ) : (
          <p className="ticket-pending">{bug.pending}</p>
        )}
      </footer>
    </article>
  );
}
