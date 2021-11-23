import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение

const App = {
  data() {
    return {
      counter: 0,
    };
  },
};

createApp(App).mount('#app');
