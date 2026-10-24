import { useEffect, useRef, useState } from "react";
import { profile, apiCases } from "../content.js";
import { useLang } from "../i18n.jsx";
import { toggleTheme } from "./Header.jsx";
import { CloseIcon } from "./icons.jsx";

// Consola "qa-cli": se abre con Ctrl/⌘ + K o con el botón >_ del header.
// Solo imprime texto plano (React lo escapa), nunca HTML.

// Acepta nombres en español y en inglés.
const sections = {
  inicio: "inicio",
  home: "inicio",
  sobre: "sobre-mi",
  about: "sobre-mi",
  habilidades: "habilidades",
  skills: "habilidades",
  proceso: "proceso",
  process: "proceso",
  demo: "demo",
  proyectos: "proyectos",
  projects: "proyectos",
  reto: "reto",
  challenge: "reto",
  calidad: "calidad",
  quality: "calidad",
  trayectoria: "trayectoria",
  journey: "trayectoria",
  contacto: "contacto",
  contact: "contacto",
};
const sectionNames = (lang) =>
  lang === "es"
    ? ["inicio", "sobre", "habilidades", "proceso", "demo", "proyectos", "reto", "calidad", "trayectoria", "contacto"]
    : ["home", "about", "skills", "process", "demo", "projects", "challenge", "quality", "journey", "contact"];

const commandNames = ["help", "whoami", "skills", "projects", "run tests", "goto", "contact", "theme", "lang", "clear", "exit", "sudo hire yerlis"];

export default function Console() {
  const { t, lang, toggleLang } = useLang();
  const cli = t.cli;
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
          { t: "sys", s: cli.welcome },
        ]);
      }
      setTimeout(() => input.current?.focus(), 0);
    }
    if (!open && d.open) d.close();
  }, [open, lines.length, cli.welcome]);

  useEffect(() => {
    out.current?.scrollTo({ top: out.current.scrollHeight });
  }, [lines]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const print = (...items) => setLines((l) => [...l, ...items]);

  // Nombres reales de github.com/Yerlis24/api_stand_tests.
  function runSuite() {
    setBusy(true);
    print({ t: "dim", s: `collecting… ${apiCases.length} items` });
    apiCases.forEach((c, i) => {
      timers.current.push(setTimeout(() => print({ t: "ok", s: `PASSED  ${c.fn}` }), 220 * (i + 1)));
    });
    timers.current.push(
      setTimeout(() => {
        print({ t: "ok-b", s: `══ ${apiCases.length} passed ══` });
        setBusy(false);
      }, 220 * (apiCases.length + 1))
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
        print(
          ...cli.help.map((s) => ({
            t: "out",
            s: s.endsWith("      ") ? s + sectionNames(lang).join(" | ") : s,
          }))
        );
        break;
      case "whoami":
        print(
          { t: "out", s: `${profile.name} — ${profile.role}` },
          { t: "dim", s: `${cli.seeking}: ${t.contact.seeking}.` }
        );
        break;
      case "skills":
        t.skills.groups.forEach((g) => print({ t: "acc", s: g.title }, { t: "out", s: "  " + g.items.join(" · ") }));
        break;
      case "projects":
        t.projects.items.forEach((p) => print({ t: "acc", s: `${p.title} — ${p.kind}` }, { t: "out", s: "  " + p.stack.join(" · ") }));
        print({ t: "dim", s: cli.projectsTip });
        break;
      case "run":
        if (args[0] === "tests") runSuite();
        else print({ t: "err", s: cli.runHint });
        break;
      case "test":
      case "pytest":
        runSuite();
        break;
      case "goto": {
        const id = sections[args[0]];
        if (!id) {
          print({ t: "err", s: `${cli.unknownSection} ${sectionNames(lang).join(", ")}` });
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
        toggleTheme();
        print({ t: "dim", s: cli.themeDone });
        break;
      case "lang":
        print({ t: "dim", s: cli.langDone });
        toggleLang();
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
        setOpen(false);
        break;
      case "sudo":
        if (args.join(" ") === "hire yerlis") {
          print({ t: "ok-b", s: cli.sudoOk }, { t: "out", s: cli.sudoText(profile.email) });
        } else print({ t: "err", s: cli.sudoNo });
        break;
      default:
        print({ t: "err", s: cli.notFound(name) });
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
        const m = sectionNames(lang).find((s) => s.startsWith(part));
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
      aria-label="qa-cli"
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
        <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label={cli.close}>
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
            aria-label={cli.input}
            placeholder={lines.length <= 2 ? "help" : ""}
          />
        </label>
      </div>
      <div className="console-hints">
        {["help", "run tests", "skills", "lang", "sudo hire yerlis"].map((c) => (
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
