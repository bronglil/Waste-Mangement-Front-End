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
      defaultCoords: [48.8566, 2.3522],
    };
  },
  methods: {
    getBinIcon(level) {
      const fillColor =
        level >= 75
          ? "red"
          : level >= 50
            ? "orange"
            : "green";

      const outerCircleStyles = `
          width: 70px;
          height: 70px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f0f0f0; /* Light outer circle color */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Soft shadow */
        `;

      const innerCircleStyles = `
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${fillColor}; /* Dynamic fill color */
          color: white;
          font-size: 14px;
          font-weight: bold;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
        `;

      const percentageLabelStyles = `
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
        `;

      const iconHtml = `
          <div style="${outerCircleStyles}">
            <div style="${innerCircleStyles}">
              <span style="${percentageLabelStyles}">${level}%</span>
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
    const initialCoords =
      this.bins.length > 0
        ? [this.bins[0].lat, this.bins[0].lng]
        : this.defaultCoords;

    this.map = L.map("map").setView(initialCoords, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.bins.forEach((bin) => {
      const marker = L.marker([bin.lat, bin.lng], {
        icon: this.getBinIcon(bin.level),
      }).addTo(this.map);

      marker.bindPopup(`<strong>${bin.name}</strong><br>${bin.description}`);
      marker.on("click", () => {
        this.$emit("marker-click", bin);
      });
    });
  },
  beforeUnmount() {
    this.map.remove();
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