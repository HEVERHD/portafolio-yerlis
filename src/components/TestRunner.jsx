import { useEffect, useState } from "react";
import { useLang } from "../i18n.jsx";
import { CheckIcon } from "./icons.jsx";

// Terminal decorativa que "ejecuta" en bucle tests reales de
// github.com/Yerlis24/api_stand_tests (los tiempos son ilustrativos).
const tests = [
  { name: "test_create_user_2_letter_in_first_name", time: 0.42 },
  { name: "test_create_user_16_letter_in_first_name", time: 0.38 },
  { name: "test_create_user_has_number_in_first_name", time: 0.31 },
  { name: "test_create_user_no_first_name", time: 0.29 },
];
const total = tests.reduce((s, t) => s + t.time, 0).toFixed(2);

const STEP_MS = 650;
const HOLD_STEPS = 6; // pasos que se queda el resultado antes de reiniciar

export default function TestRunner() {
  const { t } = useLang();
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
        <span>{t.runner.suite}</span>
        <span className={`pill${finished ? "" : " is-running"}`}>
          {finished ? t.runner.pass : t.runner.running}
        </span>
      </div>
      <p className="runner-cmd">
        <span className="prompt">$</span> pytest create_user_test.py
      </p>
      <ul>
        {tests.map((x, i) => {
          const state = i < done ? "pass" : i === done && !finished ? "run" : "idle";
          return (
            <li key={x.name} className={`is-${state}`}>
              <span className="mark">
                {state === "pass" ? <CheckIcon width={14} height={14} /> : state === "run" ? <span className="spin" /> : null}
              </span>
              <span className="tname">{x.name}</span>
              <span className="ttime">{state === "pass" ? `${x.time.toFixed(2)}s` : ""}</span>
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
