import type { HomeCopy } from "./types";

/**
 * Operator-authored English copy for the collaboration screen.
 *
 * Supplied verbatim in the section brief; other locales share it until their
 * translations are approved, exactly as {@link APPROVED_ASSIST_COPY} does.
 *
 * The three statements are one grammar — imperative, two or three words, full stop —
 * because the screen argues that they are one relationship at three depths rather
 * than three products on a price list. Service-desk nouns (`Scientific consulting`,
 * `Enterprise collaboration`) are deliberately absent from the visible copy.
 *
 * This screen is also where the page ends its argument: each depth carries its own
 * route in, so there is no contact screen after it repeating the invitation.
 */
export const APPROVED_COLLABORATION_COPY = {
  title: {
    plain: "Open to start.",
    accent: "Tailored to fit.",
  },
  supporting:
    "The same MolCrafts ecosystem can stay open, grow through collaboration, or run inside your own R&D.",
  paths: {
    startOpen: {
      statement: "Start open.",
      line: "Use MolCrafts directly. Explore, extend, and build on the open-source ecosystem.",
    },
    buildTogether: {
      statement: "Build together.",
      line: "Bring a scientific challenge. We develop methods, software, and infrastructure alongside your team.",
    },
    deployInHouse: {
      statement: "Deploy in-house.",
      line: "Integrate MolCrafts into your own infrastructure for private, sustained R&D.",
    },
  },
} as const satisfies HomeCopy["participate"];
