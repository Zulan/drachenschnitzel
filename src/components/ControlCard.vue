<script setup lang="ts"></script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <form>
        <div class="filter-grid">
          <slot></slot>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.filter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
