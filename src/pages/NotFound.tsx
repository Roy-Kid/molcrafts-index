import sadMoko from "@/assets/moko/sad.webp";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Suspense, lazy, useMemo } from "react";
import { fadeIn, slideUp } from "../lib/animations";
import { FEATURED_LINKS } from "../lib/routes";
import {
  BRAND_GRADIENT_TEXT,
  LEGACY_SHADOW,
  MOLECULAR_GLOW,
  MOLECULE_BLOB,
  PRODUCT_HERO_SECTION,
} from "../lib/styleTokens";
import { cn } from "../lib/utils";

const MoleculeOverlay = lazy(() =>
  import("../components/MoleculeOverlay").then((module) => ({
    default: module.MoleculeOverlay,
  })),
);

function readSearchParams() {
  if (typeof window === "undefined")
    return { from: null as string | null, doc: null as string | null };
  const q = new URLSearchParams(window.location.search);
  return {
    from: q.get("from"),
    doc: q.get("doc"),
  };
}

export const NotFound = () => {
  const { from, doc } = useMemo(() => readSearchParams(), []);
  const attempted =
    from ||
    (typeof window !== "undefined" && window.location.pathname !== "/404"
      ? window.location.pathname
      : null);

  return (
    <motion.section
      className={cn(PRODUCT_HERO_SECTION, "min-h-[calc(100vh-200px)]")}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className={cn(MOLECULE_BLOB, "left-[15%] top-1/4")} aria-hidden="true" />
      <div
        className={cn(MOLECULE_BLOB, "right-[20%] top-[35%] [animation-delay:7s]")}
        aria-hidden="true"
      />
      <div
        className={cn(MOLECULE_BLOB, "bottom-[30%] left-1/4 [animation-delay:4s]")}
        aria-hidden="true"
      />
      <div
        className={cn(MOLECULAR_GLOW, "left-1/2 top-[30%] size-[18.75rem]")}
        aria-hidden="true"
      />

      <Suspense fallback={null}>
        <MoleculeOverlay />
      </Suspense>

      <motion.div
        className="text-center w-full max-w-3xl mx-auto px-4 z-10 mb-12 mt-12"
        variants={slideUp}
      >
        <motion.header className="flex flex-col items-center justify-center w-full">
          <motion.img
            src={sadMoko}
            alt=""
            className="mb-2 size-32 object-cover [filter:drop-shadow(0_0_28px_color-mix(in_srgb,var(--color-emerald-500)_28%,transparent))_drop-shadow(0_0_12px_color-mix(in_srgb,var(--molcrafts-cyan-spark-soft)_18%,transparent))] [mask-image:radial-gradient(circle_at_center,#000_42%,rgb(0_0_0_/_0.65)_60%,transparent_78%)] md:size-40"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 0.5, ease: "easeOut" },
              y: {
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            draggable="false"
          />

          <motion.p
            className="text-sm font-semibold tracking-[0.2em] uppercase text-primary mb-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            404
          </motion.p>

          <motion.h1
            className={cn(
              BRAND_GRADIENT_TEXT,
              "mb-4 font-sans text-4xl font-extrabold leading-headline tracking-tight sm:text-5xl md:text-6xl",
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            This path is empty.
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {doc
              ? `We could not find documentation for ${doc}. It may not be published yet, or the URL moved under docs.molcrafts.org.`
              : "That page is not part of the MolCrafts brand site. Check the path, or jump to a product below."}
          </motion.p>

          {attempted && (
            <motion.p
              className="mt-5 inline-flex max-w-full items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2 font-mono text-xs sm:text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.35 }}
            >
              <span className="text-zinc-600 shrink-0">path</span>
              <span className="truncate text-primary">{attempted}</span>
            </motion.p>
          )}
        </motion.header>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {FEATURED_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...("external" in link && link.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className={cn(
                "rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground",
                "transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button asChild size="lg" className="px-8 shadow-[0_0_18px_hsl(var(--primary)/0.35)]">
            <a href="/">Return home</a>
          </Button>
        </motion.div>
      </motion.div>

      <div className={cn(LEGACY_SHADOW, "right-[10rem]")} aria-hidden="true" />
    </motion.section>
  );
};
