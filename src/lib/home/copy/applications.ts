import type { ApplicationKey, HomeCopy } from "./types";

/**
 * Operator-authored English copy for the application stage headline.
 *
 * Supplied verbatim in the section brief; other locales share it until their
 * translations are approved, exactly as {@link APPROVED_ASSIST_COPY} does. It is
 * assigned *into* each locale record rather than imported by the component, so
 * `HomeCopy` stays the single contract for this section — a bare exported constant
 * escapes the locale check and strands every non-component consumer, which is how
 * the prerenderer lost its typed handle on this heading.
 */
export const APPROVED_APPLICATIONS_HEADING = {
  title: "Take one. Or take the stack.",
  lead: "Built to work better together, designed to stand on their own.",
} as const satisfies Pick<HomeCopy["projects"], "title" | "lead">;

/**
 * Application descriptions — GitHub's About descriptions
 * (`github.com/MolCrafts/<repo>`), normalised by operator instruction on
 * 2026-08-15: `[WIP]` markers dropped, one format across the set (sentence
 * case, noun phrase, no trailing period), and molnex rewritten onto
 * potentials, generative models, and prediction. This record is now the
 * approved wording; align the GitHub About descriptions to it, not the other
 * way around.
 *
 * English only; other locales keep their approved translations until the
 * operator re-approves wording against this record.
 */
export const APPLICATION_GITHUB_DESCRIPTIONS: Record<ApplicationKey, string> = {
  molpy: "A fast, clean, and composable toolkit for molecular modeling",
  molpack: "Extensible molecule packing for initial configuration generation",
  molvis: "Interactive molecule visualization library",
  molexp: "AI-assisted workflow management and knowledge system for computational research",
  molnex:
    "Unified ML framework for interatomic potentials, generative models, and property prediction",
  atomiverse: "The multi-scale molecular simulation engine",
};
