import { describe, expect, it } from "vitest";
import {
  countryCode,
  isPublicIp,
  publicIpFromHeaders,
} from "@/lib/ads/visitor-country";

describe("visitor country", () => {
  it("reads a country code and ignores unknown markers", () => {
    expect(countryCode("no")).toBe("NO");
    expect(countryCode("XX")).toBeNull();
  });

  it("ignores private addresses and uses the proxy's real public IP", () => {
    expect(isPublicIp("127.0.0.1")).toBe(false);
    expect(isPublicIp("10.0.0.8")).toBe(false);
    expect(isPublicIp("8.8.8.8")).toBe(true);

    const headers = new Headers({
      "x-forwarded-for": "203.0.113.5, 8.8.8.8",
      "x-real-ip": "10.0.0.4",
    });
    expect(publicIpFromHeaders(headers)).toBe("8.8.8.8");
  });
});
