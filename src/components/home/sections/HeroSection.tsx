import { BrandName } from "@/components/BrandName";
import { MOTION_EASE, prefersReducedMotion } from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_STATEMENT } from "@/lib/home/stage";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HomeSection } from "../HomeSection";

/**
 * The MolCrafts brand curtain: centred wordmark, gradient and glow.
 *
 * The field and glows it used to own are now the page's shared background
 * (`HomeAtmosphere`), so this block carries type alone.
 */
export function HeroSection() {
  const { brandHero } = useHomeCopy();
  const { locale } = useLocale();
  const reduceMotion = prefersReducedMotion();
  const stageRef = useRef<HTMLElement>(null);
  /* The descent pulse loops for as long as the curtain is on screen; once the
     reader has scrolled past it, the loop would only cost the main thread. */
  const onScreen = useInView(stageRef, { amount: 0.05 });
  const idle = onScreen ? undefined : "[animation-play-state:paused]";

  return (
    <HomeSection id="hero" aria-labelledby="main-heading" className="overflow-hidden">
      <motion.header
        ref={stageRef}
        lang={locale}
        className="relative z-10 mx-auto flex w-full max-w-[100rem] flex-col items-center px-6 pb-24 pt-16 text-center font-brand [font-optical-sizing:auto] sm:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: MOTION_EASE }}
      >
        <motion.p
          className={cn(
            HOME_STATEMENT,
            "mb-[clamp(2rem,2.5vw,2.5rem)] flex min-h-[2.8em] max-w-3xl items-end justify-center text-balance text-muted-foreground sm:min-h-[1.4em]",
            locale === "zh" ? "tracking-normal" : "tracking-[-0.01em]",
          )}
          initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, duration: 0.52, ease: MOTION_EASE }}
        >
          {brandHero.kicker}
        </motion.p>

        <motion.h1
          id="main-heading"
          lang="en"
          className="relative min-w-0 max-w-full whitespace-nowrap text-[clamp(4.25rem,9vw,9rem)] font-wordmark leading-[0.94] tracking-tighter [font-kerning:normal]"
          initial={{ opacity: 0, y: 22, filter: "blur(9px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.2, duration: 0.68, ease: MOTION_EASE }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[0.5em] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--accent-rgb))]/12 blur-[48px]"
          />
          <BrandName glow="hero" className={idle} />
        </motion.h1>

        <motion.p
          className={cn(
            HOME_STATEMENT,
            "relative isolate mt-[clamp(1.75rem,2vw,2rem)] flex min-h-[4.65em] max-w-[52rem] items-start justify-center text-balance text-muted-foreground lg:min-h-[1.55em]",
          )}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5, ease: MOTION_EASE }}
        >
          <span className="relative z-0">{brandHero.subtitle}</span>
          <motion.span
            key={locale}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-start justify-center bg-[linear-gradient(105deg,transparent_28%,var(--color-sheen-core)_47%,var(--color-sheen-edge)_52%,transparent_72%)] bg-[length:220%_100%] bg-clip-text text-balance text-transparent mix-blend-screen [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            initial={{ backgroundPosition: "160% 50%", opacity: 0 }}
            animate={
              reduceMotion
                ? { opacity: 0 }
                : {
                    backgroundPosition: ["160% 50%", "-60% 50%"],
                    opacity: [0, 0.95, 0.95, 0],
                  }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    backgroundPosition: {
                      delay: 1.05,
                      duration: 1.55,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: {
                      delay: 1.05,
                      duration: 1.55,
                      ease: "linear",
                      times: [0, 0.12, 0.76, 1],
                    },
                  }
            }
          >
            {brandHero.subtitle}
          </motion.span>
        </motion.p>
      </motion.header>

      {/* The scroll's direction, spoken in light: a plumb line at the screen's
          base with a pulse that keeps falling down it. Pinned to the section
          rather than placed in the curtain's flow, so the wordmark stays on the
          viewport's centre line. Under reduced motion the pulse stands still at
          the top of the line, which still points down. */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.9, ease: MOTION_EASE }}
      >
        <span className="relative block h-20 w-px overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--accent-rgb))]/25 to-transparent" />
          <span
            className={cn(
              "absolute left-0 top-0 h-8 w-full animate-hero-descent bg-gradient-to-b from-transparent via-[rgb(var(--accent-rgb))] to-transparent [box-shadow:0_0_12px_rgba(var(--accent-rgb),0.5)] motion-reduce:animate-none force-motion:animate-hero-descent",
              idle,
            )}
          />
        </span>
      </motion.div>
    </HomeSection>
  );
}
