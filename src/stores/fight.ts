import { defineStore } from "pinia";
import type { CombatDie, DefenseDie } from "@/models/dice";

export const useFightStore = defineStore({
  id: "fight",
  state: () => ({
    combatDice: [] as CombatDie[],
    defenseDice: [] as DefenseDie[],
  }),
  getters: {},
  actions: {},
});
