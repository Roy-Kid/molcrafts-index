import type { HomeNumberedSectionId } from "@/lib/home/data";
import { HOME_BAND, HOME_BLOCK, HOME_CONTAINER, HOME_RULE } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { BlockAura } from "./BlockAura";
import { HomeSection } from "./HomeSection";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { SectionMarker } from "./SectionMarker";

interface HomeBlockProps {
  /** Numbered by construction: this shape always carries the rail. */
  id: HomeNumberedSectionId;
  title: ReactNode;
  lead?: ReactNode;
  /** Claim blocks take the larger heading rung; blocks carrying content the smaller. */
  scale?: "statement" | "section";
  /** A screen tall by default; a band sizes to its content. See `HomeSection`. */
  height?: "screen" | "band";
  children: ReactNode;
}

/**
 * The opening every content block shares: the numbered rail, the shared measure,
 * the heading row, and the rule under it — with the block's own content below.
 *
 * Six blocks hand-wired this identical five-element skeleton, which is also where
 * the heading id drifted. It is a convenience over the primitives, not a
 * replacement: `HomeSection`, `SectionMarker`, `SectionHeader` and `Reveal` stay
 * exported, and the hero and the AI screen still compose them directly because
 * neither wants this exact shape.
 */
export function HomeBlock({ id, title, lead, scale, height = "screen", children }: HomeBlockProps) {
  const band = height === "band";

  return (
    <HomeSection id={id} height={height}>
      {/* A band has no centred screen for the rail to sit above, so the number rides
          in its top gutter rather than a third of the way down the block. */}
      <SectionMarker sectionId={id} className={band ? "top-6" : undefined} />
      <div className={cn(HOME_CONTAINER, band ? HOME_BAND : HOME_BLOCK, "relative isolate")}>
        <BlockAura />
        <Reveal>
          {/* A band's lead is a credit line, not a paragraph: it stays unbroken. */}
          <SectionHeader
            sectionId={id}
            title={title}
            lead={lead}
            scale={scale}
            leadShape={band ? "line" : "paragraph"}
          />
          <div className={HOME_RULE} aria-hidden="true" />
        </Reveal>
        {children}
      </div>
    </HomeSection>
  );
}
