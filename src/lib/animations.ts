import type { Variants } from "framer-motion";

/**
 * Site-wide motion switch.
 *
 * `npm run dev` sets `PUBLIC_FORCE_FULL_MOTION=true`, so CSS, Framer Motion,
 * and JS helpers ignore the OS “Reduce motion” preference during visual work.
 * Production builds omit the variable and continue to honor the system setting.
 * Applied as `html.force-full-motion` at boot (see `main.tsx`).
 */
export const FORCE_FULL_MOTION = import.meta.env.PUBLIC_FORCE_FULL_MOTION === "true";

/** Framer Motion `MotionConfig.reducedMotion` derived from {@link FORCE_FULL_MOTION}. */
export const FRAMER_REDUCED_MOTION: "never" | "user" = FORCE_FULL_MOTION ? "never" : "user";

/**
 * Whether the runtime should skip or simplify motion.
 * Always `false` when {@link FORCE_FULL_MOTION} is on.
 */
export function prefersReducedMotion(): boolean {
  if (FORCE_FULL_MOTION) return false;
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Shared punchy ease — reached via `homeReveal`, the assist variants, and product pages. */
export const MOTION_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: MOTION_EASE },
  },
};

// Slide up — decisive travel, spring settle
export const slideUp: Variants = {
  hidden: { y: 48, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 22,
      mass: 0.75,
    },
  },
};

/** Runs children in sequence; pair with a child variant that has its own states. */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { scale: 0.72, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 20,
      mass: 0.7,
    },
  },
};

export const buttonHover = {
  scale: 1.08,
  transition: { type: "spring", stiffness: 400, damping: 18 },
};

/**
 * Homepage block reveal. The page scrolls continuously, so a block is often only
 * part-way into view when it starts — the travel stays short and the fade does the
 * work, otherwise every block visibly lurches as the reader scrolls past it.
 */
export const homeReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: MOTION_EASE },
  },
};

/**
 * The aura behind a block's header — the AI screen's device at roughly half
 * strength, so every block sits in the same light while that screen stays the
 * crescendo rather than the only lit thing on the page.
 */
export const blockAuraReveal: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.35, ease: MOTION_EASE },
  },
};

/**
 * The light that crosses the collaboration field once, on arrival.
 *
 * It travels open → embedded, in the reading direction of the three phases, and
 * then it is gone: the screen's argument is that the relationship deepens along
 * that line, and a looping sweep would turn the argument into a decoration.
 */
export const collaborationSweep: Variants = {
  hidden: { opacity: 0, x: "-30%" },
  visible: {
    opacity: [0, 0.9, 0.9, 0],
    x: "230%",
    transition: {
      x: { duration: 2.5, ease: [0.33, 0, 0.2, 1] },
      opacity: { duration: 2.5, ease: "linear", times: [0, 0.16, 0.78, 1] },
    },
  },
};

/**
 * The payload {@link collaborationPhaseWake} requires on `custom`.
 *
 * `delay` places the phase under the passing light; `rest` is the glow it keeps
 * afterwards, which differs per phase — open is the sparsest and embedded the most
 * settled. The variant destructures this, so a caller that omits `custom` throws at
 * runtime.
 */
export interface CollaborationPhaseMotion {
  delay: number;
  rest: number;
}

export const collaborationPhaseWake: Variants = {
  hidden: ({ rest }: CollaborationPhaseMotion) => ({ opacity: rest, scale: 0.9 }),
  visible: ({ delay, rest }: CollaborationPhaseMotion) => ({
    opacity: [rest, 1, rest],
    scale: 1,
    transition: { delay, duration: 1.25, ease: MOTION_EASE, times: [0, 0.38, 1] },
  }),
};

/**
 * The payload {@link approachRise} requires on `custom`: the element's place
 * in the product-reveal sequence. The variant destructures this, so a caller
 * that omits `custom` throws at runtime.
 */
export interface ApproachBuildMotion {
  delay: number;
}

/**
 * Headline, lead, and vision settling into the manifesto. `settled` is the
 * same frame as the end of `illuminated`, so reduced motion can skip the
 * keyframed object below without leaving these elements unreadable.
 */
export const approachRise: Variants = {
  dormant: { opacity: 0, y: 22, filter: "blur(6px)" },
  illuminated: ({ delay }: ApproachBuildMotion) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.48, ease: MOTION_EASE },
  }),
  settled: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * The luminous field behind the three claims.
 *
 * It forms as the first claim lands, expands as the second arrives, then
 * rests at full scale while the third claim and the signals join. Keyframe
 * arrays, so reduced motion must render `settled`, never `illuminated`.
 */
export const approachFieldReveal: Variants = {
  dormant: { scale: 0.28, opacity: 0 },
  illuminated: {
    scale: [0.28, 0.58, 1.08, 1],
    opacity: [0, 0.92, 1, 1],
    transition: {
      delay: 0.36,
      duration: 2.05,
      ease: [0.33, 0, 0.2, 1],
      times: [0, 0.28, 0.64, 1],
    },
  },
  settled: { scale: 1, opacity: 1 },
};

/**
 * The payload {@link approachSignalJoin} requires on `custom`.
 *
 * `x`/`y` are the pixel offsets a signal gathers in from. The variant
 * destructures this, so a caller that omits `custom` throws at runtime.
 */
export interface ApproachSignalMotion {
  delay: number;
  x: number;
  y: number;
}

/**
 * A context particle joining the settled field on the last statement. Sparse
 * on purpose — this is not the AI screen's constellation.
 */
