import { APPLICATION_GITHUB_DESCRIPTIONS, APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import { APPROVED_COLLABORATION_COPY } from "./collaboration";
import { APPROVED_FOUNDATION_COPY } from "./foundation";
import type { HomeCopy } from "./types";

export const en: HomeCopy = {
  sectionLabels: {
    hero: "Home",
    about: "Foundation",
    solutions: "Capabilities",
    assist: "AI",
    applications: "Applications",
    collaboration: "Collaboration",
    trust: "Support",
  },
  brandHero: {
    kicker: "Shaping Molecular Simulation for the AI Era",
    title: "MolCrafts",
    subtitle: "We build AI-assisted infrastructure for molecular science.",
  },
  hero: {
    title: "A modern, open-source ecosystem",
    accent: "for molecular science.",
    subtitle:
      "MolCrafts brings scientific computing, AI, and research expertise into real molecular and materials R&D—from property prediction to long-term collaboration.",
    primaryCta: "Explore",
    secondaryCta: "Discuss a project",
    scrollHint: "Continue",
  },
  approach: APPROVED_FOUNDATION_COPY,
  whatWeDo: {
    title: "Knowledge carries forward.",
    lead: "MolCrafts gives molecular R&D a shared foundation for data, knowledge, and reproducible workflows — turning every project into assets the next one can build on.",
    pillars: [
      {
        title: "One data foundation",
        body: "Keep molecules, datasets, models, simulations, and results in one unified data layer, with their provenance and relationships preserved.",
      },
      {
        title: "Knowledge that stays connected",
        body: "Keep methods, assumptions, decisions, and findings attached to the science, giving projects and teams a shared research context.",
      },
      {
        title: "Research you can replay",
        body: "Capture how computational work was done, not just what it produced. Replay, adapt, and extend it without rebuilding from scratch.",
      },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    cta: "Explore",
    stageLabel: "MolCrafts applications",
    items: {
      molpy: {
        applicationTitle: "System construction",
        short: "Build and type molecular systems",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molpy,
      },
      molpack: {
        applicationTitle: "Box preparation",
        short: "Pack molecules into a box",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molpack,
      },
      molvis: {
        applicationTitle: "Visual inspection",
        short: "Inspect structures and trajectories",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molvis,
      },
      molexp: {
        applicationTitle: "Experiment tracking",
        short: "Run and track experiments",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molexp,
      },
      molnex: {
        applicationTitle: "Potential training",
        short: "Train and compose potentials",
        long: APPLICATION_GITHUB_DESCRIPTIONS.molnex,
      },
      atomiverse: {
        applicationTitle: "Simulation runs",
        short: "Run dynamics and electronic structure",
        long: APPLICATION_GITHUB_DESCRIPTIONS.atomiverse,
      },
    },
  },
  participate: APPROVED_COLLABORATION_COPY,
  sponsors: {
    title: "Our sponsors",
    lead: "With thanks to the open-source programs travelling with MolCrafts.",
  },
  footer: {
    tagline: "Scientific computing made to enter real molecular and materials R&D.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Back to top",
  },
};
