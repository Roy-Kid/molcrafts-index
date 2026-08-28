/** Locale-independent homepage structure. Visitor-facing copy lives in `./copy/`. */

import { contactHref } from "../contact";
import { GITHUB_ORG_HREF, packageGithubHref } from "../packages";
import type { ProductSlug } from "../routes";
import type { ApplicationKey, ParticipatePathKey } from "./copy/types";

/**
 * Reading order, which is also the rail's numbering.
 *
 * There is no contact screen: collaboration ends on three ways of working with
 * MolCrafts and each one is its own way in, so a screen that only repeated the
 * invitation had nothing of its own to say. `trust` closes the page, crediting the
 * work rather than arguing for it.
 */
export const HOME_SECTION_IDS = [
  "hero",
  "about",
  "solutions",
  "assist",
  "applications",
  "collaboration",
  "trust",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

/**
 * Retired hashes from earlier homepage IAs. The live page no longer mounts these
 * ids; resolve them onto the block that now holds that job so old product-page
 * and crawler links do not land on the curtain.
 */
export const HOME_HASH_ALIASES = {
  contact: "collaboration",
  projects: "applications",
  "what-we-do": "solutions",
  newsletter: "trust",
} as const satisfies Record<string, HomeSectionId>;

/** A fragment id to the block it should open, or `null` when it never was a block. */
export function resolveHomeHash(hash: string): HomeSectionId | null {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  if ((HOME_SECTION_IDS as readonly string[]).includes(id)) {
    return id as HomeSectionId;
  }
  return HOME_HASH_ALIASES[id as keyof typeof HOME_HASH_ALIASES] ?? null;
}

/** The hero opens the page rather than stepping through it, so it takes no number. */
const UNNUMBERED_SECTION_ID = "hero";

/** A block that takes a number in the rail — the argument, without its opening. */
export type HomeNumberedSectionId = Exclude<HomeSectionId, typeof UNNUMBERED_SECTION_ID>;

/**
 * The numbered blocks, in reading order, so the visible run is 01 through 06.
 *
 * Derived rather than written out: a hand-kept second list is a list that drifts,
 * and the numbering was itself once the raw index into {@link HOME_SECTION_IDS} —
 * which only held while the one unnumbered block happened to sit first.
 */
export const HOME_NUMBERED_SECTION_IDS: readonly HomeNumberedSectionId[] = HOME_SECTION_IDS.filter(
  (id): id is HomeNumberedSectionId => id !== UNNUMBERED_SECTION_ID,
);

export { GITHUB_ORG_HREF };

export const heroLinks = {
  primaryHref: "#applications",
  secondaryHref: contactHref("Homepage hero"),
} as const;

export interface ApplicationMeta {
  /**
   * Also a catalog slug with a GitHub repo. Typing it as the intersection makes
   * the compiler reject an entry that names a product the catalog does not serve.
   */
  readonly key: ApplicationKey & ProductSlug;
  /** Product name as it is written everywhere else on the site. */
  readonly product: string;
}

/**
 * The application stage roster, in the order the operator fixed: entry points into
 * the stack, read left to right. Every entry stands alone, so the order is a
 * reading order rather than a pipeline.
 */
export const APPLICATIONS: readonly ApplicationMeta[] = [
  { key: "molpy", product: "MolPy" },
  { key: "molpack", product: "MolPack" },
  { key: "molvis", product: "MolVis" },
  { key: "molexp", product: "MolExp" },
  { key: "molnex", product: "MolNex" },
  { key: "atomiverse", product: "Atomiverse" },
] as const;

/** Derived from the package registry, so a repo rename cannot leave a 404. */
export function applicationHref(key: ApplicationMeta["key"]): string {
  return packageGithubHref(key);
}

export interface ParticipatePathMeta {
  readonly key: ParticipatePathKey;
  readonly href: string;
  readonly external?: boolean;
}

/**
 * The three depths of working with MolCrafts, ordered open → deeper → embedded.
 *
 * The order is the screen's whole argument, so it is fixed here rather than left to
 * the copy record. Each phase *is* its route: choosing one opens the way in,
 * pre-labelled with that phase's own words, so the reader never has to describe
 * which one they meant.
 */
export const PARTICIPATE_PATHS: readonly ParticipatePathMeta[] = [
  { key: "startOpen", href: GITHUB_ORG_HREF, external: true },
  { key: "buildTogether", href: contactHref("Build together") },
  { key: "deployInHouse", href: contactHref("Deploy in-house") },
] as const;

export interface SponsorMeta {
  /** Written out beside the mark, so the mark itself carries no text of its own. */
  readonly name: string;
  readonly href: string;
  /**
   * The `mask-sponsor-*` utility that stamps this sponsor's shape (`styles/tailwind.css`),
   * rather than the file itself: the mark is painted in the page's ink, and the url it
   * is masked from can only be written in CSS. Carried per entry because the band used
   * to import one file for every row, which would have given a second sponsor the
   * first one's mark.
   */
  readonly markClass: string;
}

export const sponsorItems: readonly SponsorMeta[] = [
  {
    name: "Claude for Open Source",
    href: "https://claude.com/contact-sales/claude-for-oss",
    markClass: "mask-sponsor-claude",
  },
] as const;
