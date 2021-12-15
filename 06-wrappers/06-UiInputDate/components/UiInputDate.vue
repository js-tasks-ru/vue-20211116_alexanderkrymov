<template>
  <ui-input ref="input" v-model="model" :type="type" @input="onInput">
    <template v-for="slotName of Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
      default: 'date',
    },
    modelValue: {
      type: [Number, null],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    dateISO() {
      return new Date(this.modelValue).toISOString();
    },
    localDate() {
      return {
        date: this.dateISO.substring(0, 10),
        time: this.dateISO.substring(11, 16),
        'datetime-local': this.dateISO.substring(0, 16),
      };
    },
    model: {
      get() {
        return this.modelValue ? this.localDate[this.type] : '';
      },
    },
  },

  methods: {
    onInput(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
