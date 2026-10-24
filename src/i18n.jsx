import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { content } from "./content.js";

const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : "en";
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem("lang", next);
    } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((cur) => {
      const next = cur === "es" ? "en" : "es";
      try {
        localStorage.setItem("lang", next);
      } catch {}
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t: content[lang] }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
