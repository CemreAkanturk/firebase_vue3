<script setup>
import { computed, useSlots } from "vue";
import Icon from "@/components/Icon.vue";

defineProps({
  label: {
    type: String,
    default: null,
  },
  help: {
    type: String,
    default: null,
  },
  iconpath: {
    type: String,
    default: null,
  },
});

const slots = useSlots();

const wrapperClass = computed(() => {
  const base = [];
  const slotsLength = slots.default().length;

  if (slotsLength > 1) {
    base.push("grid grid-cols-1 gap-3");
  }

  if (slotsLength === 2) {
    base.push("md:grid-cols-2");
  }

  return base;
});
</script>

<template>
  <div class="mb-6 last:mb-0 flex">
    <div class="flex justify-items-center label-container" >
      <icon class="label-icon" :path="iconpath" size="24" />
      <label v-if="label" class="block font-bold mb-2">{{ label }}</label>
    </div>

    <div class="input-container">
      <div :class="wrapperClass">
        <slot />
      </div>
      <div v-if="help" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {{ help }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.label-container {
  width: 20%;
  color:gray;
  font-size:14px;
  text-transform: uppercase;
  line-height: 30px;
}
.label {
  width: 90%;
}
.label-icon {
  width: 10%;
  margin-right: 5%;
}

.input-container {
  width: 70%;
}
</style>