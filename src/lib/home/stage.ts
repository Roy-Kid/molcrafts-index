import { TYPE_BODY, TYPE_DISPLAY, TYPE_HEADING } from "@/lib/typeStyles";

/**
 * One frame for every block of the homepage.
 *
 * Each block used to invent its own measure, gutters and heading clamp inline —
 * four container widths and seven heading scales across eight blocks. The result
 * read as eight posters rather than one document. These are the shared rungs; a
 * block art-directs *within* them.
 */

/**
 * Shared measure and gutters. Every block's content starts on the same vertical
 * line, so the eye has a fixed left edge to track down the whole page.
 */
export const HOME_CONTAINER = "mx-auto w-full max-w-[90rem] px-6 sm:px-10 lg:px-16";

/**
 * Vertical gutter inside a block. Each block already fills a screen and centres its
 * content, so this only guarantees the content never reaches the edge — keep it
 * modest, or a tall block's content gets pushed past the fold.
 */
export const HOME_BLOCK = "pb-16 pt-28 sm:py-24";

/**
 * Vertical gutter for a band — a block that sizes to its content instead of to the
 * screen. Tighter at desktop than `HOME_BLOCK`, whose wider gutter exists to keep
 * centred content clear of the fold rather than to set a height.
 */
export const HOME_BAND = "py-16 sm:py-20";

/**
 * Heading ladder — two rungs, not seven.
 *
 * Locale behaviour is composed from `typeStyles.ts`, never restated: an earlier
 * version of this file hand-wrote only the CJK rules and silently dropped Swedish
 * hyphenation and its looser leading across every block on the page. This file owns
 * size, weight and measure; `typeStyles.ts` owns what changes per language.
 */
const HEADING_BASE = `${TYPE_DISPLAY} font-display font-semibold text-foreground`;

/**
 * Headings sit in light rather than on a flat ground, the way the AI screen's
 * does. Half its radius and alpha: enough to belong to the same page, not enough
 * to compete with it.
 */
const HEADING_GLOW = "[text-shadow:0_18px_60px_rgba(var(--accent-rgb),0.14)]";

/** Blocks that make a claim: About, Collaboration. */
export const HOME_H2_STATEMENT = `${HEADING_BASE} ${HEADING_GLOW} text-[clamp(2.6rem,4.6vw,4.4rem)] leading-display tracking-[-0.045em]`;

/** Blocks that carry content beneath the heading: Capabilities, Applications, Support. */
export const HOME_H2_SECTION = `${HEADING_BASE} ${HEADING_GLOW} text-[clamp(2.1rem,3.4vw,3.2rem)] leading-display tracking-[-0.03em]`;

/** Sub-heading inside a block — pillar titles, path titles, supporter names. */
export const HOME_H3 = `${TYPE_HEADING} font-display text-2xl font-semibold text-foreground md:text-[1.75rem]`;

/** Lead size without a colour, so emphasis and muted leads share one rung. */
export const HOME_LEAD_SIZE = `${TYPE_BODY} font-body text-base md:text-lg`;

/** The paragraph that sits beside or under a heading. */
export const HOME_LEAD = `${HOME_LEAD_SIZE} text-muted-foreground`;

/** Supporting copy inside a column, card or list. */
export const HOME_BODY = `${TYPE_BODY} font-body text-sm text-muted-foreground md:text-base`;

/**
 * Prose set at heading size, for a block whose sentences *are* its display element.
 *
 * The ladder above assumes the heading carries the screen and the prose supports
 * it. Where that is inverted — a short label naming each statement, and the
 * statement itself doing the talking — the two rungs sit too close together and
 * the block reads as a spec sheet. This is the third rung, and it earns its place
 * by being the only one where body copy is the largest thing on screen.
 */
export const HOME_STATEMENT = `${TYPE_BODY} font-body text-xl leading-relaxed text-foreground/85 md:text-2xl`;

/**
 * AI screen sentences — the claims around the headline. White and large; they
 * are the reading, not captions on the constellation.
 */
export const HOME_ASSIST_SENTENCE = `${TYPE_DISPLAY} font-display text-2xl font-semibold leading-snug tracking-tight text-foreground 2xl:text-3xl`;

/** The id a block's heading carries, stated in one place instead of seven. */
export function sectionHeadingId(id: string): string {
  return `${id}-heading`;
}

/**
 * Heading beside lead. Screens differ in what hangs below this row, never in the
 * row itself.
 */
export const HOME_HEADER_GRID =
  "grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:items-end md:gap-12";

/**
 * Divider under a block's header. It carries a trace of the brand ramp the AI
 * screen opens with, so that cyan reads as the page's own accent rather than
 * arriving from nowhere on one screen.
 */
export const HOME_RULE =
  "my-8 h-px w-full bg-[linear-gradient(90deg,hsl(var(--primary)/0.55),rgba(var(--accent-rgb),0.35)_38%,hsl(var(--border)/0.6)_72%,transparent)] md:my-10";
