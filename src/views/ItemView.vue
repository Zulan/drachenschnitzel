<script setup lang="ts">
import { nextTick, ref } from "vue";
import { Modal } from "bootstrap";

import ItemSelector from "@/components/ItemSelector.vue";
import ShowDetails from "@/components/ShowDetails.vue";

import type { Item } from "@/models/items";
import { items } from "@/data/items";

const itemDetailElement = ref(null);
const selectedItem = ref(items[0]);
async function selectItem(item: Item) {
  selectedItem.value = item;

  // prevent flickering image
  await nextTick();
  if (itemDetailElement.value === null) {
    throw Error("Internal error");
  }
  const itemDetailModal = new Modal(itemDetailElement.value);
  itemDetailModal.show();
}
</script>

<template>
  <ItemSelector @select="selectItem" />
  <Teleport to="body">
    <div class="modal" ref="itemDetailElement" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedItem.name }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img
              :src="selectedItem.image"
              :alt="selectedItem.name"
              class="w-100 rounded-3"
            />
            <ShowDetails :object="selectedItem" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
