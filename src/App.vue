<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <h1>Drachenschnitzel - 🐉</h1>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Combat - 🗡</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
</style>
