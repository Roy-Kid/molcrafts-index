import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    favicon: "./src/assets/moko.svg",
    title: "MolCrafts – AI Infrastructure for Molecular Science",
    tags: [
      {
        tag: "link",
        attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
      },
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital@1&display=swap",
        },
      },
      // Open Graph — must use property= (not name=) so LinkedIn/Facebook render rich cards
      {
        tag: "meta",
        attrs: {
          property: "og:title",
          content: "MolCrafts – AI Infrastructure for Molecular Science",
        },
      },
      {
        tag: "meta",
        attrs: {
          property: "og:description",
          content:
            "Open molecular software ecosystem spanning workflows, records, visualization, and scientific infrastructure.",
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
          content: "MolCrafts – AI Infrastructure for Molecular Science",
        },
      },
    ],
    meta: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1.0",
      description:
        "Open molecular software ecosystem spanning workflows, records, visualization, and scientific infrastructure.",
      keywords:
        "molcrafts, molecular science, AI infrastructure, molecular dynamics, MolPy, MolVis, MolRec, open-source",
      author: "MolCrafts Team",
      "twitter:card": "summary_large_image",
      "twitter:title": "MolCrafts – AI Infrastructure for Molecular Science",
      "twitter:description":
        "Open molecular software ecosystem spanning workflows, records, visualization, and scientific infrastructure.",
      "twitter:image": "https://molcrafts.org/og/index.png",
    },
  },
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
});
