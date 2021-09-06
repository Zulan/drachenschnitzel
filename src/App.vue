<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <DiceSelector></DiceSelector>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import DiceSelector from './components/DiceSelector.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    DiceSelector
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
