<template>
  <div class="toasts">
    <div
      v-for="toast in toastsQueue"
      class="toast"
      :class="{ toast_success: toast.type === 'success', toast_error: toast.type === 'error' }"
    >
      <ui-icon class="toast__icon" :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToaster',

  components: { UiIcon },

  data() {
    return {
      timeout: 5000,
      toastsQueue: {},
    };
  },

  methods: {
    addToast(type, message = '', icon = '') {
      const toastId = Date.now().toString(36) + Math.random();
      this.toastsQueue[toastId] = {
        type,
        message,
        icon,
      };
      setTimeout(() => {
        this.removeToast(toastId);
      }, this.timeout);
    },
    removeToast(toastId) {
      delete this.toastsQueue[toastId];
    },
    error(message) {
      this.addToast('error', message, 'alert-circle');
    },
    success(message) {
      this.addToast('success', message, 'check-circle');
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
