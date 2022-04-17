abstract class DieResult<DieResultType extends DieResult<DieResultType>> {
  abstract combine(other: DieResultType): DieResultType;
}

export class DefenseDieResult extends DieResult<DefenseDieResult> {
  shields: number;

  constructor(shields: number) {
    super();
    this.shields = shields;
  }

  combine(other: DefenseDieResult): DefenseDieResult {
    return new DefenseDieResult(this.shields + other.shields);
  }
}

export class CombatDieResult extends DieResult<CombatDieResult> {
  damage: number;
  range: number;
  surge: number;
  miss: boolean;

  constructor(damage = 0, range = 0, surge = 0, miss = false) {
    super();
    this.damage = damage;
    this.range = range;
    this.surge = surge;
    this.miss = miss;
  }

  combine(other: CombatDieResult): CombatDieResult {
    return new CombatDieResult(
      this.damage + other.damage,
      this.range + other.range,
      this.surge + other.surge,
      this.miss || other.miss
    );
  }
}

class BaseDie<DieResultType extends DieResult<DieResultType>> {
  color: string;
  sides: DieResultType[];
  image: string;

  constructor(
    color: string,
    sides: any[],
    SideCtor: { new (...args: any[]): DieResultType }
  ) {
    this.color = color;
    this.image = new URL(
      `../assets/dice/${color}-top.png`,
      import.meta.url
    ).href;
    this.sides = Array.from(sides, (sideArgs: any) => new SideCtor(sideArgs));
  }
}

export class DefenseDie extends BaseDie<DefenseDieResult> {
  constructor(color: string, sides: number[]) {
    super(color, sides, DefenseDieResult);
  }
}

export class CombatDie extends BaseDie<CombatDieResult> {
  constructor(color: string, sides: any[]) {
    super(color, sides, CombatDieResult);
  }
}

export interface DicePool {
  attack: CombatDie;
  power: CombatDie[];
  defense: DefenseDie[];
}

export type Die = CombatDie | DefenseDie;

export class DiceSet<T extends Die> {
  counts: Map<T, number>;
  initial: T[];

  constructor(all: T[], initial: T[]) {
    this.initial = initial;
    this.counts = new Map(all.map((die) => [die, 0]));
    this.reset();
  }

  reset() {
    [...this.counts.keys()].forEach((die) => {
      this.counts.set(die, 0);
    });
    this.initial.forEach((die) => {
      this.counts.set(die, 1);
    });
  }

  add(die: T) {
    this.counts.set(die, this.counts.get(die)! + 1);
  }

  remove(die: T) {
    this.counts.set(die, this.counts.get(die)! - 1);
  }

  pool(): Iterable<T> {
    return this.counts.keys();
  }

  *[Symbol.iterator]() {
    for (const v of this.counts) {
      yield v;
    }
  }
}

export function combineDie<DieResultType extends DieResult<DieResultType>>(
  die1: DieResultType,
  die2: DieResultType
) {
  return die1.combine(die2);
}
