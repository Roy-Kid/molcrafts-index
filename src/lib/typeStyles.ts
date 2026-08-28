/** Locale-aware typography expressed entirely as Tailwind utilities. */
const SWEDISH_HYPHENS = "[html[lang=sv]_&]:hyphens-auto";

export const TYPE_DISPLAY = `break-words text-balance leading-[1.12] tracking-tight ${SWEDISH_HYPHENS} [html[lang=sv]_&]:leading-[1.18] [html[lang=sv]_&]:tracking-[-0.02em] [html[data-script=cjk]_&]:leading-copy [html[data-script=cjk]_&]:tracking-[0.02em]`;

export const TYPE_HEADING = `break-words text-balance leading-[1.22] tracking-tight ${SWEDISH_HYPHENS} [html[lang=sv]_&]:leading-[1.28] [html[lang=sv]_&]:tracking-[-0.02em] [html[data-script=cjk]_&]:leading-[1.45] [html[data-script=cjk]_&]:tracking-[0.02em]`;

export const TYPE_BODY = `break-words text-pretty leading-prose ${SWEDISH_HYPHENS} [html[lang=sv]_&]:leading-[1.7] [html[data-script=cjk]_&]:leading-[1.8] [html[data-script=cjk]_&]:tracking-normal`;

export const TYPE_LABEL =
  "uppercase tracking-[0.18em] [html[lang=sv]_&]:tracking-[0.12em] [html[data-script=cjk]_&]:normal-case [html[data-script=cjk]_&]:tracking-[0.06em]";

export const TYPE_KICKER = `uppercase tracking-[0.16em] ${SWEDISH_HYPHENS} [html[lang=sv]_&]:tracking-[0.08em] [html[data-script=cjk]_&]:normal-case [html[data-script=cjk]_&]:tracking-[0.04em]`;
