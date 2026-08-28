/**
 * Single source of truth for how each package is installed.
 *
 * Verified against the package registries (PyPI / npm) on 2026-08-09 — never inferred from
 * a README badge, which was wrong three times in both directions: MolPlot and MolMCP were
 * shipping while flagged in development, and MolExp and MolNex were flagged shipping while
 * returning 404. Re-check with a registry call before editing an entry here.
 *
 * `null` means nothing is published yet, and the site must say so rather than print a
 * command that would fail.
 */
export const GITHUB_ORG_HREF = "https://github.com/MolCrafts";

export interface PackageInstall {
  /** Verified install command, or null when no artifact is published. */
  command: string | null;
  /** Shown in place of a command when `command` is null. */
  note?: string;
  /** Repository name under github.com/MolCrafts. */
  repo: string;
}

/** The GitHub repository page for a catalog slug. */
export function packageGithubHref(slug: string): string {
  const pkg = PACKAGE_INSTALL[slug];
  if (!pkg) {
    throw new Error(`unknown package slug: ${slug}`);
  }
  return `${GITHUB_ORG_HREF}/${pkg.repo}`;
}

export const PACKAGE_INSTALL: Record<string, PackageInstall> = {
  molpy: { command: "pip install molcrafts-molpy", repo: "molpy" },
  molrs: { command: "pip install molcrafts-molrs", repo: "molrs" },
  molpack: { command: "pip install molcrafts-molpack", repo: "molpack" },
  molq: { command: "pip install molcrafts-molq", repo: "molq" },
  molcfg: { command: "pip install molcrafts-molcfg", repo: "molcfg" },
  mollog: { command: "pip install molcrafts-mollog", repo: "mollog" },
  molmcp: { command: "pip install molcrafts-molmcp", repo: "molmcp" },
  molvis: { command: "npm i @molcrafts/molvis-core", repo: "molvis" },
  molplot: { command: "npm i @molcrafts/molplot", repo: "molplot" },
  molnex: {
    command: null,
    note: "In development — not yet published.",
    repo: "molnex",
  },
  molexp: {
    command: null,
    note: "In development — not yet published.",
    repo: "molexp",
  },
  molrec: {
    command: null,
    note: "In development — the specification is still taking shape.",
    repo: "molrec",
  },
  molhub: {
    command: null,
    note: "In development — not yet published.",
    repo: "molhub",
  },
  atomiverse: {
    command: null,
    note: "Preparing release — build from source for now.",
    repo: "Atomiverse",
  },
};
