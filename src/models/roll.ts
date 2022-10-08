import type { Die } from "@/models/dice";
import { ObjectCounter } from "@/utils/collections";
import { CombatDieResult, combineDie, DefenseDieResult } from "@/models/dice";

export class DieResult {
  combat?: CombatDieResult;
  defense?: DefenseDieResult;

  constructor(
    result?: CombatDieResult | DefenseDieResult,
    result2?: DefenseDieResult
  ) {
    if (result instanceof CombatDieResult) {
      this.combat = result;
    } else if (result instanceof DefenseDieResult) {
      this.defense = result;
      return;
    }
    if (result2 !== undefined) {
      this.defense = result2;
    }
  }

  combine(dieResult: CombatDieResult | DefenseDieResult) {
    // Because structuredClone is not defined in vitest
    // like it's the fucking stone age
    const result = new DieResult(this.combat, this.defense);
    if (dieResult instanceof CombatDieResult) {
      if (result.combat === undefined) {
        result.combat = dieResult;
      } else {
        result.combat = combineDie(result.combat, dieResult);
      }
    } else {
      if (result.defense === undefined) {
        result.defense = dieResult;
      } else {
        result.defense = combineDie(result.defense, dieResult);
      }
    }
    return result;
  }
}

export function roll(dice: Die[]) {
  if (dice.length == 0) {
    return new ObjectCounter<DieResult>();
  }
  let previousMap = new ObjectCounter<DieResult>([[new DieResult(), 1]]);
  for (const die of dice) {
    const newMap = new ObjectCounter<DieResult>();
    for (const side of die.sides) {
      previousMap.forEach((value, key) => {
        newMap.increment(key.combine(side), value);
      });
    }
    previousMap = newMap;
  }
  return previousMap;
}

export function surgeDamage(
  surges: number,
  surgeBonus: [number, number][]
): number {
  let totalDamage = 0;
  let remainingSurges = surges;
  for (const [surgesCost, damage] of surgeBonus) {
    if (remainingSurges >= surgesCost) {
      remainingSurges -= surgesCost;
      totalDamage += damage;
    }
  }
  return totalDamage;
}

export function effectiveDamage(
  raw: ObjectCounter<DieResult>,
  surgeBonus: [number, number][] = []
): ObjectCounter<number> {
  const map = new ObjectCounter<number>();
  raw.forEach((number, result) => {
    if (result.combat === undefined) {
      return;
    }
    if (result.combat.miss) {
      map.increment(0, number);
      return;
    }
    let damage = result.combat.damage;
    damage += surgeDamage(result.combat.surge, surgeBonus);
    if (result.defense) {
      damage -= result.defense.shields;
      damage = Math.max(damage, 0);
    }
    map.increment(damage, number);
  });
  return map;
}
