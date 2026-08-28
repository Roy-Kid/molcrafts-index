export interface OgRoute {
  path: string;
  slug: string;
  kicker: string;
  title: string;
  subtitle: string;
  gradient: [string, string, string];
  subGradient: [string, string, string];
  ogTitle: string;
  ogDescription: string;
}

export const routes: OgRoute[] = [
  {
    path: "/",
    slug: "index",
    kicker: "Molecular and materials R&D",
    title: "MolCrafts",
    subtitle: "Scientific computing, AI applications, and research collaboration",
    gradient: ["#2a6744", "#55a572", "#18432b"],
    subGradient: ["#c8841d", "#f2da9d", "#c8841d"],
    ogTitle: "MolCrafts – Molecular and materials R&D",
    ogDescription:
      "MolCrafts brings scientific computing, AI, and research expertise to molecular and materials R&D, from application exploration to long-term collaboration.",
  },
];
