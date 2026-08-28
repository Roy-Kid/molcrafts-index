import type { HomeSectionId } from "@/lib/home/data";
import { sectionHeadingId } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HomeSectionProps {
  id: HomeSectionId;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  /**
   * `screen` — a block of the argument, which takes a screen.
   * `band` — a short strip that sizes to its own content, for a block that credits
   * rather than argues and would read as empty space if it took a screen too.
   */
  height?: "screen" | "band";
  className?: string;
  children: ReactNode;
}

/**
 * One block of the homepage argument: a screen tall, in normal document flow.
 *
 * `min-h-svh` is a floor, not an equality. On a desktop viewport every block lands
 * on exactly one screen and the page keeps a steady beat; where content genuinely
 * outgrows a short viewport the block extends rather than clipping, so heights are
 * equal in practice but never guaranteed. Nothing snaps — the reader controls the
 * distance, and the shared background behind them (`HomeAtmosphere`) never moves,
 * so the blocks read as one space rather than eight.
 */
export function HomeSection({
  id,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
  height = "screen",
  className,
  children,
}: HomeSectionProps) {
  return (
    <section
      id={id}
      data-section-id={id}
      aria-labelledby={ariaLabelledby ?? sectionHeadingId(id)}
      aria-label={ariaLabel}
      className={cn(
        "relative flex w-full min-w-0 scroll-mt-28 flex-col justify-center",
        height === "screen" && "min-h-svh",
        className,
      )}
    >
      {children}
    </section>
  );
}
