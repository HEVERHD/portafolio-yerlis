import { useEffect, useState } from "react";

// Guiño de QA: un bug cruza la pantalla de vez en cuando; al atraparlo
// aparece un pequeño "reporte". Se desactiva con movimiento reducido.
const FIRST_DELAY = 7000;
const NEXT_DELAY = 25000;

function BugSvg() {
  return (
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path className="leg l1" d="M10 13 5 10M10 17H4M10 21l-5 3" />
        <path className="leg l2" d="M22 13l5-3M22 17h6M22 21l5 3" />
        <path d="M13 8l-2-3M19 8l2-3" />
      </g>
      <ellipse cx="16" cy="18" rx="6.5" ry="8" fill="currentColor" />
      <circle cx="16" cy="9.5" r="3.6" fill="currentColor" />
      <path d="M16 11v15" stroke="var(--bug-line)" strokeWidth="1.2" />
    </svg>
  );
}

export default function BugHunt() {
  const [run, setRun] = useState(0); // cambia la key para reiniciar la animación
  const [state, setState] = useState("hidden"); // hidden | walking | caught
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (state !== "hidden") return;
    const t = setTimeout(
      () => {
        setRun((r) => r + 1);
        setState("walking");
      },
      run === 0 ? FIRST_DELAY : NEXT_DELAY
    );
    return () => clearTimeout(t);
  }, [state, run]);

  useEffect(() => {
    if (state !== "caught") return;
    const t = setTimeout(() => setState("hidden"), 3200);
    return () => clearTimeout(t);
  }, [state]);

  if (state === "hidden") return null;

  return (
    <div className="bughunt">
      {state === "walking" && (
        <button
          key={run}
          type="button"
          className="bug"
          style={{ "--y": `${30 + ((run * 37) % 50)}vh` }}
          aria-label="Atrapar el bug"
          onClick={() => {
            setCount((c) => c + 1);
            setState("caught");
          }}
          onAnimationEnd={() => setState("hidden")}
        >
          <BugSvg />
        </button>
      )}
      {state === "caught" && (
        <div className="bug-toast" role="status">
          <span className="pill">fixed</span>
          <p>
            <b>BUG-{String(count).padStart(3, "0")}</b> reportado y cerrado. Así trabajo: lo detecto antes que tus
            usuarios.
          </p>
        </div>
      )}
    </div>
  );
}
