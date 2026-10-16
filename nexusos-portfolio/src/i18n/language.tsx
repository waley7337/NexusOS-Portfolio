import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { pick, type PortfolioLanguage } from "~/i18n/l10n";
import { ui } from "~/i18n/ui";

export type { PortfolioLanguage } from "~/i18n/l10n";

const STORAGE_KEY = "nexusos-portfolio:language";

function readLanguage(): PortfolioLanguage {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "de" || stored === "fr") return stored;
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
    document.title = pick(ui.documentTitle, language);
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", pick(ui.documentDescription, language));
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function usePortfolioLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("usePortfolioLanguage requires LanguageProvider");
  return value;
}

/** Resolve a localized value for the active language. Missing copy throws. */
export function usePick() {
  const { language } = usePortfolioLanguage();
  return function pickActive<T extends Record<PortfolioLanguage, unknown>>(value: T): T[PortfolioLanguage] {
    return pick(value, language);
  };
}
