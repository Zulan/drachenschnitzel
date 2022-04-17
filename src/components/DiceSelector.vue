<script setup lang="ts">
import { computed } from "vue";

import { useFightStore } from "@/stores/fight";

// const props = defineProps({
//   dice: { type: Object as PropType<DiceSet>, required: true },
// });
const fight = useFightStore();
const pool = [...fight.combatDicePool, ...fight.defenseDicePool];
const dice = computed(() => [...fight.combatDiceSet, ...fight.defenseDiceSet]);
</script>

<template>
  <div class="container">
    <ul class="list-inline">
      <li v-for="die in pool" :key="die.color" class="list-inline-item">
        <img
          :src="die.image"
          class="dice"
          @click="fight.addDie(die)"
          :alt="die.color"
        />
      </li>
    </ul>
  </div>
  <div class="container">
    <ul class="list-inline">
      <template v-for="[die, count] in dice" :key="die">
        <li v-for="n in count" :key="n" class="list-inline-item">
          <img
            :src="die.image"
            class="dice"
            @click="fight.removeDie(die)"
            :alt="die.color"
          />
        </li>
      </template>
      <li class="list-inline-item">
        <font-awesome-icon
          icon="recycle"
          size="3x"
          style="vertical-align: middle"
          @click="fight.resetDie()"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dice {
  width: 4rem;
}
</style>
