<template>
  <div class="progress-container">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path class="circle-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" />
      <path class="circle" :style="{ stroke: chartColor }"
        :stroke-dasharray="status === 'full' ? '100, 100' : '50, 100'" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831" />
    </svg>
    <div class="progress-text">{{ statusLabel }}</div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
      validator: (value) => ["full", "empty"].includes(value),
    },
  },
  computed: {
    chartColor() {
      return this.status.toLowerCase() === "full" ? "#e74c3c" : "#2ecc71"; // Red for "full", green for "empty"
    },
    statusLabel() {
      return this.status.toLowerCase() === "full" ? "Full" : "Empty"; // Display the text
    },
  },
};
</script>

<style scoped>
.progress-container {
  position: relative;
  width: 80px;
  height: 80px;
  color: black;
}

.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 3.8;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dasharray 0.3s ease, stroke 0.3s ease;
}

.progress-text {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
