import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type PortfolioLanguage = "en" | "de";

const STORAGE_KEY = "nexusos-portfolio:language";

function readLanguage(): PortfolioLanguage {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de") return stored;
  } catch {
    /* storage unavailable — stay on English */
  }
  return "en";
}

const LanguageContext = createContext<{
  language: PortfolioLanguage;
  setLanguage: (language: PortfolioLanguage) => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<PortfolioLanguage>(readLanguage);

  const setLanguage = (next: PortfolioLanguage) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* the choice still applies until reload */
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function usePortfolioLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("usePortfolioLanguage requires LanguageProvider");
  return value;
}
