<template>
  <button @click="countIncrement">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: null,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.localCount = newValue;
      },
    },
  },

  methods: {
    countIncrement() {
      this.localCount += 1;
      this.$emit('update:count', this.localCount);
    },
  },
};
</script>
