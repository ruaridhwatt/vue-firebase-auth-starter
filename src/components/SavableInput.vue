<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    validator(value) {
      return [
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'url',
      ].includes(value);
    },
  },
  required: Boolean,
  minLength: [String, Number],
  maxLength: [String, Number],
  min: [String, Number],
  max: [String, Number],
  pattern: String,
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, null],
    required: true,
  },
  state: {
    type: [String, null],
    validator(value) {
      return [null, 'saving', 'saved', 'error'].includes(value);
    },
    default: null,
  },
});
const emit = defineEmits(['update:modelValue', 'save']);

const theInput = ref(null);
const savedValue = ref(props.modelValue);

function save() {
  if (savedValue.value === props.modelValue) return;
  savedValue.value = props.modelValue;
  emit('save', props.modelValue);
}

const saveDisabled = computed(() => {
  return savedValue.value === props.modelValue || props.state === 'saving';
});

const ariaInvalid = computed(() => {
  if (savedValue.value !== props.modelValue) return null;
  if (props.state === 'error') return true;
  if (props.state === 'saved') return false;
  return null;
});
</script>

<template>
  <form v-on:submit.prevent="save">
    <label for="{{id}}">{{ label }}</label>
    <div class="savable-input">
      <input
        ref="theInput"
        id="{{id}}"
        :value="modelValue"
        @keyup.enter="save"
        :type="type"
        :required="required"
        :minLength="minLength"
        :maxLength="maxLength"
        :min="min"
        :max="max"
        :pattern="pattern"
        @input="$emit('update:modelValue', $event.target.value)"
        :aria-invalid="ariaInvalid"
      />
      <button class="icon-button" :disabled="saveDisabled" type="submit">
        <span class="material-symbols-outlined">save</span>
      </button>
    </div>
  </form>
</template>

<style scoped>
input {
  margin: 0;
}

.icon-button {
  margin-left: 5px;
}

.savable-input {
  display: flex;
  align-items: stretch;
  margin-bottom: 1rem;
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  width: fit-content;
}
</style>
