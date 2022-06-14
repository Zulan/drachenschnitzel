<script setup lang="ts">
import { computed, ref } from "vue";
import { weapons } from "@/data/items";
import type { Weapon } from "@/models/items";
import { Attack, Category, Equip, WeaponTrait } from "@/models/items";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import { makeListFilter } from "@/utils/filter";
import { enumFromStringValue } from "@/utils/enum";

defineEmits<{ (e: "select", weapon: Weapon): void }>();

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

function onlyUnique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}

const availableExpansions = weapons
  .map((weapon) => weapon.expansion)
  .filter(onlyUnique)
  .sort();
const selectedExpansions = ref([]);
const matchExpansions = makeListFilter(
  selectedExpansions,
  (thing: Weapon, selected: string) => thing.expansion === selected
);

const items = computed(() =>
  weapons
    .filter(matchName)
    .filter(matchCategory)
    .filter(matchAttacks)
    .filter(matchTraits)
    .filter(matchEquips)
    .filter(matchExpansions)
);
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <form class="row g-1">
        <div class="col-6 col-lg-2">
          <FilterButtonGroup
            :model-options="availableCategories"
            v-model="selectedCategories"
          />
        </div>
        <div class="col-6 col-lg-3">
          <FilterButtonGroup
            :model-options="availableAttacks"
            v-model="selectedAttacks"
          />
        </div>
        <div class="col-12 col-lg-6 overflow-auto">
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
        <div class="col-12 overflow-auto">
          <FilterButtonGroup
            :model-options="availableExpansions"
            v-model="selectedExpansions"
          />
        </div>
        <div class="col-12 col-md-6">
          <input v-model="needle" placeholder="filter by name" />
        </div>
        <div class="col-12 col-md-6 text-end">
          {{ items.length }} weapons found
        </div>
      </form>
    </div>
  </div>
  <div class="row g-2">
    <div
      class="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      v-for="item in items"
      :key="item.name"
    >
      <a href="#" @click="$emit('select', item)">
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
</style>
