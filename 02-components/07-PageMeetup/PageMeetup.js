import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    'meetup-id': {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      errorMessage: null,
    };
  },

  watch: {
    meetupId(newId) {
      this.getMeetup(newId);
    },
  },

  created() {
    this.getMeetup(this.meetupId);
  },

  methods: {
    async getMeetup(id) {
      try {
        this.errorMessage = null;
        this.meetup = null;
        const result = await fetchMeetupById(id);
        this.meetup = result;
        return result;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetup && !errorMessage" :meetup="meetup" />

      <ui-container v-if="!meetup && !errorMessage">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="errorMessage">
        <ui-alert>{{ errorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});
