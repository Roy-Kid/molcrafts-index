import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronDown, Menu } from "lucide-react";
import { GITHUB_ORG_HREF } from "../lib/home/data";
import { useLocalizedEcosystem } from "../lib/i18n/catalogCopy";
import { useChromeCopy } from "../lib/i18n/chromeCopy";
import { BRAND_GRADIENT_TEXT } from "../lib/styleTokens";
import { TYPE_BODY, TYPE_LABEL } from "../lib/typeStyles";
import { cn } from "../lib/utils";
import { BrandName } from "./BrandName";
import { LogoIcon } from "./Icons";
import { LocaleToggle } from "./LocaleToggle";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const Navbar = () => {
  const chrome = useChromeCopy();
  const ecosystemCategories = useLocalizedEcosystem();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  };

  const isHome = currentPath === "/" || currentPath === "";

  if (isHome) {
    return (
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.48 }}
      >
        <div className="pointer-events-auto mx-auto flex h-14 w-full max-w-[90rem] items-center justify-between rounded-full border border-white/10 bg-[hsl(var(--background)/0.72)] px-3 font-brand shadow-nav backdrop-blur-xl [font-optical-sizing:auto] sm:px-4 md:w-[calc(100%-2rem)]">
          <a
            href="#hero"
            className="flex items-center gap-2.5 no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <LogoIcon className="!h-9 !w-9" />
            <BrandName className="font-display text-xl font-semibold" />
          </a>

          <div className="flex items-center gap-1">
            <LocaleToggle compact />
            <ModeToggle />
            <Button asChild variant="ghost" size="icon" className="ghost">
              <a
                href={GITHUB_ORG_HREF}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <GitHubLogoIcon className="h-[1.1rem] w-[1.2rem]" aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-border/50 bg-background/70 shadow-[0_1px_0_0_rgba(var(--accent-rgb),0.06)] backdrop-blur-2xl backdrop-saturate-150",
      )}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container relative mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center">
          <motion.a
            rel="noreferrer noopener"
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogoIcon />
            <span className={BRAND_GRADIENT_TEXT}>MolCrafts</span>
          </motion.a>
        </div>

        <nav className="hidden h-full min-w-0 items-center md:flex">
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className={cn(
                "flex items-center gap-1 rounded-md px-2.5 py-2 text-sm font-medium transition-colors lg:whitespace-nowrap lg:px-4",
                dropdownOpen
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {chrome.projects}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  dropdownOpen && "rotate-180",
                )}
              />
            </Button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full z-10 h-8 w-full" aria-hidden="true" />
            )}

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={cn(
                    "absolute left-1/2 top-full z-50 w-max -translate-x-1/2 overflow-hidden rounded-2xl p-5",
                    "border border-border/40 bg-background/85 backdrop-blur-2xl backdrop-saturate-150",
                    "shadow-menu",
                  )}
                >
                  <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-[70px]" />

                  <div className="relative flex max-w-[min(92vw,76rem)] flex-row flex-wrap gap-x-8 gap-y-6 px-1 py-1">
                    {ecosystemCategories.map((category, catIdx) => (
                      <div
                        key={category.title}
                        className="flex min-w-[11rem] max-w-[18rem] flex-1 basis-44 flex-col gap-1"
                      >
                        <div
                          className={cn(
                            TYPE_LABEL,
                            "mb-1 px-1 text-micro font-bold text-muted-foreground",
                          )}
                        >
                          {category.title}
                        </div>
                        <div className="flex flex-col gap-0.5">
                          {category.items.map((item, itemIdx) => (
                            <motion.a
                              key={item.title}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer noopener" : undefined}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: (catIdx * category.items.length + itemIdx) * 0.04,
                              }}
                              className="group flex min-w-0 items-baseline gap-2 px-1 py-1.5 transition-all"
                            >
                              <span
                                className={cn(
                                  "shrink-0 text-sm font-semibold duration-200 group-hover:translate-x-1",
                                  item.color,
                                )}
                              >
                                {item.title}
                              </span>
                              <span
                                className={cn(
                                  TYPE_BODY,
                                  "min-w-0 text-mini !leading-snug text-muted-foreground/80",
                                )}
                              >
                                {item.role}
                              </span>
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="icon" className="ghost">
              <a rel="noreferrer noopener" href={GITHUB_ORG_HREF} target="_blank">
                <GitHubLogoIcon className="h-[1.1rem] w-[1.2rem]" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <LocaleToggle />
            <ModeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LocaleToggle />
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="-mr-2 p-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">{chrome.toggleMenu}</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(22rem,90vw)] border-l border-border">
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle className={cn(BRAND_GRADIENT_TEXT, "text-xl font-bold")}>
                    MolCrafts
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-4">
                    {ecosystemCategories.map((category) => (
                      <div key={category.title} className="flex flex-col gap-1">
                        <div
                          className={cn(
                            TYPE_LABEL,
                            "px-4 py-1 text-micro font-bold text-muted-foreground",
                          )}
                        >
                          {category.title}
                        </div>
                        <div className="grid gap-1 px-2">
                          {category.items.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noreferrer noopener" : undefined}
                              onClick={() => setIsOpen(false)}
                              className="flex items-baseline gap-2 rounded-lg p-3 transition-all hover:bg-accent"
                            >
                              <span className={cn("text-sm font-semibold", item.color)}>
                                {item.title}
                              </span>
                              <span className="min-w-0 text-xs leading-snug text-muted-foreground">
                                · {item.role}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6">
                    <a
                      href={GITHUB_ORG_HREF}
                      target="_blank"
                      className="flex items-center justify-center gap-3 rounded-xl bg-muted px-4 py-4 text-center text-sm font-bold transition-colors hover:bg-muted/80"
                      rel="noreferrer noopener"
                    >
                      <GitHubLogoIcon className="h-5 w-5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
