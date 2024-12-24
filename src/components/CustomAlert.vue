<template>
  <div v-if="visible" :class="`alert ${alertType}`">
    <span>{{ message }}</span>
    <button @click="close" class="close-button">X</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    alertType: {
      type: String,
      default: 'error', // Default type
    },
    visible: Boolean,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.alert {
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #f8d7da;
  color: #721c24;
  transition: opacity 0.5s ease;
}

.alert.success {
  background-color: #d4edda;
  color: #155724;
}

.alert.info {
  background-color: #cce5ff;
  color: #004085;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: inherit;
}

.close-button:hover {
  text-decoration: underline;
}
</style> 