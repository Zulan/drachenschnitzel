import { describe, it, expect } from "vitest";

import {
  relicWeapons,
  classWeapons,
  shopWeapons,
  weapons,
  shopItems,
  items,
  classItems,
  relicItems,
} from "../items";

describe("items", () => {
  it("shop weapons", () => {
    expect(shopWeapons.length).toBeGreaterThan(0);
  });
  it("relic weapons", () => {
    expect(relicWeapons.length).toBeGreaterThan(0);
  });
  it("class weapons", () => {
    expect(classWeapons.length).toBeGreaterThan(0);
  });
  it("all weapons", () => {
    expect(weapons.length).toBeGreaterThan(0);
  });
  it("shop items", () => {
    expect(shopItems.length).toBeGreaterThan(0);
  });
  it("relic items", () => {
    expect(relicItems.length).toBeGreaterThan(0);
  });
  it("class items", () => {
    expect(classItems.length).toBeGreaterThan(0);
  });
  it("all items", () => {
    expect(items.length).toBeGreaterThan(0);
  });
});
