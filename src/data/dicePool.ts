import { CombatDie, DefenseDie } from "@/models/dice";

export const dicePool = {
  attack: new CombatDie("blue", [
    [0, 0, 0, true],
    [2, 2, 1],
    [2, 3],
    [2, 4],
    [1, 5],
    [1, 6, 1],
  ]),
  power: [
    new CombatDie("red", [[1], [2], [2], [2], [3], [3, 0, 1]]),
    new CombatDie("yellow", [
      [0, 1, 1],
      [1, 1],
      [1, 2],
      [1, 0, 1],
      [2],
      [2, 0, 1],
    ]),
    new CombatDie("green", [[1], [0, 0, 1], [1, 1], [1, 0, 1], [1, 1, 1]]),
  ],
  defense: [
    new DefenseDie("brown", [0, 0, 0, 1, 1, 2]),
    new DefenseDie("gray", [0, 1, 1, 1, 2, 3]),
    new DefenseDie("black", [0, 2, 2, 2, 3, 4]),
  ],
};

export const combatDiceByColor = new Map<string, CombatDie>([
  [dicePool.attack.color, dicePool.attack],
  ...dicePool.power.map<[string, CombatDie]>((die: CombatDie) => [
    die.color,
    die,
  ]),
]);
