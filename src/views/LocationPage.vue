<template>
  <div class="location-page">
    <div class="sidebar">
      <h2 class="title">Bin Locations</h2>
      <ul class="bin-list">
        <li v-for="bin in bins" :key="bin.id" class="bin-item" @click="handleMarkerClick(bin)"
          :class="{ active: selectedBin?.id === bin.id }">

          <CircularProgress :status="bin.status" />
          <div class="bin-info">
            <h3>{{ bin.locationName }}</h3>
            <p>Last updated: {{ formatDateTime(bin.lastUpdated) }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="map-container">
      <MapComponent v-if="bins && bins.length > 0" :bins="bins" @marker-click="handleMarkerClick"
        :centeredBin="selectedBin" />
      <div v-else class="loading-message">Loading bins data...</div>
    </div>
  </div>
</template>

<script>
import MapComponent from "../components/Map/MapComponent.vue";
import CircularProgress from "../components/CircularProgress/CircularProgress.vue";
import { fetchAllBinsApi } from "@/api/bins";

export default {
  components: {
    MapComponent,
    CircularProgress,
  },
  data() {
    return {
      bins: [],
      selectedBin: null,
    };
  },
  async mounted() {
    try {
      const response = await fetchAllBinsApi();
      this.bins = response;
    } catch (error) {
      console.error("Error fetching bins data:", error);
    }
  },
  methods: {
    handleMarkerClick(bin) {
      this.selectedBin = bin;
      this.$emit("center-map", bin); // Emit the event to center the map
    },
    formatDateTime(dateString) {
      if (!dateString) return "N/A";
      const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      return new Date(dateString).toLocaleString(undefined, options);
    },
  },
};
</script>

<style scoped>
.location-page {
  display: flex;
  height: 100vh;
  background-color: #f4f6f9;
  z-index: 1;
}

.sidebar {
  width: 30%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  overflow-y: auto;
  border-radius: 16px 0 0 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bin-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bin-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
}

.bin-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.bin-item.active {
  background: rgba(74, 144, 226, 0.8);
  border-color: rgba(74, 144, 226, 0.4);
  color: #ffffff;
}

.bin-item.active .bin-info h3 {
  color: #ffffff;
}

.bin-info {
  margin-left: 10px;
}

.bin-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
}

.bin-info p {
  margin: 0;
  color: #555;
  font-size: 14px;
}

.map-container {
  width: 70%;
  padding-left: 20px;
  z-index: 1;
}
</style>
