/**
 * Per-product accent tokens — single source of truth for product brand colors.
 *
 * Each landing page composes its gradient text from `GRADIENT_TEXT` (the shared
 * animated wrapper) plus the product-specific color stops below, via `cn()`.
 * The homepage ecosystem list (`ecosystem.ts`) reads the same `chip` colors,
 * so a product is recolored by editing exactly one entry here.
 *
 * Class strings are literal so Tailwind's JIT scanner picks them up — never
 * interpolate color names (e.g. `from-${x}-400`), the JIT cannot see those.
 */

/** Shared animated gradient-text wrapper. Combine with a product's color stops. */
export const GRADIENT_TEXT =
  "bg-gradient-to-r bg-[length:200%_auto] animate-gradient-x text-transparent bg-clip-text";

export interface ProductAccent {
  /** Eyebrow / kicker gradient stops. */
  kicker: string;
  /** h1 title gradient stops. */
  title: string;
  /** Subhead gradient stops. */
  subhead: string;
  /** Section heading gradient stops (shared by API + Features headings). */
  heading: string;
  /** Inline emphasized heading span — gradient stops (most products). */
  headingSpan?: string;
  /** Inline emphasized heading span — solid color (molvis, molrec). */
  headingSpanText?: string;
  /** Feature/nav icon color. */
  icon: string;
  /** Feature/nav icon hover color. */
  iconHover: string;
  /** Active dot / indicator (may include a glow shadow). */
  dot?: string;
  /** Active accent text color. */
  accentText?: string;
  /** Code-editor glow divider line. */
  glowLine?: string;
  /** Ecosystem-list chip color + hover background. */
  chip: { color: string; bg: string };
}

