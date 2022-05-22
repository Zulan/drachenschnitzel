export class ObjectCounter<Key> {
  map: Map<string, [Key, number]>;
  constructor(entries?: readonly (readonly [Key, number])[] | null) {
    this.map = new Map<string, [Key, number]>(
      entries
        ? entries.map((elem) => [JSON.stringify(elem[0]), [elem[0], elem[1]]])
        : null
    );
  }

  forEach(callbackfn: (value: number, key: Key) => void): void {
    this.map.forEach((value: [Key, number]) => callbackfn(value[1], value[0]));
  }

  entries(): IterableIterator<[Key, number]> {
    return this.map.values();
  }

  get(key: Key): number {
    const jk = JSON.stringify(key);
    const entry = this.map.get(jk);
    if (entry === undefined) {
      return 0;
    }
    return entry[1];
  }

  increment(key: Key, value = 1): void {
    const jk = JSON.stringify(key);
    let n = value;
    const entry = this.map.get(jk);
    if (entry !== undefined) {
      n += entry[1];
    }
    this.map.set(jk, [key, n]);
  }
}
