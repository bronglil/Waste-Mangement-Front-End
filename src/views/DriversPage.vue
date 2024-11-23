<template>
    <div class="min-h-screen p-6 card">
        <h1 class="flex items-center justify-between text-3xl font-bold text-gray-800 dark:text-white mb-6 bg-white/80 dark:bg-white/10 py-4 px-6 rounded-lg shadow-md heading">
    <div class="flex items-center">
    <!-- SVG Icon: Steering Wheel -->
    <svg
      class="w-8 h-8 mr-4 text-gray-600 dark:text-gray-300 icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a8 8 0 110 16 8 8 0 010-16zm0 8a2 2 0 100-4 2 2 0 000 4zm-4.95 1.05a1 1 0 11-.1-2 1 1 0 01.1 2zm9.9 0a1 1 0 11.1-2 1 1 0 01-.1 2z"
      />
    </svg>
    Drivers
  </div>

</h1>

<div class="overflow-x-auto shadow-lg rounded-lg bg-white/80 dark:bg-white/10 p-6">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Driver</th>
              <th scope="col" class="px-6 py-3">Vehicle</th>
              <th scope="col" class="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="driver in filteredDrivers"
              :key="driver.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td class="flex items-center px-6 py-4 whitespace-nowrap">
                <img
                  :src="driver.image"
                  alt="Driver Profile"
                  class="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div class="text-base font-semibold text-gray-900 dark:text-white">{{ driver.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ driver.email }}</div>
                </div>
              </td>
              <td class="px-6 py-4 text-gray-900 dark:text-white">{{ driver.vehicle }}</td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium',
                    driver.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  ]"
                >
                  {{ driver.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  
  export default {
    setup() {
      const drivers = ref([
        {
          id: 1,
          name: "Neil Sims",
          email: "neil.sims@example.com",
          vehicle: "Truck 1",
          status: "Active",
          image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
        },
        {
          id: 2,
          name: "Bonnie Green",
          email: "bonnie.green@example.com",
          vehicle: "Truck 2",
          status: "Inactive",
          image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
        },
        {
          id: 3,
          name: "Thomas Lean",
          email: "thomas.lean@example.com",
          vehicle: "Truck 3",
          status: "Active",
          image: "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
        },
      ]);
  
      const searchQuery = ref("");
  
      const filteredDrivers = computed(() => {
        return drivers.value.filter((driver) =>
          driver.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      return {
        drivers,
        searchQuery,
        filteredDrivers,
      };
    },
  };
  </script>
  
  <style scoped>
  .card{
    background: rgba(255, 255, 255, 0.8); 
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2)
  }

  .heading {
    color: #1f2937;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2)
  }

  .icon{
    color: #617188
  }
  </style>
  