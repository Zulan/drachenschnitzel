class Die {
  constructor (color, sides) {
    this.color = color
    this.sides = Array.from(sides, ({ sideArgs }) => new this.SideType(sideArgs))
  }
}

class DefenseDieResult {
  constructor (shields) {
    this.shields = shields
  }

  combine (other) {
    return new DefenseDieResult(this.shields + other.shields)
  }
}

class CombatDieResult {
  constructor (damage = 0, range = 0, surge = 0, miss = false) {
    this.damage = damage
    this.range = range
    this.surge = surge
    this.miss = miss
  }

  combine (other) {
    return new CombatDieResult(
      this.damage + other.damage,
      this.range + other.range,
      this.surge + other.surge,
      this.miss || other.miss)
  }
}

export class DefenseDie extends Die {
  constructor(...args) {
    this.SideType = DefenseDieResult
    super(...args)
  }
}

export class CombatDie extends Die {
  SideType = CombatDieResult
}

export function combineDie (die1, die2) {
  return die1.combine(die2)
}
