<template>
  <div class="container">
    <ul class="list-inline">
      <li v-for="die in available" :key="die" class="list-inline-item">
        <img :src="die.image" class="dice" @click="add(die)">
      </li>
    </ul>
  </div>
  <div class="container">
    <ul class="list-inline">
      <li v-for="die in selected" :key="die" class="list-inline-item">
        <img :src="die.image" class="dice">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CombatDie } from '@/dice'
// import { CombatDie, DefenseDie } from '@/dice'

export default defineComponent({
  name: 'DiceSelector',
  data () {
    return {
      available: [this.$dice.attack,
        ...this.$dice.power,
        ...this.$dice.defense],
      selected: [this.$dice.attack]
    }
  },
  computed: {
  },
  methods: {
    add (die: CombatDie) {
      this.selected.push(die)
    }
  }
})

</script>

<style scoped>
.dice {
  width: 4rem
}
</style>
