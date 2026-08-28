import { useLocale } from "@/lib/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";
import { en } from "./en";
import { sv } from "./sv";
import type { HomeCopy } from "./types";
import { zh } from "./zh";

export const HOME_COPY: Readonly<Record<Locale, HomeCopy>> = { en, zh, sv };

/** The active locale's homepage copy. Re-renders consumers on language change. */
export function useHomeCopy(): HomeCopy {
  const { locale } = useLocale();
  return HOME_COPY[locale];
}

export type { HomeCopy, PillarCopy } from "./types";
