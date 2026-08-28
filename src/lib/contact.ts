/**
 * Single source of truth for the commercial contact route. Confirmed by the owner
 * 2026-08-10. Both Participate cards and both Footer links build their href from here.
 */
export const CONTACT_EMAIL = "hello@molcrafts.org";

/** `mailto:` href with a subject line, so enquiries arrive pre-labelled. */
export const contactHref = (subject: string): string =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
