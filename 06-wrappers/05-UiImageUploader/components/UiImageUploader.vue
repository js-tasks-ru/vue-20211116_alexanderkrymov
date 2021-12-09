<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="`--bg-url: url('${imgUrl}')`"
      @click="onClick"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        accept="image/*"
        class="image-uploader__input"
        ref="input"
        v-bind="$attrs"
        type="file"
        @change="onChangeImage"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['remove', 'select', 'upload', 'error'],

  data() {
    return {
      isLoading: false,
      imgUrl: this.preview,
    };
  },

  computed: {
    text() {
      if (this.isLoading) return 'Загрузка...';
      if (this.imgUrl) return 'Удалить изображение';
      else return 'Загрузить изображение';
    },
  },

  methods: {
    onClick(event) {
      if (this.isLoading || this.imgUrl) event.preventDefault();
      if (!this.isLoading && this.imgUrl) this.removeImage();
    },
    onChangeImage(event) {
      const file = event.target.files[0];
      this.imgUrl = URL.createObjectURL(file);
      this.$emit('select', file);
      if (this.uploader) this.uploadFile(file);
    },
    removeImage() {
      this.imgUrl = null;
      this.$refs.input.value = '';
      this.$emit('remove');
    },
    async uploadFile(file) {
      try {
        this.isLoading = true;
        const result = await this.uploader(file);
        this.$emit('upload', result);
      } catch (error) {
        this.removeImage();
        this.$emit('error', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
