<script setup lang="ts">
import { computed, ref } from "vue";
import { weapons } from "@/data/items";
import type { Weapon } from "@/models/items";
import { Attack, Category, Equip, WeaponTrait } from "@/models/items";
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

const availableAttacks = Object.values(Attack);
const selectedAttacks = ref([]);
const matchAttacks = makeListFilter(
  selectedAttacks,
  (thing: Weapon, selected: string) => thing.attack === selected
);

const items = computed(() =>
  weapons
    .filter(matchName)
    .filter(matchCategory)
    .filter(matchAttacks)
    .filter(matchTraits)
    .filter(matchEquips)
);
</script>

<template>
  <form class="row g-1">
    <div class="col-6 col-lg-1">
      <FilterButtonGroup
        :model-options="availableCategories"
        v-model="selectedCategories"
      />
    </div>
    <div class="col-6 col-lg-2">
      <FilterButtonGroup
        :model-options="availableAttacks"
        v-model="selectedAttacks"
      />
    </div>
    <div class="col-12 col-lg-4 overflow-auto">
      <FilterButtonGroup
        :model-options="availableEquips"
        v-model="selectedEquips"
      />
    </div>
    <div class="col-12 overflow-auto">
      <FilterButtonGroup
        :model-options="availableTraits"
        v-model="selectedTraits"
      />
    </div>
    <div class="col-12 col-md-6">
      <input v-model="needle" placeholder="filter by name" />
    </div>
    <div class="col-12 col-md-6 text-end">{{ items.length }} weapons found</div>
  </form>
  <div class="row g-2">
    <div
      class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      v-for="item in items"
      :key="item.name"
    >
      <img :src="item.image" :alt="item.name" class="w-100 rounded-3" />
    </div>
  </div>
</template>

<style scoped></style>
