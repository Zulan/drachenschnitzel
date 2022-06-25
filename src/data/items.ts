import { isWeapon, parseShopWeapon, Category } from "@/models/items";
import type { JsonShopItem } from "@/models/items";
import type { Weapon } from "@/models/items";
import jsonShopItems from "@/data/d2e/shop-items.json";
import jsonRelics from "@/data/d2e/relics.json";
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

export const weapons: Weapon[] = [...shopWeapons, ...relicWeapons];
