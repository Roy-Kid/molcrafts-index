import path from "node:path";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

/**
 * Google Analytics 4. Set `PUBLIC_GA_ID=G-XXXXXXXXXX` in the environment (or a `.env`
 * file) to enable it. Absent — local dev, previews, forks — no tracker is emitted at all,
 * so nobody's traffic is reported by accident.
 */
const GA_ID = process.env.PUBLIC_GA_ID;

const analyticsTags = GA_ID
  ? [
      {
        tag: "script" as const,
        attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}` },
      },
      {
        tag: "script" as const,
        /* send_page_view is off on purpose — this app routes client-side, so views are
           sent from src/lib/analytics.ts, including the first one. */
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false});`,
      },
    ]
  : [];

export default defineConfig({
  plugins: [pluginReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    /**
     * Bind the exact address the browser connects to.
     *
     * rsbuild's port probe is a `bind()`, and bind conflicts are per-address, not
     * per-port. The default host `0.0.0.0` binds IPv4 only, so a dev server already
     * holding `[::1]:3000` (what another rsbuild project leaves behind) goes undetected:
     * the probe succeeds, the port is not incremented, and `localhost` — which resolves
     * to `::1` first — serves the *other* project's page.
     *
     * Binding "localhost" resolves to `::1` too, so any collision the browser could hit
     * is a collision the probe hits first, and rsbuild auto-increments to a free port.
     *
     * Trade-off: the dev server is no longer reachable from other devices on the LAN.
     * Set host to "0.0.0.0" temporarily when testing on a phone.
     */
    host: "localhost",
  },
  html: {
    /* No `lang` option here — rsbuild has none. The <html lang> attribute is added
       in scripts/prerender-html.ts, which already rewrites the HTML per route. */
    favicon: "./src/assets/moko.svg",
    title: "MolCrafts – Molecular and materials R&D",
    tags: [
      ...analyticsTags,
      /* Fonts are bundled locally via @fontsource imports in src/main.tsx.
         Google Fonts links are gone on purpose: fonts.googleapis.com is blocked in
         mainland China, so the hosted CSS left those visitors on fallback fonts. */
      // Open Graph — must use property= (not name=) so LinkedIn/Facebook render rich cards
      {
        tag: "meta",
        attrs: {
          property: "og:title",
          content: "MolCrafts – Molecular and materials R&D",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:description",
          content:
            "MolCrafts brings scientific computing, AI, and research expertise to molecular and materials R&D, from application exploration to long-term collaboration.",
        },
      },
      { tag: "meta", attrs: { property: "og:type", content: "website" } },
      { tag: "meta", attrs: { property: "og:url", content: "https://molcrafts.org/" } },
      { tag: "meta", attrs: { property: "og:site_name", content: "MolCrafts" } },
      {
        tag: "meta",
        attrs: { property: "og:image", content: "https://molcrafts.org/og/index.png" },
      },
      { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
      { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
      {
        tag: "meta",
        attrs: {
          property: "og:image:alt",
          content: "MolCrafts – Molecular and materials R&D",
        },
      },
    ],
    meta: {
      /* Object form emits <meta charset="UTF-8">. The string form emitted
         <meta name="charset" content="UTF-8">, which declares nothing — and every
         description on this site contains an em dash. */
      charset: { charset: "UTF-8" },
      viewport: "width=device-width, initial-scale=1.0",
      description:
        "MolCrafts brings scientific computing, AI, and research expertise to molecular and materials R&D, from application exploration to long-term collaboration.",
      keywords:
        "molcrafts, molecular simulation, computational chemistry, materials science, molecular dynamics, AI for science, agentic science, reproducible research",
      author: "MolCrafts",
      "twitter:card": "summary_large_image",
      "twitter:title": "MolCrafts – Molecular and materials R&D",
      "twitter:description":
        "Scientific computing, AI applications, and research collaboration for molecular and materials R&D.",
      "twitter:image": "https://molcrafts.org/og/index.png",
    },
  },
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
});
