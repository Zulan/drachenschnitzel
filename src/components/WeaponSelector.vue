<script setup lang="ts">
import { computed } from "vue";
import { weapons } from "@/data/items";

const items = computed(() => weapons);
</script>

<template>
  <div class="container">
    Total of {{ items.length }}
    <ul class="list-inline">
      <li v-for="item in items" :key="item.name" class="list-inline-item">
        <img :src="item.image" :alt="item.name" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
