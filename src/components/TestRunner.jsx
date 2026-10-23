import { useEffect, useState } from "react";
import { CheckIcon } from "./icons.jsx";

// Terminal decorativa que "ejecuta" una suite de pruebas en bucle.
const tests = [
  { name: "test_login_valido", time: 0.42 },
  { name: "test_busqueda_de_rutas", time: 0.87 },
  { name: "test_api_crear_kit", time: 0.31 },
  { name: "test_regresion_pedido", time: 1.12 },
];
const total = tests.reduce((s, t) => s + t.time, 0).toFixed(2);

const STEP_MS = 650;
const HOLD_STEPS = 6; // pasos que se queda el resultado antes de reiniciar

export default function TestRunner() {
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // step 0..tests.length: cuántas pruebas ya pasaron; luego mantiene el resumen.
  const [step, setStep] = useState(reduce ? tests.length + HOLD_STEPS : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setStep((s) => (s >= tests.length + HOLD_STEPS ? 0 : s + 1)),
      STEP_MS
    );
    return () => clearInterval(id);
  }, [reduce]);

  const done = Math.min(step, tests.length);
  const finished = step >= tests.length;

  return (
    <div className="runner" aria-hidden="true">
      <div className="runner-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>qa-suite</span>
        <span className={`pill${finished ? "" : " is-running"}`}>
          {finished ? "pass" : "running"}
        </span>
      </div>
      <p className="runner-cmd">
        <span className="prompt">$</span> pytest tests/ -v
      </p>
      <ul>
        {tests.map((t, i) => {
          const state = i < done ? "pass" : i === done && !finished ? "run" : "idle";
          return (
            <li key={t.name} className={`is-${state}`}>
              <span className="mark">
                {state === "pass" ? <CheckIcon width={14} height={14} /> : state === "run" ? <span className="spin" /> : null}
              </span>
              <span className="tname">{t.name}</span>
              <span className="ttime">{state === "pass" ? `${t.time.toFixed(2)}s` : ""}</span>
            </li>
          );
        })}
      </ul>
      <div className="runner-progress">
        <span style={{ transform: `scaleX(${done / tests.length})` }} />
      </div>
      <p className={`runner-sum${finished ? " is-shown" : ""}`}>
        <b>{tests.length} passed</b> in {total}s
      </p>
    </div>
  );
}
