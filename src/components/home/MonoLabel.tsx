import { TYPE_LABEL } from "@/lib/typeStyles";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * System chrome label — mono and tracked. Not marketing copy.
 *
 * Set in `muted-foreground` rather than a tinted primary: at `text-micro` the old
 * `text-primary/85` measured 2.96:1, and this label rides on every block of the
 * homepage, so it took the whole numbered rail below the text threshold.
 */
export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        TYPE_LABEL,
        "font-mono text-micro font-medium text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
