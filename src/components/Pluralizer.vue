<script setup lang="ts">
defineProps<{
  count: number;
}>();
</script>

<template>
  {{ count === 0 ? "no" : count }}
  <slot name="default" v-if="count === 1"></slot>
  <slot name="plural" v-else><slot name="default"></slot>s</slot>
</template>
