<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Dashboard Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
    </div>

    <!-- Statistics Cards -->
    <div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <!-- Total Admins -->
    <div class="bg-white rounded-xl shadow-md p-4">
      <p class="text-sm text-gray-600">Total Admins</p>
      <h2 class="text-2xl font-semibold text-gray-800">
        {{ dashboardMetrics.totalAdmins }}
      </h2>
    </div>

    <!-- Total Drivers -->
    <div class="bg-white rounded-xl shadow-md p-4">
      <p class="text-sm text-gray-600">Total Drivers</p>
      <h2 class="text-2xl font-semibold text-gray-800">
        {{ dashboardMetrics.totalDrivers }}
      </h2>
    </div>

    <!-- Active Drivers -->
    <div class="bg-white rounded-xl shadow-md p-4">
      <p class="text-sm text-gray-600">Active Drivers</p>
      <h2 class="text-2xl font-semibold text-gray-800">
        {{ dashboardMetrics.activeDrivers }}
      </h2>
    </div>

    <!-- Inactive Drivers (Red Text) -->
    <div
      class="bg-white rounded-xl shadow-md p-4"
      :class="dashboardMetrics.inactiveDrivers > 0 ? 'border-red-500 border' : ''"
    >
      <p class="text-sm text-gray-600">Non Active Drivers</p>
      <h2
        class="text-2xl font-semibold"
        :class="dashboardMetrics.inactiveDrivers > 0 ? 'text-red-600' : 'text-gray-800'"
      >
        {{ dashboardMetrics.inactiveDrivers }}
      </h2>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <!-- Add your second row of statistics cards here -->
  </div>
</div>


    <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      <!-- Total Bins -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">Total Bins</p>
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ dashboardMetrics.totalBins }}
        </h2>
      </div>

      <!-- Full Bins (Red Text) -->
      <div
        class="bg-white rounded-xl shadow-md p-4"
        :class="dashboardMetrics.binsAboveThreshold > 0 ? 'border-red-500 border' : ''"
      >
        <p class="text-sm text-gray-600">No. of Full Bins</p>
        <h2
          class="text-2xl font-semibold"
          :class="dashboardMetrics.binsAboveThreshold > 0 ? 'text-red-600' : 'text-gray-800'"
        >
          {{ dashboardMetrics.binsAboveThreshold }}
        </h2>
      </div>

      <!-- Normal Bins -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">No. of Normal Bins</p>
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ dashboardMetrics.binsInProgress }}
        </h2>
      </div>

      <!-- Empty Bins -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">No. of Empty Bins</p>
        <h2 class="text-2xl font-semibold text-gray-800">
          {{ dashboardMetrics.binsBelowThreshold }}
        </h2>
      </div>
    </div>


    <!-- Graphs -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div class="bg-white rounded-xl shadow-md p-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Bin Status Overview</h2>
        <canvas id="binStatusChart" style="max-height: 500px;"></canvas>
      </div>
      <div class="bg-white rounded-xl shadow-md p-4">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Driver Activity</h2>
        <canvas id="driverActivityChart" style="max-height: 500px;"></canvas>
      </div>
    </div>



    <!-- Drivers -->
    <div class="bg-white rounded-xl shadow-md p-4 mt-6">
      <h2 class="text-lg font-semibold text-gray-800 text-left">Admins</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div
          v-for="driver in drivers"
          :key="driver.id"
          class="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4"
        >
          <!-- Driver Icon -->
          <Icon
            icon="mdi:account-circle"
            class="text-blue-500 w-10 h-10"
          />
          <!-- Driver Info -->
          <div>
            <h3 class="text-sm font-medium text-gray-800">{{ driver.name }}</h3>
            <p class="text-xs text-gray-500">{{ driver.email }}</p>
            <span
              :class="{
                'text-green-500': driver.status === 'Active',
                'text-red-500': driver.status === 'Inactive',
              }"
              class="text-xs font-medium"
            >
              {{ driver.status }}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { ref } from "vue";
