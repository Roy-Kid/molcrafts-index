import { describe, expect, it } from "@rstest/core";
import { PRODUCT_SLUGS, pathProductSlug } from "@/lib/routes";

describe("pathProductSlug", () => {
  for (const slug of PRODUCT_SLUGS) {
    it(`resolves /${slug}`, () => {
      expect(pathProductSlug(`/${slug}`)).toBe(slug);
    });
  }

  it("resolves a trailing slash", () => {
    expect(pathProductSlug("/molpy/")).toBe("molpy");
  });

  it("resolves a nested path from its first segment", () => {
    expect(pathProductSlug("/molpy/guide/install")).toBe("molpy");
  });

  it("is case-insensitive, so /MolPy still resolves the retired slug", () => {
    expect(pathProductSlug("/MolPy")).toBe("molpy");
  });

  it("returns null for the home path", () => {
    expect(pathProductSlug("/")).toBeNull();
    expect(pathProductSlug("")).toBeNull();
  });

  it("returns null for an unregistered slug so the 404 route takes over", () => {
    expect(pathProductSlug("/molnope")).toBeNull();
    expect(pathProductSlug("/404")).toBeNull();
  });

  it("does not treat a slug appearing later in the path as a match", () => {
    expect(pathProductSlug("/docs/molpy")).toBeNull();
  });
});
