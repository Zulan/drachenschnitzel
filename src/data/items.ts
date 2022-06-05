import { isWeapon, parseShopWeapon } from "@/models/items";
import type { Weapon } from "@/models/items";
import jsonShopItems from "@/data/d2e/shop-items.json";

export const weapons: Weapon[] = jsonShopItems
  .filter(isWeapon)
  .map(parseShopWeapon);
