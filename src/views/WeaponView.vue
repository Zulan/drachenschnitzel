<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Modal } from "bootstrap";

import WeaponSelector from "@/components/WeaponSelector.vue";
import ShowDetails from "@/components/ShowDetails.vue";

import type { Weapon } from "@/models/items";
import { weapons } from "@/data/items";

const weaponDetailElement = ref(null);
const selectedWeapon = ref(weapons[0]);
async function selectWeapon(weapon: Weapon) {
  selectedWeapon.value = weapon;

  // prevent flickering image
  await nextTick();
  if (weaponDetailElement.value === null) {
    throw Error("Internal error");
  }
  const weaponDetailModal = new Modal(weaponDetailElement.value);
  weaponDetailModal.show();
}
</script>

<template>
  <WeaponSelector @select="selectWeapon" />
  <Teleport to="body">
    <div
      class="modal"
      ref="weaponDetailElement"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedWeapon.name }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="selectedWeapon.image"
              :alt="selectedWeapon.name"
              class="w-100 rounded-3"
            />
            <ShowDetails :object="selectedWeapon" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
