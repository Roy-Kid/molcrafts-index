import { BrandCopy } from "@/components/BrandName";
import {
  type KnowledgeStationMotion,
  knowledgeHeaderReveal,
  knowledgeStationWake,
  knowledgeThreadDraw,
  prefersReducedMotion,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_BLOCK, HOME_CONTAINER, HOME_STATEMENT } from "@/lib/home/stage";
import { threadPath } from "@/lib/home/thread";
import { HOME_KEYWORD } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { HomeSection } from "../HomeSection";
import { MonoLabel } from "../MonoLabel";
import { SectionHeader } from "../SectionHeader";
import { SectionMarker } from "../SectionMarker";

/**
 * Where each station sits in the cascade, and when the thread reaches it.
 *
 * Each station starts on the column where the previous one still stands — the
 * overlap is the argument, work beginning on ground the last stage laid — and
 * the explicit rows keep the grid from packing the third station back up into
 * the first row's empty right half. Wake delays follow the thread's own timing
 * (delay 0.3, duration 1.7): each station lights as the line passes it.
 */
const STATIONS: ReadonlyArray<{ cell: string; wake: KnowledgeStationMotion }> = [
  { cell: "lg:col-start-1 lg:col-span-5 lg:row-start-1", wake: { delay: 0.4 } },
  { cell: "lg:col-start-5 lg:col-span-5 lg:row-start-2", wake: { delay: 0.95 } },
  { cell: "lg:col-start-8 lg:col-span-5 lg:row-start-3", wake: { delay: 1.55 } },
];

/** How far the thread stands off the text, and how far it runs past the ends. */
const THREAD_FRAME = { inset: 20, overshoot: 28 } as const;

/**
 * Capabilities — one statement and a thread of light through three stations.
 *
 * The pillars used to be a numbered run down a single measure: honest, but a
 * list — the reader had to read all three to get the screen, and the right half
 * of the screen stood empty. The message ("what one project produces, the next
 * one stands on") is sequence and persistence, so the composition now *is* that
 * sequence: three stations stepping down and across the screen, each beginning
 * under the column where the previous one ends, with one drawn line of light
 * carrying the eye through them in reading order.
 *
 * It composes the block's primitives directly rather than through `HomeBlock`,
 * because it wants the shared opening without the rule under it — the thread is
 * this screen's line, and a second one across the top would compete with it.
 */
export function WhatWeDoSection() {
  const { whatWeDo } = useHomeCopy();
  const reduceMotion = prefersReducedMotion();
  const fieldRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [thread, setThread] = useState<{ d: string; width: number; height: number } | null>(null);

  /* The thread is constructed, not drawn: the stations are measured and the
     path derived from their boxes (`threadPath`), so locale, text wrap, and
     resize all yield the same exact fillet geometry. */
  useLayoutEffect(() => {
    const field = fieldRef.current;
    const list = listRef.current;
    if (!field || !list) return;

    const measure = () => {
      const items = Array.from(list.children) as HTMLElement[];
      setThread({
        width: field.offsetWidth,
        height: field.offsetHeight,
        d: threadPath(
          items.map((item) => ({
            left: item.offsetLeft,
            top: item.offsetTop,
            bottom: item.offsetTop + item.offsetHeight,
          })),
          THREAD_FRAME,
        ),
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(field);
    for (const item of list.children) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <HomeSection id="solutions">
      <SectionMarker sectionId="solutions" />
      <motion.div
        /* The tallest block on the page: a statement-scale header over three
           statement-scale stations. It art-directs within the shared rungs by
           tightening the block gutter — or a laptop-height viewport pushes the
           third station past the fold and breaks the one-screen beat — and by
           trading bottom padding for top on `md+`, where the content otherwise
           rises into the numbered rail's band at `top-24`. */
        className={cn(HOME_CONTAINER, HOME_BLOCK, "sm:py-16 md:pb-6 md:pt-36", "relative isolate")}
        initial={reduceMotion ? "illuminated" : "dormant"}
        whileInView="illuminated"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={knowledgeHeaderReveal}>
          <SectionHeader
            sectionId="solutions"
            title={whatWeDo.title}
            lead={<BrandCopy text={whatWeDo.lead} />}
            scale="statement"
          />
        </motion.div>

        <div ref={fieldRef} className="relative isolate mt-10">
          {/* The thread, behind the stations: down each station's leading edge,
              across the centre of the row gap, and around exact quarter-circle
              fillets between the two — never across the text. It overshoots
              both ends: the work arrives from before this screen and continues
              past it. */}
          {thread ? (
            <svg
              className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full overflow-visible lg:block"
              viewBox={`0 0 ${thread.width} ${thread.height}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="knowledge-thread" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--molcrafts-forest-soft)" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" />
                </linearGradient>
              </defs>
              <motion.path
                d={thread.d}
                fill="none"
                stroke="url(#knowledge-thread)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="[filter:drop-shadow(0_0_12px_hsl(var(--primary)/0.45))]"
                variants={knowledgeThreadDraw}
              />
            </svg>
          ) : null}

          <ol ref={listRef} className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8">
            {whatWeDo.pillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                className={STATIONS[index].cell}
                custom={STATIONS[index].wake}
                variants={knowledgeStationWake}
              >
                <MonoLabel className={cn("block", HOME_KEYWORD)}>{pillar.title}</MonoLabel>
                {/* One size below the statement rung's ceiling: three of these
                    at `2xl` are what pushed the block past a laptop fold. */}
                <p className={cn(HOME_STATEMENT, "mt-3 max-w-xl md:text-xl")}>{pillar.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </motion.div>
    </HomeSection>
  );
}
