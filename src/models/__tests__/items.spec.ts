import { describe, it, expect, vi } from "vitest";

import {
  Attack,
  Category,
  isWeapon,
  parseShopWeapon,
  WeaponTrait,
} from "../items";

import jsonShopItems from "@/data/d2e/shop-items.json";

vi.mock("../utils.ts");

describe("parseShopWeapon", () => {
  it("example", () => {
    const weapon = parseShopWeapon({
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
    });
    expect(weapon.name).toBe("Battle Tome");
    expect(weapon.category).toBe(Category.ActI);
    expect(weapon.cost).toBe(125);
    expect(weapon.expansion).toBe("Mists Of Bilehall");
    expect(weapon.image).toBe(
      "ASSET_PREFIX/d2e/shop-items/act1/battle-tome-mb.png"
    );
    expect(weapon.traits).toEqual([WeaponTrait.Book, WeaponTrait.Magic]);
    expect(weapon.attack).toEqual(Attack.Range);
    //expect(weapon.dice).toEqual()
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
    expect(() => parseShopWeapon(raw)).toThrowError(
      "Invalid enum value: Phaser"
    );
  });

  describe("parses all shop weapons", () => {
    for (const json of jsonShopItems) {
      if (isWeapon(json)) {
        it(`parses ${json.name}`, () => {
          parseShopWeapon(json);
        });
      }
    }
  });
});
