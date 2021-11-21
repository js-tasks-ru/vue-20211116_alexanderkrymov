import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = {
  data() {
    return {
      a: null,
      b: null,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      switch (this.operator) {
        case 'sum':
          return this.a + this.b;
        case 'subtract':
          return this.a - this.b;
        case 'multiply':
          return this.a * this.b;
        case 'divide':
          return this.a / this.b;
      }
    },
  },
};

createApp(App).mount('#app');
