import { useHomeCopy } from "@/lib/home/copy";
import { HomeBlock } from "../HomeBlock";
import { Reveal } from "../Reveal";
import { ApplicationStage } from "../applications/ApplicationStage";

/**
 * Applications — an interactive stage rather than a catalog.
 *
 * The block argues that the ecosystem can be entered at any point: the band shows
 * every entry at once, and the one the reader picks becomes the whole stage.
 *
 * Its heading is operator-approved English in every locale, so it carries its own
 * `lang` the way the AI screen's does — otherwise a zh or sv voice pronounces it
 * with the document's phonetics.
 */
export function ProjectsSection() {
  const { projects } = useHomeCopy();

  return (
    <HomeBlock
      id="applications"
      title={<span lang="en">{projects.title}</span>}
      lead={<span lang="en">{projects.lead}</span>}
      scale="section"
    >
      <Reveal delay={0.08}>
        <ApplicationStage />
      </Reveal>
    </HomeBlock>
  );
}
