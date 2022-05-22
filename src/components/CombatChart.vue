<script setup lang="ts">
import { computed } from "vue";

import { useFightStore } from "@/stores/fight";
import { effectiveDamage, roll } from "@/models/roll";

// const props = defineProps({
//   dice: { type: Object as PropType<DiceSet>, required: true },
// });
const fight = useFightStore();

const damageHistogram = computed(() =>
  effectiveDamage(
    roll([...fight.combatDiceSet.linear(), ...fight.defenseDiceSet.linear()])
  )
);
</script>

<template>
  <div class="container">
    <ul>
      <li v-for="[damage, count] of damageHistogram.entries()" :key="damage">
        Damage: {{ damage }}: {{ count }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