export const PRODUCT_ACCENTS = {
  molpy: {
    kicker: "from-sky-400 via-cyan-300 to-sky-400",
    title: "from-blue-500 via-cyan-400 to-blue-500",
    subhead: "from-cyan-400 via-teal-300 to-cyan-400",
    heading: "from-blue-400 via-cyan-400 to-blue-400",
    headingSpan: "from-blue-400 to-cyan-400",
    icon: "text-blue-500",
    iconHover: "group-hover:text-blue-400",
    dot: "bg-blue-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-blue-500)_50%,transparent)]",
    accentText: "text-blue-400",
    glowLine: "via-blue-500/20",
    chip: { color: "text-blue-500", bg: "hover:bg-blue-500/10" },
  },
  molvis: {
    kicker: "from-indigo-400 via-violet-300 to-indigo-400",
    title: "from-purple-500 via-violet-400 to-purple-500",
    subhead: "from-violet-400 via-indigo-300 to-violet-400",
    heading: "from-purple-400 via-violet-400 to-indigo-400",
    headingSpanText: "text-purple-400",
    icon: "text-purple-500",
    iconHover: "group-hover:text-purple-400",
    chip: { color: "text-purple-500", bg: "hover:bg-purple-500/10" },
  },
  molnex: {
    kicker: "from-teal-400 via-emerald-300 to-teal-400",
    title: "from-cyan-500 via-teal-400 to-cyan-500",
    subhead: "from-emerald-400 via-cyan-300 to-emerald-400",
    heading: "from-cyan-400 via-teal-400 to-cyan-400",
    headingSpan: "from-cyan-400 to-teal-400",
    icon: "text-cyan-500",
    iconHover: "group-hover:text-cyan-400",
    dot: "bg-cyan-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-cyan-500)_50%,transparent)]",
    accentText: "text-cyan-400",
    glowLine: "via-cyan-500/20",
    chip: { color: "text-cyan-500", bg: "hover:bg-cyan-500/10" },
  },
  molpack: {
    kicker: "from-rose-400 via-pink-300 to-rose-400",
    title: "from-orange-500 via-amber-400 to-orange-500",
    subhead: "from-orange-400 via-amber-300 to-rose-400",
    heading: "from-orange-400 via-amber-400 to-rose-400",
    headingSpan: "from-rose-400 to-pink-400",
    icon: "text-orange-500",
    iconHover: "group-hover:text-orange-400",
    dot: "bg-orange-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-orange-500)_50%,transparent)]",
    accentText: "text-orange-400",
    glowLine: "via-orange-500/20",
    chip: { color: "text-orange-500", bg: "hover:bg-orange-500/10" },
  },
  molexp: {
    kicker: "from-violet-400 via-purple-300 to-violet-400",
    title: "from-indigo-500 via-blue-400 to-indigo-500",
    subhead: "from-purple-400 via-indigo-300 to-purple-400",
    heading: "from-indigo-400 via-blue-400 to-indigo-400",
    headingSpan: "from-indigo-400 to-blue-400",
    icon: "text-indigo-500",
    iconHover: "group-hover:text-indigo-400",
    dot: "bg-indigo-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-indigo-500)_50%,transparent)]",
    accentText: "text-indigo-400",
    glowLine: "via-indigo-500/20",
    chip: { color: "text-indigo-500", bg: "hover:bg-indigo-500/10" },
  },
  molcfg: {
    kicker: "from-teal-400 via-cyan-300 to-teal-400",
    title: "from-emerald-500 via-teal-400 to-emerald-500",
    subhead: "from-emerald-400 via-teal-300 to-teal-400",
    heading: "from-emerald-400 via-teal-400 to-emerald-400",
    headingSpan: "from-emerald-400 to-teal-400",
    icon: "text-emerald-500",
    iconHover: "group-hover:text-emerald-400",
    dot: "bg-emerald-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-emerald-500)_50%,transparent)]",
    accentText: "text-emerald-400",
    glowLine: "via-emerald-500/20",
    chip: { color: "text-emerald-500", bg: "hover:bg-emerald-500/10" },
  },
  mollog: {
    kicker: "from-cyan-400 via-teal-300 to-cyan-400",
    title: "from-sky-500 via-blue-400 to-sky-500",
    subhead: "from-indigo-400 via-sky-300 to-indigo-400",
    heading: "from-sky-400 via-blue-400 to-sky-400",
    headingSpan: "from-sky-400 to-blue-400",
    icon: "text-sky-500",
    iconHover: "group-hover:text-sky-400",
    dot: "bg-sky-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-sky-500)_50%,transparent)]",
    accentText: "text-sky-400",
    glowLine: "via-sky-500/20",
    chip: { color: "text-sky-500", bg: "hover:bg-sky-500/10" },
  },
  molq: {
    kicker: "from-rose-400 via-fuchsia-300 to-rose-400",
    title: "from-pink-500 via-rose-400 to-pink-500",
    subhead: "from-pink-400 via-rose-300 to-fuchsia-400",
    heading: "from-pink-400 via-rose-400 to-fuchsia-400",
    headingSpan: "from-fuchsia-400 to-pink-400",
    icon: "text-pink-500",
    iconHover: "group-hover:text-pink-400",
    dot: "bg-pink-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-pink-500)_50%,transparent)]",
    accentText: "text-pink-400",
    glowLine: "via-pink-500/20",
    chip: { color: "text-pink-500", bg: "hover:bg-pink-500/10" },
  },
  molrs: {
    kicker: "from-orange-400 via-amber-300 to-orange-400",
    title: "from-red-500 via-orange-400 to-red-500",
    subhead: "from-red-400 via-orange-300 to-orange-400",
    heading: "from-red-400 via-orange-400 to-orange-400",
    headingSpan: "from-red-400 to-orange-400",
    icon: "text-red-500",
    iconHover: "group-hover:text-red-400",
    dot: "bg-red-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-red-500)_50%,transparent)]",
    accentText: "text-red-400",
    glowLine: "via-red-500/20",
    chip: { color: "text-red-500", bg: "hover:bg-red-500/10" },
  },
  molrec: {
    kicker: "from-orange-400 via-yellow-300 to-orange-400",
    title: "from-amber-500 via-orange-400 to-amber-500",
    subhead: "from-amber-400 via-yellow-300 to-orange-400",
    heading: "from-amber-400 via-orange-400 to-amber-400",
    headingSpanText: "text-amber-500",
    icon: "text-amber-500",
    iconHover: "group-hover:text-amber-400",
    dot: "bg-amber-500",
    chip: { color: "text-amber-500", bg: "hover:bg-amber-500/10" },
  },
  atomiverse: {
    kicker: "from-lime-400 via-emerald-300 to-lime-400",
    title: "from-green-500 via-lime-400 to-emerald-500",
    subhead: "from-lime-400 via-green-300 to-emerald-400",
    heading: "from-lime-400 via-emerald-400 to-green-400",
    headingSpan: "from-lime-400 to-emerald-400",
    icon: "text-lime-500",
    iconHover: "group-hover:text-lime-400",
    dot: "bg-lime-500 shadow-[0_0_10px_color-mix(in_srgb,var(--color-lime-500)_50%,transparent)]",
    accentText: "text-lime-400",
    glowLine: "via-lime-500/20",
    chip: { color: "text-lime-500", bg: "hover:bg-lime-500/10" },
  },
} satisfies Record<string, ProductAccent>;

/**
 * Ecosystem-list chip colors for products without a dedicated landing page.
 * Kept here so the entire ecosystem palette lives in one file.
 */
export const CHIP_ONLY_ACCENTS = {
  molhub: { color: "text-lime-500", bg: "hover:bg-lime-500/10" },
  molmcp: { color: "text-violet-500", bg: "hover:bg-violet-500/10" },
  molqrc: { color: "text-fuchsia-500", bg: "hover:bg-fuchsia-500/10" },
  molplot: { color: "text-teal-500", bg: "hover:bg-teal-500/10" },
  harness: { color: "text-zinc-400", bg: "hover:bg-zinc-500/10" },
  zensical: { color: "text-stone-400", bg: "hover:bg-stone-500/10" },
} satisfies Record<string, { color: string; bg: string }>;
