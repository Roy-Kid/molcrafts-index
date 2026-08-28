import { BrandMark } from "@/lib/brandMark";
import { describe, expect, it } from "@rstest/core";

describe("BrandMark.split", () => {
  it("returns the source as a single text part when the mark is absent", () => {
    expect(BrandMark.split("no company here")).toEqual([
      { kind: "text", value: "no company here", at: 0 },
    ]);
  });

  it("keeps an empty source as one empty text part", () => {
    expect(BrandMark.split("")).toEqual([{ kind: "text", value: "", at: 0 }]);
  });

  it("isolates the mark at the start, middle, and end of a sentence", () => {
    expect(BrandMark.split("MolCrafts builds tools")).toEqual([
      { kind: "mark", value: "MolCrafts", at: 0 },
      { kind: "text", value: " builds tools", at: 9 },
    ]);
    expect(BrandMark.split("Join MolCrafts today")).toEqual([
      { kind: "text", value: "Join ", at: 0 },
      { kind: "mark", value: "MolCrafts", at: 5 },
      { kind: "text", value: " today", at: 14 },
    ]);
    expect(BrandMark.split("About MolCrafts")).toEqual([
      { kind: "text", value: "About ", at: 0 },
      { kind: "mark", value: "MolCrafts", at: 6 },
    ]);
  });

  it("splits every occurrence when the mark repeats", () => {
    expect(BrandMark.split("MolCrafts and MolCrafts")).toEqual([
      { kind: "mark", value: "MolCrafts", at: 0 },
      { kind: "text", value: " and ", at: 9 },
      { kind: "mark", value: "MolCrafts", at: 14 },
    ]);
  });
});
