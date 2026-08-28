import { BrandCopy } from "@/components/BrandName";
import {
  type CollaborationPhaseMotion,
  MOTION_EASE,
  collaborationPhaseWake,
  collaborationSweep,
} from "@/lib/animations";
import { useHomeCopy } from "@/lib/home/copy";
import type { ParticipatePathKey } from "@/lib/home/copy/types";
import { PARTICIPATE_PATHS } from "@/lib/home/data";
import { HOME_BODY, HOME_H2_SECTION } from "@/lib/home/stage";
import { HOME_EMPHASIS } from "@/lib/styleTokens";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { HomeBlock } from "../HomeBlock";

/**
 * How each phase sits in the field.
 *
 * Across a wide screen the three sit on one line and share the measure equally.
 * They are deliberately not stepped down the screen — three statements at three
 * heights read as three loose items rather than one continuous space.
 *
 * Down the phone that line becomes a column, and `offset` carries the same
 * argument instead: the gaps close as the work moves inside, which is why the list
 * sets no uniform row gap of its own. `focus` is where the light gathers when that
 * phase is forward; `wake` places it under the passing light on arrival.
 *
 * `route` is the line of light under each statement — the page's vocabulary,
 * where a line of light is a route the work can take. Depth is written into it
 * twice: the deeper the engagement, the longer and the brighter the line rests.
 * `pool` is the glow the phase stands in when nobody is looking — sparsest at
 * open, most settled at embedded — so the left-to-right deepening is on the
 * screen even at rest, not only in the hover states.
 */
const FIELD: Record<
  ParticipatePathKey,
  {
    column: string;
    offset: string;
    focus: string;
    wake: CollaborationPhaseMotion;
    route: { width: string; rest: number };
    pool: string;
  }
> = {
  startOpen: {
    column: "lg:col-start-1",
    offset: "mt-0 lg:mt-0",
    focus: "16%",
    wake: { delay: 0.35, rest: 0.3 },
    route: { width: "w-16", rest: 0.55 },
    pool: "left-[16%] h-36 w-64 bg-[rgb(var(--accent-rgb))]/8",
  },
  buildTogether: {
    column: "lg:col-start-2",
    offset: "mt-14 lg:mt-0",
    focus: "50%",
    wake: { delay: 0.85, rest: 0.5 },
    route: { width: "w-28", rest: 0.75 },
    pool: "left-1/2 h-44 w-80 bg-[rgb(var(--accent-rgb))]/14",
  },
  deployInHouse: {
    column: "lg:col-start-3",
    offset: "mt-9 lg:mt-0",
    focus: "83%",
    wake: { delay: 1.35, rest: 0.7 },
    route: { width: "w-44", rest: 1 },
    pool: "left-[83%] h-52 w-96 bg-[rgb(var(--accent-rgb))]/20",
  },
};

/** One gesture for the whole field, so gathering and dimming move together. */
const GATHER = { duration: 0.5, ease: MOTION_EASE } as const;

/**
 * Collaboration — one ecosystem at three depths, not three service tiers.
 *
 * The three phases share a single field rather than three columns: the light
 * behind them travels to whichever phase the reader brings forward, the others
 * stay lit, and nothing is bordered, boxed or buttoned. Depth is carried by the
 * field in ways the eye can actually verify: the ground's dots thicken toward
 * the embedded end, each phase rests in a pool of light that deepens with it,
 * and the route line under each statement grows longer and brighter — so the
 * reader sees one relationship getting closer rather than a catalogue.
 *
 * Each phase is its own route in, which is why it is a link and not a control: the
 * whole point of the screen is that choosing a depth *is* the way to reach us. On
 * a touch screen the first tap brings a phase forward and the second follows it,
 * so a reader can read all three without being sent to mail on a stray tap.
 */
