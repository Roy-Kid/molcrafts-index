import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { useChromeCopy } from "@/lib/i18n/chromeCopy";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

const COMPACT_LOCALE_LABELS = {
  en: "EN",
  zh: "中文",
  sv: "SV",
} as const;

export function LocaleToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const chrome = useChromeCopy();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={compact ? "sm" : "icon"}
          className={cn(
            "ghost",
            compact &&
              "h-10 min-w-10 rounded-full px-2 font-brand text-sm font-medium tracking-[-0.01em] [font-optical-sizing:auto]",
          )}
          aria-label={chrome.changeLanguage}
        >
          {compact ? (
            <span aria-hidden="true">{COMPACT_LOCALE_LABELS[locale]}</span>
          ) : (
            <Languages className="h-[1.1rem] w-[1.2rem]" />
          )}
          <span className="sr-only">{chrome.changeLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(compact && "font-brand [font-optical-sizing:auto]")}
      >
        {LOCALES.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setLocale(option)}
            className={cn(
              compact && "text-sm font-medium",
              option === locale &&
                (compact ? "font-wordmark text-primary" : "font-semibold text-primary"),
            )}
          >
            {LOCALE_LABELS[option]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
