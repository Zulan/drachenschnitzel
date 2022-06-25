import { describe, it, expect } from "vitest";

import { relicWeapons, shopWeapons, weapons } from "../items";

describe("items", () => {
  it("shop weapons", () => {
    expect(shopWeapons.length).toBeGreaterThan(0);
  });
  it("relic weapons", () => {
    expect(relicWeapons.length).toBeGreaterThan(0);
  });
  it("all weapons", () => {
    expect(weapons.length).toBeGreaterThan(0);
  });
});
