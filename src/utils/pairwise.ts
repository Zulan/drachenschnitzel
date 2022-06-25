import { assert } from "@/utils/assert";

export function pairwise<T>(arr: T[]): Iterable<[T, T]> {
  assert(arr.length % 2 == 0, "pairwise length must be even");
  return {
    [Symbol.iterator]: function* () {
      for (let i = 0; i < arr.length; i = i + 2) yield [arr[i], arr[i + 1]];
    },
  };
}
