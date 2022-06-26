import {
  isWeapon,
  parseShopWeapon,
  Category,
  parseShopItem,
} from "@/models/items";
import type { JsonShopItem, JsonItem, Item } from "@/models/items";
import type { Weapon } from "@/models/items";

import jsonShopItems from "@/data/d2e/shop-items.json";
import jsonRelics from "@/data/d2e/relics.json";
import jsonClassItems from "@/data/d2e/class-items.json";
import { combatDiceByColor } from "@/data/dicePool";

export const shopWeapons: Weapon[] = jsonShopItems
  .filter(isWeapon)
  .map((weapon) => parseShopWeapon(weapon, combatDiceByColor));

export const relicWeapons: Weapon[] = jsonRelics
  .filter(isWeapon)
  .map((weapon) =>
    parseShopWeapon(
      { act: Category.Relic, ...weapon } as JsonShopItem,
      combatDiceByColor
    )
  );

export const classWeapons: Weapon[] = (jsonClassItems as JsonItem[])
  .filter(isWeapon)
  .map((weapon) =>
    parseShopWeapon(
      { act: Category.Class, ...weapon } as JsonShopItem,
      combatDiceByColor
    )
  );

export const weapons: Weapon[] = [
  ...shopWeapons,
  ...relicWeapons,
  ...classWeapons,
];

export const shopItems: Item[] = jsonShopItems.map(parseShopItem);
export const relicItems: Item[] = jsonRelics
  .filter((relic) => relic.equip !== "-")
  .map((relic) =>
    parseShopItem({ act: Category.Relic, ...relic } as JsonShopItem)
  );
export const classItems: Item[] = jsonClassItems
  .filter((classItem) => classItem.equip !== undefined)
  .map((classItem) =>
    parseShopItem({
      act: Category.Class,
      ...classItem,
    } as unknown as JsonShopItem)
  );

export const items: Item[] = [...shopItems, ...relicItems, ...classItems];
