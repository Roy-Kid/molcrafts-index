/**
 * One slice of copy after isolating the company name.
 *
 * `at` is the start index in the source string, so React can key the slice
 * without using the map index.
 */
export type BrandMarkPart =
  | { readonly kind: "text"; readonly value: string; readonly at: number }
  | { readonly kind: "mark"; readonly value: "MolCrafts"; readonly at: number };

/**
 * The company name as a typed mark, not a loose string.
 *
 * Every visible "MolCrafts" on the site is this word, painted with the blue-to-
 * light-blue wordmark ramp. Splitting running copy here keeps the word intact
 * and stops each screen from inventing its own wrap.
 */
export const BrandMark = {
  TEXT: "MolCrafts",

  split(source: string): ReadonlyArray<BrandMarkPart> {
    if (source.length === 0) {
      return [{ kind: "text", value: "", at: 0 }];
    }
    const parts: BrandMarkPart[] = [];
    let cursor = 0;
    while (cursor < source.length) {
      const at = source.indexOf(BrandMark.TEXT, cursor);
      if (at < 0) {
        parts.push({ kind: "text", value: source.slice(cursor), at: cursor });
        break;
      }
      if (at > cursor) {
        parts.push({ kind: "text", value: source.slice(cursor, at), at: cursor });
      }
      parts.push({ kind: "mark", value: BrandMark.TEXT, at });
      cursor = at + BrandMark.TEXT.length;
    }
    return parts;
  },
} as const;
