import { describe, it, expect } from "vitest";

import { monsters } from "../monsters";

describe("monsters", () => {
  it("is not empty and was parsed correctly", () => {
    expect(monsters.length).toBeGreaterThan(0);
  });
});
