import { BrandCopy } from "@/components/BrandName";
import { useHomeCopy } from "@/lib/home/copy";
import { sponsorItems } from "@/lib/home/data";
import { HOME_BODY } from "@/lib/home/stage";
import { cn } from "@/lib/utils";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";

/**
 * Support — the credit the page closes on.
 *
 * A band rather than a screen: it names who sponsors the open work, which is a
 * line of record, not an argument the reader is asked to travel through. The
 * roster sits on its own row under the rule, so the names read as a list.
 */
export function SponsorsSection() {
  const { sponsors } = useHomeCopy();

  return (
    <HomeBlock
      id="trust"
      title={sponsors.title}
      lead={<BrandCopy text={sponsors.lead} />}
      height="band"
    >
      <Reveal delay={0.08}>
        <ul className="flex flex-wrap items-start gap-x-12 gap-y-8">
          {sponsorItems.map((sponsor) => (
            <li key={sponsor.name}>
              {/* Mark over name, both inside the one link: a logo never stands on the
                  page without the name it belongs to, and the whole credit is what
                  the reader clicks. */}
              <a
                href={sponsor.href}
                target="_blank"
                rel="noreferrer noopener"
                className={cn(
                  HOME_BODY,
                  /* Centred, not flush left: the mark sits over the middle of the
                     name it belongs to, so the pair reads as one credit. */
                  "group flex flex-col items-center gap-3 no-underline outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary",
                )}
              >
                {/* Masked, not drawn: the mark takes the page's own ink, so a
                    sponsor's brand colour never lands on the closing band. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    sponsor.markClass,
                    "h-12 w-12 bg-muted-foreground transition-colors group-hover:bg-foreground",
                  )}
                />
                {sponsor.name}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </HomeBlock>
  );
}
