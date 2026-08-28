import {
  assistAuraReveal,
  assistContextGather,
  assistMicroStatementReveal,
  assistMobileProductsReveal,
  assistStatementsReveal,
  assistSublineReveal,
  assistWordFillReveal,
  assistWordOutlineReveal,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_ASSIST_SENTENCE } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HomeSection } from "../HomeSection";
import { SectionMarker } from "../SectionMarker";

/*
 * Six sentences on a hexagon around the headline. The ellipse is tighter than
 * the old 38/44 ring: the sentences are now display size, so a wider orbit
 * clipped the left/right pair and dropped the bottom pair off the fold.
 *
 * Each sentence wraps inside a short measure instead of staying one line, which
 * is what keeps a 2xl claim from colliding with the title.
 *
 * Each entry positions the centre of the block; the wrapper carries the
 * -translate-x/y-1/2 because Framer writes an inline transform on the paragraph
 * itself, which would override the utility.
 */
const STATEMENT_POSITIONS = [
  "left-[84%] top-1/2", // 0°   — right
  "left-[70%] top-[16%]", // 60°
  "left-[30%] top-[16%]", // 120°
  "left-[16%] top-1/2", // 180° — left
  "left-[30%] top-[80%]", // 240°
  "left-[70%] top-[80%]", // 300°
] as const;

/*
 * Two concentric ellipses around the headline. Positions are literal class strings
 * rather than computed styles so Tailwind's scanner can see them; each is the
 * centre of the label, hence the -translate-x/y-1/2 on the wrapper.
 *
 * Both rings clear the headline's horizontal band (roughly 46%–54% vertically,
 * and wide because the line does not wrap), so nothing lands on the type.
 * Type size grows from the inner ring outward.
 */
const CONCEPT_CONTEXT = [
  { className: "left-[38.5%] top-[35.3%]", delay: 0.22, x: -44, y: -30 },
  { className: "left-[61.5%] top-[35.3%]", delay: 0.28, x: 44, y: -30 },
  { className: "left-[61.5%] top-[64.7%]", delay: 0.34, x: 44, y: 30 },
  { className: "left-[38.5%] top-[64.7%]", delay: 0.4, x: -44, y: 30 },
] as const;

const PRODUCT_CONTEXT = [
  { className: "left-[31.5%] top-[31.9%]", delay: 0.18, x: -70, y: -52 },
  { className: "left-[68.5%] top-[31.9%]", delay: 0.26, x: 70, y: -52 },
  { className: "left-[78.8%] top-[56.3%]", delay: 0.34, x: 78, y: 18 },
  { className: "left-1/2 top-[73%]", delay: 0.42, x: 0, y: 66 },
  { className: "left-[21.2%] top-[56.3%]", delay: 0.5, x: -78, y: 18 },
] as const;

/** Faint markers on a third, wider ellipse — pure texture, no copy. */
const CONTEXT_NODES = [
  { className: "left-[24%] top-[42%]", delay: 0.18, x: -80, y: 24 },
  { className: "left-[76%] top-[42%]", delay: 0.31, x: 80, y: 24 },
  { className: "left-[68%] top-[72%]", delay: 0.37, x: 60, y: 48 },
  { className: "left-[32%] top-[72%]", delay: 0.46, x: -60, y: 48 },
] as const;

/**
 * Idle drift, applied to a child of each Framer entrance wrapper so the two never
 * fight over the same element: a CSS animation outranks the inline style Framer
 * writes, and would otherwise flatten the entrance. Alternating the two drift
 * tracks by index keeps the field from moving in lockstep.
 */
const IDLE_DRIFT =
  "animate-assist-drift motion-reduce:animate-none force-motion:animate-assist-drift";
const IDLE_DRIFT_ALT =
  "animate-assist-drift-alt motion-reduce:animate-none force-motion:animate-assist-drift-alt";
const IDLE_NODE = "animate-assist-node motion-reduce:animate-none force-motion:animate-assist-node";

