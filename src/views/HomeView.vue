<script setup lang="ts">
import DiceSelector from "@/components/DiceSelector.vue";
import { dice } from "@/data/dice";
</script>

<template>
  <main>
    <DiceSelector :dice="dice" />
  </main>
</template>
