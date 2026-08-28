import { useHomeCopy } from "@/lib/home/copy";
import { HOME_SECTION_IDS, resolveHomeHash } from "@/lib/home/data";
import { useEffect, useMemo } from "react";
import { HomeAtmosphere } from "./HomeAtmosphere";
import { HomeFooter } from "./HomeFooter";
import { SectionDots } from "./SectionDots";
import { ApproachSection } from "./sections/ApproachSection";
import { AssistSection } from "./sections/AssistSection";
import { HeroSection } from "./sections/HeroSection";
import { ParticipateSection } from "./sections/ParticipateSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { WhatWeDoSection } from "./sections/WhatWeDoSection";

/**
 * Homepage: one scrolling commercial narrative. Strings live in the locale copy,
 * while this file only owns the order of the argument.
 */
export function HomePage() {
  const { sectionLabels } = useHomeCopy();
  /* Stable across renders: the rail observes these ids, so a fresh array each
     render would tear down and rebuild its observer. */
  const dotLabels = useMemo(
    () => HOME_SECTION_IDS.map((id) => ({ id, label: sectionLabels[id] })),
    [sectionLabels],
  );

  /* The app holds content behind a loading gate, so the browser has already run its
     own fragment scroll and found no such element. Apply the anchor once the
     sections exist — instantly, since the reader asked for that block, not for a
     journey down to it. */
  useEffect(() => {
    const id = resolveHomeHash(window.location.hash);
    if (!id) return;
    /* `instant`, not `auto`: `auto` defers to `scroll-behavior: smooth` on `html`,
       which glides the reader through every block between the top and the one they
       asked for. */
    document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);

  return (
    <div className="relative isolate min-w-0 bg-background font-body text-foreground">
      <HomeAtmosphere />
      <SectionDots labels={dotLabels} />

      <div className="relative z-10">
        <HeroSection />
        <ApproachSection />
        <WhatWeDoSection />
        <AssistSection />
        <ProjectsSection />
        <ParticipateSection />
        {/* A band, not a screen: the credit closes the page above the footer without
            taking a screen of its own. */}
        <SponsorsSection />
        <HomeFooter />
      </div>
    </div>
  );
}
