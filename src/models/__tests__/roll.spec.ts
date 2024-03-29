import { describe, it, expect } from "vitest";

import { roll, DieResult, effectiveDamage, surgeDamage } from "../roll";
import {
  CombatDie,
  CombatDieResult,
  DefenseDie,
  DefenseDieResult,
} from "../dice";
import { ObjectCounter } from "@/utils/collections";

const brownDie = new DefenseDie("brown", [0, 0, 0, 1, 1, 2]);
const blackDie = new DefenseDie("black", [0, 2, 2, 2, 3, 4]);
const simpleDefenseDie = new DefenseDie("black", [0, 1]);
const simpleCombatDie = new CombatDie("red", [
  [1, 2],
  [2, 0, 1],
]);

describe("DieResult", () => {
  it("empty initialization", () => {
    const r = new DieResult();
    expect(r.combat).toBeUndefined();
    expect(r.defense).toBeUndefined();
  });

  it("empty combine", () => {
    const r = new DieResult().combine(new DefenseDieResult(1));
    expect(r.combat).toBeUndefined();
    expect(r.defense).toEqual(new DefenseDieResult(1));
  });

  it("simple combine", () => {
    const r = new DieResult()
      .combine(new DefenseDieResult(1))
      .combine(new DefenseDieResult(2));
    expect(r.combat).toBeUndefined();
    expect(r.defense).toEqual(new DefenseDieResult(3));
  });

  it("complex combine", () => {
    const r = new DieResult()
      .combine(new CombatDieResult(3))
      .combine(new DefenseDieResult(1))
      .combine(new CombatDieResult(1, 2, 1))
      .combine(new CombatDieResult(1, 1, 1))
      .combine(new DefenseDieResult(2));
    expect(r.combat).toEqual(new CombatDieResult(5, 3, 2, false));
    expect(r.defense).toEqual(new DefenseDieResult(3));
  });
});

describe("roll", () => {
  it("computes empty", () => {
    const result = roll([]);
    expect(result).toEqual(new ObjectCounter<DieResult>());
  });

  it("computes single defense die", () => {
    const result = roll([brownDie]);
    expect(result).toEqual(
      new ObjectCounter<DieResult>([
        [new DieResult(new DefenseDieResult(0)), 3],
        [new DieResult(new DefenseDieResult(1)), 2],
        [new DieResult(new DefenseDieResult(2)), 1],
      ])
    );
  });

  it("computes two defense dice", () => {
    const result = roll([brownDie, brownDie]);
    expect(result).toEqual(
      new ObjectCounter<DieResult>([
        [new DieResult(new DefenseDieResult(0)), 9],
        [new DieResult(new DefenseDieResult(1)), 12],
        [new DieResult(new DefenseDieResult(2)), 10],
        [new DieResult(new DefenseDieResult(3)), 4],
        [new DieResult(new DefenseDieResult(4)), 1],
      ])
    );
  });

  it("computes two different defense dice", () => {
    const result = roll([brownDie, blackDie]);
    expect(result).toEqual(
      new ObjectCounter<DieResult>([
        [new DieResult(new DefenseDieResult(0)), 3],
        [new DieResult(new DefenseDieResult(1)), 2],
        [new DieResult(new DefenseDieResult(2)), 10],
        [new DieResult(new DefenseDieResult(3)), 9],
        [new DieResult(new DefenseDieResult(4)), 8],
        [new DieResult(new DefenseDieResult(5)), 3],
        [new DieResult(new DefenseDieResult(6)), 1],
      ])
    );
  });

  it("computes three simple dice", () => {
    const result = roll([simpleDefenseDie, simpleDefenseDie, simpleDefenseDie]);
    expect(result).toEqual(
      new ObjectCounter<DieResult>([
        [new DieResult(new DefenseDieResult(0)), 1],
        [new DieResult(new DefenseDieResult(1)), 3],
        [new DieResult(new DefenseDieResult(2)), 3],
        [new DieResult(new DefenseDieResult(3)), 1],
      ])
    );
  });

  it("single simple attack", () => {
    const result = roll([simpleCombatDie]);
    expect(result).toEqual(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(2, 0, 1)), 1],
        [new DieResult(new CombatDieResult(1, 2)), 1],
      ])
    );
  });

  it("computes one attack and one defense", () => {
    const result = roll([simpleCombatDie, simpleDefenseDie]);
    expect(result).toEqual(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(1, 2), new DefenseDieResult(0)), 1],
        [new DieResult(new CombatDieResult(1, 2), new DefenseDieResult(1)), 1],
        [
          new DieResult(new CombatDieResult(2, 0, 1), new DefenseDieResult(0)),
          1,
        ],
        [
          new DieResult(new CombatDieResult(2, 0, 1), new DefenseDieResult(1)),
          1,
        ],
      ])
    );
  });
});

