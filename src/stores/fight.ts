import { defineStore } from "pinia";
import { CombatDie, DefenseDie, DiceSet } from "@/models/dice";
import { dicePool } from "@/data/dicePool";

export const useFightStore = defineStore({
  id: "fight",
  state: () => ({
    combatDiceSet: new DiceSet(
      [dicePool.attack, ...dicePool.power],
      [dicePool.attack]
    ),
    defenseDiceSet: new DiceSet(dicePool.defense, []),
  }),
  getters: {
    combatDicePool: (state) => Array.from(state.combatDiceSet.pool()),
    defenseDicePool: (state) => Array.from(state.defenseDiceSet.pool()),
  },
  actions: {
    addDie(die: CombatDie | DefenseDie) {
      if (die instanceof CombatDie) {
        this.combatDiceSet.add(die);
      } else {
        this.defenseDiceSet.add(die);
      }
    },
    removeDie(die: CombatDie | DefenseDie) {
      if (die instanceof CombatDie) {
        this.combatDiceSet.remove(die);
      } else {
        this.defenseDiceSet.remove(die);
      }
    },
    resetDie() {
      this.combatDiceSet.reset();
      this.defenseDiceSet.reset();
    },
  },
});
