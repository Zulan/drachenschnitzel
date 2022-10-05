import { describe, it, expect } from "vitest";

import { ObjectCounter } from "../collections";
import { processChartData } from "../chart";

describe("processChartData", () => {
  it("empty", () => {
    const objectCounter = new ObjectCounter<number>();
    const r = [...processChartData(objectCounter)];
    expect(r).toHaveLength(0);
  });
});

describe("processChartData", () => {
  it("converts key to string", () => {
    const objectCounter = new ObjectCounter<number>();
    objectCounter.increment(3);
    objectCounter.increment(3);
    const r = [...processChartData(objectCounter)];
    expect(r).toHaveLength(1);
    const [key, value] = r[0];
    expect(key).toBe("3");
    expect(value).toBe(1);
  });
});

describe("processChartData", () => {
  it("fills the gaps", () => {
    const objectCounter = new ObjectCounter<number>();
    objectCounter.increment(3);
    objectCounter.increment(3);
    objectCounter.increment(6);
    const r = [...processChartData(objectCounter)];
    expect(r).toHaveLength(4);
    expect(r).toStrictEqual([
      ["3", 2 / 3],
      ["4", 0],
      ["5", 0],
      ["6", 1 / 3],
    ]);
  });
});
