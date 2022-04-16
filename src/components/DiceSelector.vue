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
const dice_map = ref(new Map(available.value.map((die) => [die, 0])));

function add(die: CombatDie) {
  const count = dice_map.value.get(die) ?? 0;
  dice_map.value.set(die, count + 1);
}

function remove(die: CombatDie) {
  const count = dice_map.value.get(die) ?? 1;
  dice_map.value.set(die, count - 1);
}

function reset() {
  [...dice_map.value.keys()].forEach((die) => {
    dice_map.value.set(die, 0);
  });
  dice_map.value.set(available.value[0], 1);
}
reset();
</script>

<template>
  <div class="container">
    <ul class="list-inline">
      <li v-for="die in available" :key="die" class="list-inline-item">
        <img :src="die.image" class="dice" @click="add(die)" :alt="die.color" />
      </li>
    </ul>
  </div>
  <div class="container">
    <ul class="list-inline">
      <template v-for="[die, count] in dice_map" :key="die">
        <li v-for="n in count" :key="n" class="list-inline-item">
          <img
            :src="die.image"
            class="dice"
            @click="remove(die)"
            :alt="die.color"
          />
        </li>
      </template>
      <li class="list-inline-item">
        <font-awesome-icon
          icon="recycle"
          size="3x"
          style="vertical-align: middle"
          @click="reset()"
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
