import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { type Locale, applyLocaleToDocument, detectLocale, persistLocale } from "./locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const initial = detectLocale();
    if (typeof document !== "undefined") applyLocaleToDocument(initial);
    return initial;
  });

  useEffect(() => {
    applyLocaleToDocument(locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (next: Locale) => {
        applyLocaleToDocument(next);
        persistLocale(next);
        setLocaleState(next);
      },
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside a LocaleProvider");
  }
  return context;
}
