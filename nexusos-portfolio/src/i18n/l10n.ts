export const PORTFOLIO_LANGUAGES = ["en", "de", "fr"] as const;

export type PortfolioLanguage = (typeof PORTFOLIO_LANGUAGES)[number];

/** A value that exists in every portfolio language. Missing entries are a type error. */
export type L10n<T = string> = Record<PortfolioLanguage, T>;

const catalog: L10n<string>[] = [];

function assertFilled(language: PortfolioLanguage, value: string) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing ${language} translation`);
  }
}

/**
 * Build a three-language string. Empty copy throws at load time.
 * There is no English fallback: each language is stored on its own.
 */
export function l10n(en: string, de: string, fr: string): L10n<string> {
  const value: L10n<string> = { en, de, fr };
  for (const language of PORTFOLIO_LANGUAGES) assertFilled(language, value[language]);
  catalog.push(value);
  return value;
}

/** Parallel paragraphs. Lengths must match so a language cannot silently drop a block. */
export function l10nList(en: readonly string[], de: readonly string[], fr: readonly string[]): L10n<readonly string[]> {
  if (en.length !== de.length || de.length !== fr.length) {
    throw new Error("Translation lists differ in length");
  }
  en.forEach((item, index) => l10n(item, de[index] ?? "", fr[index] ?? ""));
  return { en, de, fr };
}

/**
 * Read one language. Throws when that language is absent.
 * Never returns another language's copy.
 */
export function pick<T extends Record<PortfolioLanguage, unknown>>(
  value: T,
  language: PortfolioLanguage,
): T[PortfolioLanguage] {
  if (!Object.prototype.hasOwnProperty.call(value, language)) {
    throw new Error(`Missing ${language} translation`);
  }
  const resolved = value[language];
  if (resolved === undefined || (typeof resolved === "string" && resolved.trim() === "")) {
    throw new Error(`Missing ${language} translation`);
  }
  return resolved;
}

export function translationCatalog(): readonly L10n<string>[] {
  return catalog;
}
