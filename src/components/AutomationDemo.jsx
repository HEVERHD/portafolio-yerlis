import { useEffect, useRef, useState } from "react";
import { apiCases } from "../content.js";
import { useLang } from "../i18n.jsx";
import SectionHeading from "./SectionHeading.jsx";
import { CheckIcon, PlayIcon, PauseIcon, NextIcon, GitHubIcon } from "./icons.jsx";

// Repetición animada de github.com/Yerlis24/api_stand_tests. El código es el
// del repositorio (sin los print de depuración); las respuestas son las que
// exigen sus asserts. El authToken se oculta a propósito.

const REPO = "https://github.com/Yerlis24/api_stand_tests";
const DEMO_CASES = [0, 2, 3, 5, 6, 7].map((i) => apiCases[i]);
const PHASE_MS = [900, 700, 900, 1500]; // request → enviando → respuesta → asserts

const helpers = {
  positive_assert: [
    "def positive_assert(first_name):",
    "    user_body = get_user_body(first_name)",
    "    user_response = sender_stand_request.post_new_user(user_body)",
    "    assert user_response.status_code == 201",
    '    assert user_response.json()["authToken"] != ""',
  ],
  negative_assert_symbol: [
    "def negative_assert_symbol(first_name):",
    "    user_body = get_user_body(first_name)",
    "    response = sender_stand_request.post_new_user(user_body)",
    "    assert response.status_code == 400",
    '    assert response.json()["code"] == 400',
    '    assert response.json()["message"] == "Has introducido un…"',
  ],
  negative_assert_no_firstname: [
    "def negative_assert_no_firstname(user_body):",
    "    response = sender_stand_request.post_new_user(user_body)",
    "    assert response.status_code == 400",
    '    assert response.json()["code"] == 400',
    '    assert response.json()["message"] == "No se han aprobado…"',
  ],
};

function codeFor(c) {
  if (c.input === null) {
    return {
      helper: "negative_assert_no_firstname",
      test: [`def ${c.fn}():`, "    user_body = data.user_body.copy()", '    user_body.pop("firstName")', "    negative_assert_no_firstname(user_body)"],
    };
  }
  const helper = c.status === 201 ? "positive_assert" : "negative_assert_symbol";
  return { helper, test: [`def ${c.fn}():`, `    ${helper}(${c.input})`] };
}

