import { useEffect, useState } from "react";

/**
 * Which section currently owns the most of the viewport.
 *
 * Ranking by visible height rather than by each element's own intersection ratio:
 * blocks no longer all share one height, so a short block that happens to be fully
 * on screen must not outrank the tall one the reader is actually looking at.
 */
export function useActiveSection(sectionIds: readonly string[]): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) visible.set(id, entry.intersectionRect.height);
          else visible.delete(id);
        }

        let bestId = "";
        let bestHeight = 0;
        for (const id of sectionIds) {
          const height = visible.get(id) ?? 0;
          if (height > bestHeight) {
            bestId = id;
            bestHeight = height;
          }
        }
        /* Only publish a change. This is the highest-firing observer on the page —
           eight viewport-tall blocks across several thresholds — and every setState
           here re-renders whatever consumes it. */
        if (bestId) setActiveId((prev) => (prev === bestId ? prev : bestId));
      },
      { threshold: [0, 0.25, 0.6, 1] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
