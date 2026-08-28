import { BrandCopy } from "@/components/BrandName";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/lib/home/useActiveSection";
import { useChromeCopy } from "@/lib/i18n/chromeCopy";
import { TYPE_LABEL } from "@/lib/typeStyles";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface SectionDotsProps {
  labels: readonly { id: string; label: string }[];
  className?: string;
}

/**
 * Section rail. Now a scroll-spy over ordinary anchors: the browser owns the
 * scrolling (`scroll-smooth` on `html`) and this only reports where the reader is.
 */
export function SectionDots({ labels, className }: SectionDotsProps) {
  const chrome = useChromeCopy();
  /* Owned here rather than in `HomePage`: scroll-spy state at the page root
     re-rendered all eight blocks and the background on every section change. */
  const sectionIds = useMemo(() => labels.map((l) => l.id), [labels]);
  const activeId = useActiveSection(sectionIds);

  return (
    <nav
      aria-label={chrome.sectionNav}
      className={cn(
        "pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2.5 md:flex",
        className,
      )}
    >
      {labels.map(({ id, label }) => {
        const active = id === activeId;
        return (
          <Button
            key={id}
            asChild
            variant="ghost"
            size="icon"
            className={cn(
              /* The mark stays a dot; the control around it is the 44px target. */
              "pointer-events-auto group relative flex h-11 w-11 items-center justify-center rounded-full p-0 hover:bg-transparent",
              "outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-rgb))] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            <a href={`#${id}`} aria-label={label} aria-current={active ? "true" : undefined}>
              <span
                className={cn(
                  "block rounded-full transition-all duration-200 ease-out",
                  active
                    ? "h-2.5 w-2.5 bg-[rgb(var(--accent-rgb))] shadow-[0_0_16px_rgba(var(--accent-rgb),0.75)]"
                    : "h-1.5 w-1.5 bg-muted-foreground group-hover:h-2 group-hover:w-2",
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap",
                  TYPE_LABEL,
                  "bg-background/90 px-2 py-1 font-mono text-micro text-muted-foreground backdrop-blur-sm",
                  "opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                )}
              >
                <BrandCopy text={label} />
              </span>
            </a>
          </Button>
        );
      })}
    </nav>
  );
}