// Resaltado mínimo de Python: palabras clave, cadenas, números y funciones.
const TOKEN = /("(?:[^"\\]|\\.)*"|\b(?:def|assert|import|return)\b|\b\d+\b|[A-Za-z_]\w*(?=\()|==|!=)/g;
function highlight(line) {
  const out = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const tok = m[0];
    const cls = tok.startsWith('"')
      ? "tk-str"
      : /^(def|assert|import|return)$/.test(tok)
        ? "tk-kw"
        : /^\d+$/.test(tok)
          ? "tk-num"
          : /^(==|!=)$/.test(tok)
            ? "tk-op"
            : "tk-fn";
    out.push(
      <span key={m.index} className={cls}>
        {tok}
      </span>
    );
    last = m.index + tok.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

function requestBody(c) {
  const body = {};
  if (c.input !== null) body.firstName = "__FIRST__";
  body.phone = "+11234567890";
  body.address = "123 Elm Street, Hilltop";
  return JSON.stringify(body, null, 2).replace('"__FIRST__"', c.input ?? "");
}

function responseBody(c) {
  if (c.status === 201) return '{\n  "authToken": "••••••••••••"\n}';
  return JSON.stringify({ code: 400, message: c.message }, null, 2);
}

export default function AutomationDemo() {
  const { t } = useLang();
  const d = t.demo;
  const root = useRef(null);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduce = useRef(false);

  // Se reproduce solo cuando la sección está en pantalla.
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) {
      setPhase(3);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current);
    setPlaying(true);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const id = setTimeout(() => {
      if (phase < 3) setPhase(phase + 1);
      else {
        setIdx((i) => (i + 1) % DEMO_CASES.length);
        setPhase(0);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(id);
  }, [phase, playing, visible]);

  const c = DEMO_CASES[idx];
  const { helper, test } = codeFor(c);
  const lines = [...test, "", ...helpers[helper]];
  const assertLines = lines.map((l, i) => (l.trim().startsWith("assert") ? i : -1)).filter((i) => i >= 0);
  const showResponse = phase >= 2;
  const showAsserts = phase >= 3;

  function next() {
    setIdx((i) => (i + 1) % DEMO_CASES.length);
    setPhase(reduce.current ? 3 : 0);
  }

  return (
    <section id="demo" className="section section-alt" ref={root}>
      <div className="container">
        <SectionHeading index="04" label={d.label} title={d.title}>
          {d.intro}
        </SectionHeading>

        <div className="ide card" data-reveal>
          <div className="ide-bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="ide-file">create_user_test.py</span>
            <span className="ide-count">{d.caseOf(idx + 1, DEMO_CASES.length)}</span>
            <div className="ide-controls">
              <button type="button" className="icon-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? d.pause : d.play}>
                {playing ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button type="button" className="icon-btn" onClick={next} aria-label={d.next}>
                <NextIcon />
              </button>
            </div>
          </div>

          <div className="ide-body">
            {/* tabIndex: el bloque tiene scroll horizontal en móvil y debe poder enfocarse con teclado. */}
            <pre className="ide-code" aria-label="create_user_test.py" tabIndex={0}>
              <code key={idx}>
                {lines.map((l, i) => {
                  const a = assertLines.indexOf(i);
                  const ok = showAsserts && a >= 0;
                  return (
                    <span
                      key={i}
                      className={`cl${i < test.length ? " is-test" : ""}${ok ? " is-ok" : ""}`}
                      style={{ "--a": a }}
                    >
                      <span className="ln-no">{ok ? <CheckIcon width={12} height={12} /> : i + 1}</span>
                      {highlight(l) }
                      {"\n"}
                    </span>
                  );
                })}
              </code>
            </pre>

            <div className="ide-http" aria-live="polite">
              <p className="http-label">{d.request}</p>
              <p className="http-line">
                <span className="m-post">POST</span> /api/v1/users/
              </p>
              <pre className="http-body">{c.input === null ? `${d.missing}\n` : ""}{requestBody(c)}</pre>

              <p className="http-label">
                {d.response}
                {phase === 1 && (
                  <span className="http-wait">
                    <span className="spin" /> {d.waiting}
                  </span>
                )}
              </p>
              <div className={`http-res${showResponse ? " is-shown" : ""}`}>
                <p className="http-line">
                  <span className={`status s-${c.status}`}>{c.status}</span>
                  {c.status === 201 ? "Created" : "Bad Request"}
                  <span className="http-expect">
                    {d.expected}: {c.status}
                  </span>
                </p>
                <pre className="http-body">{responseBody(c)}</pre>
              </div>

              <p className={`http-pass${showAsserts ? " is-shown" : ""}`}>
                <CheckIcon width={14} height={14} /> {d.passed} <span>{c.fn}</span>
              </p>
            </div>
          </div>

          <div className="ide-steps" role="tablist" aria-label={d.title}>
            {DEMO_CASES.map((x, i) => (
              <button
                key={x.fn}
                type="button"
                role="tab"
                aria-selected={i === idx}
                aria-label={x.fn}
                className={i === idx ? "is-current" : i < idx ? "is-done" : undefined}
                onClick={() => {
                  setIdx(i);
                  setPhase(reduce.current ? 3 : 0);
                }}
              />
            ))}
          </div>
        </div>

        <a className="demo-source" href={REPO} target="_blank" rel="noreferrer">
          <GitHubIcon /> {d.source}
        </a>
      </div>
    </section>
  );
}
