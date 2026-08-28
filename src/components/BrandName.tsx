import { BrandMark } from "@/lib/brandMark";
import { HOME_BRAND_GRADIENT, HOME_WORDMARK, HOME_WORDMARK_SHEEN } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

const BLOOM = {
  hero: "opacity-40 blur-[26px] text-[rgb(var(--accent-rgb))]",
  chrome: "opacity-30 blur-[6px] text-[var(--home-wordmark-via)]",
} as const;

/**
 * The MolCrafts wordmark. Blue-to-light-blue fill, with a letter-shaped bloom
 * sitting behind it — `text-shadow` cannot paint through `bg-clip-text`.
 */
export function BrandName({
  className,
  glow = "chrome",
}: {
  className?: string;
  glow?: keyof typeof BLOOM | "none";
}) {
  const mark = (
    <span className={cn(HOME_BRAND_GRADIENT, "relative inline-block", className)}>
      {BrandMark.TEXT}
    </span>
  );
  if (glow === "none") return mark;

  return (
    <span className="relative isolate inline-block">
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 inline-block select-none",
          className,
          BLOOM[glow],
        )}
      >
        {BrandMark.TEXT}
      </span>
      {mark}
      {glow === "hero" ? (
        <span
          aria-hidden="true"
          className={cn(
            HOME_WORDMARK_SHEEN,
            "pointer-events-none absolute inset-0 inline-block select-none",
            className,
          )}
        >
          {BrandMark.TEXT}
        </span>
      ) : null}
    </span>
  );
}

/**
 * Running copy that paints every "MolCrafts" with the static wordmark ramp.
 * Words stay verbatim; only the mark is wrapped.
 */
export function BrandCopy({ text, className }: { text: string; className?: string }) {
  return (
    <>
      {BrandMark.split(text).map((part) =>
        part.kind === "mark" ? (
          <span key={`mark-${part.at}`} className={cn(HOME_WORDMARK, "inline-block", className)}>
            {part.value}
          </span>
        ) : (
          <Fragment key={`text-${part.at}`}>{part.value}</Fragment>
        ),
      )}
    </>
  );
}
