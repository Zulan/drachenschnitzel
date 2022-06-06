<script setup lang="ts">
import { computed, toRefs } from "vue";

const props = defineProps<{
  modelOptions: string[];
  modelValue: string[];
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const { modelOptions, modelValue } = toRefs(props);
const localValue = computed({
  get(): string[] {
    return modelValue.value;
  },
  set(newValue: string[]): void {
    emit("update:modelValue", newValue);
  },
});
</script>

<template>
  <div class="btn-group" role="group">
    <input
      type="checkbox"
      class="btn-check"
      @change="localValue = []"
      :disabled="localValue.length === 0"
      :checked="localValue.length === 0"
      id="trait-all"
      autocomplete="off"
    />
    <label class="btn btn-outline-primary" for="trait-all">All</label>
    <template v-for="value in modelOptions" :key="value">
      <input
        type="checkbox"
        class="btn-check"
        v-model="localValue"
        :value="value"
        :id="`trait-${value}`"
        autocomplete="off"
      />
      <label class="btn btn-outline-primary" :for="`trait-${value}`">{{
        value
      }}</label>
    </template>
  </div>
</template>

<style scoped></style>
