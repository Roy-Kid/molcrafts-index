import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useChromeCopy } from "@/lib/i18n/chromeCopy";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { toggleTheme: toggleThemeLabel } = useChromeCopy();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const isDark =
      theme === "dark" ||
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="ghost"
      onClick={toggleTheme}
      aria-label={toggleThemeLabel}
    >
      <Sun
        className="h-[1.1rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute h-[1.1rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
      <span className="sr-only">{toggleThemeLabel}</span>
    </Button>
  );
}
