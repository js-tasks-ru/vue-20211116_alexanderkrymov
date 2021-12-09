<template>
  <ui-input ref="input" v-model="model" :type="type">
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
      set() {
        const values = {
          time: (value) => `${this.dateISO.substring(0, 11)}${value}${this.dateISO.substring(16, 24)}`,
          date: (value) => `${value}${this.dateISO.substring(10, 24)}`,
          'datetime-local': (value) => `${value}${this.dateISO.substring(16, 24)}`,
        };
        const value = new Date(values[this.type](this.$refs.input.$refs.input.value)).getTime();
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>
