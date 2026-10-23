import { useEffect, useRef, useState } from "react";

// Anima un número desde 0 cuando entra en pantalla. Si el valor no es
// un número entero lo muestra tal cual.
export default function CountUp({ value, duration = 1200 }) {
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [n, setN] = useState(target === null ? value : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return <span ref={ref}>{n}</span>;
}
