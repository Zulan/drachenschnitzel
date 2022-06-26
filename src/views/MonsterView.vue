<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Modal } from "bootstrap";

import MonsterSelector from "@/components/MonsterSelector.vue";
import ShowDetails from "@/components/ShowDetails.vue";

import type { Monster } from "@/models/monster";
import { monsters } from "@/data/monsters";

const monsterDetailElement = ref(null);
const selectedMonster = ref(monsters[0]);
async function selectMonster(monster: Monster) {
  selectedMonster.value = monster;

  // prevent flickering image
  await nextTick();
  if (monsterDetailElement.value === null) {
    throw Error("Internal error");
  }
  const monsterDetailModal = new Modal(monsterDetailElement.value);
  monsterDetailModal.show();
}
</script>

<template>
  <MonsterSelector @select="selectMonster" />
  <Teleport to="body">
    <div
      class="modal"
      ref="monsterDetailElement"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedMonster.name }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- not using gutter but margin for the vertical stack -->
            <div class="row g-0">
              <div class="col-12 col-md m-1">
                <img
                  :src="selectedMonster.image.front"
                  :alt="`${selectedMonster.name} front`"
                  class="w-100 rounded-3"
                />
              </div>
              <div class="col-12 col-md m-1">
                <img
                  :src="selectedMonster.image.back"
                  :alt="`${selectedMonster.name} back`"
                  class="w-100 rounded-3"
                />
              </div>
              <ShowDetails :object="selectedMonster" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
