<script setup lang="ts">
import { computed } from "vue";
import shopItems from "@d2e/data/shop-items.json";

console.log(shopItems);

const items = computed(() => shopItems);
</script>

<template>
  <div class="container">
    Total of {{ items.length }}
    <ul class="list-inline">
      <li v-for="item in items" :key="item.name" class="list-inline-item">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