export const approachSignalJoin: Variants = {
  dormant: ({ x, y }: ApproachSignalMotion) => ({
    opacity: 0,
    x,
    y,
    scale: 0.4,
  }),
  illuminated: ({ delay }: ApproachSignalMotion) => ({
    opacity: 0.8,
    x: 0,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.5, ease: MOTION_EASE },
  }),
  settled: { opacity: 0.65, x: 0, y: 0, scale: 1 },
};

/**
 * Capabilities — the thread of light that carries the screen's argument.
 *
 * The line draws itself through the three stations in reading order: knowledge
 * leaving one stage of the work and arriving at the next. It draws once, on
 * arrival, and then stays lit — persistence is the message, so the light that
 * carried it never fades back out.
 */
export const knowledgeThreadDraw: Variants = {
  dormant: { pathLength: 0, opacity: 0 },
  illuminated: {
    pathLength: 1,
    opacity: 0.65,
    transition: {
      pathLength: { delay: 0.3, duration: 1.7, ease: [0.33, 0, 0.2, 1] },
      opacity: { delay: 0.3, duration: 0.4, ease: "linear" },
    },
  },
};

/**
 * The payload {@link knowledgeStationWake} requires on `custom`: when the thread
 * reaches the station. The variant destructures this, so a caller that omits
 * `custom` throws at runtime.
 */
export interface KnowledgeStationMotion {
  delay: number;
}

/**
 * A station waking as the thread reaches it. Dim before the light arrives, not
 * absent — the claims hold whether or not they are lit; the thread only reveals
 * them in the order the work flows.
 */
export const knowledgeStationWake: Variants = {
  dormant: { opacity: 0.14, y: 18, filter: "blur(5px)" },
  illuminated: ({ delay }: KnowledgeStationMotion) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay, duration: 0.7, ease: MOTION_EASE },
  }),
};

/** The screen's opening, in the two-state grammar the cascade below it drives. */
export const knowledgeHeaderReveal: Variants = {
  dormant: { opacity: 0, y: 24, filter: "blur(6px)" },
  illuminated: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: MOTION_EASE },
  },
};

/*
 * The AI screen's variants share three states: `dormant` before the screen has
 * been looked at, `illuminated` once it has, and `settled` — the entrance's end
 * state said statically, in scalars. Reduced motion renders `settled`, never
 * `illuminated`: a variant whose value is a keyframe array resolves statically
 * to its *first* frame, which for the gather rings is near-transparent — the
 * screen's context rings vanish for every reduced-motion visitor. The section
 * drives all three from one `motionState`, so a variant added here must define
 * the same three names.
 */
export const assistWordOutlineReveal: Variants = {
  dormant: { opacity: 0.42, scale: 0.985 },
  illuminated: {
    opacity: 0.1,
    scale: 1,
    transition: { delay: 0.18, duration: 1.18, ease: MOTION_EASE },
  },
  settled: { opacity: 0.1, scale: 1 },
};

export const assistWordFillReveal: Variants = {
  dormant: { opacity: 0, scale: 0.985, filter: "blur(22px)" },
  illuminated: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 0.46, duration: 1.28, ease: MOTION_EASE },
  },
  settled: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const assistSublineReveal: Variants = {
  dormant: { opacity: 0, y: 8, filter: "blur(4px)" },
  illuminated: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 1.08, duration: 0.62, ease: MOTION_EASE },
  },
  settled: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const assistStatementsReveal: Variants = {
  dormant: {},
  illuminated: {
    transition: {
      delayChildren: 0.72,
      staggerChildren: 0.08,
    },
  },
  settled: {},
};

export const assistMicroStatementReveal: Variants = {
  dormant: { opacity: 0, scale: 0.97, filter: "blur(5px)" },
  illuminated: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: MOTION_EASE },
  },
  settled: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const assistAuraReveal: Variants = {
  dormant: { opacity: 0.15, scale: 0.78, x: "-50%", y: "-50%" },
  illuminated: {
    opacity: [0.15, 0.74, 0.52],
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 1.8, ease: MOTION_EASE, times: [0, 0.58, 1] },
  },
  settled: { opacity: 0.52, scale: 1, x: "-50%", y: "-50%" },
};

/**
 * The payload `assistContextGather` requires on `custom`.
 *
 * `x`/`y` are the pixel offsets a label gathers in *from*; `peak` and `settled` are
 * opacity keyframes — the label overshoots to `peak` then rests at `settled`.
 * The variant destructures this, so a caller that omits `custom` throws at runtime.
 */
export interface AssistContextMotion {
  delay: number;
  peak: number;
  settled: number;
  x: number;
  y: number;
}

export const assistContextGather: Variants = {
  dormant: ({ x, y }: AssistContextMotion) => ({
    x,
    y,
    scale: 0.82,
    filter: "blur(2px)",
    opacity: 0.02,
  }),
  illuminated: ({ delay, peak, settled }: AssistContextMotion) => ({
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    opacity: [0.02, peak, settled],
    transition: { delay, duration: 1.45, ease: MOTION_EASE, times: [0, 0.56, 1] },
  }),
  settled: ({ settled }: AssistContextMotion) => ({
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    opacity: settled,
  }),
};

export const assistMobileProductsReveal: Variants = {
  dormant: { y: 12, filter: "blur(3px)", opacity: 0 },
  illuminated: {
    y: 0,
    filter: "blur(0px)",
    opacity: 0.76,
    transition: { delay: 0.58, duration: 1.1, ease: MOTION_EASE },
  },
  settled: { y: 0, filter: "blur(0px)", opacity: 0.76 },
};
