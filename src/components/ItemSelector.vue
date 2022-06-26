<script setup lang="ts">
import { computed, ref } from "vue";
import { items } from "@/data/items";
import type { Item } from "@/models/items";
import { Category, Equip } from "@/models/items";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import { makeListFilter, sample, unique } from "@/utils/filter";
import ControlCard from "@/components/ControlCard.vue";
import Pluralizer from "@/components/Pluralizer.vue";

defineEmits<{ (e: "select", item: Item): void }>();

const needle = ref("");
const randomCount = ref(5);
const randomCheck = ref(false);

function matchName(item: Item): boolean {
  if (needle.value === "") {
    return true;
  }
  return item.name.toLowerCase().includes(needle.value.toLowerCase());
}

const availableCategories = Object.values(Category);
const selectedCategories = ref([]);
const matchCategory = makeListFilter(
  selectedCategories,
  (thing: Item, selected: string) => thing.category === selected
);

const availableEquips = Object.values(Equip);
const selectedEquips = ref([]);
const matchEquips = makeListFilter(
  selectedEquips,
  (thing: Item, selected: string) => thing.equip === selected
);

const availableExpansions = items
  .map((item) => item.expansion)
  .filter(unique)
  .sort();
const selectedExpansions = ref([]);
const matchExpansions = makeListFilter(
  selectedExpansions,
  (thing: Item, selected: string) => thing.expansion === selected
);

function sampleItem() {
  if (randomCheck.value) {
    return sample(randomCount.value);
  }
  return () => true;
}

const selectedItems = computed(() =>
  items
    .filter(matchName)
    .filter(matchCategory)
    .filter(matchEquips)
    .filter(matchExpansions)
    .filter(sampleItem())
);
</script>

<template>
  <ControlCard>
    <FilterButtonGroup
      :model-options="availableCategories"
      v-model="selectedCategories"
    />
    <FilterButtonGroup
      :model-options="availableEquips"
      v-model="selectedEquips"
    />
    <FilterButtonGroup
      :model-options="availableExpansions"
      v-model="selectedExpansions"
    />
    <input
      v-model="needle"
      placeholder="filter by name"
      id="filter-name"
      class="form-control"
    />
    <div>
      <label for="random-count" class="me-2">Select</label>
      <input
        type="number"
        min="1"
        id="random-count"
        class="me-2 form-control"
        v-model="randomCount"
      />
      <div class="d-inline-block">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="random-check"
            v-model="randomCheck"
          />
          <label class="form-check-label" for="random-check"
            >random {{ randomCount === 1 ? "item" : "items" }}</label
          >
        </div>
      </div>
    </div>

    <div class="found">
      <Pluralizer :count="selectedItems.length">item</Pluralizer>
      found
    </div>
  </ControlCard>
  <div class="image-grid">
    <div v-for="item in selectedItems" :key="item.name">
      <a href="" @click.prevent="$emit('select', item)">
        <img :src="item.image" :alt="item.name" class="w-100 rounded-3" />
      </a>
    </div>
  </div>
</template>

<style scoped>
a img {
  z-index: 0;
  transition: transform 0.2s;
}
a:hover img {
  z-index: 1;
  transform: scale(1.2);
}

.found {
  margin-left: auto;
  align-self: center;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, auto));
  grid-gap: 1rem;
}

.form-control {
  display: inline-block;
}
#filter-name {
  width: 14em;
}
#random-count {
  width: 4em;
}
</style>
