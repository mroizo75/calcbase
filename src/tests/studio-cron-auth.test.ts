import { describe, expect, it } from "vitest";
import { canRunWeeklySeo } from "@/lib/seo/studio-cron-auth";

describe("canRunWeeklySeo", () => {
  it("allows project roles that can edit content", () => {
    expect(canRunWeeklySeo(["administrator"])).toBe(true);
    expect(canRunWeeklySeo(["editor"])).toBe(true);
  });

  it("rejects viewers and empty sessions", () => {
    expect(canRunWeeklySeo(["viewer"])).toBe(false);
    expect(canRunWeeklySeo([])).toBe(false);
  });
});
