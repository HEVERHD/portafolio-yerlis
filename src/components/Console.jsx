import { useEffect, useRef, useState } from "react";
import { profile, skills, projects, seeking } from "../data.js";
import { CloseIcon } from "./icons.jsx";

// Consola "qa-cli": se abre con Ctrl/⌘ + K o con el botón >_ del header.
// Solo imprime texto plano (React lo escapa), nunca HTML.

const sections = {
  inicio: "inicio",
  sobre: "sobre-mi",
  habilidades: "habilidades",
  proceso: "proceso",
  proyectos: "proyectos",
  trayectoria: "trayectoria",
  contacto: "contacto",
};

const help = [
  "Comandos disponibles:",
  "  whoami              quién soy",
  "  skills              habilidades por categoría",
  "  projects            casos de estudio",
  "  run tests           ejecuta la suite de QA",
  "  goto <sección>      " + Object.keys(sections).join(" | "),
  "  contact             cómo contactarme",
  "  theme               cambia tema claro/oscuro",
  "  clear · exit",
];

const suite = [
  "test_login_valido",
  "test_login_password_incorrecto",
  "test_busqueda_de_rutas",
  "test_api_crear_kit_201",
  "test_api_kit_sin_nombre_400",
  "test_regresion_pedido",
];

const commandNames = ["help", "whoami", "skills", "projects", "run tests", "goto", "contact", "theme", "clear", "exit", "sudo hire yerlis"];

export default function Console() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const [busy, setBusy] = useState(false);
  const dialog = useRef(null);
  const input = useRef(null);
  const out = useRef(null);
  const timers = useRef([]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-console", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-console", onOpen);
    };
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (open && !d.open) {
      d.showModal();
      if (lines.length === 0) {
        setLines([
          { t: "sys", s: `qa-cli v2.0 · ${profile.name}, ${profile.role}` },
          { t: "sys", s: "Escribe «help» para ver los comandos. Tab autocompleta, ↑ ↓ recorren el historial." },
        ]);
      }
      setTimeout(() => input.current?.focus(), 0);
    }
    if (!open && d.open) d.close();
  }, [open, lines.length]);

  useEffect(() => {
    out.current?.scrollTo({ top: out.current.scrollHeight });
  }, [lines]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const print = (...items) => setLines((l) => [...l, ...items]);

  function runSuite() {
    setBusy(true);
    print({ t: "dim", s: "collecting… 6 items" });
    suite.forEach((name, i) => {
      timers.current.push(
        setTimeout(() => print({ t: "ok", s: `PASSED  ${name}` }), 320 * (i + 1))
      );
    });
    timers.current.push(
      setTimeout(() => {
        print({ t: "ok-b", s: `══ ${suite.length} passed in 1.94s ══` });
        setBusy(false);
      }, 320 * (suite.length + 1))
    );
  }

  function exec(raw) {
    const cmd = raw.trim().replace(/\s+/g, " ");
    print({ t: "in", s: cmd });
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 30));
    const [name, ...args] = cmd.toLowerCase().split(" ");

    switch (name) {
      case "help":
        print(...help.map((s) => ({ t: "out", s })));
        break;
      case "whoami":
        print(
          { t: "out", s: `${profile.name} — ${profile.role}` },
          { t: "out", s: profile.focus },
          { t: "dim", s: `Busco: ${seeking}.` }
        );
        break;
      case "skills":
        skills.forEach((g) => print({ t: "acc", s: g.title }, { t: "out", s: "  " + g.items.join(" · ") }));
        break;
      case "projects":
        projects.forEach((p) =>
          print({ t: "acc", s: `${p.title} — ${p.kind}` }, { t: "out", s: "  " + p.stack.join(" · ") })
        );
        print({ t: "dim", s: "Tip: goto proyectos para ver las demos en video." });
        break;
      case "run":
        if (args[0] === "tests") runSuite();
        else print({ t: "err", s: "¿Quisiste decir «run tests»?" });
        break;
      case "test":
      case "pytest":
        runSuite();
        break;
      case "goto": {
        const id = sections[args[0]];
        if (!id) {
          print({ t: "err", s: `Sección desconocida. Opciones: ${Object.keys(sections).join(", ")}` });
          break;
        }
        setOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case "contact":
        print(
          { t: "out", s: `email     ${profile.email}` },
          { t: "out", s: `linkedin  ${profile.linkedin}` },
          { t: "out", s: `github    ${profile.github}` }
        );
        break;
      case "theme":
        window.dispatchEvent(new Event("toggle-theme"));
        print({ t: "dim", s: "Tema cambiado." });
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        setOpen(false);
        break;
      case "sudo":
        if (args.join(" ") === "hire yerlis") {
          print(
            { t: "ok-b", s: "[sudo] permiso concedido ✓" },
            { t: "out", s: `Excelente decisión. Escríbeme a ${profile.email} y hablemos.` }
          );
        } else print({ t: "err", s: "Permiso denegado. Prueba «sudo hire yerlis»." });
        break;
      default:
        print({ t: "err", s: `Comando no encontrado: ${name}. Escribe «help».` });
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (busy) return;
      exec(value);
      setValue("");
      setHIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      if (i >= 0) {
        setHIndex(i);
        setValue(history[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIndex - 1;
      setHIndex(Math.max(i, -1));
      setValue(i >= 0 ? history[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = value.toLowerCase();
      if (v.startsWith("goto ")) {
        const part = v.slice(5);
        const m = Object.keys(sections).find((s) => s.startsWith(part));
        if (m) setValue(`goto ${m}`);
      } else {
        const m = commandNames.find((c) => c.startsWith(v) && v);
        if (m) setValue(m);
      }
    }
  }

  return (
    <dialog
      ref={dialog}
      className="console"
      aria-label="Consola qa-cli"
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === dialog.current && setOpen(false)}
    >
      <div className="console-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span>yerlis@qa-cli: ~</span>
        <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Cerrar consola">
          <CloseIcon />
        </button>
      </div>
      <div className="console-out" ref={out} onClick={() => input.current?.focus()} aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={`ln ln-${l.t}`}>
            {l.t === "in" && <span className="prompt">❯ </span>}
            {l.s}
          </p>
        ))}
        <label className="console-input">
          <span className="prompt">❯</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck="false"
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Comando"
            placeholder={lines.length <= 2 ? "help" : ""}
          />
        </label>
      </div>
      <div className="console-hints">
        {["help", "run tests", "skills", "sudo hire yerlis"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              if (busy) return;
              exec(c);
              input.current?.focus();
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </dialog>
  );
}