describe("effectiveDamage", () => {
  it("trivial", () => {
    const damage = effectiveDamage(
      new ObjectCounter<DieResult>([[new DieResult(new CombatDieResult(1)), 5]])
    );
    expect([...damage.entries()]).toEqual([[1, 5]]);
  });

  it("defense", () => {
    const damage = effectiveDamage(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(2), new DefenseDieResult(1)), 5],
      ])
    );
    expect([...damage.entries()]).toEqual([[1, 5]]);
  });

  it("much defense", () => {
    const damage = effectiveDamage(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(2), new DefenseDieResult(3)), 5],
      ])
    );
    expect([...damage.entries()]).toEqual([[0, 5]]);
  });

  it("miss", () => {
    const damage = effectiveDamage(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(2, 0, 0, true)), 5],
      ])
    );
    expect([...damage.entries()]).toEqual([[0, 5]]);
  });

  it("combine", () => {
    const damage = effectiveDamage(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(1, 0, 0, false)), 1],
        [
          new DieResult(
            new CombatDieResult(2, 0, 0, false),
            new DefenseDieResult(1)
          ),
          2,
        ],
        [new DieResult(new CombatDieResult(2, 0, 0, true)), 4],
        [new DieResult(new CombatDieResult(2), new DefenseDieResult(2)), 8],
      ])
    );
    expect([...damage.entries()]).toEqual([
      [1, 3],
      [0, 12],
    ]);
  });
  it("simple surge damage is added properly", () => {
    const damage = effectiveDamage(
      new ObjectCounter<DieResult>([
        [new DieResult(new CombatDieResult(1, 0, 0)), 4],
        [new DieResult(new CombatDieResult(1, 0, 1)), 2],
      ]),
      [[1, 1]]
    );
    expect([...damage.entries()]).toEqual([
      [1, 4],
      [2, 2],
    ]);
  });
});

describe("surgeDamage", () => {
  it("no bonus, no damage", () => {
    const damage = surgeDamage(1, []);
    expect(damage).toEqual(0);
  });
  it("no surges, no damage", () => {
    const damage = surgeDamage(0, [[1, 2]]);
    expect(damage).toEqual(0);
  });
  it("very simple surge", () => {
    const damage = surgeDamage(1, [[1, 2]]);
    expect(damage).toEqual(2);
  });
  it("use only first of multiple surges", () => {
    const damage = surgeDamage(1, [
      [1, 2],
      [1, 1],
    ]);
    expect(damage).toEqual(2);
  });
  it("use one bonus only once", () => {
    const damage = surgeDamage(2, [[1, 2]]);
    expect(damage).toBe(2);
  });
  it("use multiple surges", () => {
    const damage = surgeDamage(2, [
      [1, 2],
      [1, 1],
    ]);
    expect(damage).toBe(3);
  });
  it("multiple surges for one bonus", () => {
    const damage = surgeDamage(2, [
      [2, 2],
      [1, 1],
    ]);
    expect(damage).toBe(2);
  });
  it("use cheaper surges if first are too costly", () => {
    const damage = surgeDamage(2, [
      [3, 5],
      [2, 2],
    ]);
    expect(damage).toEqual(2);
  });
  it("another complex example", () => {
    const damage = surgeDamage(3, [
      [2, 3],
      [2, 2],
      [1, 1],
    ]);
    expect(damage).toEqual(4);
  });
  it("just give bonus damage for free", () => {
    const damage = surgeDamage(0, [
      [0, 1],
      [1, 3],
    ]);
    expect(damage).toEqual(1);
  });
  it("just give bonus damage for free on top of surges", () => {
    const damage = surgeDamage(1, [
      [0, 1],
      [1, 3],
    ]);
    expect(damage).toEqual(4);
  });
});
