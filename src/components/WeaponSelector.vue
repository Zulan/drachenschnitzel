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
      <form class="filter-grid">
        <div class="filter">
          <FilterButtonGroup
            :model-options="availableCategories"
            v-model="selectedCategories"
          />
        </div>
        <div class="filter">
          <FilterButtonGroup
            :model-options="availableAttacks"
            v-model="selectedAttacks"
          />
        </div>
        <div class="filter">
          <FilterButtonGroup
            :model-options="availableEquips"
            v-model="selectedEquips"
          />
        </div>
        <div class="filter">
          <FilterButtonGroup
            :model-options="availableTraits"
            v-model="selectedTraits"
          />
        </div>
        <div class="filter">
          <FilterButtonGroup
            :model-options="availableExpansions"
            v-model="selectedExpansions"
          />
        </div>
        <div class="filter">
          <input v-model="needle" placeholder="filter by name" />
        </div>
        <div class="filter">{{ items.length }} weapons found</div>
      </form>
    </div>
  </div>
  <div class="image-grid">
    <div v-for="item in items" :key="item.name">
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

.filter-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter {
  width: fit-content;
  display: inline-block;
  overflow: auto;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, auto));
  grid-gap: 1rem;
}
</style>
