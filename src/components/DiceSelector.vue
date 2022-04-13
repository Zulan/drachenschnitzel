<script setup lang="ts">
import type { PropType } from "vue";
import { ref, defineProps } from "vue";

import type { CombatDie, Dice } from "@/models/dice";

const props = defineProps({
  dice: { type: Object as PropType<Dice>, required: true },
});

const available = ref([
  props.dice.attack,
  ...props.dice.power,
  ...props.dice.defense,
]);
const selected = ref([props.dice.attack]);

function add(die: CombatDie) {
  selected.value.push(die);
}
</script>

<template>
  <div class="container">
    <ul class="list-inline">
      <li v-for="die in available" :key="die" class="list-inline-item">
        <img :src="die.image" class="dice" @click="add(die)" />
      </li>
    </ul>
  </div>
  <div class="container">
    <ul class="list-inline">
      <li v-for="die in selected" :key="die" class="list-inline-item">
        <img :src="die.image" class="dice" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dice {
  width: 4rem;
}
</style>
