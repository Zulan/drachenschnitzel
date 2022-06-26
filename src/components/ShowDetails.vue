<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  object: unknown;
}>();

const showDetails = ref(false);
</script>

<template>
  <form>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        v-model="showDetails"
        id="show-details"
      />
      <label class="form-check-label" for="show-details">show details</label>
    </div>
  </form>
  <table v-if="showDetails" class="table table-striped">
    <tbody>
      <tr v-for="[prop, value] in Object.entries(object)" :key="prop">
        <td>{{ prop }}</td>
        <td>{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>
