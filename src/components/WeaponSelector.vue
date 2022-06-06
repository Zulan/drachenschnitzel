<script setup lang="ts">
import { computed, ref } from "vue";
import { weapons } from "@/data/items";
import type { Weapon } from "@/models/items";
import { Category, Equip, WeaponTrait } from "@/models/items";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import { makeListFilter } from "@/utils/filter";
import { enumFromStringValue } from "@/utils/enum";

const needle = ref("");

function matchName(weapon: Weapon): boolean {
  if (needle.value === "") {
    return true;
  }
  return weapon.name.toLowerCase().includes(needle.value.toLowerCase());
}

const availableCategories = [Category.ActI, Category.ActII];
const selectedCategories = ref([]);
const matchCategory = makeListFilter(
  selectedCategories,
  (thing: Weapon, selected: string) => thing.category === selected
);

const availableTraits = Object.values(WeaponTrait);
const selectedTraits = ref([]);
const matchTraits = makeListFilter(
  selectedTraits,
  (thing: Weapon, selected: string) =>
    thing.traits.includes(enumFromStringValue(WeaponTrait, selected))
);

const availableEquips = Object.values(Equip);
const selectedEquips = ref([]);
const matchEquips = makeListFilter(
  selectedEquips,
  (thing: Weapon, selected: string) => thing.equip === selected
);

const items = computed(() =>
  weapons
    .filter(matchName)
    .filter(matchCategory)
    .filter(matchTraits)
    .filter(matchEquips)
);
</script>

<template>
  <div class="container">
    <input v-model="needle" placeholder="filter by name" />

    <FilterButtonGroup
      :model-options="availableCategories"
      v-model="selectedCategories"
    />
    <FilterButtonGroup
      :model-options="availableTraits"
      v-model="selectedTraits"
    />
    <FilterButtonGroup
      :model-options="availableEquips"
      v-model="selectedEquips"
    />
    <h1>Total of {{ items.length }}</h1>
    <div class="row">
      <div
        class="col-sm-12 col-md-6 col-lg-3 col-xl-2 g-2"
        v-for="item in items"
        :key="item.name"
      >
        <img :src="item.image" :alt="item.name" class="w-100 rounded-3" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
