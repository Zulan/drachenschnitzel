import { Attack } from "@/models/items";
import { assert } from "@/utils/assert";
import { enumFromStringValue } from "@/utils/enum";
import { assetUrl } from "@/utils/assets";

export enum Act {
  I = "I",
  II = "II",
}

export enum Trait {
  Building = "Building",
  Cave = "Cave",
  Civilized = "Civilized",
  Cold = "Cold",
  Cursed = "Cursed",
  Dark = "Dark",
  Hot = "Hot",
  Mountain = "Mountain",
  Water = "Water",
  Wilderness = "Wilderness",
}

export enum Rank {
  Minion = "Minion",
  Master = "Master",
}

export interface JsonFront {
  name: string;
  points: number;
  act: string;
  attack: string;
  characteristics: string[];
  expansion: string;
  image: string;
  xws: string;
}

export interface JsonBack {
  name: string;
  points: number;
  act: string;
  traits: string[];
  "ability rules": string[];
  "group size": string[];
  expansion: string;
  image: string;
  xws: string;
}

export class Monster {
  name: string;
  act: Act;
  attack: Attack;
  expansion: string;
  image: { front: string; back: string };
  traits: Trait[];
  constructor(jsonFront: JsonFront, jsonBack: JsonBack) {
    assert(jsonFront.name == jsonBack.name);
    this.name = jsonFront.name;
    assert(jsonFront.act == jsonBack.act);
    this.act = enumFromStringValue(Act, jsonFront.act);
    this.attack = enumFromStringValue(Attack, jsonFront.attack);
    assert(jsonFront.expansion == jsonBack.expansion);
    this.expansion = jsonFront.expansion;
    this.image = {
      front: assetUrl(`d2e/${jsonFront.image}`),
      back: assetUrl(`d2e/${jsonBack.image}`),
    };
    this.traits = jsonBack.traits.map((trait: string) =>
      enumFromStringValue(Trait, trait)
    );
    assert(
      jsonFront.xws == jsonBack.xws,
      `${jsonFront.xws} != ${jsonBack.xws}`
    );
  }
  get nameAct() {
    return `${this.name} Act ${this.act}`;
  }
}
