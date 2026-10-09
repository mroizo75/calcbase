import { describe, expect, it } from "vitest";
import { mapHouseAd, pickHouseAd, safeHttpUrl, type HouseAd } from "@/lib/ads/house-ad";

function ad(partial: Partial<HouseAd> & Pick<HouseAd, "id">): HouseAd {
  return {
    name: partial.id,
    alt: "Example offer",
    href: "https://example.com",
    imageUrl: "https://cdn.sanity.io/images/demo/production/abc.jpg",
    placements: ["site-below-header"],
    countries: [],
    priority: 0,
    ...partial,
  };
}

describe("pickHouseAd", () => {
  it("prefers a country ad over a worldwide ad", () => {
    const chosen = pickHouseAd(
      [
        ad({ id: "world", countries: [] }),
        ad({ id: "us", countries: ["US"] }),
      ],
      "site-below-header",
      "US",
    );
    expect(chosen?.id).toBe("us");
  });

  it("shows the worldwide ad when the visitor is somewhere else", () => {
    const chosen = pickHouseAd(
      [
        ad({ id: "world", countries: [] }),
        ad({ id: "us", countries: ["US"] }),
      ],
      "site-below-header",
      "NO",
    );
    expect(chosen?.id).toBe("world");
  });

  it("returns nothing when only another country matches", () => {
    const chosen = pickHouseAd(
      [ad({ id: "us", countries: ["US"] })],
      "site-below-header",
      null,
    );
    expect(chosen).toBeNull();
  });

  it("uses the higher priority when several ads match", () => {
    const chosen = pickHouseAd(
      [
        ad({ id: "low", priority: 1 }),
        ad({ id: "high", priority: 5 }),
      ],
      "site-below-header",
      "US",
    );
    expect(chosen?.id).toBe("high");
  });
});

describe("mapHouseAd", () => {
  it("keeps a complete banner", () => {
    const mapped = mapHouseAd({
      _id: "ad-1",
      name: "US banner",
      alt: "Spring offer",
      href: "https://partner.example/offer",
      imageUrl: "https://cdn.sanity.io/images/demo/production/abc.jpg",
      placements: ["calc-below-intro", "not-a-slot"],
      countries: ["us", "NO"],
      priority: 2,
      width: 728,
      height: 90,
    });
    expect(mapped).toMatchObject({
      id: "ad-1",
      placements: ["calc-below-intro"],
      countries: ["US", "NO"],
      priority: 2,
    });
  });

  it("drops javascript links and ads with no real placement", () => {
    expect(safeHttpUrl("javascript:alert(1)")).toBeNull();
    expect(
      mapHouseAd({
        _id: "bad",
        alt: "Bad",
        href: "javascript:alert(1)",
        imageUrl: "https://cdn.sanity.io/images/demo/production/abc.jpg",
        placements: ["site-below-header"],
      }),
    ).toBeNull();
  });
});
