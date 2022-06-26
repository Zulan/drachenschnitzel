import type { Ref } from "vue";
import { assert } from "@/utils/assert";

export function makeListFilter<T>(
  selectionRef: Ref<string[]>,
  match: (thing: T, selected: string) => boolean
) {
  return (thing: T) => {
    if (selectionRef.value.length == 0) {
      return true;
    }
    for (const selected of selectionRef.value) {
      if (match(thing, selected)) {
        return true;
      }
    }
    return false;
  };
}

/*
 a collection of horribly inefficient ways to deal with arrays using
 .filter chains
 */

export function unique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}

export function sample(count: number) {
  assert(count > 0, "count must be greater than 0");
  let indices: number[] | null = null;
  function f<T>(value: T, index: number, self: T[]): boolean {
    if (indices === null) {
      indices = Array.from(self.keys())
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
    }
    return indices.includes(index);
  }
  return f;
}
