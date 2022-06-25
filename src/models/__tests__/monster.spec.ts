import { describe, it, expect } from "vitest";
import { Act, Monster, Trait } from "../monster";
import { Attack } from "../items";
import { assetUrl } from "../../utils/assets";

describe("parseMonster", () => {
  it("example", () => {
    const shade = new Monster(
      {
        name: "Shade",
        points: 322,
        act: "II",
        attack: "Melee",
        characteristics: [
          "Minion: Speed: 5, Health: 4, Defense: Black, Attack: Blue Red, Abilities: Soul Shackle 1, Action: Flicker, Surge: Pierce 1",
          "Master: Speed: 5, Health: 7, Defense: Black, Attack: Blue Red Yellow, Abilities: Soul Shackle 3, Action: Flicker, Surge: Pierce 2",
        ],
        expansion: "Shards Of Everdark",
        image: "monsters/shade-se-act2-front.png",
        xws: "shade",
      },
      {
        name: "Shade",
        points: 323,
        act: "II",
        traits: ["Cursed", "Dark"],
        "ability rules": [
          "Soul Shackle X: Each time a hero within 3 spaces of this monster recovers 1 or more Fatigue, this monster may suffer X Hearts to reduce the amount of Fatigue recovered by X (to a minimum of 0).",
          "Flicker: Choose 1 hero within 3 spaces of this monster. Remove this monster from the map and place it adjacent to that hero. Then, if this monster has not performed an attack this activation, that hero tests Awareness. If he fails, perform an attack with this monster that targets that hero.",
          "Pierce X: This attack ignores X Shields rolled on the defense dice.",
        ],
        "group size": ["2 Heroes: 2,1", "3 Heroes: 3,1", "4 Heroes: 4,1"],
        expansion: "Shards Of Everdark",
        image: "monsters/shade-se-act2-back.png",
        xws: "shade",
      }
    );
    expect(shade.name).toBe("Shade");
    expect(shade.act).toBe(Act.II);
    expect(shade.attack).toBe(Attack.Melee);
    expect(shade.expansion).toBe("Shards Of Everdark");
    expect(shade.image).toEqual({
      front: assetUrl("d2e/monsters/shade-se-act2-front.png"),
      back: assetUrl("d2e/monsters/shade-se-act2-back.png"),
    });
    expect(shade.traits).toEqual([Trait.Cursed, Trait.Dark]);
  });
});
