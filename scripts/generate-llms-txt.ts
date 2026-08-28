import fs from "node:fs";
import path from "node:path";
import { ecosystemCategories } from "../src/lib/ecosystem.ts";
import { PACKAGE_INSTALL } from "../src/lib/packages.ts";

/**
 * Writes `/llms.txt` — a flat, plain-text answer to "what does MolCrafts publish and how do
 * I install it".
 *
 * The site is client-side rendered: the built HTML carries head metadata and an empty body,
 * so a crawler that does not execute JavaScript sees roughly 30 words per route and none of
 * the catalog. This file closes that gap for LLM crawlers at no runtime cost.
 *
 * Generated from `ecosystem.ts` rather than hand-written, so the roster cannot drift away
 * from what the site itself renders.
 */

const SITE = "https://molcrafts.org";

const repoName = (href: string) => href.split("/").pop() || "";

export const generateLlmsTxt = (distDir: string) => {
  const lines: string[] = [
    "# MolCrafts",
    "",
    "> We build AI-assisted infra for molecular science: open-source packages for building",
    "> and running molecular simulations, training models, and keeping every result",
    "> traceable by people and agents alike.",
    "",
    "Each package installs and runs on its own — taking one does not pull in the rest.",
    "They agree on one record format, so one tool's output is readable by the next.",
    "",
  ];

  for (const category of ecosystemCategories) {
    lines.push(`## ${category.title} — ${category.blurb}`, "");
    for (const item of category.items) {
      const repo = repoName(item.href);
      const install = Object.values(PACKAGE_INSTALL).find((pkg) => pkg.repo === repo)?.command;
      const bits = [`- **${item.title}** (${item.role}): ${item.description}`];
      if (install) bits.push(`  Install: \`${install}\``);
      else if (item.status) bits.push(`  Status: ${item.status} — no published package yet.`);
      bits.push(`  Source: ${item.href}`);
      lines.push(...bits, "");
    }
  }

  lines.push(
    "## Common questions",
    "",
    "- **Do I have to adopt all of them?** No. Every package installs independently.",
    "- **MolPy or MolRs — which do I install?** MolPy. It depends on MolRs. MolRs stands",
    "  alone only if you are writing Rust or running in the browser.",
    "- **Licensing.** BSD-3-Clause on every package except MolQ, which is MIT.",
    "",
    "## Links",
    "",
    `- Site: ${SITE}/`,
    "- Docs: https://docs.molcrafts.org/",
    "- Source: https://github.com/MolCrafts",
    "- Contact: hello@molcrafts.org",
    "",
  );

  const target = path.join(distDir, "llms.txt");
  fs.writeFileSync(target, lines.join("\n"), "utf8");
  process.stdout.write(
    `  llms.txt (${ecosystemCategories.flatMap((c) => c.items).length} packages)\n`,
  );
};
