<script setup lang="ts">
import { computed, ref } from "vue";
import { weapons } from "@/data/items";
import type { Weapon } from "@/models/items";
import { WeaponTrait } from "@/models/items";

const needle = ref("");

function matchName(weapon: Weapon): boolean {
  if (needle.value === "") {
    return true;
  }
  return weapon.name.toLowerCase().includes(needle.value.toLowerCase());
}

const selectedAct = ref("");

function matchCategory(weapon: Weapon): boolean {
  if (selectedAct.value === "") {
    return true;
  }
  return selectedAct.value === weapon.category;
}

const selectedTraits = ref([]);

function matchTraits(weapon: Weapon): boolean {
  if (selectedTraits.value.length === 0) {
    return true;
  }
  for (const selectedTrait of selectedTraits.value) {
    if (weapon.traits.includes(selectedTrait)) {
      return true;
    }
  }
  return false;
}

const items = computed(() =>
  weapons.filter(matchName).filter(matchCategory).filter(matchTraits)
);

const availableTraits = computed(() => Object.values(WeaponTrait));
</script>

<template>
  <div class="container">
    <input v-model="needle" placeholder="filter by name" />

    <div class="btn-group" role="group">
      <input
        type="radio"
        class="btn-check"
        v-model="selectedAct"
        value=""
        id="act-all"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="act-all">All</label>

      <input
        type="radio"
        class="btn-check"
        v-model="selectedAct"
        value="I"
        id="act-I"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="act-I">Act I</label>

      <input
        type="radio"
        class="btn-check"
        v-model="selectedAct"
        value="II"
        id="act-II"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="act-II">Act II</label>
    </div>

    <div class="btn-group" role="group">
      <input
        type="checkbox"
        class="btn-check"
        @change="selectedTraits = []"
        :disabled="selectedTraits.length === 0"
        :checked="selectedTraits.length === 0"
        id="trait-all"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" for="trait-all">All</label>
      <template v-for="trait in availableTraits" :key="trait">
        <input
          type="checkbox"
          class="btn-check"
          v-model="selectedTraits"
          :value="trait"
          :id="`trait-${trait}`"
          autocomplete="off"
        />
        <label class="btn btn-outline-primary" :for="`trait-${trait}`">{{
          trait
        }}</label>
      </template>
    </div>

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
