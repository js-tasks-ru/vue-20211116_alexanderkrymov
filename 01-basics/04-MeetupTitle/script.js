import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение

const App = {
  data() {
    return {
      meetupId: null,
      meetup: null,
    };
  },
  watch: {
    meetupId(newId) {
      this.getMeetup(newId);
    },
  },
  methods: {
    async getMeetup(id) {
      this.meetup = await fetchMeetupById(id);
    },
  },
};

createApp(App).mount('#app');
