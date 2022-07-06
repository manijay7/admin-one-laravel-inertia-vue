<script setup>
import { computed, ref } from "vue";
import Icon from "./Icon.vue";

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: null,
  },
  type: {
    type: String,
    default: "text",
    required: true,
  },
  options: {
    type: Array,
    default: null,
  },
  error: {
    type: String,
  },
  inpClass: { String },
  btn: { type: [String, Number] },
});

const emits = defineEmits(["update:modelValue", "right-icon-click", "btn-clicked"]);

const computedVModel = computed({
  get: () => props.modelValue,
  set: (value) => emits("update:modelValue", value),
});

const computedType = computed(() => (props.options ? "select" : props.type));

const formClass = computed(() => {
  if (props.error) {
    return "error";
  }
});

const inputEl = ref(null);
</script>

<template>
  <label v-if="label" for="id" class="form-label" :class="{ 'form-error': error }">{{
    label
  }}</label>
  <div class="relative">
    <textarea
      v-bind="$attrs"
      :id="id"
      :placeholder="label"
      :class="formClass"
      class="form-textarea h-24"
      v-model="computedVModel"
      ref="inputEl"
      v-if="computedType === 'textarea'"
    />
    <select
      v-else-if="computedType === 'select'"
      :id="id"
      v-bind="$attrs"
      :class="formClass"
      class="form-select h-10"
      v-model="computedVModel"
    >
      <option value="">Select an option</option>
      <option v-for="option in options" :key="option.id ?? option" :value="option.id">
        {{ option.name ?? option }}
      </option>
    </select>
    <input
      v-bind="$attrs"
      :id="id"
      :placeholder="label"
      :class="formClass"
      class="form-input h-10"
      v-model="computedVModel"
      ref="inputEl"
      :type="type"
      v-else
    />
    <div
      v-if="btn"
      class="absolute top-0 right-0 rounded-r h-full flex items-center justify-center bg-gray-100 border text-gray-600 outline:none focus:none px-2"
    >
      <button>{{ btn }}</button>
    </div>
  </div>
  <div v-if="error" class="text-sm text-red-600">{{ error }}</div>
</template>
