import type { HomeCopy } from "./types";

/**
 * Operator-approved English copy for the AI editorial screen.
 * Other locales intentionally share it until their translations are approved.
 */
export const APPROVED_ASSIST_COPY = {
  title: {
    subject: "AI,",
    action: "here to assist.",
  },
  subline: "A squire for science.",
  statements: [
    "Science gives AI context.",
    "Data stays traceable.",
    "Knowledge stays connected.",
    "Tools make action possible.",
    "Workflows remain reproducible.",
    "Judgment stays human.",
  ],
  concepts: ["data", "knowledge", "tools", "workflows"],
  products: ["MolPy", "MolExp", "MolVis", "MolPack", "Atomiverse"],
} as const satisfies HomeCopy["assist"];
