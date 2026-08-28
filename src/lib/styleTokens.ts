/** Shared Tailwind recipes for repeated brand treatments and page atmosphere. */

/**
 * MolCrafts wordmark — blue to light blue. Hero, chrome, and inline mentions
 * all use this ramp. Green is the page primary and never enters the mark.
 */
export const BRAND_GRADIENT_TEXT =
  "animate-brand-gradient bg-[linear-gradient(90deg,var(--brand-primary-from)_0%,var(--brand-primary-via)_40%,var(--brand-primary-to)_70%,var(--brand-primary-from)_100%)] bg-[length:200%_auto] bg-clip-text text-transparent motion-reduce:animate-none force-motion:animate-brand-gradient";

/**
 * Homepage wordmark. Uses `--home-wordmark-*` so light paper can deepen the
 * blue without rewriting the product-page brand ramp.
 */
export const HOME_BRAND_GRADIENT =
  "animate-wordmark-drift bg-[linear-gradient(100deg,var(--home-wordmark-from)_0%,var(--home-wordmark-via)_45%,var(--home-wordmark-from)_100%)] bg-[length:220%_auto] bg-clip-text text-transparent motion-reduce:animate-none force-motion:animate-wordmark-drift";

/** Specular band that crosses the wordmark, then rests. */
export const HOME_WORDMARK_SHEEN =
  "animate-wordmark-sheen bg-[linear-gradient(105deg,transparent_22%,var(--color-sheen-core)_46%,var(--color-sheen-edge)_54%,transparent_78%)] bg-[length:240%_100%] bg-clip-text text-transparent mix-blend-screen motion-reduce:animate-none force-motion:animate-wordmark-sheen";

/** Static wordmark ramp for running copy, where a sweep would fight the sentence. */
export const HOME_WORDMARK =
  "bg-[linear-gradient(90deg,var(--home-wordmark-from),var(--home-wordmark-via))] bg-clip-text text-transparent";

/** Emphasis sentences — secondary blue, never a gradient. */
export const HOME_EMPHASIS = "text-home-emphasis";

/** Feature words and keywords — primary green. */
export const HOME_KEYWORD = "text-home-keyword";

/** Homepage text links. Forest is the interactive primary; cyan stays display-only. */
export const HOME_TEXT_LINK =
  "inline-flex min-h-11 items-center font-body text-sm font-semibold text-primary no-underline transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary";

export const PRODUCT_HERO_SECTION =
  "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-16 md:px-8 md:py-20 lg:px-16 lg:py-24";

/**
 * Product-page display heading — the uppercase Outfit line used for the hero
 * subhead and every section heading. Combine with `GRADIENT_TEXT` and the
 * product's accent stops from `productAccents.ts`.
 */
export const PRODUCT_DISPLAY_HEADING =
  "mx-auto w-full max-w-4xl font-outfit text-lg font-semibold uppercase tracking-[0.2em] sm:text-xl md:text-2xl";

export const PRODUCT_SECTION_AURA =
  "relative before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.04),transparent_60%),radial-gradient(circle_at_70%_70%,hsl(var(--primary)/0.03),transparent_50%)] before:opacity-30 before:blur-[40px]";

export const MOLECULE_BLOB =
  "pointer-events-none absolute z-1 size-[25rem] origin-center animate-molecule-morph rounded-[60%_40%_70%_30%/50%_60%_40%_50%] bg-primary/55 opacity-14 blur-field motion-reduce:animate-none dark:bg-emerald-400 dark:opacity-12 force-motion:animate-molecule-morph";

export const MOLECULAR_GLOW =
  "pointer-events-none absolute z-1 animate-molecular-pulse rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.5),hsl(var(--primary)/0.18)_42%,transparent_72%)] opacity-14 blur-halo motion-reduce:animate-none dark:bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.42),hsl(var(--primary)/0.14)_45%,transparent_72%)] dark:opacity-12 force-motion:animate-molecular-pulse";

export const MOLECULE_IMAGE_GLOW =
  "animate-molecule-glow select-none [user-drag:none] motion-reduce:animate-none force-motion:animate-molecule-glow";

/** Product-page atmosphere. `/` uses `HomeAtmosphere` instead. */
export const PAGE_ATMOSPHERE =
  "pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-12%,hsl(var(--primary)/0.12),transparent_58%),radial-gradient(ellipse_55%_45%_at_100%_35%,rgba(var(--accent-rgb),0.04),transparent_52%),radial-gradient(ellipse_45%_40%_at_0%_65%,hsl(var(--primary)/0.1),transparent_48%),radial-gradient(ellipse_40%_30%_at_70%_100%,hsl(var(--primary)/0.05),transparent_50%)] dark:bg-[radial-gradient(ellipse_90%_55%_at_50%_-12%,hsl(var(--primary)/0.14),transparent_58%),radial-gradient(ellipse_55%_45%_at_100%_28%,rgba(var(--accent-rgb),0.04),transparent_52%),radial-gradient(ellipse_50%_40%_at_0%_75%,hsl(var(--primary)/0.1),transparent_48%),radial-gradient(ellipse_40%_30%_at_60%_100%,hsl(var(--primary)/0.06),transparent_50%)]";

export const LEGACY_SHADOW =
  "pointer-events-none absolute -z-10 top-[12.5rem] h-[25rem] w-[16.25rem] rotate-[35deg] animate-pulse rounded-3xl bg-primary/20 blur-[150px] motion-reduce:animate-none max-md:top-[4.375rem] max-md:h-[21.875rem] max-md:w-[6.25rem] max-md:blur-halo force-motion:animate-pulse";

export const CODE_HIGHLIGHTER =
  "!m-0 !w-full !bg-transparent !p-0 [text-shadow:none] [&_.token.atrule]:text-pink-400 [&_.token.attr-name]:text-emerald-300 [&_.token.attr-value]:text-pink-400 [&_.token.boolean]:text-violet-300 [&_.token.builtin]:text-emerald-300 [&_.token.char]:text-emerald-300 [&_.token.class-name]:text-amber-200 [&_.token.comment]:text-zinc-500 [&_.token.constant]:text-pink-400 [&_.token.function]:text-amber-200 [&_.token.inserted]:text-emerald-300 [&_.token.keyword]:text-pink-400 [&_.token.number]:text-violet-300 [&_.token.operator]:text-sky-300 [&_.token.property]:text-pink-400 [&_.token.punctuation]:text-zinc-300 [&_.token.regex]:text-orange-300 [&_.token.selector]:text-emerald-300 [&_.token.string]:text-emerald-300 [&_.token.symbol]:text-pink-400 [&_.token.tag]:text-pink-400 [&_.token.variable]:text-orange-300";
