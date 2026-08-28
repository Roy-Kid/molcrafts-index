/**
 * Site chrome strings (navbar, menus, toggles) per locale.
 * Small and flat on purpose — homepage narrative copy lives in
 * `src/lib/home/copy/`, the catalog overlay in `./catalogCopy.ts`.
 */

import { useLocale } from "./LocaleProvider";
import type { Locale } from "./locale";

export interface ChromeCopy {
  readonly home: string;
  readonly projects: string;
  readonly applications: string;
  readonly solutions: string;
  readonly collaboration: string;
  readonly about: string;
  readonly contact: string;
  readonly workWithUs: string;
  readonly approach: string;
  readonly participate: string;
  readonly docs: string;
  readonly toggleMenu: string;
  readonly toggleTheme: string;
  readonly changeLanguage: string;
  readonly sectionNav: string;
}

export const CHROME_COPY: Readonly<Record<Locale, ChromeCopy>> = {
  en: {
    home: "Home",
    projects: "Projects",
    applications: "Applications",
    solutions: "Capabilities",
    collaboration: "Collaboration",
    about: "About",
    contact: "Contact",
    workWithUs: "Work with us",
    approach: "Approach",
    participate: "Participate",
    docs: "Docs",
    toggleMenu: "Toggle Menu",
    toggleTheme: "Toggle theme",
    changeLanguage: "Change language",
    sectionNav: "Page sections",
  },
  zh: {
    home: "首页",
    projects: "项目",
    applications: "应用",
    solutions: "能力",
    collaboration: "合作",
    about: "关于我们",
    contact: "联系我们",
    workWithUs: "与我们合作",
    approach: "方法",
    participate: "参与",
    docs: "文档",
    toggleMenu: "打开菜单",
    toggleTheme: "切换颜色模式",
    changeLanguage: "切换语言",
    sectionNav: "页面章节",
  },
  sv: {
    home: "Hem",
    projects: "Projekt",
    applications: "Tillämpningar",
    solutions: "Förmågor",
    collaboration: "Samarbete",
    about: "Om oss",
    contact: "Kontakt",
    workWithUs: "Samarbeta",
    approach: "Arbetssätt",
    participate: "Delta",
    docs: "Dokumentation",
    toggleMenu: "Öppna menyn",
    toggleTheme: "Byt färgläge",
    changeLanguage: "Byt språk",
    sectionNav: "Sidsektioner",
  },
};

/** The active locale's chrome strings. */
export function useChromeCopy(): ChromeCopy {
  const { locale } = useLocale();
  return CHROME_COPY[locale];
}
