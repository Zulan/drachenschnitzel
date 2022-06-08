import { isWeapon, parseShopWeapon } from "@/models/items";
import type { Weapon } from "@/models/items";
import jsonShopItems from "@/data/d2e/shop-items.json";
import { combatDiceByColor } from "@/data/dicePool";

export const weapons: Weapon[] = jsonShopItems
  .filter(isWeapon)
  .map((weapon) => parseShopWeapon(weapon, combatDiceByColor));
