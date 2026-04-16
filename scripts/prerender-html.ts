import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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

const buildHtml = (shell: string, route: OgRoute) => {
  const url = `${SITE}${route.path}`;
  const image = `${SITE}/og/${route.slug}.png`;

  let html = shell;
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
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = path.join(projectRoot, "dist");
  prerenderHtml(target);
}
