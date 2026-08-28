import { MoleculeField } from "./MoleculeField";

/**
 * The homepage's one background — the brand curtain's own treatment, promoted to
 * cover the whole page.
 *
 * It used to belong to the hero: a mouse-reactive molecular field and three glows
 * that stopped at the hero's clip edge, while every other block owned a fainter
 * field of its own. That gave the page nine different backgrounds and a visible
 * seam under the wordmark. Fixed to the viewport, the same treatment now sits
 * behind all eight blocks, and only the content moves through it.
 *
 * The glow positions are unchanged; against the viewport they resolve exactly as
 * they did against the viewport-sized hero.
 */
export function HomeAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <MoleculeField intensity={0.2} interactive className="opacity-45" />

      <div className="absolute left-1/2 top-1/2 h-[min(38rem,68vw)] w-[min(62rem,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(var(--accent-rgb),0.16),hsl(var(--primary)/0.07)_42%,transparent_72%)] blur-[36px]" />
      <div className="absolute -left-[12%] top-[12%] size-[min(44rem,68vw)] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.24),transparent_68%)] blur-glow" />
      <div className="absolute -bottom-[18%] -right-[10%] size-[min(50rem,72vw)] rounded-full bg-[radial-gradient(circle,rgba(var(--accent-rgb),0.2),transparent_70%)] blur-glow" />
    </div>
  );
}
