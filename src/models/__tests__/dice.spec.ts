import { describe, it, expect } from "vitest";

import { CombatDie, DefenseDie, DiceSet } from "../dice";

describe("CombatDie", () => {
  it("define", () => {
    const die = new CombatDie("purple", [[0, 0, 0, true], [3], [1, 1, 1]]);
    expect(die.sides.length).toEqual(3);
    expect(die.sides[0].damage).toBe(0);
    expect(die.sides[0].range).toBe(0);
    expect(die.sides[0].surge).toBe(0);
    expect(die.sides[0].miss).toBeTruthy();
    expect(die.sides[1].damage).toBe(3);
    expect(die.sides[1].range).toBe(0);
    expect(die.sides[1].surge).toBe(0);
    expect(die.sides[1].miss).toBeFalsy();
    expect(die.sides[2].damage).toBe(1);
    expect(die.sides[2].range).toBe(1);
    expect(die.sides[2].surge).toBe(1);
    expect(die.sides[2].miss).toBeFalsy();
  });
});

describe("DefenseDie", () => {
  it("define", () => {
    const die = new DefenseDie("pink", [0, 1]);
    expect(die.sides.length).toEqual(2);
    expect(die.sides[0].shields).toBe(0);
    expect(die.sides[1].shields).toBe(1);
  });
});

const dieA = new DefenseDie("A", [0, 1]);
const dieB = new DefenseDie("B", [0, 2]);

describe("DiceSet", () => {
  it("iterate and linear", () => {
    const ds = new DiceSet<DefenseDie>([dieA, dieB]);
    ds.add(dieA);
    ds.add(dieA);
    ds.add(dieB);
    expect([...ds]).toEqual([
      [dieA, 2],
      [dieB, 1],
    ]);
    expect([...ds.linear()]).toEqual([dieA, dieA, dieB]);
  });
});
