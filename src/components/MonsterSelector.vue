<script setup lang="ts">
import { computed, ref } from "vue";
import { monsters } from "@/data/monsters";
import type { Monster } from "@/models/monster";
import { Act, Trait, traitIcon } from "@/models/monster";
import FilterButtonGroup from "@/components/FilterButtonGroup.vue";
import { makeListFilter, sample, unique } from "@/utils/filter";
import { enumFromStringValue } from "@/utils/enum";
import { Attack } from "@/models/common";
import ControlCard from "@/components/ControlCard.vue";

defineEmits<{ (e: "select", monster: Monster): void }>();

const needle = ref("");
const randomCount = ref(1);
const randomCheck = ref(false);

function matchName(monster: Monster): boolean {
  if (needle.value === "") {
    return true;
  }
  return monster.name.toLowerCase().includes(needle.value.toLowerCase());
}

const availableActs = Object.values(Act);
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

const availableExpansions = monsters
  .map((monster) => monster.expansion)
  .filter(unique)
  .sort();
const selectedExpansions = ref([]);
const matchExpansions = makeListFilter(
  selectedExpansions,
  (thing: Monster, selected: string) => thing.expansion === selected
);

function sampleMonster() {
  if (randomCheck.value) {
    return sample(randomCount.value);
  }
  return () => true;
}

const selectedMonsters = computed(() =>
  monsters
    .filter(matchName)
    .filter(matchActs)
    .filter(matchTraits)
    .filter(matchAttacks)
    .filter(matchExpansions)
    .filter(sampleMonster())
);
</script>

<template>
  <ControlCard>
    <FilterButtonGroup :model-options="availableActs" v-model="selectedActs" />
    <FilterButtonGroup
      :model-options="availableAttacks"
      v-model="selectedAttacks"
    />
    <FilterButtonGroup
      :model-options="availableTraits"
      v-model="selectedTraits"
      :icon-function="traitIcon"
    />
    <FilterButtonGroup
      :model-options="availableExpansions"
      v-model="selectedExpansions"
    />
    <input v-model="needle" placeholder="filter by name" />
    <div>
      <label for="random-count" class="me-2">Select</label>
      <input id="random-count" class="me-2" v-model="randomCount" />
      <div style="display: inline-block">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="random-check"
            v-model="randomCheck"
          />
          <label class="form-check-label" for="random-check"
            >random monsters</label
          >
        </div>
      </div>
    </div>
    <div class="found">{{ selectedMonsters.length }} monsters found</div>
  </ControlCard>

  <div class="image-grid">
    <div v-for="item in selectedMonsters" :key="item.nameAct">
      <div class="monster-card" @click="$emit('select', item)">
        <div class="flip-icon">
          <font-awesome-icon icon="rotate-left" size="5x" />
        </div>
        <div class="monster-card-inner">
          <img
            :src="item.image.front"
            :alt="item.nameAct"
            class="monster-front rounded-3"
          />
          <img
            :src="item.image.back"
            :alt="item.nameAct"
            class="monster-back rounded-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*Flip stuff based on https://www.w3schools.com/howto/howto_css_flip_card.asp*/
.monster-card {
  position: relative;
  perspective: 1000px;
  z-index: 0;
  cursor: pointer;
}

.monster-card-inner {
  position: relative;
  width: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.monster-card:hover {
  z-index: 50;
}

.monster-card:hover > .flip-icon {
  z-index: 100;
}

.monster-card:hover > .monster-card-inner {
  transform: scale(1.2);
}

.monster-front {
  position: absolute;
}

.monster-back {
  position: relative;
  transform: rotateY(180deg);
}

.monster-front,
.monster-back {
  width: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-icon {
  position: absolute;
  height: 100%;
  width: 50%;
  bottom: 0;
  right: 0;
  z-index: -10;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 75%;
  color: var(--bs-primary);
}

.flip-icon:hover {
  color: var(--bs-secondary);
  opacity: 50%;
}

/* Do an horizontal flip when you move the mouse over the flip icon container */
.flip-icon:hover ~ .monster-card-inner {
  transform: rotateY(180deg) scale(1.2);
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
#random-count {
  width: 2em;
}
</style>
