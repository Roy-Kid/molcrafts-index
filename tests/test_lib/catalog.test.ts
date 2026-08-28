import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ecosystemItems } from "@/lib/ecosystem";
import { en } from "@/lib/home/copy/en";
import { APPLICATIONS, applicationHref, resolveHomeHash } from "@/lib/home/data";
import { PACKAGE_INSTALL, packageGithubHref } from "@/lib/packages";
import { PRODUCT_ACCENTS } from "@/lib/productAccents";
import { PRODUCT_SLUGS } from "@/lib/routes";
import { describe, expect, it } from "@rstest/core";
import { routes as ogRoutes } from "../../scripts/og-meta";

/**
 * Product marketing pages are retired. Every catalog slug must still have an
 * accent, an install record, a GitHub href, and a Pages redirect — a missing
 * one is valid TypeScript and a 404 or a dead Explore link.
 */

const ROOT = resolve(__dirname, "../..");
const read = (rel: string) => readFileSync(resolve(ROOT, rel), "utf8");

describe("product catalog registration", () => {
  for (const slug of PRODUCT_SLUGS) {
    it(`${slug} has an accent entry`, () => {
      expect(Object.keys(PRODUCT_ACCENTS)).toContain(slug);
    });

    it(`${slug} has an install entry`, () => {
      expect(Object.keys(PACKAGE_INSTALL)).toContain(slug);
    });

    it(`${slug} has an ecosystem entry linking at GitHub`, () => {
      expect(ecosystemItems.find((i) => i.href === packageGithubHref(slug))).toBeDefined();
    });

    it(`${slug} is redirected off the site`, () => {
      const redirects = read("public/_redirects");
      expect(redirects).toContain(`/${slug}`);
      expect(redirects).toContain(packageGithubHref(slug));
    });
  }
});

describe("catalog integrity", () => {
  it("has no accent entry for a product that is not catalogued", () => {
    const routed = new Set<string>(PRODUCT_SLUGS);
    expect(Object.keys(PRODUCT_ACCENTS).filter((k) => !routed.has(k))).toEqual([]);
  });

  it("points every ecosystem item at a MolCrafts GitHub repo", () => {
    const broken = ecosystemItems.filter(
      (i) => !i.external || !i.href.startsWith("https://github.com/MolCrafts/"),
    );
    expect(broken.map((i) => i.href)).toEqual([]);
  });

  it("gives every ecosystem item the copy the homepage renders", () => {
    const incomplete = ecosystemItems
      .filter((i) => !i.title || !i.role || !i.description || !i.color)
      .map((i) => i.href);
    expect(incomplete).toEqual([]);
  });

  it("keeps ecosystem entries unique by href", () => {
    const hrefs = ecosystemItems.map((i) => i.href);
    expect(hrefs).toEqual([...new Set(hrefs)]);
  });

  it("does not prerender product marketing pages", () => {
    expect(ogRoutes.map((r) => r.slug)).toEqual(["index"]);
    expect(read("src/App.tsx")).not.toMatch(/Landing/);
    expect(read("src/pages/index.ts")).not.toMatch(/Landing/);
  });
});

describe("homepage application stage", () => {
  it("names only catalogued product slugs", () => {
    const routed = new Set<string>(PRODUCT_SLUGS);
    expect(APPLICATIONS.map((a) => a.key).filter((key) => !routed.has(key))).toEqual([]);
  });

  it("derives every href from the GitHub repo", () => {
    for (const app of APPLICATIONS) {
      expect(applicationHref(app.key)).toBe(packageGithubHref(app.key));
    }
  });

  it("gives every entry the copy the stage renders", () => {
    for (const app of APPLICATIONS) {
      const copy = en.projects.items[app.key];
      expect(copy.applicationTitle.length).toBeGreaterThan(0);
      expect(copy.short.length).toBeGreaterThan(0);
      expect(copy.long.length).toBeGreaterThan(0);
    }
  });

  it("resolves retired hashes onto the live blocks", () => {
    expect(resolveHomeHash("contact")).toBe("collaboration");
    expect(resolveHomeHash("#projects")).toBe("applications");
    expect(resolveHomeHash("what-we-do")).toBe("solutions");
    expect(resolveHomeHash("newsletter")).toBe("trust");
    expect(resolveHomeHash("applications")).toBe("applications");
    expect(resolveHomeHash("missing")).toBeNull();
  });

  it("keeps the roster in the order the operator fixed", () => {
    expect(APPLICATIONS.map((a) => a.key)).toEqual([
      "molpy",
      "molpack",
      "molvis",
      "molexp",
      "molnex",
      "atomiverse",
    ]);
  });
});
