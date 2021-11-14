abstract class DieResult<DieResultType extends DieResult<DieResultType>> {
  abstract combine (other: DieResultType) : DieResultType
}

class DefenseDieResult extends DieResult<DefenseDieResult> {
  shields: number

  constructor (shields: number) {
    super()
    this.shields = shields
  }

  combine (other: DefenseDieResult): DefenseDieResult {
    return new DefenseDieResult(this.shields + other.shields)
  }
}

class CombatDieResult extends DieResult<CombatDieResult> {
  damage: number
  range: number
  surge: number
  miss: boolean

  constructor (damage = 0, range = 0, surge = 0, miss = false) {
    super()
    this.damage = damage
    this.range = range
    this.surge = surge
    this.miss = miss
  }

  combine (other:CombatDieResult) : CombatDieResult {
    return new CombatDieResult(
      this.damage + other.damage,
      this.range + other.range,
      this.surge + other.surge,
      this.miss || other.miss)
  }
}

class Die<DieResultType extends DieResult<DieResultType>> {
  color: string
  sides: DieResultType[]

  constructor (color: string, sides: any[], SideCtor: { new(...args: any[]): DieResultType}) {
    this.color = color
    this.sides = Array.from(sides, (sideArgs: any) => new SideCtor(sideArgs))
  }
}

export class DefenseDie extends Die<DefenseDieResult> {
  constructor (color: string, sides: number[]) {
    super(color, sides, DefenseDieResult)
  }
}

export class CombatDie extends Die<CombatDieResult> {
  constructor (color: string, sides: any[]) {
    super(color, sides, CombatDieResult)
  }
}

export function combineDie<DieResultType extends DieResult<DieResultType>> (die1: DieResultType, die2: DieResultType) {
  return die1.combine(die2)
}
