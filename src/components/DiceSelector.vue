<template>
  <ul>
    <li v-for="die in dice" :key="die">
      {{ die }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DiceSelector',
  data () {
    return {
      dice: [this.app.config.globalProperties.dice.attack,
        ...this.app.config.globalProperties.dice.power,
        ...this.app.config.globalProperties.dice.defense]
    }
  }
}
</script>

<style scoped>

</style>
