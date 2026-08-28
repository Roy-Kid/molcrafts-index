import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "@rstest/core";

/**
 * Guards for the shadcn + Tailwind-only rule.
 *
 * These catch the failures that build green and only show up in the browser:
 * a colour written as a literal instead of a token, a utility whose theme key
 * was declared in the wrong namespace (`--shadow-x` does not make `drop-shadow-x`
 * work), or a `var(--typo)` that silently resolves to nothing.
 */

const ROOT = resolve(__dirname, "../..");
const SRC = join(ROOT, "src");
const TAILWIND_CSS = join(SRC, "styles/tailwind.css");
const BRAND_TOKENS_CSS = join(SRC, "styles/brand-tokens.css");

function walk(dir: string, exts: string[]): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full, exts);
    return exts.some((e) => name.endsWith(e)) ? [full] : [];
  });
}

const codeFiles = walk(SRC, [".ts", ".tsx"]).filter((f) => !f.endsWith(".d.ts"));
const cssText = readFileSync(TAILWIND_CSS, "utf8") + readFileSync(BRAND_TOKENS_CSS, "utf8");
const declaredVars = new Set(
  [...cssText.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map((m) => m[1]),
);
const rel = (f: string) => relative(ROOT, f);

describe("no hardcoded colours", () => {
  it("writes every colour as a token, never as a hex or rgb literal", () => {
    const offenders: string[] = [];
    for (const file of codeFiles) {
      const text = readFileSync(file, "utf8");
      text.split("\n").forEach((line, i) => {
        for (const m of line.matchAll(/#[0-9a-fA-F]{6}\b|rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g)) {
          offenders.push(`${rel(file)}:${i + 1} ${m[0]}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });
});

describe("no ad hoc CSS", () => {
  it("keeps styling in Tailwind classes rather than inline style objects", () => {
    const offenders = codeFiles
      .filter((f) => readFileSync(f, "utf8").includes("style={{"))
      .map(rel);
    expect(offenders).toEqual([]);
  });

  it("ships exactly the two stylesheets the token system needs", () => {
    expect(walk(SRC, [".css"]).map(rel).sort()).toEqual([
      "src/styles/brand-tokens.css",
      "src/styles/tailwind.css",
    ]);
  });
});

describe("theme tokens resolve", () => {
  const TAILWIND_PALETTE =
    /^--color-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}$/;

  it("declares every custom property the code references without a fallback", () => {
    const missing = new Set<string>();
    for (const file of codeFiles) {
      const text = readFileSync(file, "utf8");
      // capture the fallback too: `var(--x, y)` is safe even if --x is set at runtime
      for (const m of text.matchAll(/var\(\s*(--[a-z0-9-]+)\s*(,)?/gi)) {
        const [, name, hasFallback] = m;
        if (hasFallback) continue;
        // supplied by Radix, by Tailwind's own runtime, or by Tailwind's default palette
        if (name.startsWith("--radix-") || name.startsWith("--tw-")) continue;
        if (TAILWIND_PALETTE.test(name)) continue;
        if (!declaredVars.has(name)) missing.add(`${rel(file)} -> ${name}`);
      }
    }
    expect([...missing]).toEqual([]);
  });

  /**
   * Tailwind resolves `drop-shadow-x` against `--drop-shadow-x`, not `--shadow-x`.
   * Declaring one and using the other yields a class name with no rule behind it.
   */
  const NAMESPACES: Record<string, { prefix: string; builtins: string[] }> = {
    "drop-shadow": {
      prefix: "--drop-shadow-",
      builtins: ["xs", "sm", "md", "lg", "xl", "2xl", "none", "inherit", "current", "transparent"],
    },
    blur: {
      prefix: "--blur-",
      builtins: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "none"],
    },
    leading: {
      prefix: "--leading-",
      builtins: ["none", "tight", "snug", "normal", "relaxed", "loose"],
    },
  };

  for (const [ns, { prefix, builtins }] of Object.entries(NAMESPACES)) {
    it(`resolves every ${ns}-* utility to a declared token`, () => {
      const pattern = new RegExp(`(?:^|[\\s"'\`:])${ns}-([a-z][a-z0-9-]*)(?=[\\s"'\`]|$)`, "g");
      const unresolved = new Set<string>();
      for (const file of codeFiles) {
        for (const m of readFileSync(file, "utf8").matchAll(pattern)) {
          const name = m[1];
          if (builtins.includes(name)) continue;
          if (!declaredVars.has(prefix + name)) unresolved.add(`${rel(file)} -> ${ns}-${name}`);
        }
      }
      expect([...unresolved]).toEqual([]);
    });
  }

  /**
   * `font-x` resolves against the family namespace before the weight namespace, so a
   * weight token named after an existing family is silently swallowed.
   */
  it("keeps font-weight token names clear of font-family token names", () => {
    const families = [...declaredVars]
      .filter((v) => /^--font-[a-z0-9-]+$/.test(v) && !v.startsWith("--font-weight-"))
      .map((v) => v.replace("--font-", ""));
    const weights = [...declaredVars]
      .filter((v) => v.startsWith("--font-weight-"))
      .map((v) => v.replace("--font-weight-", ""));
    expect(weights.filter((w) => families.includes(w))).toEqual([]);
  });
});
