import { BrandCopy } from "@/components/BrandName";
import {
  type ApproachBuildMotion,
  type ApproachSignalMotion,
  approachFieldReveal,
  approachRise,
  approachSignalJoin,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import type { ApproachStatementCopy } from "@/lib/home/copy/types";
import { HOME_BLOCK, HOME_BODY, HOME_CONTAINER, HOME_H2_SECTION } from "@/lib/home/stage";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { HOME_EMPHASIS } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HomeSection } from "../HomeSection";
import { SectionHeader } from "../SectionHeader";
import { SectionMarker } from "../SectionMarker";

/**
 * One shot. The shared header row arrives first; the three claims land in
 * sequence and stay; vision settles as the last claim holds.
 */
const BUILD = {
  header: { delay: 0.04 },
  vision: { delay: 2.2 },
} as const satisfies Record<string, ApproachBuildMotion>;

const STATEMENT_BEATS = [
  { delay: 0.55 },
  { delay: 1.15 },
  { delay: 1.75 },
] as const satisfies ReadonlyArray<ApproachBuildMotion>;

/**
 * Sparse signals around the claims. They join with the last line, and they
 * are dots of light — never product names (those belong to the AI screen).
 */
const SIGNALS = [
  { className: "left-[64%] top-[16%]", delay: 1.7, x: 14, y: -10 },
  { className: "left-[72%] top-[48%]", delay: 1.8, x: 16, y: 6 },
  { className: "left-[60%] top-[84%]", delay: 1.9, x: 10, y: 12 },
] as const satisfies ReadonlyArray<ApproachSignalMotion & { className: string }>;

/**
 * Foundation — a product reveal on the page's shared measure.
 *
 * The header row is the same spine every other content screen uses: title on
 * the left edge, lead on the right. The three claims then arrive on that
 * same left measure and remain. Blue is only on the keyword inside each
 * claim. Section 02 owns the diagonal cascade; this screen must not copy it.
 */
export function ApproachSection() {
  const { approach } = useHomeCopy();
  const { locale } = useLocale();
  const reduceMotion = prefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const hasEntered = useInView(stageRef, { once: true, amount: 0.35 });
  const motionState = reduceMotion ? "settled" : hasEntered ? "illuminated" : "dormant";

  return (
    <HomeSection id="about">
      <SectionMarker sectionId="about" />
      <motion.div
        ref={stageRef}
        lang={locale}
        className={cn(HOME_CONTAINER, HOME_BLOCK, "relative isolate sm:py-16 md:pb-8 md:pt-28")}
        initial={reduceMotion ? "settled" : "dormant"}
        animate={motionState}
      >
        <motion.div custom={BUILD.header} variants={approachRise}>
          <SectionHeader
            sectionId="about"
            scale="statement"
            className="md:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)]"
            title={
              <>
                <span className="block xl:whitespace-nowrap">{approach.title}</span>
                <span className="mt-2 block">{approach.accent}</span>
              </>
            }
            lead={approach.lead}
          />
        </motion.div>

        <div className="relative mt-7 md:mt-8">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 origin-left md:-inset-x-10"
            variants={approachFieldReveal}
          >
            <div className="absolute inset-y-6 left-0 w-[min(40rem,78%)] rounded-full bg-[rgb(var(--accent-rgb))]/16 blur-3xl" />
            <div className="absolute inset-y-0 left-[4%] w-[min(48rem,88%)] rounded-full bg-[rgb(var(--accent-rgb))]/10 blur-3xl" />
            <div className="absolute inset-y-4 left-[8%] w-[min(36rem,70%)] rounded-full bg-[hsl(var(--primary))]/8 blur-3xl" />
          </motion.div>

          {SIGNALS.map((signal) => (
            <motion.span
              key={signal.className}
              aria-hidden="true"
              className={cn("pointer-events-none absolute hidden md:block", signal.className)}
              custom={{ delay: signal.delay, x: signal.x, y: signal.y }}
              variants={approachSignalJoin}
            >
              <span className="block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--accent-rgb))] shadow-[0_0_10px_rgba(var(--accent-rgb),0.55)]" />
            </motion.span>
          ))}

          <ul className="relative flex max-w-4xl flex-col gap-2.5 md:gap-3">
            {approach.statements.map((statement, index) => (
              <motion.li
                key={statement.line}
                className={cn(HOME_H2_SECTION, "text-[clamp(1.85rem,3vw,2.6rem)]")}
                custom={STATEMENT_BEATS[index]}
                variants={approachRise}
              >
                <StatementLine line={statement.line} emphasis={statement.emphasis} />
              </motion.li>
            ))}
          </ul>

          <motion.p
            className={cn(
              HOME_BODY,
              "relative mt-6 max-w-5xl min-w-0 md:mt-8 lg:whitespace-nowrap lg:text-[clamp(0.75rem,1.05vw,1rem)]",
            )}
            custom={BUILD.vision}
            variants={approachRise}
          >
            <BrandCopy text={approach.vision} />
          </motion.p>
        </div>
      </motion.div>
    </HomeSection>
  );
}

function StatementLine({ line, emphasis }: ApproachStatementCopy) {
  const at = line.indexOf(emphasis);
  if (at < 0) return line;
  return (
    <>
      {line.slice(0, at)}
      <span className={HOME_EMPHASIS}>{emphasis}</span>
      {line.slice(at + emphasis.length)}
    </>
  );
}