export function ParticipateSection() {
  const { participate } = useHomeCopy();
  const [active, setActive] = useState<ParticipatePathKey | null>(null);

  return (
    <HomeBlock
      id="collaboration"
      scale="statement"
      title={
        <>
          {participate.title.plain}
          {/* Its own line at every width: the two sentences are a couplet, and
              letting the measure decide where they part reads as an accident. */}
          <span className={cn("block", HOME_EMPHASIS)}>{participate.title.accent}</span>
        </>
      }
      lead={<BrandCopy text={participate.supporting} />}
    >
      <motion.div
        className="relative isolate mt-4 md:mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        onPointerLeave={() => setActive(null)}
      >
        {/* The ground the phases stand on: dots sparse where the work is open,
            visibly thickening where it runs inside someone else's walls — the
            second, finer grid only exists toward the embedded end. Vertical on
            a phone, where the field reads top to bottom. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-20 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.65)_1.5px,transparent_1.5px)] bg-[length:30px_30px] opacity-50 [mask-image:linear-gradient(180deg,transparent_6%,black)] lg:[mask-image:linear-gradient(90deg,transparent_6%,black)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -inset-y-12 -z-20 bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.65)_1.2px,transparent_1.2px)] bg-[length:15px_15px] opacity-40 [mask-image:linear-gradient(180deg,transparent_50%,black)] lg:[mask-image:linear-gradient(90deg,transparent_50%,black)]"
        />

        {/* The field at rest: each phase stands in its own pool of light,
            deepening left to right. Blurred solid ellipses, never radial
            gradients — a gradient's clipped falloff draws a seam. */}
        {PARTICIPATE_PATHS.map((path) => (
          <div
            key={path.key}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 -z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl lg:block",
              FIELD[path.key].pool,
            )}
          />
        ))}

        {/* The light gathers where the reader is looking; at rest it is gone and
            the pools carry the field — a parked spotlight over the middle would
            argue against the left-to-right deepening. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -z-10 hidden h-[26rem] w-[30rem] rounded-full bg-[rgb(var(--accent-rgb))]/15 blur-3xl lg:block"
          animate={{
            left: active ? FIELD[active].focus : "50%",
            x: "-50%",
            y: "-50%",
            opacity: active ? 1 : 0,
          }}
          transition={GATHER}
        />

        <motion.div
          aria-hidden="true"
          variants={collaborationSweep}
          className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-1/3 bg-[linear-gradient(90deg,transparent,rgba(var(--accent-rgb),0.14),transparent)] blur-2xl lg:block"
        />

        <ul className="relative grid lg:grid-cols-3 lg:gap-x-8">
          {PARTICIPATE_PATHS.map((path) => {
            const copy = participate.paths[path.key];
            const field = FIELD[path.key];
            const forward = active === path.key;
            const receded = active !== null && !forward;

            return (
              <li key={path.key} className={cn(field.column, field.offset)}>
                <a
                  href={path.href}
                  target={path.external ? "_blank" : undefined}
                  rel={path.external ? "noreferrer noopener" : undefined}
                  onPointerEnter={() => setActive(path.key)}
                  onFocus={() => setActive(path.key)}
                  onBlur={(event) => {
                    const next = event.relatedTarget;
                    if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
                      setActive(null);
                    }
                  }}
                  onClick={(event) => {
                    /* Touch reads before it travels: the first tap brings the phase
                       forward, and only a tap on the phase already forward follows
                       the link. A pointer has hovered it forward long before. */
                    if (!forward) {
                      event.preventDefault();
                      setActive(path.key);
                    }
                  }}
                  className="group relative block no-underline outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <motion.span
                    aria-hidden="true"
                    custom={field.wake}
                    variants={collaborationPhaseWake}
                    className="pointer-events-none absolute -left-8 -top-10 -z-10 h-40 w-72 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.16),transparent_70%)] blur-2xl"
                  />
                  <motion.span
                    /* The three are one rhythm; a phrase that breaks across two
                       lines is no longer in it, so the track widens instead. */
                    className={cn(HOME_H2_SECTION, "block lg:whitespace-nowrap")}
                    animate={{
                      opacity: forward ? 1 : receded ? 0.52 : 0.82,
                      scale: forward ? 1.04 : 1,
                      /* Scale grows from the phase's own edge, so the three keep
                         their places on the line instead of drifting apart. */
                      originX: 0,
                    }}
                    transition={GATHER}
                  >
                    {copy.statement}
                  </motion.span>
                  {/* The route in, as a line of light: already there at rest —
                      longer and brighter the deeper the phase — and opening
                      further when the reader brings the phase forward. */}
                  <motion.span
                    aria-hidden="true"
                    className={cn(
                      "mt-4 block h-0.5 origin-left rounded-full bg-gradient-to-r from-[rgb(var(--accent-rgb))] via-[rgb(var(--accent-rgb))]/70 to-transparent [box-shadow:0_0_12px_rgba(var(--accent-rgb),0.55)]",
                      field.route.width,
                    )}
                    animate={{
                      opacity: forward ? 1 : receded ? field.route.rest * 0.55 : field.route.rest,
                      scaleX: forward ? 1.35 : 1,
                    }}
                    transition={GATHER}
                  />
                  {/* Always readable: the reader can take in all three depths
                      without hunting for them, and the spotlight only decides which
                      one is forward. */}
                  <motion.span
                    className={cn(HOME_BODY, "mt-4 block max-w-sm lg:max-w-xs")}
                    animate={{ opacity: forward ? 1 : receded ? 0.45 : 0.72 }}
                    transition={GATHER}
                  >
                    <BrandCopy text={copy.line} />
                  </motion.span>
                </a>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </HomeBlock>
  );
}
