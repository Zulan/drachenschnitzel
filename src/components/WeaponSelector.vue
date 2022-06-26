<script setup lang="ts">
import { computed, ref } from "vue";
import { weapons } from "@/data/items";
import type { Weapon } from "@/models/items";
import { Category, Equip, WeaponTrait } from "@/models/items";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import { makeListFilter, unique } from "@/utils/filter";
import { enumFromStringValue } from "@/utils/enum";
import { Attack } from "@/models/common";
import ControlCard from "@/components/ControlCard.vue";

defineEmits<{ (e: "select", weapon: Weapon): void }>();

const needle = ref("");

function matchName(weapon: Weapon): boolean {
  if (needle.value === "") {
    return true;
  }
  return weapon.name.toLowerCase().includes(needle.value.toLowerCase());
}

const availableCategories = Object.values(Category);
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

const availableExpansions = weapons
  .map((weapon) => weapon.expansion)
  .filter(unique)
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
  <ControlCard>
    <FilterButtonGroup
      :model-options="availableCategories"
      v-model="selectedCategories"
    />
    <FilterButtonGroup
      :model-options="availableAttacks"
      v-model="selectedAttacks"
    />
    <FilterButtonGroup
      :model-options="availableEquips"
      v-model="selectedEquips"
    />
    <FilterButtonGroup
      :model-options="availableTraits"
      v-model="selectedTraits"
    />
    <FilterButtonGroup
      :model-options="availableExpansions"
      v-model="selectedExpansions"
    />
    <input v-model="needle" placeholder="filter by name" />
    <div class="found">{{ items.length }} weapons found</div>
  </ControlCard>
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

.found {
  margin-left: auto;
  align-self: center;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, auto));
  grid-gap: 1rem;
}
</style>
