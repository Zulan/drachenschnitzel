import type { Ref } from "vue";

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
