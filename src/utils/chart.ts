import type { ObjectCounter } from "@/utils/collections";

export function* processChartData(
  oc: ObjectCounter<number>
): IterableIterator<[string, number, number]> {
  const ticks = [...oc.entries()].map(([key, value]) => key);
  if (ticks.length == 0) {
    return;
  }

  const min = Math.min(...ticks);
  const max = Math.max(...ticks);

  const sum = [...oc.entries()]
    .map(([key, value]) => value)
    .reduce((partialSum, a) => partialSum + a, 0);
  let cumulative = 0;
  for (let i = min; i <= max; i++) {
    cumulative += oc.get(i);
    yield [i.toString(), oc.get(i) / sum, 1 - cumulative / sum];
  }
}
