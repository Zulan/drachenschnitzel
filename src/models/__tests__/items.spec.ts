import { describe, it, expect, vi } from "vitest";

import {
  Attack,
  Category,
  Equip,
  isWeapon,
  parseDice,
  parseShopWeapon,
  WeaponTrait,
} from "../items";

import jsonShopItems from "@/data/d2e/shop-items.json";
import { combatDiceByColor } from "../../data/dicePool";
import type { CombatDie } from "../dice";

vi.mock("../../utils/assets.ts");

describe("parseDice", () => {
  it("example", () => {
    const dice: CombatDie[] = parseDice("Blue Yellow", combatDiceByColor);
    expect(dice.length).toBe(2);
    const [blue, yellow] = dice;
    expect(blue).toBe(combatDiceByColor.get("blue"));
    expect(yellow).toBe(combatDiceByColor.get("yellow"));
  });
});

describe("parseShopWeapon", () => {
  it("example", () => {
    const weapon = parseShopWeapon(
      {
        name: "Battle Tome",
        points: 2,
        count: 1,
        act: "I",
        cost: 125,
        traits: "Book, Magic",
        attack: "Range",
        equip: "One Hand",
        dice: "Blue Yellow",
        rules:
          "Surge: +1 Range, +1 Heart. Surge Surge: +X Hearts, where X is equal to your Knowledge. After this attack resolves unequip this weapon.",
        expansion: "Mists Of Bilehall",
        image: "shop-items/act1/battle-tome-mb.png",
        xws: "battletome",
      },
      combatDiceByColor
    );
    expect(weapon.name).toBe("Battle Tome");
    expect(weapon.category).toBe(Category.ActI);
    expect(weapon.cost).toBe(125);
    expect(weapon.equip).toBe(Equip.OneHand);
    expect(weapon.expansion).toBe("Mists Of Bilehall");
    expect(weapon.image).toBe(
      "ASSET_PREFIX/d2e/shop-items/act1/battle-tome-mb.png"
    );
    expect(weapon.traits).toEqual([WeaponTrait.Book, WeaponTrait.Magic]);
    expect(weapon.attack).toEqual(Attack.Range);
    expect(weapon.dice).toEqual([
      combatDiceByColor.get("blue"),
      combatDiceByColor.get("yellow"),
    ]);
  });

  it("unknown traits should raise", () => {
    const raw = {
      name: "Battle Tome",
      points: 2,
      count: 1,
      act: "I",
      cost: 125,
      traits: "Book, Phaser",
      attack: "Range",
      equip: "One Hand",
      dice: "Blue Yellow",
      rules:
        "Surge: +1 Range, +1 Heart. Surge Surge: +X Hearts, where X is equal to your Knowledge. After this attack resolves unequip this weapon.",
      expansion: "Mists Of Bilehall",
      image: "shop-items/act1/battle-tome-mb.png",
      xws: "battletome",
    };
    expect(() => parseShopWeapon(raw, combatDiceByColor)).toThrowError(
      "Invalid enum value: Phaser"
    );
  });

  describe("parses all shop weapons", () => {
    for (const json of jsonShopItems) {
      if (isWeapon(json)) {
        it(`parses ${json.name}`, () => {
          parseShopWeapon(json, combatDiceByColor);
        });
      }
    }
  });
});
