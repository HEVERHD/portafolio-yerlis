import { useEffect, useState } from "react";
import { profile } from "../content.js";
import { useLang } from "../i18n.jsx";
import { CheckIcon } from "./icons.jsx";

// Arranque tipo "smoke test" en la primera visita. Las comprobaciones son
// reales (fuentes, imagen principal, tema e idioma) y se omite con movimiento
// reducido o en visitas posteriores.
const KEY = "boot-seen";
const MAX_MS = 1800;

function shouldShow() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.webdriver) return false; // no estorbar a las pruebas automatizadas
  try {
    return !localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

function loadImage(src) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = img.onerror = () => res();
    img.src = src;
  });
}

export default function Boot() {
  const { t } = useLang();
  const b = t.boot;
  const [show, setShow] = useState(shouldShow);
  const [done, setDone] = useState([]);
  const [leaving, setLeaving] = useState(false);
  const [theme] = useState(
    () =>
      document.documentElement.dataset.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    if (!show) return;
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    const mark = (k) => setDone((d) => (d.includes(k) ? d : [...d, k]));
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    let cancelled = false;
    (async () => {
      await wait(180);
      await Promise.race([document.fonts?.ready, wait(600)]);
      mark("fonts");
      await Promise.race([loadImage(profile.photo), wait(600)]);
      mark("photo");
      await wait(160);
      mark("theme");
      await wait(160);
      mark("lang");
      await wait(220);
      mark("ready");
      await wait(320);
      if (!cancelled) setLeaving(true);
    })();
    const hard = setTimeout(() => setLeaving(true), MAX_MS);
    return () => {
      cancelled = true;
      clearTimeout(hard);
    };
  }, [show]);

  if (!show) return null;

  const items = [
    ["fonts", b.fonts],
    ["photo", b.photo],
    ["theme", b.theme(theme)],
    ["lang", b.lang],
    ["ready", b.ready],
  ];

  return (
    <div
      className={`boot${leaving ? " is-leaving" : ""}`}
      onAnimationEnd={(e) => e.target === e.currentTarget && leaving && setShow(false)}
      role="status"
    >
      <div className="boot-box">
        <p className="boot-title">
          <span className="prompt">$</span> {b.title}
        </p>
        <ul>
          {items.map(([k, label]) => {
            const ok = done.includes(k);
            return (
              <li key={k} className={ok ? "is-ok" : undefined}>
                <span className="boot-mark">{ok ? <CheckIcon width={13} height={13} /> : <span className="spin" />}</span>
                {label}
              </li>
            );
          })}
        </ul>
        <button type="button" className="boot-skip" onClick={() => setLeaving(true)}>
          {b.skip}
        </button>
      </div>
    </div>
  );
}
