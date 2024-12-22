<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Dashboard Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">Total Drivers</p>
        <h2 class="text-2xl font-semibold text-gray-800">{{ drivers.length }}</h2>
      </div>
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">Total Vehicles</p>
        <h2 class="text-2xl font-semibold text-gray-800">{{ vehicles.length }}</h2>
      </div>
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">Total Bins</p>
        <h2 class="text-2xl font-semibold text-gray-800">{{ bins.length }}</h2>
      </div>
      <div class="bg-white rounded-xl shadow-md p-4">
        <p class="text-sm text-gray-600">Bins Reported Full</p>
        <h2 class="text-2xl font-semibold text-gray-800">{{ bins.filter((bin) => bin.status === "Full").length }}</h2>
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

    <!-- Recent Activity -->
    <div class="bg-white rounded-xl shadow-md p-4 mt-6">
      <h2 class="text-lg font-semibold text-gray-800 text-left">Recent Activity</h2>
      <ul class="mt-4 divide-y divide-gray-200">
        <li v-for="(activity, index) in recentActivities" :key="index" class="py-4 flex items-center space-x-4">
          <div :class="{
            'bg-blue-100 text-blue-500': activity.type === 'info',
            'bg-yellow-100 text-yellow-500': activity.type === 'warning',
            'bg-green-100 text-green-500': activity.type === 'success',
          }" class="flex items-center justify-center w-10 h-10 rounded-full">
            <Icon :icon="activity.icon" class="w-5 h-5" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">{{ activity.message }}</p>
            <p class="text-xs text-gray-500">{{ activity.timestamp }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Drivers -->
    <div class="bg-white rounded-xl shadow-md p-4 mt-6">
      <h2 class="text-lg font-semibold text-gray-800 text-left">Drivers</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div v-for="driver in drivers" :key="driver.id"
          class="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
          <img :src="driver.image" alt="Driver Avatar" class="w-14 h-14 rounded-full" />
          <div>
            <h3 class="text-sm font-medium text-gray-800">{{ driver.name }}</h3>
            <p class="text-xs text-gray-500">{{ driver.email }}</p>
            <span :class="{
              'text-green-500': driver.status === 'Active',
              'text-red-500': driver.status === 'Inactive',
            }" class="text-xs font-medium">{{ driver.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import { Icon } from "@iconify/vue";

export default {
  components: { Icon },
  setup() {
    const drivers = ref([
      {
        id: 1,
        name: "Neil Sims",
        email: "neil.sims@example.com",
        status: "Active",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Bonnie Green",
        email: "bonnie.green@example.com",
        status: "Inactive",
        image: "https://via.placeholder.com/150",
      },
    ]);

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

    onMounted(() => {
      const binStatusCtx = document.getElementById("binStatusChart").getContext("2d");
      const driverActivityCtx = document.getElementById("driverActivityChart").getContext("2d");

      new Chart(binStatusCtx, {
        type: "doughnut",
        data: {
          labels: ["Full", "Empty", "In Progress"],
          datasets: [
            {
              label: "Bin Status",
              data: [bins.value.filter((b) => b.status === "Full").length, bins.value.filter((b) => b.status === "Empty").length, bins.value.filter((b) => b.status === "In Progress").length],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
            },
          ],
        },
      });

      new Chart(driverActivityCtx, {
        type: "bar",
        data: {
          labels: drivers.value.map((driver) => driver.name),
          datasets: [
            {
              label: "Activity",
              data: drivers.value.map(() => Math.floor(Math.random() * 100)),
              backgroundColor: "#4caf50",
            },
          ],
        },
      });
    });

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
