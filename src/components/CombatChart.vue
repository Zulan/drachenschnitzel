<script setup lang="ts">
import { computed, ref } from "vue";

import { useFightStore } from "@/stores/fight";
import { effectiveDamage, roll } from "@/models/roll";
import { GChart } from "vue-google-charts";
import { processChartData } from "@/utils/chart";

// const props = defineProps({
//   dice: { type: Object as PropType<DiceSet>, required: true },
// });
const fight = useFightStore();

const surgeBonusText = ref("[]");
const surgeBonus = computed(() => JSON.parse(surgeBonusText.value));

const damageHistogram = computed(() =>
  effectiveDamage(
    roll([...fight.combatDiceSet.linear(), ...fight.defenseDiceSet.linear()]),
    surgeBonus.value
  )
);
const chartOptions = computed(() => ({
  chart: {
    title: "Damage",
  },
}));
const chartData = computed(() => [
  ["Damage", "Chance", "Cumulative Chance"],
  ...processChartData(damageHistogram.value),
]);
const meanDamage = computed(() => {
  const [sum, count] = [...damageHistogram.value.entries()].reduce(
    ([partialSum, partialCount], [damage, count]) => [
      partialSum + damage * count,
      partialCount + count,
    ],
    [0, 0]
  );
  return sum / count;
});
</script>

<template>
  <div class="container">
    <ul>
      <li v-for="[damage, count] of damageHistogram.entries()" :key="damage">
        Damage: {{ damage }}: {{ count }}
      </li>
    </ul>
    <h1>Mean damage: {{ meanDamage }}</h1>
    <input v-model="surgeBonusText" class="form-control" />
    <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped></style>
