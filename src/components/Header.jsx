import { useEffect, useRef, useState } from "react";
import { profile } from "../data.js";
import { MenuIcon, CloseIcon, SunIcon, MoonIcon, TerminalIcon } from "./icons.jsx";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#proceso", label: "Proceso" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#trayectoria", label: "Trayectoria" },
];

function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(currentTheme);
  const [current, setCurrent] = useState("");
  const progress = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      progress.current?.style.setProperty("--p", p.toFixed(4));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta en el menú la sección que está a media pantalla.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onToggle = () => toggleTheme();
    window.addEventListener("toggle-theme", onToggle);
    return () => window.removeEventListener("toggle-theme", onToggle);
  }, []);

  function toggleTheme() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container header-inner">
        <a href="#inicio" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">YD</span>
          <span className="brand-name">{profile.name}</span>
        </a>

        <nav className="nav" aria-label="Principal">
          <ul id="menu">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={current === l.href ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-cta">
              <a href="#contacto" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
                Contactar
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn console-btn"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event("open-console"));
            }}
            aria-label="Abrir consola qa-cli (Ctrl + K)"
            title="qa-cli · Ctrl + K"
          >
            <TerminalIcon />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
      <div className="progress" ref={progress} aria-hidden="true" />
    </header>
  );
}
