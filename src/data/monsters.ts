import type { JsonBack, JsonFront } from "@/models/monster";
import { Monster } from "@/models/monster";
import jsonMonsters from "@/data/d2e/monsters.json";
import { pairwise } from "@/utils/pairwise";

export const monsters: Monster[] = Array.from(pairwise(jsonMonsters)).map(
  ([jsonFront, jsonBack]) =>
    new Monster(
      jsonFront as unknown as JsonFront,
      jsonBack as unknown as JsonBack
    )
);
