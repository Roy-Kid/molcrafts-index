import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { en as homeCopy } from "../src/lib/home/copy/en.ts";
import { type OgRoute, routes } from "./og-meta.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SITE = "https://molcrafts.org";

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const replaceMeta = (
  html: string,
  match: { attr: "property" | "name"; key: string },
  content: string,
) => {
  // Match: <meta property="og:title" content="..."> OR <meta name="og:title" content="...">
  // Case: attr value quoted, content attr in either order.
  const escaped = content.replace(/"/g, "&quot;");
  const pattern = new RegExp(`<meta\\s+[^>]*${match.attr}=["']${match.key}["'][^>]*>`, "i");
  const replacement = `<meta ${match.attr}="${match.key}" content="${escaped}">`;
  if (pattern.test(html)) return html.replace(pattern, replacement);
  // Inject just before </head> if missing
  return html.replace(/<\/head>/i, `${replacement}</head>`);
};

const replaceTitle = (html: string, title: string) =>
  html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(title)}</title>`);

/** rsbuild emits a bare <html>. Without lang, assistive tech and translation guess. */
const setLang = (html: string, lang: string) =>
  /<html[^>]*\slang=/i.test(html)
    ? html
    : html.replace(/<html([^>]*)>/i, `<html$1 lang="${lang}">`);

/**
 * Cloudflare Pages serves `/` as the only marketing route. Product paths 301 to
 * GitHub via `public/_redirects`. The homepage canonical keeps the trailing slash.
 */
const canonicalUrl = (routePath: string) =>
  routePath === "/" ? `${SITE}/` : `${SITE}${routePath.replace(/\/$/, "")}/`;

/** There was no canonical link on any route. Insert one, or replace an existing one. */
const setCanonical = (html: string, url: string) => {
  const tag = `<link rel="canonical" href="${escapeAttr(url)}">`;
  const existing = /<link[^>]*rel=["']canonical["'][^>]*>/i;
  if (existing.test(html)) return html.replace(existing, tag);
  return html.replace(/<\/head>/i, `${tag}</head>`);
};

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Fills `<div id="root">` with real prose.
 *
 * The app is client-side rendered, so every built page shipped an empty body: about thirty
 * crawler-visible words per route, all of it head metadata. Google executes JavaScript;
 * many other crawlers do not, so the page's core message needs a useful HTML fallback.
 *
 * React's createRoot clears the container on mount, so this is replaced the moment the
 * bundle runs. Users never see it, except as something better than a blank screen while
 * the bundle downloads.
 */
const rootContent = () => {
  const parts: string[] = [
    `<h1>${escapeHtml(homeCopy.brandHero.title)}</h1>`,
    `<p>${escapeHtml(homeCopy.brandHero.kicker)}</p>`,
    `<p>${escapeHtml(homeCopy.brandHero.subtitle)}</p>`,
    `<p><a href="/#applications">${escapeHtml(homeCopy.hero.primaryCta)}</a></p>`,
    `<h2>${escapeHtml(homeCopy.approach.title)} ${escapeHtml(homeCopy.approach.accent)}</h2>`,
    `<p>${escapeHtml(homeCopy.approach.lead)}</p>`,
    `<ul>${homeCopy.approach.statements.map((statement) => `<li>${escapeHtml(statement.line)}</li>`).join("")}</ul>`,
    `<p>${escapeHtml(homeCopy.approach.vision)}</p>`,
    `<h2>${escapeHtml(homeCopy.whatWeDo.title)}</h2>`,
    `<p>${escapeHtml(homeCopy.whatWeDo.lead)}</p>`,
    `<ul>${homeCopy.whatWeDo.pillars
      .map(
        (pillar) =>
          `<li><strong>${escapeHtml(pillar.title)}</strong> — ${escapeHtml(pillar.body)}</li>`,
      )
      .join("")}</ul>`,
    `<h2>${escapeHtml(homeCopy.projects.title)}</h2>`,
    `<p>${escapeHtml(homeCopy.projects.lead)}</p>`,
    `<ul>${Object.values(homeCopy.projects.items)
      .map(
        (application) =>
          `<li><strong>${escapeHtml(application.applicationTitle)}</strong> — ${escapeHtml(application.long)}</li>`,
      )
      .join("")}</ul>`,
    `<h2>${escapeHtml(`${homeCopy.participate.title.plain} ${homeCopy.participate.title.accent}`)}</h2>`,
    `<p>${escapeHtml(homeCopy.participate.supporting)}</p>`,
    `<ul>${Object.values(homeCopy.participate.paths)
      .map(
        (path) =>
          `<li><strong>${escapeHtml(path.statement)}</strong> — ${escapeHtml(path.line)}</li>`,
      )
      .join("")}</ul>`,
  ];
  return `<main>${parts.join("")}</main>`;
};

const setRootContent = (html: string) =>
  html.replace(
    /(<div id="root"[^>]*>)(\s*)(<\/div>)/i,
    (_m, open, _ws, close) => `${open}${rootContent()}${close}`,
  );

const buildHtml = (shell: string, route: OgRoute) => {
  const url = canonicalUrl(route.path);
  const image = `${SITE}/og/${route.slug}.png`;

  let html = shell;
  html = setLang(html, "en");
  html = setCanonical(html, url);
  html = setRootContent(html);
  html = replaceTitle(html, route.ogTitle);
  html = replaceMeta(html, { attr: "name", key: "description" }, route.ogDescription);
  html = replaceMeta(html, { attr: "property", key: "og:title" }, route.ogTitle);
  html = replaceMeta(html, { attr: "property", key: "og:description" }, route.ogDescription);
  html = replaceMeta(html, { attr: "property", key: "og:url" }, url);
  html = replaceMeta(html, { attr: "property", key: "og:image" }, image);
  html = replaceMeta(html, { attr: "property", key: "og:image:alt" }, route.ogTitle);
  html = replaceMeta(html, { attr: "name", key: "twitter:title" }, route.ogTitle);
  html = replaceMeta(html, { attr: "name", key: "twitter:description" }, route.ogDescription);
  html = replaceMeta(html, { attr: "name", key: "twitter:image" }, image);
  return html;
};

export const prerenderHtml = (distDir: string) => {
  const shellPath = path.join(distDir, "index.html");
  const shell = fs.readFileSync(shellPath, "utf8");

  for (const route of routes) {
    const html = buildHtml(shell, route);
    const outPath = route.path === "/" ? shellPath : path.join(distDir, route.slug, "index.html");
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
    process.stdout.write(`  html ${route.path === "/" ? "index" : route.slug}/index.html\n`);
  }

  /**
   * Without a 404.html, Cloudflare Pages falls back to the SPA shell and answers every
   * unknown path with `200 text/html` — a soft 404. Crawlers then index garbage paths, and
   * probes for files that do not exist (`/llms.txt` before it existed, `/pricing.md`) come
   * back looking like real pages. Shipping this file makes those responses a real 404.
   */
  let notFound = shell;
  notFound = setLang(notFound, "en");
  notFound = setCanonical(notFound, `${SITE}/404`);
  notFound = replaceTitle(notFound, "Page not found – MolCrafts");
  notFound = replaceMeta(
    notFound,
    { attr: "name", key: "description" },
    "That page does not exist. Browse the MolCrafts packages instead.",
  );
  notFound = replaceMeta(notFound, { attr: "name", key: "robots" }, "noindex, follow");
  fs.writeFileSync(path.join(distDir, "404.html"), notFound);
  process.stdout.write("  html 404.html\n");
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = path.join(projectRoot, "dist");
  prerenderHtml(target);
}