/** A single editorial image of contextual AI, deliberately unlike the adjacent grids. */
export function AssistSection() {
  const { assist } = useHomeCopy();
  const stageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = prefersReducedMotion();
  /* The constellation gathers once, the first time the screen is properly in view —
     not on every pass, which continuous scrolling would otherwise cause. */
  const hasEntered = useInView(stageRef, { once: true, amount: 0.45 });
  /* A live signal, unlike `hasEntered`. The drift and sweep loops are infinite, so
     left ungated they cost the main thread continuously for a screen that is
     usually thousands of pixels away. */
  const onScreen = useInView(stageRef, { amount: 0.05 });
  const idle = onScreen ? undefined : "[animation-play-state:paused]";

  /* Reduced motion renders `settled`, never `illuminated`: the entrance
     variants carry keyframe arrays, and a keyframe array stated statically
     resolves to its first frame — near-transparent for the gather rings. */
  const motionState = reduceMotion ? "settled" : hasEntered ? "illuminated" : "dormant";

  return (
    <HomeSection id="assist" aria-labelledby="assist-heading" className="overflow-hidden">
      <SectionMarker sectionId="assist" />
      <div ref={stageRef} className="flex w-full flex-1 items-center justify-center">
        <div
          lang="en"
          className="relative isolate mx-auto h-svh w-full max-w-[110rem] overflow-hidden font-brand"
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(34vw,32rem)] w-[min(78vw,76rem)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(var(--accent-rgb),0.16)_0%,rgba(var(--accent-rgb),0.08)_38%,hsl(var(--primary)/0.055)_56%,transparent_74%)] blur-[26px]"
            aria-hidden="true"
            initial={reduceMotion ? "settled" : "dormant"}
            animate={motionState}
            variants={assistAuraReveal}
          />

          <div
            className="pointer-events-none absolute inset-0 z-5 hidden lg:block"
            aria-hidden="true"
          >
            {assist.concepts.map((label, index) => (
              <motion.span
                key={label}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  CONCEPT_CONTEXT[index].className,
                )}
                custom={{ ...CONCEPT_CONTEXT[index], peak: 0.76, settled: 0.56 }}
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistContextGather}
              >
                <span
                  className={cn(
                    "block whitespace-nowrap font-brand text-[clamp(0.85rem,0.95vw,1.05rem)] font-label leading-none tracking-[0.055em] text-[var(--brand-assist-concept)] [text-shadow:0_0_22px_rgba(var(--accent-rgb),0.2)]",
                    index % 2 === 0 ? IDLE_DRIFT : IDLE_DRIFT_ALT,
                    idle,
                  )}
                >
                  {label}
                </span>
              </motion.span>
            ))}
            {assist.products.map((label, index) => (
              <motion.span
                key={label}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  PRODUCT_CONTEXT[index].className,
                )}
                custom={{ ...PRODUCT_CONTEXT[index], peak: 0.92, settled: 0.74 }}
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistContextGather}
              >
                <span
                  className={cn(
                    "block whitespace-nowrap font-brand text-[clamp(1.1rem,1.45vw,1.6rem)] font-wordmark leading-none tracking-[-0.01em] text-[var(--brand-assist-from)] [text-shadow:0_0_26px_rgba(var(--accent-rgb),0.24)]",
                    index % 2 === 0 ? IDLE_DRIFT_ALT : IDLE_DRIFT,
                    idle,
                  )}
                >
                  {label}
                </span>
              </motion.span>
            ))}
            {CONTEXT_NODES.map((context) => (
              <motion.span
                key={context.className}
                className={cn("absolute -translate-x-1/2 -translate-y-1/2", context.className)}
                custom={{ ...context, peak: 0.58, settled: 0.32 }}
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistContextGather}
              >
                <span
                  className={cn(
                    "block size-[0.38rem] rounded-full border border-[color-mix(in_oklab,var(--brand-assist-from)_70%,transparent)] shadow-[0_0_18px_rgba(var(--accent-rgb),0.38)]",
                    IDLE_NODE,
                    idle,
                  )}
                />
              </motion.span>
            ))}
          </div>

          {/* The ring only fits once there is width for it. Its vertices sit at
              `left-[12%]`/`left-[88%]` with single-line labels, so below `lg` the
              outer two started off-canvas, the top pair overlapped each other, and
              `overflow-x-hidden` truncated the result silently. The concept and
              product rings are gated the same way. */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
            initial={reduceMotion ? "settled" : "dormant"}
            animate={motionState}
            variants={assistStatementsReveal}
          >
            {assist.statements.map((statement, index) => (
              // The wrapper owns the placement; Framer only animates the paragraph,
              // so its inline transform never fights the centring translate.
              <motion.div
                key={statement}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2",
                  STATEMENT_POSITIONS[index],
                )}
              >
                <motion.p
                  className={cn(HOME_ASSIST_SENTENCE, "max-w-[12ch] text-center")}
                  variants={assistMicroStatementReveal}
                >
                  {statement}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute inset-x-6 top-[39%] z-10 -translate-y-1/2 text-center sm:inset-x-10 sm:top-[42%] md:inset-x-12 xl:inset-x-0 xl:top-1/2">
            <div className="relative inline-grid">
              <motion.span
                aria-hidden="true"
                className="col-start-1 row-start-1 whitespace-nowrap pr-[0.08em] text-[clamp(2.5rem,6vw,6rem)] font-titling leading-wordmark tracking-[-0.035em] text-transparent [font-kerning:normal] [-webkit-text-stroke:1px_color-mix(in_oklab,var(--brand-assist-from)_72%,transparent)] [text-shadow:0_0_42px_rgba(var(--accent-rgb),0.18)] max-sm:whitespace-normal max-sm:leading-wordmark-wrap"
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistWordOutlineReveal}
              >
                <span className="inline-block text-[1.18em] font-heavy tracking-[-0.04em] max-sm:block">
                  {assist.title.subject}
                </span>{" "}
                <span className="inline-block font-titling max-sm:mt-[0.12em] max-sm:block">
                  {assist.title.action}
                </span>
              </motion.span>
              <motion.h2
                id="assist-heading"
                className={cn(
                  idle,
                  "col-start-1 row-start-1 animate-assist-sweep whitespace-nowrap bg-[linear-gradient(112deg,var(--brand-assist-from)_0%,var(--brand-assist-via)_28%,var(--brand-assist-to)_52%,var(--brand-assist-via)_76%,var(--brand-assist-from)_100%)] bg-[length:200%_auto] bg-clip-text pr-[0.08em] text-[clamp(2.5rem,6vw,6rem)] font-titling leading-wordmark tracking-[-0.035em] text-transparent [font-kerning:normal] [text-shadow:0_24px_88px_rgba(var(--accent-rgb),0.2)] motion-reduce:animate-none max-sm:whitespace-normal max-sm:leading-wordmark-wrap force-motion:animate-assist-sweep",
                )}
                initial={reduceMotion ? "settled" : "dormant"}
                animate={motionState}
                variants={assistWordFillReveal}
              >
                <span
                  className={cn(
                    idle,
                    "inline-block animate-assist-sweep bg-[linear-gradient(112deg,var(--brand-assist-subject-from)_0%,var(--brand-assist-subject-via)_30%,var(--brand-assist-subject-to)_55%,var(--brand-assist-subject-via)_78%,var(--brand-assist-subject-from)_100%)] bg-[length:200%_auto] bg-clip-text text-[1.18em] font-heavy tracking-[-0.04em] text-transparent drop-shadow-[0_18px_42px_rgba(var(--accent-rgb),0.22)] motion-reduce:animate-none max-sm:block force-motion:animate-assist-sweep",
                  )}
                >
                  {assist.title.subject}
                </span>{" "}
                <span className="inline-block font-titling opacity-90 max-sm:mt-[0.12em] max-sm:block">
                  {assist.title.action}
                </span>
              </motion.h2>
            </div>
            <motion.p
              className="mt-[clamp(0.8rem,1.5vw,1.4rem)] whitespace-nowrap text-[clamp(1.65rem,2.4vw,2.35rem)] font-normal leading-[1.45] tracking-normal text-[color-mix(in_oklab,var(--brand-assist-concept)_78%,transparent)]"
              initial={reduceMotion ? "settled" : "dormant"}
              animate={motionState}
              variants={assistSublineReveal}
            >
              {assist.subline}
            </motion.p>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-x-6 top-[56%] z-20 flex flex-wrap justify-center gap-x-[0.85rem] gap-y-[0.35rem] text-chip font-strong leading-[1.2] tracking-[-0.005em] text-[color-mix(in_oklab,var(--brand-assist-from)_76%,transparent)] lg:hidden"
            aria-hidden="true"
            initial={reduceMotion ? "settled" : "dormant"}
            animate={motionState}
            variants={assistMobileProductsReveal}
          >
            {assist.products.map((product) => (
              <span key={product}>{product}</span>
            ))}
          </motion.div>
        </div>
      </div>
    </HomeSection>
  );
}
