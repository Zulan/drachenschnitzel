import { CombatDie, DefenseDie } from '../dice'

export type CombatState = {
  combatDice: CombatDie[]
  defenseDice: DefenseDie[]

  actions: {
    addCombatDie(die: CombatDie) {
      this.combatDice.push(die)
  }
  }
}
