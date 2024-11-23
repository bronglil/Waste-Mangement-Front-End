<template>
    <div class="min-h-screen p-6 card">
      <h1
        class="flex items-center justify-between text-3xl font-bold text-gray-800 dark:text-white mb-6 bg-white/80 dark:bg-white/10 py-4 px-6 rounded-lg shadow-md heading"
      >
        <div class="flex items-center">
           <svg
  class="w-8 h-8 mr-4 text-gray-800 dark:text-gray-200 icon"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor"
  viewBox="0 0 24 24"
>
  <path d="M20.16 8.28a2 2 0 0 0-1.68-.9h-3.13V6A2 2 0 0 0 13.36 4H4A2 2 0 0 0 2 6v12h2.68a3.4 3.4 0 0 0 6.64 0h3.36a3.4 3.4 0 0 0 6.64 0H22v-5.5l-1.84-4.22zM12.64 14a3.4 3.4 0 0 0-3.36-3.28 3.4 3.4 0 0 0-3.36 3.28H4V6h9.36v8h-1.72zM16 16a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0zM8 16a1.4 1.4 0 1 1 2.8 0 1.4 1.4 0 0 1-2.8 0z"/>
</svg>
          Drivers
        </div>
      </h1>
  
      <ReusableTable
        :headers="['Driver', 'Vehicle', 'Status']"
        :data="filteredDrivers"
        :fields="['name', 'vehicle', 'status']"
      >
        <!-- Custom content for a field -->
        <template #name="{ row, value }">
          <div class="flex items-center">
            <img
              :src="row.image"
              alt="Driver Profile"
              class="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div class="text-base font-semibold text-gray-900 dark:text-white">
                {{ value }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ row.email }}
              </div>
            </div>
          </div>
        </template>
  
        <template #status="{ value }">
          <span
            :class="[
              'px-2 py-1 rounded-full text-xs font-medium',
              value === 'Active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            ]"
          >
            {{ value }}
          </span>
        </template>
      </ReusableTable>
    </div>
  </template>
  
  <script>
  import ReusableTable from '../components/ReusableTable/ReusableTable.vue';
  import { ref, computed } from "vue";
  
  export default {
    components: {
      ReusableTable,
    },
    setup() {
      const drivers = ref([
        {
          id: 1,
          name: "Neil Sims",
          email: "neil.sims@example.com",
          vehicle: "Truck 1",
          status: "Active",
          image:
            "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
        },
        {
          id: 2,
          name: "Bonnie Green",
          email: "bonnie.green@example.com",
          vehicle: "Truck 2",
          status: "Inactive",
          image:
            "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
        },
        {
          id: 3,
          name: "Thomas Lean",
          email: "thomas.lean@example.com",
          vehicle: "Truck 3",
          status: "Active",
          image:
            "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
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
  .card {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .heading {
    color: #1f2937;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .icon {
    color: #617188;
  }
  </style>
  