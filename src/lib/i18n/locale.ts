/**
 * Locale registry and detection. The UI ships in English, Chinese, and Swedish;
 * English is canonical and the fallback everywhere.
 */

export const LOCALES = ["en", "zh", "sv"] as const;
export type Locale = (typeof LOCALES)[number];

export type LocaleScript = "latin" | "cjk";
export type LocaleDir = "ltr" | "rtl";

/** Native-language names, shown in the language switcher. */
export const LOCALE_LABELS: Readonly<Record<Locale, string>> = {
  en: "English",
  zh: "中文",
  sv: "Svenska",
};

export const LOCALE_SCRIPT: Readonly<Record<Locale, LocaleScript>> = {
  en: "latin",
  zh: "cjk",
  sv: "latin",
};

export const LOCALE_DIR: Readonly<Record<Locale, LocaleDir>> = {
  en: "ltr",
  zh: "ltr",
  sv: "ltr",
};

/** Pin lang / dir / script on <html> so CSS type tokens resolve before paint. */
export function applyLocaleToDocument(locale: Locale): void {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = LOCALE_DIR[locale];
  root.dataset.locale = locale;
  root.dataset.script = LOCALE_SCRIPT[locale];
}

const STORAGE_KEY = "molcrafts-locale";

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Stored preference wins; otherwise the browser language; English as the fallback. */
export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* Storage can be unavailable (private mode); fall through to language detection. */
  }
  const language = window.navigator.language.toLowerCase();
  if (language.startsWith("zh")) return "zh";
  if (language.startsWith("sv")) return "sv";
  return "en";
}

export function persistLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* Persistence is best-effort; the in-memory choice still applies. */
  }
}