import Chart from "chart.js/auto";
import { Icon } from "@iconify/vue";
import { fetchDashBoardDataApi } from "../api/admins";

var BinsData = [1, 1, 1];

export default {
  data() {
    return {
      dashboardMetrics: {
        totalDrivers: 0,
        activeDrivers: 0,
        inactiveDrivers: 0,
        totalAdmins: 0,
        totalVehicles: 0,
        vehiclesWithoutUser: 0,
        totalBins: 0,
        binsAboveThreshold: 0,
        binsInProgress: 0,
        binsBelowThreshold: 0,
      },
      error: null,
    };
  },
  methods: {
    async fetchDashboardMetrics() {
      try {
        const data = await fetchDashBoardDataApi();
        this.dashboardMetrics = data;
        BinsData[0] = this.dashboardMetrics.binsAboveThreshold;
        BinsData[1] = this.dashboardMetrics.binsBelowThreshold;
        BinsData[2] = this.dashboardMetrics.binsInProgress;
        this.initializeCharts();
      } catch (error) {
        console.error("Error fetching dashboard metrics:", error);
        this.error = "Failed to load metrics. Please try again later.";
      }
    },
    initializeCharts() {
      const binStatusCtx = document.getElementById("binStatusChart").getContext("2d");
      new Chart(binStatusCtx, {
        type: "doughnut",
        data: {
          labels: ["Full", "Empty", "In Progress"],
          datasets: [
            {
              label: "Bin Status",
              data: BinsData,
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const label = tooltipItem.label || "";
                  const value = tooltipItem.raw || 0;
                  return `${label}: ${value}`;
                },
              },
            },
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      });

      const driverActivityCtx = document.getElementById("driverActivityChart").getContext("2d");
      new Chart(driverActivityCtx, {
        type: "bar",
        data: {
          labels: ["Active Drivers", "Inactive Drivers"],
          datasets: [
            {
              label: "Driver Status",
              data: [this.dashboardMetrics.activeDrivers, this.dashboardMetrics.inactiveDrivers],
              backgroundColor: ["#4caf50", "#ff6384"],
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Drivers",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
    async fetchAdminDrivers() {
      try {
        const response = await fetch("http://localhost:8080/api/admin/admins");
        const driversData = await response.json();
        this.drivers = driversData.map((driver) => ({
          id: driver.id,
          name: `${driver.firstName} ${driver.lastName}`,
          email: driver.email,
          status: driver.status,
          image: "https://via.placeholder.com/150", // Placeholder image for now
        }));
      } catch (error) {
        console.error("Error fetching drivers:", error);
        this.error = "Failed to load drivers. Please try again later.";
      }
    },
  },
  mounted() {
    this.fetchDashboardMetrics();
    this.fetchAdminDrivers();
  },
  components: { Icon },
  setup() {
    const drivers = ref([]);
    const vehicles = ref([
      { id: 1, brand: "Toyota", plateNumber: "ABC-123" },
      { id: 2, brand: "Ford", plateNumber: "XYZ-789" },
    ]);

    const bins = ref([
      { id: 1, location: "Sector A", status: "Full" },
      { id: 2, location: "Sector B", status: "Empty" },
      { id: 3, location: "Sector C", status: "In Progress" },
    ]);

    const recentActivities = ref([
      {
        type: "info",
        icon: "mdi:truck",
        message: "New vehicle added.",
        timestamp: "10 mins ago",
      },
      {
        type: "success",
        icon: "mdi:account-check",
        message: "Driver Neil Sims status updated.",
        timestamp: "1 hour ago",
      },
      {
        type: "warning",
        icon: "mdi:alert",
        message: "Bin in Sector A reported full.",
        timestamp: "2 hours ago",
      },
    ]);

    return { drivers, vehicles, bins, recentActivities };
  },
};
</script>






<style scoped>
.card {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

canvas {
  display: block;
  width: 100%;
}
</style>
