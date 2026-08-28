import { useEffect, useState } from "react";

/**
 * Tracks a media query in JS so a component can render one branch instead of
 * shipping both and hiding one with CSS.
 *
 * Resolved synchronously on the first render, not after mount. Correcting later
 * swaps one branch for another of a different height, and every anchor below it
 * moves — a deep link that had already scrolled lands ~50px off, and a scroll
 * position taken mid-swap can be clamped against a document that is about to grow.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}
