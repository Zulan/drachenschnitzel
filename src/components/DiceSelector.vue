<template>
  <ul>
    <li v-for="die in dice" :key="die">
      {{ die }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { CombatDie, DefenseDie } from '@/dice'

export default defineComponent({
  name: 'DiceSelector',
  data () {
    return {
      dice: [this.$dice.attack,
        ...this.$dice.power,
        ...this.$dice.defense]
    }
  },
  computed: {
  }
})

</script>

<style scoped>

</style>
