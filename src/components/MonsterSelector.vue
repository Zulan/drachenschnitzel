<script setup lang="ts">
import { computed, ref } from "vue";
import { monsters } from "@/data/monsters";
import type { Monster } from "@/models/monster";
import { Act, Trait } from "@/models/monster";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import { makeListFilter } from "@/utils/filter";
import { enumFromStringValue } from "@/utils/enum";
import { Attack } from "@/models/items";

defineEmits<{ (e: "select", monster: Monster): void }>();

const needle = ref("");

function matchName(monster: Monster): boolean {
  if (needle.value === "") {
    return true;
  }
  return monster.name.toLowerCase().includes(needle.value.toLowerCase());
}

const availableActs = [Act.I, Act.II];
const selectedActs = ref([]);
const matchActs = makeListFilter(
  selectedActs,
  (thing: Monster, selected: string) => thing.act === selected
);

const availableTraits = Object.values(Trait);
const selectedTraits = ref([]);
const matchTraits = makeListFilter(
  selectedTraits,
  (thing: Monster, selected: string) =>
    thing.traits.includes(enumFromStringValue(Trait, selected))
);

const availableAttacks = Object.values(Attack);
const selectedAttacks = ref([]);
const matchAttacks = makeListFilter(
  selectedAttacks,
  (thing: Monster, selected: string) => thing.attack === selected
);

function onlyUnique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}

const availableExpansions = monsters
  .map((monster) => monster.expansion)
  .filter(onlyUnique)
  .sort();
const selectedExpansions = ref([]);
const matchExpansions = makeListFilter(
  selectedExpansions,
  (thing: Monster, selected: string) => thing.expansion === selected
);

const items = computed(() =>
  monsters
    .filter(matchName)
    .filter(matchActs)
    .filter(matchTraits)
    .filter(matchAttacks)
    .filter(matchExpansions)
);
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <form>
        <div class="filter-grid">
          <div class="filter">
            <FilterButtonGroup
              :model-options="availableActs"
              v-model="selectedActs"
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
              :model-options="availableAttacks"
              v-model="selectedAttacks"
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
          <div class="filter filter-found">
            {{ items.length }} monsters found
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="image-grid">
    <div v-for="item in items" :key="item.nameAct">
      <a href="" @click.prevent="$emit('select', item)">
        <img
          :src="item.image.front"
          :alt="item.nameAct"
          class="w-100 rounded-3"
        />
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

.filter-found {
  margin-left: auto;
  align-self: center;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, auto));
  grid-gap: 1rem;
}
</style>
