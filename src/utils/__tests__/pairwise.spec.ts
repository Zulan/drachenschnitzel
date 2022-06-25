import { describe, it, expect } from "vitest";

import { pairwise } from "../pairwise";

describe("pairwise", () => {
  it("empty", () => {
    expect(Array.from(pairwise([]))).toEqual([]);
  });
  it("simple", () => {
    expect(Array.from(pairwise([1, 2]))).toEqual([[1, 2]]);
  });
  it("longer", () => {
    expect(Array.from(pairwise(["foo", "bar", "baz", "bay"]))).toEqual([
      ["foo", "bar"],
      ["baz", "bay"],
    ]);
  });
  it("odd", () => {
    expect(() => pairwise([1])).toThrowError();
  });
});
