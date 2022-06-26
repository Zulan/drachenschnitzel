import { describe, it, expect } from "vitest";
import { sample, unique } from "../filter";

describe("unique", () => {
  it("empty array", () => {
    expect([].filter(unique)).toEqual([]);
  });
  it("duplicates", () => {
    expect(["foo", "bar", "foo"].filter(unique)).toEqual(["foo", "bar"]);
  });
});

describe("sample", () => {
  it("empty", () => {
    expect([].filter(sample(1))).toEqual([]);
  });
  it("zero throws", () => {
    expect(() => sample(0)).toThrow();
  });
  it("negative throws", () => {
    expect(() => sample(-5)).toThrow();
  });
  it("single of single", () => {
    expect(["foo"].filter(sample(1))).toEqual(["foo"]);
  });
  it("single of multiple", () => {
    const s = ["foo", "bar"].filter(sample(1));
    expect(s.length).toBe(1);
  });
  it("example", () => {
    const s = [1, 2, 3, 4, 5].filter(sample(2));
    expect(s.length).toBe(2);
  });
  it("is sorted", () => {
    const s = Array(10000).filter(sample(100));
    expect(s.sort()).toEqual(s);
  });
  it("too few", () => {
    const list = [1, 2, 3];
    expect(list.filter(sample(5))).toEqual(list);
  });
});
