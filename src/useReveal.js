import { useEffect } from "react";

// Marca con la clase `is-visible` cada elemento con [data-reveal] cuando
// entra en pantalla. El CSS decide cómo se anima cada uno. `dep` permite
// volver a observar los elementos nuevos (p. ej. al cambiar de idioma).
export default function useReveal(dep) {
  useEffect(() => {
    const els = [...document.querySelectorAll("[data-reveal]:not(.is-visible)")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // También se muestran los que ya quedaron por encima (p. ej. al recargar a mitad de página).
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
