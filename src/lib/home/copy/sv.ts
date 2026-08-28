import { APPROVED_APPLICATIONS_HEADING } from "./applications";
import { APPROVED_ASSIST_COPY } from "./assist";
import { APPROVED_COLLABORATION_COPY } from "./collaboration";
import { APPROVED_FOUNDATION_COPY_SV } from "./foundation";
import type { HomeCopy } from "./types";

export const sv: HomeCopy = {
  sectionLabels: {
    hero: "Hem",
    about: "Grund",
    solutions: "Förmågor",
    assist: "AI",
    applications: "Tillämpningar",
    collaboration: "Samarbete",
    trust: "Stöd",
  },
  brandHero: {
    kicker: "Vi formar molekylär simulering för AI-eran",
    title: "MolCrafts",
    subtitle: "Vi bygger AI-assisterad infrastruktur för molekylär vetenskap.",
  },
  hero: {
    title: "Molekylär forskning,",
    accent: "redo för nästa steg.",
    subtitle:
      "MolCrafts för in vetenskaplig beräkning, AI och forskningserfarenhet i verklig molekyl- och materialutveckling – från egenskapsprognoser till långsiktigt samarbete.",
    primaryCta: "Se tillämpningar",
    secondaryCta: "Diskutera ett projekt",
    scrollHint: "Fortsätt",
  },
  approach: APPROVED_FOUNDATION_COPY_SV,
  whatWeDo: {
    title: "Gör svår forskning till arbete som går att driva vidare.",
    lead: "Vi väljer metod utifrån frågan och förenar simulering, prediktion och samarbete.",
    pillars: [
      {
        title: "Molekyl- och materialsimulering",
        body: "Studera struktur, beteende och egenskaper genom en väg formad efter forskningsfrågan.",
      },
      {
        title: "AI-driven prediktion",
        body: "Samla data, modeller och vetenskapligt omdöme för screening och egenskapsstudier.",
      },
      {
        title: "Anpassat FoU-samarbete",
        body: "Gå från metodvalidering till arbetssätt tillsammans med teamet bakom forskningen.",
      },
    ],
  },
  assist: APPROVED_ASSIST_COPY,
  projects: {
    ...APPROVED_APPLICATIONS_HEADING,
    cta: "Utforska",
    stageLabel: "MolCrafts tillämpningar",
    items: {
      molpy: {
        applicationTitle: "Systemuppbyggnad",
        short: "Bygg och typa molekylära system",
        long: "Gör en struktur till ett typat system som en motor kan köra, och granska det först.",
      },
      molpack: {
        applicationTitle: "Boxpreparation",
        short: "Packa molekyler i en box",
        long: "Fyll en box med den sammansättning du anger, och få samma resultat varje körning.",
      },
      molvis: {
        applicationTitle: "Visuell granskning",
        short: "Granska strukturer och trajektorier",
        long: "Se en struktur eller en hel trajektoria i webbläsaren, din editor eller en notebook.",
      },
      molexp: {
        applicationTitle: "Experimentspårning",
        short: "Kör och spåra experiment",
        long: "Beskriv ett arbetsflöde en gång, kör det, och håll varje indata och resultat kopplat.",
      },
      molnex: {
        applicationTitle: "Potentialträning",
        short: "Träna och kombinera potentialer",
        long: "Träna en potential på dina egna data, och kombinera den med fysik du redan litar på.",
      },
      atomiverse: {
        applicationTitle: "Simuleringskörningar",
        short: "Kör dynamik och elektronstruktur",
        long: "Nå molekyldynamik och elektronstruktur genom ett gränssnitt, på CPU och på GPU.",
      },
    },
  },
  participate: APPROVED_COLLABORATION_COPY,
  sponsors: {
    title: "Våra sponsorer",
    lead: "Tack till de open source-program som följer MolCrafts.",
  },
  footer: {
    tagline: "Vetenskaplig beräkning skapad för verklig molekyl- och materialutveckling.",
    github: "GitHub",
    credit: "Built with ❤️",
    backToTop: "Till toppen",
  },
};
