import { useEffect } from "react";

// Pasa la posición del puntero a las tarjetas (--mx / --my) para el brillo
// que sigue al mouse. Solo en dispositivos con puntero fino.
export default function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e) => {
      const el = e.target.closest?.("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}
