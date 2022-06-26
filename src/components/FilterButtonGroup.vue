<script setup lang="ts">
import { computed, toRefs } from "vue";
import { v4 as uuidv4 } from "uuid";
import { removeWhitespace } from "@/utils/string";

const props = defineProps<{
  modelOptions: string[];
  modelValue: string[];
  iconFunction?: (value: string) => string;
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

const id = uuidv4();
</script>

<template>
  <div class="btn-group" role="group">
    <!--
    Order matters here - the label must be the first (and later the last)
    child to render the button group correctly.
    -->
    <label class="btn btn-outline-primary btn-sm" :for="`${id}-all`">All</label>
    <input
      type="checkbox"
      class="btn-check"
      @change="localValue = []"
      :disabled="modelValue.length === 0"
      :checked="modelValue.length === 0"
      :id="`${id}-all`"
    />
    <template v-for="value in modelOptions" :key="value">
      <input
        type="checkbox"
        class="btn-check"
        v-model="localValue"
        :value="value"
        :id="`${id}-${removeWhitespace(value)}`"
      />
      <label
        class="btn btn-outline-primary btn-sm"
        :for="`${id}-${removeWhitespace(value)}`"
        ><img
          class="icon"
          v-if="iconFunction"
          :src="iconFunction(value)"
          alt=""
        />
        {{ value }}</label
      >
    </template>
  </div>
</template>

<style scoped>
.icon {
  height: 3em;
}
</style>
