<template>
    <div class="location-page">
      <div class="sidebar">
        <h2 class="title">Bin Locations</h2>
        <ul class="bin-list">
          <li
            v-for="bin in bins"
            :key="bin.id"
            class="bin-item"
            @click="handleMarkerClick(bin)"
            :class="{ active: selectedBin?.id === bin.id }"
          >
            <CircularProgress :percentage="bin.level" />
            <div class="bin-info">
              <h3>{{ bin.name }}</h3>
              <p>{{ bin.description }}</p>
            </div>
          </li>
        </ul>
      </div>
  
      <div class="map-container">
        <MapComponent :bins="bins" @marker-click="handleMarkerClick" />
      </div>
    </div>
  </template>
  
  <script>
  import MapComponent from "@/components/Map/MapComponent.vue";
  import CircularProgress from "@/components/CircularProgress/CircularProgress.vue";
  
  export default {
    components: {
      MapComponent,
      CircularProgress,
    },
    data() {
      return {
        bins: [
          {
            id: 1,
            name: "Bin 1",
            lat: 48.8566,
            lng: 2.3522,
            description: "Located near Eiffel Tower.",
            level: 90,
          },
          {
            id: 2,
            name: "Bin 2",
            lat: 48.858844,
            lng: 2.294351,
            description: "Located near Champs-Élysées.",
            level: 60,
          },
          {
            id: 3,
            name: "Bin 3",
            lat: 48.860611,
            lng: 2.337644,
            description: "Located near Louvre Museum.",
            level: 30,
          },
          {
            id: 4,
            name: "Bin 4",
            lat: 48.804865,
            lng: 2.120355,
            description: "Located near Palace of Versailles.",
            level: 50,
          },
        ],
        selectedBin: null,
      };
    },
    methods: {
      handleMarkerClick(bin) {
        this.selectedBin = bin; 
      },
    },
  };
  </script>
  
  <style scoped>
  .location-page {
    display: flex;
    height: 100vh;
    background-color: #f4f6f9;
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
  }
  </style>
  