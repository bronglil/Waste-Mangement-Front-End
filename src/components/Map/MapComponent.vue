<template>
  <div id="map" class="map"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: {
    bins: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultCoords: [48.8566, 2.3522], // Default center: Paris coordinates
    };
  },
  methods: {
    // Method to create custom icons based on bin status
    getBinIcon(status) {
      console.log("Bin status:", status);
      const fillColor = status === "FULL" ? "red" : "green";

      const outerCircleStyles = `
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        border: 2px solid #ccc; /* Added border for visibility */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      `;

      const innerCircleStyles = `
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${fillColor};
        color: white;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      `;

      const statusLabelStyles = `
        font-size: 14px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
      `;

      const iconHtml = `
        <div style="${outerCircleStyles}">
          <div style="${innerCircleStyles}">
            <span style="${statusLabelStyles}">${status.toUpperCase()}</span>
          </div>
        </div>
      `;

      return L.divIcon({
        className: "custom-icon-wrapper",
        html: iconHtml,
        iconSize: [80, 80],
        iconAnchor: [40, 40],
        popupAnchor: [0, -40],
      });
    },
  },
  mounted() {
    console.log("Bins data (raw):", this.bins); // Log the bins data for debugging

    // Calculate the average coordinates for the center if bins are present
    let initialCoords = this.defaultCoords;
    if (this.bins.length > 0) {
      const avgLat = this.bins.reduce((sum, bin) => sum + (bin.LATITUDE || this.defaultCoords[0]), 0) / this.bins.length;
      const avgLng = this.bins.reduce((sum, bin) => sum + (bin.LONGITUDE || this.defaultCoords[1]), 0) / this.bins.length;
      initialCoords = [avgLat, avgLng];
    }

    // Initialize the map with the calculated center coordinates
    this.map = L.map("map").setView(initialCoords, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Loop through bins and add markers
    this.bins.forEach((bin) => {
      const lat = bin.latitude // || this.defaultCoords[0];
      const lng = bin.longitude //|| this.defaultCoords[1];

      console.log({ lat, lng });
      console.log('Status:', bin.status);

      // console.log("Adding marker for bin:", bin); // Log each bin for debugging
      // Skip invalid coordinates
      if (!lat || !lng) {
        console.warn(`Invalid coordinates for bin:`, bin);
        return;
      }

      const marker = L.marker([lat, lng], {
        icon: this.getBinIcon(bin.status),
      }).addTo(this.map);

      marker.bindPopup(`
        <strong>${bin.location_name || "Unknown Location"}</strong><br>
        Last updated: ${bin.last_updated || "N/A"}
      `);

      marker.on("click", () => {
        this.$emit("marker-click", bin);
        this.map.setView([lat, lng], 14); // Center the map on the marker with zoom level 14
      });
    });
  },
  beforeUnmount() {
    // Clean up the map when the component is unmounted
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: calc(100vh - 20px);
  border-radius: 8px;
  z-index: 1;
}
</style>
