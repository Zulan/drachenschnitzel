import { describe, it, expect, vi } from "vitest";

import { ObjectCounter } from "../utils";

interface TestKey {
  name: string;
  age?: number;
}

describe("ObjectCounter", () => {
  it("empty get", () => {
    const c = new ObjectCounter<TestKey>();
    expect(c.get({ name: "Foo", age: 13 })).toEqual(0);
  });

  it("single increment", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo", age: 13 });
    expect(c.get({ name: "Foo", age: 13 })).toEqual(1);
  });

  it("double increment", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo", age: 13 });
    c.increment({ name: "Foo", age: 13 });
    expect(c.get({ name: "Foo", age: 13 })).toEqual(2);
  });

  it("different key increment", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo", age: 14 });
    c.increment({ name: "Foo", age: 15 });
    expect(c.get({ name: "Foo", age: 13 })).toEqual(0);
  });

  it("different key increment", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo", age: 13 });
    c.increment({ name: "Foo", age: 13 });
    c.increment({ name: "Bar" });
    expect(c.get({ name: "Foo", age: 13 })).toEqual(2);
  });

  it("empty forEach", () => {
    const c = new ObjectCounter<TestKey>();
    const f = vi.fn();
    c.forEach(f);
    expect(f).toHaveBeenCalledTimes(0);
  });

  it("single forEach", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo" });
    const f = vi.fn();
    c.forEach(f);
    expect(f).toHaveBeenCalledOnce();
    expect(f).toHaveBeenCalledWith(1, { name: "Foo" });
  });

  it("complex forEach", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo" });
    c.increment({ name: "Foo" });
    c.increment({ name: "Bar", age: 99 });
    const f = vi.fn();
    c.forEach(f);
    expect(f).toHaveBeenCalledTimes(2);
    expect(f).toHaveBeenCalledWith(2, { name: "Foo" });
    expect(f).toHaveBeenCalledWith(1, { name: "Bar", age: 99 });
  });

  it("complex entries", () => {
    const c = new ObjectCounter<TestKey>();
    c.increment({ name: "Foo" });
    c.increment({ name: "Foo" });
    c.increment({ name: "Bar", age: 99 });
    const result = [...c.entries()];
    expect(result).toEqual([
      [{ name: "Foo" }, 2],
      [{ name: "Bar", age: 99 }, 1],
    ]);
  });

  it("construct", () => {
    const c = new ObjectCounter<TestKey>([
      [{ name: "Foo" }, 2],
      [{ name: "Bar", age: 99 }, 1],
    ]);
    const f = vi.fn();
    c.forEach(f);
    expect(f).toHaveBeenCalledTimes(2);
    expect(f).toHaveBeenCalledWith(2, { name: "Foo" });
    expect(f).toHaveBeenCalledWith(1, { name: "Bar", age: 99 });
  });
});
