import { BrandCopy } from "@/components/BrandName";
import { useHomeCopy } from "@/lib/home/copy";
import { HOME_NUMBERED_SECTION_IDS, type HomeNumberedSectionId } from "@/lib/home/data";
import { HOME_CONTAINER } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { MonoLabel } from "./MonoLabel";

interface SectionMarkerProps {
  sectionId: HomeNumberedSectionId;
  className?: string;
}

/**
 * The numbered rail each block after the hero carries.
 *
 * It is positioned against its own block rather than placed in the content flow,
 * so it lands on the same point of every block — including the full-bleed AI
 * screen, which has no container to hang it from — and scrolls away with it. That
 * repetition is what tells a reader the blocks are one argument rather than eight
 * separate posters. The hero is deliberately unnumbered — it opens the page rather
 * than steps through it — so the visible run reads 01 through 06. The prop type
 * only admits a block that takes a number.
 *
 * The label reuses the approved section names already shown in the dots, so this
 * adds no new copy, and it is hidden from assistive tech because the heading and
 * the section nav already carry the same name.
 *
 * It rides with the section dots as desktop chrome. Below `md` the screens fill
 * the viewport and read as a scrolling document already, and a fixed rail there
 * would land on the navbar and the first line of the heading.
 */
export function SectionMarker({ sectionId, className }: SectionMarkerProps) {
  const { sectionLabels } = useHomeCopy();
  const step = HOME_NUMBERED_SECTION_IDS.indexOf(sectionId) + 1;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-24 z-20 hidden md:block",
        HOME_CONTAINER,
        className,
      )}
      aria-hidden="true"
    >
      <MonoLabel className="block">
        <span className="text-[rgb(var(--accent-rgb))]">{String(step).padStart(2, "0")}</span>
        <span className="px-2 opacity-50">/</span>
        <BrandCopy text={sectionLabels[sectionId]} />
      </MonoLabel>
    </div>
  );
}
