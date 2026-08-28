import { type ThreadStation, threadPath } from "@/lib/home/thread";
import { describe, expect, it } from "@rstest/core";

const FRAME = { inset: 20, overshoot: 30 };

/** Three stations stepping right with a uniform 48px row gap. */
const CASCADE: ThreadStation[] = [
  { left: 20, top: 0, bottom: 100 },
  { left: 220, top: 148, bottom: 248 },
  { left: 420, top: 296, bottom: 396 },
];

describe("threadPath", () => {
  it("joins stations with quarter-circle fillets of half the row gap", () => {
    expect(threadPath(CASCADE, FRAME)).toBe(
      [
        "M 0 -30",
        "L 0 100",
        "A 24 24 0 0 0 24 124",
        "L 176 124",
        "A 24 24 0 0 1 200 148",
        "L 200 248",
        "A 24 24 0 0 0 224 272",
        "L 376 272",
        "A 24 24 0 0 1 400 296",
        "L 400 426",
      ].join(" "),
    );
  });

  it("keeps the path continuous: each junction lands exactly on the next station's top", () => {
    const d = threadPath(CASCADE, FRAME);
    // The second fillet of the first junction must end at (200, 148) — the
    // measured top of station two — so the following vertical starts there.
    expect(d).toContain("A 24 24 0 0 1 200 148 L 200 248");
  });

  it("clamps the radius to half the horizontal travel when stations sit close", () => {
    const d = threadPath(
      [
        { left: 20, top: 0, bottom: 100 },
        { left: 30, top: 148, bottom: 248 },
      ],
      FRAME,
    );
    expect(d).toContain("A 5 5");
    // The clamped fillets cover 10px of the 48px gap; the closing vertical
    // spans the remainder down to the last station's bottom plus overshoot.
    expect(d.endsWith("L 10 278")).toBe(true);
  });

  it("degenerates to one vertical line for a single station", () => {
    expect(threadPath([{ left: 20, top: 0, bottom: 100 }], FRAME)).toBe("M 0 -30 L 0 130");
  });

  it("returns an empty path for no stations", () => {
    expect(threadPath([], FRAME)).toBe("");
  });
});
