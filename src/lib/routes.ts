import { packageGithubHref } from "./packages";

/**
 * Catalog slugs. Product marketing pages are retired; these names still key
 * accents, install records, and GitHub redirects for old `/<slug>` URLs.
 */
export const PRODUCT_SLUGS = [
  "molpy",
  "molrs",
  "molpack",
  "molnex",
  "molrec",
  "molexp",
  "molq",
  "molvis",
  "molcfg",
  "mollog",
  "atomiverse",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

export function pathProductSlug(pathname: string): ProductSlug | null {
  const slug = pathname.split("/").filter(Boolean)[0]?.toLowerCase();
  if (!slug) return null;
  return (PRODUCT_SLUGS as readonly string[]).includes(slug) ? (slug as ProductSlug) : null;
}

/** Quick links shown on 404 and empty states. */
export const FEATURED_LINKS = [
  { href: "/", label: "Home" },
  { href: packageGithubHref("molpy"), label: "MolPy", external: true },
  { href: packageGithubHref("atomiverse"), label: "Atomiverse", external: true },
  { href: packageGithubHref("molvis"), label: "MolVis", external: true },
  { href: packageGithubHref("molrs"), label: "MolRs", external: true },
  { href: "https://docs.molcrafts.org/", label: "Docs", external: true },
] as const;
