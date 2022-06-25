import type { CombatDie, Die } from "@/models/dice";
import { assetUrl } from "@/utils/assets";
import { enumFromStringValue } from "@/utils/enum";

// export function enumFromStringValue<T>(
//   enm: { [s: string]: T },
//   value: string
// ): T {
//   if ((Object.values(enm) as unknown as string[]).includes(value)) {
//     return value as unknown as T;
//   }
//   throw new Error(`Invalid enum value: ${value}`);
// }

export enum Category {
  ActI = "I",
  ActII = "II",
  Relic = "Relic",
  Class = "Class",
}

export enum Equip {
  OneHand = "One Hand",
  TwoHand = "Two Hands",
  Armor = "Armor",
  Other = "Other",
}

export enum WeaponTrait {
  Axe = "Axe",
  Blade = "Blade",
  Book = "Book",
  Bow = "Bow",
  Exotic = "Exotic",
  Hammer = "Hammer",
  Magic = "Magic",
  Rune = "Rune",
  Staff = "Staff",
  Wand = "Wand",
}

export enum Attack {
  Melee = "Melee",
  Range = "Range",
}

export interface Item {
  name: string;
  category: Category;
  cost: number;
  equip: Equip;
  expansion: string;
  image: string;
}

export interface Weapon extends Item {
  traits: WeaponTrait[];
  attack: Attack;
  dice: CombatDie[];
}

export interface JsonItem {
  name: string;
  points: number;
  traits: string;
  attack: string;
  equip: string;
  dice: string;
  rules: string;
  expansion: string;
  image: string;
  xws: string;
}

export interface JsonShopItem extends JsonItem {
  count: number;
  act: string;
  cost: number;
}

export function parseDice<D extends Die>(
  colors: string,
  diceByColor: Map<string, D>
): D[] {
  function parseDie(color: string): D {
    color = color.toLowerCase();
    const die = diceByColor.get(color);
    if (die === undefined) {
      throw Error(`invalid die color ${color}`);
    }
    return die;
  }

  return colors.split(" ").map(parseDie);
}

function parseShopItem(json: JsonShopItem): Item {
  return {
    name: json.name,
    category: enumFromStringValue(Category, json.act),
    cost: json.cost,
    equip: enumFromStringValue(Equip, json.equip),
    expansion: json.expansion,
    image: assetUrl(`d2e/${json.image}`),
  };
}

export function parseShopWeapon(
  json: JsonShopItem,
  combatDice: Map<string, CombatDie>
): Weapon {
  return {
    ...parseShopItem(json),
    traits: json.traits
      .split(", ")
      .map((value: string) => enumFromStringValue(WeaponTrait, value)),
    attack: enumFromStringValue(Attack, json.attack),
    dice: parseDice(json.dice, combatDice),
  };
}

export function isWeapon(json: JsonItem): boolean {
  return json.attack != undefined && json.attack != "-";
}
